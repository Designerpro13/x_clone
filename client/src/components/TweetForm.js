import React, { useState } from 'react';
import api from '../services/api';

const TweetForm = ({ onTweetSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default user (in a real app, this would come from authentication)
  const currentUser = {
    id: '1',
    name: 'Priya Sharma',
    username: 'priya_sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const response = await api.post('/tweets', {
        userId: currentUser.id,
        content: content.trim()
      });
      
      onTweetSubmit(response.data);
      setContent('');
    } catch (error) {
      console.error('Error posting tweet:', error);
      alert('Failed to post tweet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div className="tweet-form">
      <form onSubmit={handleSubmit}>
        <div className="tweet-input-container">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="user-avatar"
          />
          <div className="tweet-input-area">
            <textarea
              className="tweet-textarea"
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={280}
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="tweet-form-footer">
          <div className="tweet-options">
            <button type="button" className="tweet-option" title="Add image">
              <i className="fas fa-image"></i>
            </button>
            <button type="button" className="tweet-option" title="Add GIF">
              <i className="fas fa-file-image"></i>
            </button>
            <button type="button" className="tweet-option" title="Add poll">
              <i className="fas fa-poll"></i>
            </button>
            <button type="button" className="tweet-option" title="Add emoji">
              <i className="fas fa-smile"></i>
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span className={`character-count ${content.length > 250 ? 'warning' : ''}`}>
              {280 - content.length}
            </span>
            <button
              type="submit"
              className="tweet-submit"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? 'Tweeting...' : 'Tweet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
