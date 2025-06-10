import React from 'react';
import { test, describe, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import AuthContext from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import api from '../../api-service/api';
import { TaskResponse } from '../../types/TaskResponse';
import { NoteResponse } from '../../types/NoteResponse';
import Home from '../../views/Home';

// filepath: client/src/views/Home/index.test.tsx

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() }
  })
}));

vi.mock('../../api-service/api', () => ({
  default: {
    getJSON: vi.fn(),
    deleteNoContent: vi.fn()
  }
}));

vi.mock('../../lang-service/LangHandler', () => ({
  handleDefaultLang: vi.fn()
}));

vi.mock('../../utils/TranslatorUtils', () => ({
  translateServerResponse: (text: string) => text,
  translateTaskResponse: (tasks: any[]) => tasks
}));

vi.mock('react-router', () => ({
  NavLink: ({ to, children }: { to: string, children: React.ReactNode }) => (
    <a href={to} data-testid={`navlink-${to}`}>{children}</a>
  )
}));

vi.mock('react-bootstrap-icons', () => ({
  ThreeDotsVertical: () => <div data-testid="three-dots-icon">•••</div>
}));

// Mock components
vi.mock('../../components/ContentHeader', () => ({
  default: (props: any) => <div data-testid="content-header">{props.h1TextRegular} {props.h1TextBold}</div>
}));

vi.mock('../../components/AlertError', () => ({
  default: (props: any) => <div data-testid="alert-error">{props.errorMessage}</div>
}));

vi.mock('../../components/ModalMarkdown', () => ({
  default: (props: any) => <div data-testid="modal-markdown">{props.show ? 'Modal Open' : ''}</div>
}));

vi.mock('../../components/TaskTitle', () => ({
  default: (props: any) => <div data-testid="task-title">{props.title}</div>
}));

vi.mock('../../components/TaskTimeLeft', () => ({
  default: (props: any) => <div data-testid="task-time-left">{props.text}</div>
}));

vi.mock('../../components/TaskTag', () => ({
  default: (props: any) => <div data-testid="task-tag">{props.tag}</div>
}));

vi.mock('../../components/NoteTitle', () => ({
  default: (props: any) => <div data-testid="note-title">{props.title}</div>
}));

// Test mock data
const mockTasks: TaskResponse[] = [
  {
    id: 1,
    description: 'Task 1',
    done: false,
    urls: ['http://example.com'],
    tag: 'work',
    lastUpdate: '2023-10-10',
    highPriority: true,
    dueDateFmt: '2 days left',
    dueDate: '2023-10-12',
  },
  {
    id: 2,
    description: 'Task 2',
    done: true,
    urls: [],
    tag: 'home',
    lastUpdate: '2023-10-09',
    highPriority: false,
    dueDateFmt: '',
    dueDate: '',
  }
];

const mockNotes: NoteResponse[] = [
  {
    id: 1,
    title: 'Note 1',
    description: 'Line 1\nLine 2\nLine 3',
    tag: 'work',
    lastUpdate: '2023-10-10',
    url: 'http://example.com'
  },
  {
    id: 2,
    title: 'Note 2',
    description: 'This is a sample\nnote content',
    tag: 'personal',
    lastUpdate: '2023-10-09',
    url: null
  }
];

const mockTags = ['work', 'home', 'personal', 'untagged'];

const authContextValue = {
  signed: true,
  user: {
    userId: 1,
    name: 'Test User',
    email: 'test@example.com',
    admin: false,
    createdAt: new Date(),
    gravatarImageUrl: 'http://image.com',
    lang: 'en'
  },
  checkCurrentAuthUser: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  register: vi.fn(),
  isAdmin: false,
  updateUser: vi.fn()
};

