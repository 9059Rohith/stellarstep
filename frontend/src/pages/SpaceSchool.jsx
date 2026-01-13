import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const topics = [
  { id: 1, title: 'What is a Black Hole?', emoji: '🕳️', category: 'Mysteries' },
  { id: 2, title: 'How Big is the Sun?', emoji: '☀️', category: 'Stars' },
  { id: 3, title: 'What are Planets?', emoji: '🪐', category: 'Solar System' },
  { id: 4, title: 'What is the Moon?', emoji: '🌙', category: 'Solar System' },
  { id: 5, title: 'What are Stars?', emoji: '⭐', category: 'Stars' },
  { id: 6, title: 'What are Comets?', emoji: '☄️', category: 'Space Objects' },
  { id: 7, title: 'What is a Galaxy?', emoji: '🌌', category: 'Universe' },
  { id: 8, title: 'What are Astronauts?', emoji: '👨‍🚀', category: 'Space Travel' },
];

const SpaceSchool = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [spaceFact, setSpaceFact] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setExplanation('');

    try {
      const response = await axios.post(`${API_URL}/ai/simplify`, {
        topic: topic.title
      });
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error('Error getting explanation:', error);
      setExplanation('Oops! The space computer is taking a break. Try again in a moment! 🚀');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSearch = async () => {
    if (!customTopic.trim()) return;

    setSelectedTopic({ title: customTopic, emoji: '🔍', category: 'Your Question' });
    setLoading(true);
    setExplanation('');

    try {
      const response = await axios.post(`${API_URL}/ai/simplify`, {
        topic: customTopic
      });
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error('Error getting explanation:', error);
      setExplanation('Oops! The space computer is taking a break. Try again in a moment! 🚀');
    } finally {
      setLoading(false);
    }
  };

  const getRandomFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/ai/space-fact`);
      setSpaceFact(response.data.fact);
    } catch (error) {
      console.error('Error getting fact:', error);
      setSpaceFact('The universe is so big that we can\'t count all the stars! 🌟');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-bg min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="page-title">📚 Space School</h1>

        <p className="text-center text-xl text-gray-300 mb-8">
          Learn about space in simple words! Click any topic to explore. 🌟
        </p>

        {/* Custom Search */}
        <div className="card mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Ask Your Own Question</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="What do you want to learn about?"
              className="input-field flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleCustomSearch()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCustomSearch}
              className="btn-primary flex items-center gap-2"
            >
              <FaSearch /> Search
            </motion.button>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {topics.map((topic, index) => (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTopicClick(topic)}
              className={`card text-center p-6 ${
                selectedTopic?.id === topic.id ? 'ring-4 ring-star-yellow' : ''
              }`}
            >
              <div className="text-5xl mb-2">{topic.emoji}</div>
              <h3 className="text-sm font-bold">{topic.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{topic.category}</p>
            </motion.button>
          ))}
        </div>

        {/* Explanation Box */}
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-br from-space-purple/30 to-cosmic-pink/30"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{selectedTopic.emoji}</div>
              <div>
                <h2 className="text-3xl font-bold">{selectedTopic.title}</h2>
                <p className="text-gray-400">{selectedTopic.category}</p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-5xl animate-spin inline-block">🌟</div>
                <p className="text-xl mt-4">The space computer is thinking...</p>
              </div>
            ) : (
              <div className="bg-space-dark/50 rounded-xl p-6">
                <p className="text-xl leading-relaxed">{explanation}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Random Fact Button */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getRandomFact}
            disabled={loading}
            className="btn-secondary"
          >
            ✨ Get Random Space Fact
          </motion.button>

          {spaceFact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card mt-6 bg-gradient-to-r from-star-yellow/20 to-orange-500/20"
            >
              <h3 className="text-2xl font-bold mb-3">🌟 Did You Know?</h3>
              <p className="text-xl">{spaceFact}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceSchool;
