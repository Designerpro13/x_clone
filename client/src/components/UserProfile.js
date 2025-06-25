import React from 'react';

const UserProfile = ({ user }) => {
  if (!user) {
    return (
      <div className="user-profile">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-cover">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=200&fit=crop"
            alt="Cover"
            className="cover-image"
          />
        </div>
        <div className="profile-info">
          <div className="avatar-section">
            <img
              src={user.avatar}
              alt={user.name}
              className="profile-avatar"
            />
            <button className="edit-profile-btn">Edit profile</button>
          </div>
          <div className="user-details">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-username">@{user.username}</p>
            <p className="profile-bio">{user.bio}</p>
            <div className="profile-stats">
              <span className="stat">
                <strong>{user.following}</strong> Following
              </span>
              <span className="stat">
                <strong>{user.followers}</strong> Followers
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button className="tab-item active">Tweets</button>
        <button className="tab-item">Tweets & replies</button>
        <button className="tab-item">Media</button>
        <button className="tab-item">Likes</button>
      </div>
    </div>
  );
};

export default UserProfile;
