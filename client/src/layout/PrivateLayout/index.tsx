import React from 'react';
import { Outlet } from 'react-router';
import './style.css';
import Sidebar from '../../components/Sidebar';

/**
 * PrivateLayout component.
 *
 * This component provides the layout of the application,
 * including the outlet responsible for the main content.
 * It also includes the header and the footer.
 *
 * @returns {JSX.Element} The Layout component.
 */
function PrivateLayout(): JSX.Element {
  return (
    <div className="page-container">
      <Sidebar />
      <div
        className="content"
        style={{
          marginLeft: '250px', // Matches sidebar width
          padding: '20px'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default PrivateLayout;
