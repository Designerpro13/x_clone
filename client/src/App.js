import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import CreateTweet from './components/CreateTweet';
import EditTweet from './components/EditTweet';
import UserManagement from './components/UserManagement';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-tweet" element={<CreateTweet />} />
            <Route path="/edit-tweet/:id" element={<EditTweet />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
