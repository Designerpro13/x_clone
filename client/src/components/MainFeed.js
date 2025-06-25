import React, { useState, useEffect } from 'react';
import Header from './Header';
import TweetForm from './TweetForm';
import Tweet from './Tweet';

const MainFeed = ({ currentUser }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tweets');
      const data = await response.json();
      setTweets(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tweets:', error);
      setLoading(false);
    }
  };

  const handleNewTweet = async (tweetData) => {
    try {
      const response = await fetch('http://localhost:5000/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...tweetData,
          userId: currentUser.id
        })
      });
      
      if (response.ok) {
        const newTweet = await response.json();
        setTweets(prevTweets => [newTweet, ...prevTweets]);
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tweets/${tweetId}/like`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const updatedTweet = await response.json();
        setTweets(prevTweets => 
          prevTweets.map(tweet => 
            tweet.id === tweetId ? updatedTweet : tweet
          )
        );
      }
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  };

  const handleRetweet = async (tweetId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tweets/${tweetId}/retweet`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const updatedTweet = await response.json();
        setTweets(prevTweets => 
          prevTweets.map(tweet => 
            tweet.id === tweetId ? updatedTweet : tweet
          )
        );
      }
    } catch (error) {
      console.error('Error retweeting:', error);
    }
  };

  if (loading) {
    return (
      <main className="main-feed">
        <Header />
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading tweets...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-feed">
      <Header />
      
      <TweetForm 
        currentUser={currentUser} 
        onTweetSubmit={handleNewTweet}
      />
      
      <div className="feed-divider"></div>
      
      <div className="tweets-container">
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweet={tweet}
              onLike={handleLike}
              onRetweet={handleRetweet}
            />
          ))
        ) : (
          <div className="empty-feed">
            <h3>No tweets yet</h3>
            <p>Be the first to share something!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainFeed;
