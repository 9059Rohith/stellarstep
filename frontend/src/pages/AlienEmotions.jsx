import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSmile, FaSadTear, FaAngry, FaSurprise } from 'react-icons/fa';
import axios from 'axios';

const emotions = [
  { name: 'Happy', emoji: '😊', icon: FaSmile, color: 'bg-yellow-500', features: { eyes: '😊', mouth: '😊' } },
  { name: 'Sad', emoji: '😢', icon: FaSadTear, color: 'bg-blue-500', features: { eyes: '😢', mouth: '😢' } },
  { name: 'Angry', emoji: '😠', icon: FaAngry, color: 'bg-red-500', features: { eyes: '😠', mouth: '😠' } },
  { name: 'Surprised', emoji: '😮', icon: FaSurprise, color: 'bg-purple-500', features: { eyes: '😮', mouth: '😮' } },
];

const AlienEmotions = () => {
  const currentUser = { uid: 'demo-user' };
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [score, setScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [message, setMessage] = useState('');
  const [gameMode, setGameMode] = useState('learn'); // 'learn' or 'quiz'

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (gameMode === 'quiz') {
      generateChallenge();
    }
  }, [gameMode]);

  const generateChallenge = () => {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentChallenge(randomEmotion);
    setMessage(`How is this alien feeling? Click the right emotion!`);
  };

  const handleEmotionSelect = async (emotion) => {
    setSelectedEmotion(emotion);

    if (gameMode === 'quiz' && currentChallenge) {
      if (emotion.name === currentChallenge.name) {
        setScore(score + 10);
        setMessage('🎉 Correct! You understand emotions!');
        
        try {
          await axios.post(`${API_URL}/progress/game-played`, {
            userId: currentUser.uid,
            gameName: 'alienEmotions'
          });

          const response = await axios.post(`${API_URL}/ai/reinforcement`, {
            achievement: 'correctly identified an emotion'
          });
          
          setTimeout(() => {
            setMessage(response.data.message);
            generateChallenge();
          }, 2000);
        } catch (error) {
          console.error('Error:', error);
          setTimeout(generateChallenge, 2000);
        }
      } else {
        setMessage(`Not quite! The alien is ${currentChallenge.name.toLowerCase()}. Try again!`);
      }
    }
  };

  return (
    <div className="space-bg min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="page-title">👽 Alien Emotions</h1>

        {/* Mode Selector */}
        <div className="card mb-6">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setGameMode('learn')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                gameMode === 'learn'
                  ? 'bg-gradient-to-r from-space-purple to-cosmic-pink'
                  : 'bg-space-dark'
              }`}
            >
              📚 Learn Mode
            </button>
            <button
              onClick={() => setGameMode('quiz')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                gameMode === 'quiz'
                  ? 'bg-gradient-to-r from-space-purple to-cosmic-pink'
                  : 'bg-space-dark'
              }`}
            >
              🎮 Quiz Mode
            </button>
          </div>
        </div>

        {/* Score (Quiz Mode) */}
        {gameMode === 'quiz' && (
          <div className="card mb-6 text-center">
            <div className="text-4xl font-bold text-star-yellow">{score}</div>
            <div className="text-gray-400">Points</div>
          </div>
        )}

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-gradient-to-r from-space-purple to-cosmic-pink mb-6 text-center text-xl"
          >
            {message}
          </motion.div>
        )}

        {/* Challenge Alien (Quiz Mode) */}
        {gameMode === 'quiz' && currentChallenge && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="card mb-6 text-center"
          >
            <div className="text-9xl mb-4 animate-bounce">
              {currentChallenge.emoji}
            </div>
            <h2 className="text-2xl font-bold">How is this alien feeling?</h2>
          </motion.div>
        )}

        {/* Emotion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {emotions.map((emotion, index) => (
            <motion.button
              key={emotion.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEmotionSelect(emotion)}
              className={`card text-center p-8 ${
                selectedEmotion?.name === emotion.name && gameMode === 'learn'
                  ? 'ring-4 ring-star-yellow'
                  : ''
              }`}
            >
              <emotion.icon className={`text-6xl mx-auto mb-4 ${emotion.color.replace('bg-', 'text-')}`} />
              <div className="text-5xl mb-4">{emotion.emoji}</div>
              <h3 className="text-2xl font-bold">{emotion.name}</h3>
              
              {gameMode === 'learn' && selectedEmotion?.name === emotion.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-left"
                >
                  <p className="text-gray-300 mb-2">
                    When someone is <strong>{emotion.name.toLowerCase()}</strong>:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {emotion.name === 'Happy' && (
                      <>
                        <li>• They smile a lot</li>
                        <li>• Their eyes are bright</li>
                        <li>• They might laugh</li>
                      </>
                    )}
                    {emotion.name === 'Sad' && (
                      <>
                        <li>• Their mouth turns down</li>
                        <li>• They might cry</li>
                        <li>• They need a hug</li>
                      </>
                    )}
                    {emotion.name === 'Angry' && (
                      <>
                        <li>• Their eyebrows go down</li>
                        <li>• Their face looks tight</li>
                        <li>• They need space</li>
                      </>
                    )}
                    {emotion.name === 'Surprised' && (
                      <>
                        <li>• Their eyes are wide</li>
                        <li>• Their mouth is open</li>
                        <li>• Something unexpected happened</li>
                      </>
                    )}
                  </ul>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Learn Mode Description */}
        {gameMode === 'learn' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card mt-6 text-center"
          >
            <p className="text-xl text-gray-300">
              Click on each emotion to learn more about how people feel! 🌟
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AlienEmotions;
