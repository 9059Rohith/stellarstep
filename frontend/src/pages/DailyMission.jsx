import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaCheck, FaTrash, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const planetColors = [
  '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'
];

const planetNames = [
  'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'
];

const DailyMission = () => {
  const currentUser = { uid: 'demo-user' };
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/task/${currentUser.uid}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const randomColor = planetColors[Math.floor(Math.random() * planetColors.length)];
      const randomPlanet = planetNames[Math.floor(Math.random() * planetNames.length)];

      const response = await axios.post(`${API_URL}/task`, {
        userId: currentUser.uid,
        title: newTask,
        planetName: randomPlanet,
        planetColor: randomColor
      });

      setTasks([...tasks, response.data.task]);
      setNewTask('');
      setShowAddForm(false);
      showMessage('🚀 New planet added to your mission!');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/task/${taskId}`, {
        completed: !currentStatus
      });

      setTasks(tasks.map(task =>
        task._id === taskId ? response.data.task : task
      ));

      if (!currentStatus) {
        // Task just completed - get AI reinforcement
        getAIReinforcement();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/task/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      showMessage('🗑️ Planet removed from mission');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getAIReinforcement = async () => {
    try {
      const response = await axios.post(`${API_URL}/ai/reinforcement`, {
        achievement: 'completed a mission task'
      });
      showMessage(`✨ ${response.data.message}`);
    } catch (error) {
      console.error('Error getting AI message:', error);
      showMessage('🌟 Great job completing your mission!');
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000);
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  if (loading) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-spin">🌟</div>
      </div>
    );
  }

  return (
    <div className="space-bg min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="page-title">🚀 Daily Mission</h1>

        {/* Progress Bar */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold">Mission Progress</span>
            <span className="text-2xl">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full bg-space-dark rounded-full h-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              className="bg-gradient-to-r from-space-purple to-cosmic-pink h-4 rounded-full"
            />
          </div>
        </div>

        {/* AI Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card bg-gradient-to-r from-space-purple to-cosmic-pink mb-6 text-center"
            >
              <p className="text-lg">{message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Task Button */}
        {!showAddForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="btn-primary w-full mb-6 flex items-center justify-center gap-2"
          >
            <FaPlus /> Add New Planet Mission
          </motion.button>
        )}

        {/* Add Task Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="card mb-6"
          >
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What mission do you want to complete?"
              className="input-field mb-4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <div className="flex gap-4">
              <button onClick={addTask} className="btn-primary flex-1">
                🚀 Launch Mission
              </button>
              <button onClick={() => setShowAddForm(false)} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">🌍</div>
              <p className="text-xl text-gray-400">No planets yet! Add your first mission.</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card flex items-center gap-4 ${task.completed ? 'opacity-60' : ''}`}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="planet flex-shrink-0"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: task.planetColor
                  }}
                />

                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-400">Planet {task.planetName}</p>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleComplete(task._id, task.completed)}
                    className={`p-3 rounded-full ${
                      task.completed
                        ? 'bg-green-500'
                        : 'bg-space-dark border-2 border-space-purple'
                    }`}
                  >
                    <FaCheck />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTask(task._id)}
                    className="p-3 rounded-full bg-red-500/20 hover:bg-red-500"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyMission;
