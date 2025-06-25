# Twitter Clone

A full-stack Twitter clone built with Express.js, React, and Node.js featuring Unsplash images and Indian names.

## Features

- 📱 Tweet posting and viewing
- 👤 User profiles with Indian names
- 🖼️ Beautiful images from Unsplash
- ❤️ Like and retweet functionality
- 🕒 Real-time timeline
- 📱 Responsive design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React, CSS3
- **Images**: Unsplash API
- **Data**: In-memory storage (for demo purposes)

## Installation

1. Clone the repository
2. Install dependencies for both server and client:
   ```bash
   npm run install-all
   ```

3. Start the development servers:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
twitter-clone/
├── server/          # Express.js backend
│   ├── index.js     # Server entry point
│   ├── routes/      # API routes
│   └── data/        # Mock data
├── client/          # React frontend
│   ├── src/         # React source code
│   ├── public/      # Static files
│   └── package.json
└── package.json     # Root package.json
```

## API Endpoints

- `GET /api/tweets` - Get all tweets
- `POST /api/tweets` - Create a new tweet
- `POST /api/tweets/:id/like` - Like/unlike a tweet
- `POST /api/tweets/:id/retweet` - Retweet a tweet
- `GET /api/users` - Get all users

## Contributing

Feel free to submit issues and enhancement requests!
