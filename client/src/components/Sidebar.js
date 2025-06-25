import React from 'react';

const Sidebar = () => {
  const navItems = [
    { icon: 'fas fa-home', label: 'Home', active: true },
    { icon: 'fas fa-hashtag', label: 'Explore' },
    { icon: 'fas fa-bell', label: 'Notifications' },
    { icon: 'fas fa-envelope', label: 'Messages' },
    { icon: 'fas fa-bookmark', label: 'Bookmarks' },
    { icon: 'fas fa-user', label: 'Profile' },
    { icon: 'fas fa-ellipsis-h', label: 'More' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fab fa-twitter"></i> Twitter
      </div>
      
      <nav>
        <ul className="nav-menu">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a href="#" className="nav-link">
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <button className="tweet-button">
        Tweet
      </button>
    </aside>
  );
};

export default Sidebar;
