import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaGamepad, FaBrain, FaBook, FaCog, FaTrophy } from 'react-icons/fa';

const avatars = [
  '👨‍🚀', '👩‍🚀', '🤖', '👽', '🦸‍♂️', '🦸‍♀️'
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({
    totalTasksCompleted: 0,
    badges: [],
    streakDays: 0
  });
  const [loading, setLoading] = useState(false);
  
  // Mock user profile
  const userProfile = {
    username: 'Space Explorer',
    avatarId: 1
  };

  const missions = [
    { path: '/daily-mission', icon: FaRocket, title: 'Daily Mission', desc: 'Visit your planets', color: 'from-blue-500 to-purple-500' },
    { path: '/sensory-nebula', icon: FaBrain, title: 'Sensory Nebula', desc: 'Calm & relax', color: 'from-purple-500 to-pink-500' },
    { path: '/planet-matcher', icon: FaGamepad, title: 'Planet Matcher', desc: 'Sort & match', color: 'from-green-500 to-teal-500' },
    { path: '/alien-emotions', icon: FaGamepad, title: 'Alien Emotions', desc: 'Learn feelings', color: 'from-yellow-500 to-orange-500' },
    { path: '/space-school', icon: FaBook, title: 'Space School', desc: 'Learn new things', color: 'from-indigo-500 to-blue-500' },
    { path: '/parent-settings', icon: FaCog, title: 'Parent Settings', desc: 'View progress', color: 'from-gray-500 to-gray-700' },
  ];

  const handleExit = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-spin">🌟</div>
      </div>
    );
  }

  return (
    <div className="space-bg min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="text-6xl">
                {avatars[(userProfile?.avatarId || 1) - 1]}
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome, {userProfile?.username}!</h1>
                <p className="text-gray-400">Ready for today's adventure?</p>
              </div>
            </div>
            <button
              onClick={handleExit}
              className="btn-secondary text-sm"
            >
              🚪 Exit Mission
            </button>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card text-center"
          >
            <FaTrophy className="text-5xl mx-auto mb-2 text-star-yellow" />
            <div className="text-3xl font-bold">{progress?.totalTasksCompleted || 0}</div>
            <div className="text-gray-400">Tasks Completed</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card text-center"
          >
            <div className="text-5xl mb-2">🏆</div>
            <div className="text-3xl font-bold">{progress?.badges?.length || 0}</div>
            <div className="text-gray-400">Badges Earned</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card text-center"
          >
            <div className="text-5xl mb-2">🔥</div>
            <div className="text-3xl font-bold">{progress?.streakDays || 0}</div>
            <div className="text-gray-400">Day Streak</div>
          </motion.div>
        </div>

        {/* Mission Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-space-purple to-cosmic-pink bg-clip-text text-transparent">
            🚀 Choose Your Mission
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, index) => (
              <Link key={index} to={mission.path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className={`card bg-gradient-to-br ${mission.color} p-8 text-center cursor-pointer h-full`}
                >
                  <mission.icon className="text-6xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{mission.title}</h3>
                  <p className="text-gray-200">{mission.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        {progress?.badges && progress.badges.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">🏆 Your Galactic Badges</h2>
            <div className="card">
              <div className="flex flex-wrap gap-4">
                {progress.badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="text-xs text-gray-400">{badge.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
