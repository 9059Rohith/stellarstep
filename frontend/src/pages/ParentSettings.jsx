import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaLock, FaUnlock, FaCalendarAlt, FaChartBar } from 'react-icons/fa';
import axios from 'axios';

const ParentSettings = () => {
  const currentUser = { uid: 'demo-user' };
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activityLogs, setActivityLogs] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleUnlock = async () => {
    if (!password) {
      setError('Please enter a password');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/user/verify-parent`, {
        firebaseUid: currentUser.uid,
        password
      });

      if (response.data.valid) {
        setIsUnlocked(true);
        setError('');
        fetchParentData();
      } else {
        setError('Incorrect password');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Password not set yet. Contact support.');
    } finally {
      setLoading(false);
    }
  };

  const fetchParentData = async () => {
    try {
      const [logsResponse, progressResponse] = await Promise.all([
        axios.get(`${API_URL}/progress/logs/${currentUser.uid}`),
        axios.get(`${API_URL}/progress/${currentUser.uid}`)
      ]);

      setActivityLogs(logsResponse.data.logs);
      setProgress(progressResponse.data.progress);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isUnlocked) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-md w-full"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
            <FaArrowLeft /> Back to Dashboard
          </Link>

          <div className="text-center mb-8">
            <FaLock className="text-6xl mx-auto mb-4 text-cosmic-pink" />
            <h2 className="text-4xl font-bold mb-2">Parent Settings</h2>
            <p className="text-gray-400">This area is password protected</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter parent password"
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
            />

            <button
              onClick={handleUnlock}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <FaUnlock /> {loading ? 'Verifying...' : 'Unlock'}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>⚠️ This feature requires a parent password</p>
            <p className="mt-2">Set up password in account settings</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-bg min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <button
            onClick={() => setIsUnlocked(false)}
            className="btn-secondary text-sm"
          >
            <FaLock className="inline mr-2" /> Lock
          </button>
        </div>

        <h1 className="page-title">👨‍👩‍👧‍👦 Parent Dashboard</h1>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <FaChartBar className="text-4xl mx-auto mb-2 text-star-yellow" />
            <div className="text-3xl font-bold">{progress?.totalTasksCompleted || 0}</div>
            <div className="text-gray-400">Tasks Done</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl font-bold">{progress?.badges?.length || 0}</div>
            <div className="text-gray-400">Badges</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <div className="text-4xl mb-2">🎮</div>
            <div className="text-3xl font-bold">
              {(progress?.gamesPlayed?.planetMatcher || 0) + (progress?.gamesPlayed?.alienEmotions || 0)}
            </div>
            <div className="text-gray-400">Games Played</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card text-center"
          >
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-3xl font-bold">{progress?.streakDays || 0}</div>
            <div className="text-gray-400">Day Streak</div>
          </motion.div>
        </div>

        {/* Badges Earned */}
        {progress?.badges && progress.badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              🏆 Badges Earned
            </h2>
            <div className="flex flex-wrap gap-4">
              {progress.badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-space-dark/50 rounded-xl p-4 text-center"
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="text-sm font-bold">{badge.name}</div>
                  <div className="text-xs text-gray-400">
                    {formatDate(badge.earnedAt)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaCalendarAlt /> Recent Activity
          </h2>

          {activityLogs.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No activity yet</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activityLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-space-dark/50 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {log.activityType === 'task_completed' && '✅'}
                      {log.activityType === 'game_played' && '🎮'}
                      {log.activityType === 'badge_earned' && '🏆'}
                      {log.activityType === 'login' && '🚀'}
                      {log.activityType === 'space_school_visit' && '📚'}
                    </div>
                    <div>
                      <div className="font-bold">{log.description}</div>
                      <div className="text-sm text-gray-400">
                        {formatDate(log.timestamp)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30"
        >
          <h3 className="text-xl font-bold mb-3">📊 About This Dashboard</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• Monitor your child's progress and achievements</li>
            <li>• View completed tasks and learning activities</li>
            <li>• Track engagement with games and educational content</li>
            <li>• All activities are timestamped for your records</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ParentSettings;
