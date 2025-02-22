import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import Sidebar from '../../components/Sidebar';
import AuthContext from '../../context/AuthContext';
import i18n from '../../i18n';

const authContextMock = {
  signed: true,
  user: undefined,
  checkCurrentAuthUser: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  register: vi.fn(),
  isAdmin: false
};

describe('Sidebar Component', () => {
  const renderSidebar = () => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={authContextMock}>
          <I18nextProvider i18n={i18n}>
            <Sidebar />
          </I18nextProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it('should render the Sidebar component', () => {
    const { getByText } = renderSidebar();
    expect(getByText('Ricardo Campos')).toBeDefined();
    expect(getByText('Main Menu')).toBeDefined();
    expect(getByText('Preferences')).toBeDefined();
  });

  it('should call signOut when logout is clicked', () => {
    const { getByText } = renderSidebar();
    fireEvent.click(getByText('Logout'));
    expect(authContextMock.signOut).toHaveBeenCalled();
  });

  it('should highlight the selected menu item', () => {
    const { getByText } = renderSidebar();
    fireEvent.click(getByText('Dashboard'));
    const dashboardElement = getByText('Dashboard').closest('.sidebar-nav');
    expect(dashboardElement).not.toBeNull();
    expect(dashboardElement!.classList.contains('selected')).toBe(true);
  });
});
