import { NavLink, Link } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <h2>RNJesus</h2>
        </Link>
      </div>
      <ul className="sidebar-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/roller" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Roller
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/tool-1" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Tool 1
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/tool-2" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Tool 2
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