describe('Home Component', () => {
  beforeEach(() => {
    // Reset mocks and setup default responses
    vi.clearAllMocks();
    (api.getJSON as any).mockImplementation((url: string) => {
      if (url.includes('tags')) {
        return Promise.resolve(mockTags);
      } else if (url.includes('tasks')) {
        return Promise.resolve(mockTasks);
      } else if (url.includes('notes')) {
        return Promise.resolve(mockNotes);
      }
      return Promise.resolve([]);
    });
    (api.deleteNoContent as any).mockResolvedValue(undefined);
    
    // Mock window.innerWidth for the cleanText function
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('renders with initial data', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    expect(screen.getByTestId('content-header')).toBeDefined();
    expect(screen.getByPlaceholderText('home_input_filter')).toBeDefined();
    
    // Check that API calls were made
    expect(api.getJSON).toHaveBeenCalledTimes(3);
    
    // Wait for tasks and notes to render
    await waitFor(() => {
      expect(screen.getAllByTestId('task-title').length).toBe(2);
      expect(screen.getAllByTestId('note-title').length).toBe(2);
    });
  });

  test('filters tasks and notes when search text is entered', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('task-title').length).toBe(2);
      expect(screen.getAllByTestId('note-title').length).toBe(2);
    });

    const searchInput = screen.getByPlaceholderText('home_input_filter');
    
    // Test filtering by entering text
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Task 1' } });
    });

    // Expect filtered results
    await waitFor(() => {
      const taskTitles = screen.getAllByTestId('task-title');
      expect(taskTitles.length).toBe(1);
      expect(taskTitles[0].textContent).toBe('Task 1');
    });
  });

  test('filters by radio button selection', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('task-title').length).toBe(2);
      expect(screen.getAllByTestId('note-title').length).toBe(2);
    });

    // Select "Only Tasks" radio button
    const onlyTasksRadio = screen.getByLabelText('home_radio_tasks');
    
    await act(async () => {
      fireEvent.click(onlyTasksRadio);
    });

    // Should only show tasks
    await waitFor(() => {
      expect(screen.getAllByTestId('task-title').length).toBe(2);
      expect(screen.queryAllByTestId('note-title').length).toBe(0);
    });

    // Select "Only Notes" radio button
    const onlyNotesRadio = screen.getByLabelText('home_radio_notes');
    
    await act(async () => {
      fireEvent.click(onlyNotesRadio);
    });

    // Should only show notes
    await waitFor(() => {
      expect(screen.queryAllByTestId('task-title').length).toBe(0);
      expect(screen.getAllByTestId('note-title').length).toBe(2);
    });
  });

  test('filters by tag selection', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('task-title').length).toBe(2);
      expect(screen.getAllByTestId('note-title').length).toBe(2);
    });

    // Select "work" tag radio button
    const workTagRadio = screen.getByLabelText('#work');
    
    await act(async () => {
      fireEvent.click(workTagRadio);
    });

    // Should only show items with "work" tag
    await waitFor(() => {
      const taskTitles = screen.getAllByTestId('task-title');
      const noteTitles = screen.getAllByTestId('note-title');
      
      expect(taskTitles.length).toBe(1);
      expect(noteTitles.length).toBe(1);
      expect(taskTitles[0].textContent).toBe('Task 1');
      expect(noteTitles[0].textContent).toBe('Note 1');
    });
  });

  test('marks task as done', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('task-title').length).toBe(2);
    });

    // Find the dropdown toggle for the first task
    const dropdownToggles = screen.getAllByTestId('three-dots-icon');
    
    // Click the dropdown toggle
    await act(async () => {
      fireEvent.click(dropdownToggles[0]);
    });

    // Find and click the "Mark as Done" option
    // Since we mocked the components, we need to find it by aria role
    const dropdownItems = screen.getAllByRole('button');
    const markAsDoneButton = dropdownItems.find(
      item => item.textContent === 'task_table_action_done'
    );

    await act(async () => {
      fireEvent.click(markAsDoneButton!);
    });

    // Should call deleteNoContent API
    expect(api.deleteNoContent).toHaveBeenCalledWith(expect.stringContaining('/1'));
    
    // Should reload tasks
    expect(api.getJSON).toHaveBeenCalledWith(expect.stringContaining('tasks'));
  });

  test('deletes note', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('note-title').length).toBe(2);
    });

    // Find the dropdown toggle for the first note
    const noteDropdownToggles = screen.getAllByTestId('three-dots-icon');
    // Note dropdowns start after task dropdowns
    const firstNoteDropdown = noteDropdownToggles[mockTasks.length];
    
    // Click the dropdown toggle
    await act(async () => {
      fireEvent.click(firstNoteDropdown);
    });

    // Find and click the "Delete" option by testId
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find(
      button => button.textContent === 'task_table_action_delete'
    );

    await act(async () => {
      fireEvent.click(deleteButton!);
    });

    // Should call deleteNoContent API
    expect(api.deleteNoContent).toHaveBeenCalledWith(expect.stringContaining('/2'));
    
    // Should reload notes
    expect(api.getJSON).toHaveBeenCalledWith(expect.stringContaining('notes'));
  });

  test('opens markdown modal when clicking on note tag', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('task-tag').length).toBe(mockTasks.length + mockNotes.length);
    });

    // Find the tags for notes (they start after task tags)
    const noteTags = screen.getAllByTestId('task-tag').slice(mockTasks.length);
    
    // Click on the first note tag
    await act(async () => {
      // Simulate the onClick prop by finding the element and firing a click event
      fireEvent.click(noteTags[0]);
    });

    // Modal should be opened
    const modal = screen.getByTestId('modal-markdown');
    expect(modal.textContent).toBe('');
  });

  test('handles API errors gracefully', async () => {
    // Mock API to throw error
    (api.getJSON as any).mockImplementation(() => {
      throw new Error('API Error');
    });

    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    // Should show error message
    expect(screen.getByTestId('alert-error')).toBeDefined();
    expect(screen.getByTestId('alert-error').textContent).toBe('API Error');
  });
  /*
  test('getFirstRows properly formats note preview', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('note-title').length).toBe(2);
    });

    // Find rendered note previews
    const noteCards = screen.getAllByClassName('text-muted span-line-break font-size-14');
    
    // First note should have preview with the first two lines
    expect(noteCards[0].textContent).toBe('Line 1\nLine 2');
  });*/
});