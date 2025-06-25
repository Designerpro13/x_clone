# Twitter Clone - Full Stack CRUD Application

A complete Twitter clone built with **Express.js**, **React**, and **Node.js** featuring comprehensive CRUD operations, beautiful UI with Unsplash images, and Indian names for a cultural touch.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### One-Command Installation

```bash
cd u:\Project_files\x_clone
npm run install-all
```

This will install dependencies for:
- Root project
- Server (Express.js backend)
- Client (React frontend)

### Manual Installation (Alternative)

1. **Install root dependencies:**
```bash
cd u:\Project_files\x_clone
npm install
```

2. **Install server dependencies:**
```bash
cd server
npm install
```

3. **Install client dependencies:**
```bash
cd ../client
npm install
```

### Running the Application

#### Option 1: Run Both (Recommended)
```bash
cd u:\Project_files\x_clone
npm run dev
```
This starts both backend and frontend simultaneously.

#### Option 2: Run Separately

1. **Start the backend server:**
```bash
cd u:\Project_files\x_clone
npm run server
```
   - Server runs on: http://localhost:5000

2. **Start the React frontend (in a new terminal):**
```bash
cd u:\Project_files\x_clone
npm run client
```
   - Frontend runs on: http://localhost:3000

## 🎯 Complete Setup Commands

```bash
# Navigate to project
cd u:\Project_files\x_clone

# Install all dependencies
npm run install-all

# Start both servers
npm run dev

# Open browser to http://localhost:3000
```

## 📱 Features

### ✨ Complete CRUD Operations
- **CREATE**: New tweets and users
- **READ**: View all tweets, search functionality
- **UPDATE**: Edit tweets and user profiles
- **DELETE**: Remove tweets and users

### 🎨 User Interface
- **Modern Design**: Clean, Twitter-like interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Sidebar Navigation**: Easy access to all features
- **Real-time Updates**: Instant UI updates after actions

### 🔍 Advanced Features
- **Search Functionality**: Search tweets and users in real-time
- **Image Support**: Unsplash integration for beautiful images
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: Smooth loading animations
- **Indian Names**: Culturally diverse user names and content

## 🏗️ Project Structure

```
x_clone/
├── package.json           # Root package with scripts
├── server/                # Express.js Backend
│   ├── index.js          # Server entry point
│   └── package.json      # Server dependencies
├── client/               # React Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API service layer
│   │   └── styles.css    # Global styles
│   ├── public/
│   └── package.json      # Client dependencies
└── RUN_INSTRUCTIONS.md   # This file
```

## 🛠️ API Endpoints

### Tweet Operations
- `GET /api/tweets` - Get all tweets
- `GET /api/tweets/:id` - Get single tweet
- `POST /api/tweets` - Create new tweet
- `PUT /api/tweets/:id` - Update tweet
- `DELETE /api/tweets/:id` - Delete tweet

### User Operations
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🎯 Demo Features

### Pre-loaded Content
- Sample tweets with Indian names (Priya, Arjun, Kavya, Rohit, Ananya)
- Beautiful Unsplash images
- Realistic tweet interactions (likes, retweets)

### Ready-to-Demo Operations
1. **View Timeline**: See all tweets on the home page
2. **Create Tweet**: Use quick form or full editor
3. **Edit Tweet**: Click edit button on any tweet
4. **Delete Tweet**: Remove tweets with confirmation
5. **User Management**: Full CRUD for users
6. **Search**: Real-time search across tweets and users

## 💡 Key Features for Demo

1. **Instant CRUD**: All operations work immediately without database setup
2. **Beautiful UI**: Professional Twitter-like design
3. **Responsive**: Works perfectly on any device
4. **Real-time**: Immediate UI updates
5. **Error Handling**: Graceful error management
6. **Search**: Live search functionality
7. **Cultural Touch**: Indian names and content

## 🔧 Development Commands

```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Start production build
npm start
```

## 📝 Troubleshooting

If you encounter issues:

1. **Port conflicts**: Make sure ports 3000 and 5000 are free
2. **Dependencies**: Run `npm run install-all` again
3. **Clear cache**: Delete node_modules and run install again
4. **Browser cache**: Hard refresh (Ctrl+F5) the browser

---

**Perfect for**: Portfolio demonstrations, coding interviews, learning full-stack development, React/Express.js tutorials

**Demo ready in 3 commands**: `cd project` → `npm run install-all` → `npm run dev`
