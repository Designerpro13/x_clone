import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tweetService } from '../services/api';

const EditTweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: '',
    image: ''
  });
  const [originalTweet, setOriginalTweet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTweet();
  }, [id]);

  const fetchTweet = async () => {
    try {
      setFetchLoading(true);
      const response = await tweetService.getTweetById(id);
      const tweet = response.data;
      setOriginalTweet(tweet);
      setFormData({
        content: tweet.content,
        image: tweet.image || ''
      });
    } catch (error) {
      setError('Failed to fetch tweet details');
      console.error('Error fetching tweet:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      setError('Tweet content cannot be empty');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await tweetService.updateTweet(id, {
        content: formData.content.trim(),
        image: formData.image.trim() || null
      });
      
      setSuccess('Tweet updated successfully!');
      
      // Redirect to home after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      setError('Failed to update tweet. Please try again.');
      console.error('Error updating tweet:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomUnsplashImage = () => {
    const categories = ['nature', 'technology', 'food', 'travel', 'abstract', 'people'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomId = Math.floor(Math.random() * 1000);
    return `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=300&fit=crop&q=80&random=${randomId}&sig=${randomCategory}`;
  };

  if (fetchLoading) {
    return <div className="loading">Loading tweet...</div>;
  }

  if (!originalTweet) {
    return (
      <div className="content-section">
        <div className="error">Tweet not found</div>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="form-container">
        <h1>Edit Tweet</h1>
        
        {/* Original Tweet Preview */}
        <div className="tweet-card" style={{ marginBottom: '2rem', backgroundColor: '#f8f9fa' }}>
          <div className="tweet-header">
            <img src={originalTweet.user.avatar} alt={originalTweet.user.name} className="avatar" />
            <div className="user-info">
              <h4>{originalTweet.user.name}</h4>
              <span>@{originalTweet.user.username}</span>
            </div>
          </div>
          <div className="tweet-content">
            <p><strong>Original:</strong> {originalTweet.content}</p>
            {originalTweet.image && (
              <img src={originalTweet.image} alt="Original tweet" className="tweet-image" />
            )}
          </div>
        </div>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="content">Tweet Content:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="form-input form-textarea"
              placeholder="What's happening?"
              maxLength={280}
              required
            />
            <small style={{ color: '#657786', float: 'right' }}>
              {formData.content.length}/280 characters
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL (optional):</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, image: getRandomUnsplashImage() }))}
                className="btn btn-secondary btn-small"
              >
                Add Random Image
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                className="btn btn-secondary btn-small"
              >
                Remove Image
              </button>
            </div>
          </div>

          {formData.image && (
            <div className="form-group">
              <label>Image Preview:</label>
              <img 
                src={formData.image} 
                alt="Preview" 
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  setFormData(prev => ({ ...prev, image: '' }));
                  setError('Invalid image URL');
                }}
              />
            </div>
          )}

          <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Tweet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTweet;
