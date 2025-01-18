import React, { useContext, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../context/AuthContext';
import UserIcon from '../../assets/user.png';
import './style.css';

function Sidebar(): React.ReactNode {
  const { signOut } = useContext(AuthContext);
  const { t } = useTranslation();
  const build = import.meta.env.VITE_BUILD;
  const [current, setCurrent] = useState<string>('Dashboard');
  const location = useLocation();

  const goOut = () => {
    signOut();
  };

  const getSelectedColor = (): string => {
    console.log('location', location.pathname);
    if (location.pathname === current) {
      return '#4CD964';
    }
    return '#6A8996';
  };

  const navLinkClicked = (menu: string): void => {
    console.log('menu', menu);
    setCurrent(menu);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light sidebar">
      <div className="sidebar-header plus-jakarta-sans-bold">
        <img width="45" src={UserIcon} alt="User icon" />
        <span>Xerife Ricky</span>
      </div>
      <div className="header-spacer"></div>
      <div className="sidebar-menu-header plus-jakarta-sans-regular">Main Menu</div>
      <Nav className="flex-column p-3 plus-jakarta-sans-bold">
        <NavLink to="/home" className="mb-2" onClick={() => navLinkClicked('/home')}>
          <div className="sidebar-nav">
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M14.056 0.966675H17.4373C18.8376 0.966675 19.9723 2.23093 19.9723 3.79117V7.55857C19.9723 9.1188 18.8376 10.3831 17.4373 10.3831H14.056C12.6557 10.3831 11.521 9.1188 11.521 7.55857V3.79117C11.521 2.23093 12.6557 0.966675 14.056 0.966675Z" fill={getSelectedColor()} />
              <path d="M5.91626 13.617C7.31658 13.617 8.45126 14.8812 8.45126 16.4414V20.2088C8.45126 21.768 7.31658 23.0333 5.91626 23.0333H2.535C1.13468 23.0333 0 21.768 0 20.2088V16.4414C0 14.8812 1.13468 13.617 2.535 13.617H5.91626ZM17.4372 13.617C18.8375 13.617 19.9722 14.8812 19.9722 16.4414V20.2088C19.9722 21.768 18.8375 23.0333 17.4372 23.0333H14.056C12.6556 23.0333 11.521 21.768 11.521 20.2088V16.4414C11.521 14.8812 12.6556 13.617 14.056 13.617H17.4372ZM5.91626 0.966675C7.31658 0.966675 8.45126 2.23093 8.45126 3.79117V7.55857C8.45126 9.1188 7.31658 10.3831 5.91626 10.3831H2.535C1.13468 10.3831 0 9.1188 0 7.55857V3.79117C0 2.23093 1.13468 0.966675 2.535 0.966675H5.91626Z" fill={getSelectedColor()} />
            </svg>
            Dashboard
          </div>
        </NavLink>
        <NavLink to="/tasks" className="mb-2" onClick={() => navLinkClicked('/tasks')}>
          <div className="sidebar-nav">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3333 7.56248V16.5C18.3333 19.25 16.6925 20.1666 14.6666 20.1666H7.33329C5.30746 20.1666 3.66663 19.25 3.66663 16.5V7.56248C3.66663 4.58331 5.30746 3.89581 7.33329 3.89581C7.33329 4.46415 7.56243 4.97748 7.93827 5.35331C8.3141 5.72914 8.82746 5.95831 9.39579 5.95831H12.6041C13.7408 5.95831 14.6666 5.03248 14.6666 3.89581C16.6925 3.89581 18.3333 4.58331 18.3333 7.56248Z" stroke={getSelectedColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.6667 3.89581C14.6667 5.03248 13.7409 5.95831 12.6042 5.95831H9.39587C8.82754 5.95831 8.31418 5.72914 7.93835 5.35331C7.56252 4.97748 7.33337 4.46415 7.33337 3.89581C7.33337 2.75915 8.25921 1.83331 9.39587 1.83331H12.6042C13.1725 1.83331 13.6859 2.06248 14.0617 2.43832C14.4376 2.81415 14.6667 3.32748 14.6667 3.89581Z" stroke={getSelectedColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.33337 11.9167H11" stroke={getSelectedColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.33337 15.5833H14.6667" stroke={getSelectedColor()} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('home_nav_tasks')}
          </div>
        </NavLink>
        <NavLink to="/notes" className="mb-2">
          <div className="sidebar-nav">{t('home_nav_notes')}</div>
        </NavLink>

        <h5>Preferences</h5>
        <NavLink to="/account" className="mb-2">
          <div className="sidebar-nav">{t('footer_my_account')}</div>
        </NavLink>
        <NavLink to="/about" className="mb-2">
          <div className="sidebar-nav">{t('home_nav_about')}</div>
        </NavLink>
        <Button
          type="button"
          variant="link"
          onClick={() => goOut()}
          className=""
        >
          {t('logout')}
        </Button>
      </Nav>

      {/* Footer at the bottom */}
      <div
        className="mt-auto text-center text-muted py-3"
        style={{ borderTop: '1px solid #ddd' }}
      >
        <small data-testid="footer-text">
          {build}
        </small>
      </div>
    </div>
  );
}

export default Sidebar;
