const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data with Indian names and Unsplash images
const users = [
  {
    id: '1',
    name: 'Priya Sharma',
    username: 'priya_sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Software Engineer | Love coding and chai ☕',
    following: 234,
    followers: 1876
  },
  {
    id: '2',
    name: 'Arjun Patel',
    username: 'arjun_patel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Product Manager | Cricket enthusiast 🏏',
    following: 567,
    followers: 2345
  },
  {
    id: '3',
    name: 'Kavya Reddy',
    username: 'kavya_reddy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Designer | Art lover | Traveler ✈️',
    following: 890,
    followers: 3421
  },
  {
    id: '4',
    name: 'Rohit Kumar',
    username: 'rohit_kumar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Entrepreneur | Tech enthusiast | Coffee addict',
    following: 445,
    followers: 1987
  },
  {
    id: '5',
    name: 'Ananya Singh',
    username: 'ananya_singh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Data Scientist | ML enthusiast | Bookworm 📚',
    following: 322,
    followers: 2789
  }
];

let tweets = [
  {
    id: '1',
    userId: '1',
    content: 'Just finished an amazing coding session! Building something exciting with React and Node.js 🚀 #coding #webdev',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    retweets: 8,
    replies: 3,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop'
  },
  {
    id: '2',
    userId: '2',
    content: 'What a match! India vs Australia was absolutely thrilling. That last over had me on the edge of my seat! 🏏🔥',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 156,
    retweets: 45,
    replies: 23,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=300&fit=crop'
  },
  {
    id: '3',
    userId: '3',
    content: 'Exploring the beautiful streets of Jaipur today. The architecture here is absolutely breathtaking! 🏰✨ #travel #jaipur',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 89,
    retweets: 22,
    replies: 11,
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0ad8b2f?w=500&h=300&fit=crop'
  },
  {
    id: '4',
    userId: '4',
    content: 'Just launched our new startup! Excited to revolutionize the way people connect and share ideas. The journey begins now! 💡🚀',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 234,
    retweets: 67,
    replies: 34,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop'
  },
  {
    id: '5',
    userId: '5',
    content: 'Working on some fascinating machine learning models today. The possibilities with AI are truly endless! 🤖📊 #machinelearning #ai',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    likes: 178,
    retweets: 55,
    replies: 18,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500&h=300&fit=crop'
  },
  {
    id: '6',
    userId: '1',
    content: 'Morning chai and code - the perfect combination to start any day! ☕💻 What\'s your favorite way to begin the morning?',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    likes: 67,
    retweets: 15,
    replies: 28,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=300&fit=crop'
  }
];

// Helper function to get user by ID
const getUserById = (id) => users.find(user => user.id === id);

// Routes

// Get all tweets with user information
app.get('/api/tweets', (req, res) => {
  const tweetsWithUsers = tweets.map(tweet => ({
    ...tweet,
    user: getUserById(tweet.userId)
  })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  res.json(tweetsWithUsers);
});

// Create a new tweet
app.post('/api/tweets', (req, res) => {
  const { userId, content, image } = req.body;
  
  if (!userId || !content) {
    return res.status(400).json({ error: 'User ID and content are required' });
  }
  
  const newTweet = {
    id: uuidv4(),
    userId,
    content,
    timestamp: new Date(),
    likes: 0,
    retweets: 0,
    replies: 0,
    image: image || null
  };
  
  tweets.unshift(newTweet);
  
  const tweetWithUser = {
    ...newTweet,
    user: getUserById(userId)
  };
  
  res.status(201).json(tweetWithUser);
});

// Like/unlike a tweet
app.post('/api/tweets/:id/like', (req, res) => {
  const tweetId = req.params.id;
  const tweet = tweets.find(t => t.id === tweetId);
  
  if (!tweet) {
    return res.status(404).json({ error: 'Tweet not found' });
  }
  
  // For simplicity, we'll just increment likes
  tweet.likes += 1;
  
  const tweetWithUser = {
    ...tweet,
    user: getUserById(tweet.userId)
  };
  
  res.json(tweetWithUser);
});

// Retweet a tweet
app.post('/api/tweets/:id/retweet', (req, res) => {
  const tweetId = req.params.id;
  const tweet = tweets.find(t => t.id === tweetId);
  
  if (!tweet) {
    return res.status(404).json({ error: 'Tweet not found' });
  }
  
  tweet.retweets += 1;
  
  const tweetWithUser = {
    ...tweet,
    user: getUserById(tweet.userId)
  };
  
  res.json(tweetWithUser);
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
