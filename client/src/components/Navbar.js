import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          🐦 TwitterClone
        </Link>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/create-tweet" 
              className={location.pathname === '/create-tweet' ? 'active' : ''}
            >
              Tweet
            </Link>
          </li>
          <li>
            <Link 
              to="/users" 
              className={location.pathname === '/users' ? 'active' : ''}
            >
              Users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
