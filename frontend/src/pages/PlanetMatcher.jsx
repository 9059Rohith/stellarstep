import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const shapes = ['🔴', '🟦', '🟢', '🟡', '🟣', '🟠'];
const categories = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];

const PlanetMatcher = () => {
  const currentUser = { uid: 'demo-user' };
  const [gameItems, setGameItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (gameStarted) {
      generateGame();
    }
  }, [gameStarted]);

  const generateGame = () => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      items.push({
        id: `item-${i}`,
        shape: shapes[i],
        category: categories[i],
        matched: false
      });
    }
    // Shuffle
    setGameItems(items.sort(() => Math.random() - 0.5));
    setScore(0);
    setMatches(0);
    setMessage('');
  };

  const handleItemClick = (item) => {
    if (item.matched) return;

    if (!selectedItem) {
      setSelectedItem(item);
      setMessage(`Selected ${item.category}! Now pick its match.`);
    } else {
      if (selectedItem.category === item.category) {
        // Match!
        setGameItems(gameItems.map(i =>
          i.category === item.category ? { ...i, matched: true } : i
        ));
        setScore(score + 10);
        setMatches(matches + 1);
        setMessage('🎉 Perfect match! Great job!');
        
        if (matches + 1 === 6) {
          handleGameComplete();
        }
      } else {
        setMessage('Try again! Look at the colors carefully.');
      }
      setSelectedItem(null);
    }
  };

  const handleGameComplete = async () => {
    setMessage('🏆 Amazing! You matched all the planets!');
    
    try {
      await axios.post(`${API_URL}/progress/game-played`, {
        userId: currentUser.uid,
        gameName: 'planetMatcher'
      });

      // Get AI reinforcement
      const response = await axios.post(`${API_URL}/ai/reinforcement`, {
        achievement: 'completed the Planet Matcher game'
      });
      
      setTimeout(() => {
        setMessage(response.data.message);
      }, 2000);
    } catch (error) {
      console.error('Error updating game stats:', error);
    }
  };

  const resetGame = () => {
    generateGame();
  };

  if (!gameStarted) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-2xl text-center"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
            <FaArrowLeft /> Back to Dashboard
          </Link>

          <div className="text-8xl mb-6 animate-bounce">🪐</div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Planet Matcher
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Match planets by their colors! Click two planets that look the same.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setGameStarted(true)}
            className="btn-primary text-2xl"
          >
            🚀 Start Game
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-bg min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="page-title">🪐 Planet Matcher</h1>

        {/* Score */}
        <div className="card mb-6 text-center">
          <div className="flex justify-around items-center">
            <div>
              <div className="text-4xl font-bold text-star-yellow">{score}</div>
              <div className="text-gray-400">Points</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">{matches}/6</div>
              <div className="text-gray-400">Matched</div>
            </div>
          </div>
        </div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="card bg-gradient-to-r from-space-purple to-cosmic-pink mb-6 text-center text-xl"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {gameItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: item.matched ? 1 : 1.1 }}
              whileTap={{ scale: item.matched ? 1 : 0.9 }}
              onClick={() => handleItemClick(item)}
              disabled={item.matched}
              className={`card aspect-square flex items-center justify-center text-8xl transition-all ${
                selectedItem?.id === item.id
                  ? 'ring-4 ring-star-yellow'
                  : ''
              } ${
                item.matched
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:shadow-2xl'
              }`}
            >
              {item.shape}
            </motion.button>
          ))}
        </div>

        {/* Reset Button */}
        {matches === 6 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={resetGame}
            className="btn-primary w-full"
          >
            🔄 Play Again
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default PlanetMatcher;
