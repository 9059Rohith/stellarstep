# 🚀 StellarStep - Complete Setup Guide

## Important Firebase Configuration

**CRITICAL**: Before running the application, you MUST set up Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Email/Password** authentication
4. Get your Firebase config from Project Settings
5. Update `client/.env` with your Firebase credentials

## Quick Start Guide

### Step 1: Install Server Dependencies

```powershell
cd server
npm install
```

### Step 2: Install Client Dependencies

```powershell
cd ../client
npm install
```

### Step 3: Configure Environment Variables

**Server** (server/.env) - Already configured:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
GROQ_API_KEY=your_groq_api_key_here
JWT_SECRET=your_jwt_secret_here
```

**Client** (client/.env) - YOU NEED TO UPDATE THIS:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_firebase_app_id_here
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Run the Application

Open TWO PowerShell terminals:

**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```

The app will open at: http://localhost:5173

## 📦 What's Included

### Backend Features (Node.js + Express)
- ✅ MongoDB connection with Mongoose
- ✅ User authentication sync with Firebase
- ✅ Task management (CRUD operations)
- ✅ Progress tracking system
- ✅ Activity logging for parents
- ✅ Groq AI integration for:
  - Positive reinforcement messages
  - Simplified space facts
  - Educational content

### Frontend Features (React + Vite)
- ✅ **Landing Page** - Beautiful animated welcome screen
- ✅ **Login/Signup** - Firebase authentication with avatar selection
- ✅ **Dashboard** - Central mission control hub
- ✅ **Daily Mission** - Task management with planet theme
- ✅ **Sensory Nebula** - Calming interactive canvas animation
- ✅ **Planet Matcher** - Color matching game
- ✅ **Alien Emotions** - Learn/quiz mode for emotions
- ✅ **Space School** - AI-powered educational content
- ✅ **Parent Settings** - Password-protected activity monitoring

### Design Features
- 🎨 Tailwind CSS with custom space theme
- ✨ Framer Motion smooth animations
- 🌌 Fully responsive design
- ♿ High-contrast, neuro-inclusive UI
- 🎯 Consistent space theme throughout

## 🔧 Troubleshooting

### Firebase Authentication Not Working
1. Verify Firebase config in client/.env
2. Enable Email/Password auth in Firebase Console
3. Check browser console for specific errors

### MongoDB Connection Error
- The URI is already configured
- Check your internet connection
- Ensure MongoDB Atlas allows connections from your IP

### Groq API Not Responding
- API key is already configured
- Check rate limits if making many requests
- Verify internet connection

### Port Already in Use
- Backend: Change PORT in server/.env
- Frontend: Change port in client/vite.config.js

## 📁 Project Structure

```
labeval_01/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # AuthContext for Firebase
│   │   ├── pages/          # All 10 pages
│   │   ├── App.jsx         # Main app with routing
│   │   ├── firebase.js     # Firebase configuration
│   │   └── index.css       # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── .env               # Firebase config (UPDATE THIS!)
│
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Progress.js
│   │   └── ActivityLog.js
│   ├── routes/            # API routes
│   │   ├── ai.js          # Groq AI endpoints
│   │   ├── user.js        # User management
│   │   ├── task.js        # Task CRUD
│   │   └── progress.js    # Progress tracking
│   ├── server.js          # Main server file
│   ├── package.json
│   └── .env              # Already configured
│
├── .gitignore
└── README.md
```

## 🎯 Features Checklist

- [x] MongoDB Atlas integration
- [x] Firebase Authentication
- [x] Groq AI for positive reinforcement
- [x] AI-powered educational content
- [x] 10 complete pages with space theme
- [x] Task management system
- [x] Progress tracking & badges
- [x] Interactive games
- [x] Parent monitoring dashboard
- [x] Responsive design
- [x] Smooth animations
- [x] Clean Code principles

## 🚀 Deployment Ready

This application is ready for deployment to:
- **Frontend**: Vercel, Netlify, or Firebase Hosting
- **Backend**: Heroku, Railway, or Render
- **Database**: Already on MongoDB Atlas

## 📝 Submission Notes

### For GitHub:
- All code is production-ready
- .gitignore properly configured
- Clean commit history
- Professional README

### For OneDrive (Include):
- Complete source code
- .env files with actual credentials
- Project report (separate document)
- Screenshots/demo video

## 🎓 Academic Notes

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- State management with React Context
- AI integration (Groq)
- Authentication (Firebase)
- Responsive UI/UX
- Accessibility considerations
- Clean Code principles
- Git workflow

## 👨‍💻 Tech Stack

**Frontend:**
- React 18.2
- Vite 5.0
- Tailwind CSS 3.3
- Framer Motion 10.16
- React Router 6.20
- Axios
- Firebase Auth

**Backend:**
- Node.js
- Express 4.18
- MongoDB & Mongoose 8.0
- Groq AI API
- JWT & bcrypt

## 🌟 Key Features for Autism Support

1. **High Contrast**: Easy-to-read text and buttons
2. **Predictable Navigation**: Consistent layout
3. **Visual Schedules**: Daily Mission page
4. **Calming Tools**: Sensory Nebula
5. **Simple Language**: AI simplifies content
6. **Positive Reinforcement**: AI-generated encouragement
7. **Clear Feedback**: Immediate responses
8. **Structured Activities**: Step-by-step games

## ⚡ Performance Tips

- Lazy load images for faster initial load
- Use React.memo for expensive components
- Implement pagination for activity logs
- Cache AI responses when appropriate
- Optimize Framer Motion animations

## 🔐 Security Notes

- Never commit .env files
- Firebase keys are client-safe (with domain restrictions)
- Implement rate limiting in production
- Add CORS configuration for production
- Use environment-specific configs

---

**Built with ❤️ for neuro-inclusive learning**

For questions or issues, check the documentation or console logs for detailed error messages.
