// AuthProvider.test.tsx
import React, { useContext } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProvider from '../../context/AuthProvider';
import AuthContext, { AuthContextData } from '../../context/AuthContext';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';
import { API_TOKEN, USER_DATA } from '../../app-constants/app-constants';

// Mock the API service methods.
vi.mock('../../api-service/api');

// Create a helper component to consume AuthContext for testing.
const ConsumerComponent: React.FC = () => {
  const {
    signed,
    user,
    signIn,
    register,
    signOut,
    updateUser,
    checkCurrentAuthUser
  } = useContext<AuthContextData>(AuthContext);

  return (
    <div>
      <div data-testid="signed">{signed ? 'true' : 'false'}</div>
      <div data-testid="user">{user ? user.name : 'none'}</div>
      <button
        data-testid="signIn"
        onClick={async() => {
          await signIn('test@example.com', 'password123');
        }}
      >
        Sign In
      </button>
      <button
        data-testid="register"
        onClick={() => {
          register('new@example.com', 'password123');
        }}
      >
        Register
      </button>
      <button
        data-testid="sign-out-btn"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
      <button
        data-testid="updateUser"
        onClick={() => {
          updateUser({
            userId: 1,
            name: 'Updated User',
            email: 'updated@example.com',
            admin: false,
            createdAt: new Date(),
            gravatarImageUrl: 'http://dummyimage.com'
          });
        }}
      >
        Update User
      </button>
      <button
        data-testid="checkCurrentAuthUser"
        onClick={() => {
          checkCurrentAuthUser('/some-path');
        }}
      >
        Check Current Auth User
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  // Reset DOM and mocks for each test.
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the default context values', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    expect(getByTestId('signed').textContent).toBe('false');
    expect(getByTestId('user').textContent).toBe('none');
  });

  it('should sign in a user successfully', async () => {
    // Create a fake sign-in response.
    const fakeResponse = {
      userId: '123',
      name: 'Test User',
      email: 'test@example.com',
      admin: false,
      createdAt: new Date(),
      token: 'dummy-token',
      gravatarImageUrl: 'http://dummyimage.com'
    };

    vi.spyOn(api, 'postJSON').mockResolvedValue(fakeResponse);

    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await act(async () => {
      userEvent.click(getByTestId('signIn'));
    });

    await waitFor(() =>
      expect(getByTestId('signed').textContent).toBe('true')
    );
    expect(getByTestId('user').textContent).toBe('Test User');
    // LocalStorage should have API_TOKEN and USER_DATA set.
    expect(localStorage.getItem(API_TOKEN)).toBe('dummy-token');
    expect(localStorage.getItem(USER_DATA)).not.toBeNull();
  });

  it('should register a new user successfully', async () => {
    const fakeResponse = {
      token: 'register-token',
      userId: '456',
      name: 'New User',
      email: 'new@example.com',
      admin: false,
      createdAt: new Date(),
      gravatarImageUrl: 'http://dummyimage.com'
    };

    vi.spyOn(api, 'putJSON').mockResolvedValue(fakeResponse);

    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await act(async () => {
      userEvent.click(getByTestId('register'));
    });

    await waitFor(() =>
      expect(getByTestId('signed').textContent).toBe('true')
    );
    expect(getByTestId('user').textContent).toBe('New User');
    expect(localStorage.getItem(API_TOKEN)).toBe('register-token');
    expect(localStorage.getItem(USER_DATA)).not.toBeNull();
  });

  it('should sign out a user', async () => {
    // Pre-populate localStorage to simulate a signed-in state.
    localStorage.setItem(API_TOKEN, 'dummy-token');
    localStorage.setItem(
      USER_DATA,
      JSON.stringify({
        userId: '123',
        name: 'Test User',
        email: 'test@example.com',
        admin: false,
        createdAt: new Date(),
        gravatarImageUrl: 'http://dummyimage.com'
      })
    );

    const fakeResponse = {
      userId: '123',
      name: 'Test User',
      email: 'test@example.com',
      admin: false,
      createdAt: new Date(),
      token: 'dummy-token',
      gravatarImageUrl: 'http://dummyimage.com'
    };

    vi.spyOn(api, 'postJSON').mockResolvedValue(fakeResponse);

    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    // Make sure that the context initially renders with the signed user by triggering a signIn.
    await act(async () => {
      userEvent.click(getByTestId('signIn'));
    });

    await waitFor(() =>
      expect(getByTestId('signed').textContent).toBe('true')
    );

    // Now sign out
    await act(async () => {
      userEvent.click(getByTestId('sign-out-btn'));
    });

    await waitFor(() =>
      expect(getByTestId('signed').textContent).toBe('false')
    );
    expect(getByTestId('user').textContent).toBe('none');
    // LocalStorage items should be removed.
    expect(localStorage.getItem(API_TOKEN)).toBeNull();
    expect(localStorage.getItem(USER_DATA)).toBeNull();
  });

  it('should update user in context and localStorage', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await act(async () => {
      userEvent.click(getByTestId('updateUser'));
    });

    await waitFor(() => {
      act(() => {
        expect(getByTestId('user').textContent).toBe('Updated User')
      })
      const savedUser = localStorage.getItem(USER_DATA);
      expect(savedUser).not.toBeNull();
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        expect(parsedUser.name).toBe('Updated User');
      }
    });
  });

  it('should call fetchCurrentSession when checking current auth user', async () => {
    const fakeResponse = {
      token: 'refresh-token',
      userId: '789',
      name: 'Refreshed User',
      email: 'refreshed@example.com',
      admin: false,
      createdAt: new Date().toISOString(),
      gravatarImageUrl: 'http://dummyimage.com'
    };

    vi.spyOn(api, 'getJSON').mockResolvedValue(fakeResponse);

    // Store API_TOKEN so that fetchCurrentSession runs the refresh logic.
    localStorage.setItem(API_TOKEN, 'dummy');

    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      userEvent.click(getByTestId('checkCurrentAuthUser'));
    });

    await waitFor(() =>
      expect(localStorage.getItem(API_TOKEN)).toBe('refresh-token')
    );
  });
});
