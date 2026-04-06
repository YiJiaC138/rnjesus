import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>RNJesus</h2>
      </div>
      <ul className="sidebar-links">
        <li>
          <NavLink 
            to="/" 
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
