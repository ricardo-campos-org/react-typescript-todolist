import React, { useContext } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../context/AuthContext';
import './style.css';

function Sidebar(): JSX.Element {
  const { signOut } = useContext(AuthContext);
  const { t } = useTranslation();
  const build = import.meta.env.VITE_BUILD;

  const goOut = () => {
    signOut();
  };

  return (
    <div
      className="d-flex flex-column vh-100 bg-light"
      style={{
        width: '250px',
        position: 'fixed',
        left: 0,
        top: 0,
        borderRight: '1px solid #ddd'
      }}
    >
      <div className="p-3 border-bottom">
        <h5>TaskNote</h5>
      </div>
      <Nav className="flex-column p-3">
        <h5>Main menu</h5>
        <NavLink to="/home" className="mb-2">
          <div className="sidebar-nav">{t('home_nav_home')}</div>
        </NavLink>
        <NavLink to="/tasks" className="mb-2">
          <div className="sidebar-nav">{t('home_nav_tasks')}</div>
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
