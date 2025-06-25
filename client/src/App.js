import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import CreateTweet from './components/CreateTweet';
import EditTweet from './components/EditTweet';
import UserManagement from './components/UserManagement';
import ErrorBoundary from './components/ErrorBoundary';
import './styles.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Navbar />
          <div className="app-layout">
            <Sidebar />
            <div className="main-content-with-sidebars">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-tweet" element={<CreateTweet />} />
                <Route path="/edit-tweet/:id" element={<EditTweet />} />
                <Route path="/profile/:userId" element={<UserProfile />} />
                <Route path="/users" element={<UserManagement />} />
              </Routes>
            </div>
            <RightSidebar />
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
