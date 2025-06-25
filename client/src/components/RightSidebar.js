import React from 'react';

const RightSidebar = () => {
  const trendingTopics = [
    {
      category: 'Trending in India',
      title: '#ReactJS',
      posts: '45.2K Tweets'
    },
    {
      category: 'Trending in Technology',
      title: '#NodeJS',
      posts: '32.1K Tweets'
    },
    {
      category: 'Trending in India',
      title: '#WebDevelopment',
      posts: '28.5K Tweets'
    },
    {
      category: 'Trending',
      title: '#JavaScript',
      posts: '67.8K Tweets'
    }
  ];

  const suggestedUsers = [
    {
      id: '6',
      name: 'Vikram Gupta',
      username: 'vikram_gupta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '7',
      name: 'Meera Joshi',
      username: 'meera_joshi',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '8',
      name: 'Siddharth Rao',
      username: 'siddharth_rao',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <aside className="right-sidebar">
      <div className="trending-section">
        <div className="section-header">
          What's happening
        </div>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="trending-item">
            <div className="trending-category">{topic.category}</div>
            <div className="trending-title">{topic.title}</div>
            <div className="trending-posts">{topic.posts}</div>
          </div>
        ))}
      </div>

      <div className="suggestions-section">
        <div className="section-header">
          Who to follow
        </div>
        {suggestedUsers.map((user) => (
          <div key={user.id} className="suggestion-item">
            <img
              src={user.avatar}
              alt={user.name}
              className="suggestion-avatar"
            />
            <div className="suggestion-info">
              <div className="suggestion-name">{user.name}</div>
              <div className="suggestion-username">@{user.username}</div>
            </div>
            <button className="follow-button">Follow</button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
