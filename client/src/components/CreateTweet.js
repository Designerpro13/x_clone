import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tweetService, userService } from '../services/api';

const CreateTweet = () => {
  const [formData, setFormData] = useState({
    userId: '',
    content: '',
    image: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
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
    
    if (!formData.userId || !formData.content.trim()) {
      setError('Please select a user and enter tweet content');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await tweetService.createTweet({
        userId: formData.userId,
        content: formData.content.trim(),
        image: formData.image.trim() || null
      });
      
      setSuccess('Tweet created successfully!');
      
      // Reset form
      setFormData({
        userId: '',
        content: '',
        image: ''
      });
      
      // Redirect to home after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      setError('Failed to create tweet. Please try again.');
      console.error('Error creating tweet:', error);
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

  return (
    <div className="content-section">
      <div className="form-container">
        <h1>Create New Tweet</h1>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">Select User:</label>
            <select
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Choose a user...</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} (@{user.username})
                </option>
              ))}
            </select>
          </div>

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
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, image: getRandomUnsplashImage() }))}
              className="btn btn-secondary btn-small"
              style={{ marginTop: '0.5rem' }}
            >
              Add Random Image
            </button>
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

          <div className="form-group">
            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Creating Tweet...' : 'Create Tweet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTweet;
