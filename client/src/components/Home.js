import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tweetService } from '../services/api';
import TweetCard from './TweetCard';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const response = await tweetService.getAllTweets();
      setTweets(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tweets');
      console.error('Error fetching tweets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTweetUpdate = (updatedTweet) => {
    setTweets(tweets.map(tweet => 
      tweet.id === updatedTweet.id ? updatedTweet : tweet
    ));
  };

  const handleTweetDelete = (deletedTweetId) => {
    setTweets(tweets.filter(tweet => tweet.id !== deletedTweetId));
  };

  if (loading) {
    return <div className="loading">Loading tweets...</div>;
  }

  if (error) {
    return (
      <div className="content-section">
        <div className="error">{error}</div>
        <button onClick={fetchTweets} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Latest Tweets</h1>
        <Link to="/create-tweet" className="btn btn-primary">
          Create Tweet
        </Link>
      </div>
      
      {tweets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No tweets yet. Be the first to tweet!</p>
          <Link to="/create-tweet" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Create First Tweet
          </Link>
        </div>
      ) : (
        <div className="tweets-list">
          {tweets.map(tweet => (
            <TweetCard 
              key={tweet.id} 
              tweet={tweet} 
              onUpdate={handleTweetUpdate}
              onDelete={handleTweetDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
