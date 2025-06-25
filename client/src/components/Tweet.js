import React, { useState } from 'react';

const Tweet = ({ tweet, onLike, onRetweet }) => {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const formatTime = (timestamp) => {
    const now = new Date();
    const tweetTime = new Date(timestamp);
    const diffMs = now - tweetTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d`;
    } else if (diffHours > 0) {
      return `${diffHours}h`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes > 0 ? `${diffMinutes}m` : 'now';
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike(tweet.id);
  };

  const handleRetweet = () => {
    setRetweeted(!retweeted);
    onRetweet(tweet.id);
  };

  return (
    <article className="tweet">
      <div className="tweet-header">
        <img
          src={tweet.user.avatar}
          alt={tweet.user.name}
          className="user-avatar"
        />
        <div className="tweet-content">
          <div className="tweet-user-info">
            <span className="tweet-user-name">{tweet.user.name}</span>
            <span className="tweet-username">@{tweet.user.username}</span>
            <span className="tweet-timestamp">·</span>
            <span className="tweet-timestamp">{formatTime(tweet.timestamp)}</span>
          </div>
          
          <div className="tweet-text">
            {tweet.content}
          </div>
          
          {tweet.image && (
            <img
              src={tweet.image}
              alt="Tweet attachment"
              className="tweet-image"
            />
          )}
          
          <div className="tweet-actions">
            <button className="tweet-action" title="Reply">
              <i className="fas fa-comment"></i>
              <span>{tweet.replies}</span>
            </button>
            
            <button 
              className={`tweet-action ${retweeted ? 'retweeted' : ''}`}
              onClick={handleRetweet}
              title="Retweet"
            >
              <i className="fas fa-retweet"></i>
              <span>{tweet.retweets}</span>
            </button>
            
            <button 
              className={`tweet-action ${liked ? 'liked' : ''}`}
              onClick={handleLike}
              title="Like"
            >
              <i className={liked ? 'fas fa-heart' : 'far fa-heart'}></i>
              <span>{tweet.likes}</span>
            </button>
            
            <button className="tweet-action" title="Share">
              <i className="fas fa-share"></i>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
