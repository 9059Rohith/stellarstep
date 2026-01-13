# StellarStep - Neuro-Inclusive Space Learning Platform

A high-fidelity 10-page MERN application designed for children with autism, featuring a calming space theme with structured activities, educational content, and interactive games.

## 🚀 Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Firebase Auth
- **AI Engine**: Groq API (llama-3.1-8b-instant)

## 📁 Project Structure

```
labeval_01/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
├── server/          # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd labeval_01
```

### Step 2: Server Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
GROQ_API_KEY=your_groq_api_key_here
```

### Step 3: Client Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` folder with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

The application will open at `http://localhost:5173`

## 🎮 Features

### 10 Pages Overview

1. **Landing Page** - Mission Start portal with high-contrast buttons
2. **Login Page** - Space-themed authentication
3. **Sign-Up Page** - Registration with astronaut avatar selection
4. **Mission Dashboard** - Central hub showing progress and badges
5. **Daily Mission** - CRUD-based task list (planets to visit)
6. **Sensory Nebula** - Interactive calming zone with animations
7. **Planet Matcher** - Drag-and-drop sorting game
8. **Alien Emotions** - Face-builder for social cue recognition
9. **Space School** - AI-powered educational content
10. **Parent Settings** - Password-protected activity monitoring

## 🤖 AI Integration

The Groq API is used to:
- Generate positive reinforcement messages
- Simplify complex space facts for easy understanding
- Provide age-appropriate explanations

## 🔐 Authentication Flow

1. User signs up via Firebase (Email/Password)
2. React app sends `uid` and `email` to Node server
3. Server creates matching profile in MongoDB
4. User can access all features after authentication

## 📱 Key Technologies

- **React Router** - Navigation between pages
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth, slow animations
- **Axios** - API communication
- **Mongoose** - MongoDB object modeling

## 👥 User Roles

- **Children** - Complete missions, play games, learn
- **Parents** - Monitor progress, manage schedules (password-protected)

## 🎨 Design Principles

- High contrast for better visibility
- Slow, predictable animations
- Consistent space theme
- Clear visual schedules
- Structured navigation

## 📊 Database Collections

- **Users** - User profiles and authentication data
- **Tasks** - Daily mission tasks
- **Progress** - Badge and achievement tracking
- **ActivityLogs** - Parent monitoring data

## 🛠️ Development

### Available Scripts

**Server:**
- `npm start` - Run production server
- `npm run dev` - Run development server with nodemon

**Client:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Notes for Submission

- All sensitive credentials are in `.env` files (excluded from Git)
- Complete source code available on GitHub
- Full project including `.env` templates on OneDrive
- Follows Clean Code principles
- Production-ready with error handling

## 👨‍💻 Author

Developed as a final semester project demonstrating full-stack MERN development with AI integration and neuro-inclusive design principles.

## 📄 License

This project is submitted as academic work.
