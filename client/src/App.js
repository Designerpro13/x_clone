import React, { useState, useEffect } from 'react';
import './styles.css';
import LeftSidebar from './components/LeftSidebar';
import MainFeed from './components/MainFeed';
import RightSidebar from './components/RightSidebar';
import UserProfile from './components/UserProfile';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Set default user (Priya Sharma) as logged in user
    setCurrentUser({
      id: '1',
      name: 'Priya Sharma',
      username: 'priya_sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Software Engineer | Love coding and chai ☕',
      following: 234,
      followers: 1876
    });
  }, []);

  const handleNavigation = (view) => {
    setCurrentView(view.toLowerCase());
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'profile':
        return <UserProfile user={currentUser} />;
      case 'home':
      default:
        return <MainFeed currentUser={currentUser} />;
    }
  };

  if (!currentUser) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="main-container">
        <LeftSidebar 
          currentUser={currentUser} 
          onNavigate={handleNavigation}
        />
        
        <div className="content-wrapper">
          {renderMainContent()}
        </div>
        
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
