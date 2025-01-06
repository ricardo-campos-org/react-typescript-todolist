import React, { useContext } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../context/AuthContext';
import UserIcon from '../../assets/user.png';
import DashboardIcon from '../../assets/dashboard.png';
import TaskIcon from '../../assets/task.png';
import './style.css';

function Sidebar(): JSX.Element {
  const { signOut } = useContext(AuthContext);
  const { t } = useTranslation();
  const build = import.meta.env.VITE_BUILD;

  const goOut = () => {
    signOut();
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
        <NavLink to="/home" className="mb-2">
          <div className="sidebar-nav">
            <img width="20" src={DashboardIcon} alt="Dashboard" />
            Dashboard
          </div>
        </NavLink>
        <NavLink to="/tasks" className="mb-2">
          <div className="sidebar-nav">
            <img width="20" src={TaskIcon} alt="Dashboard" />
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
