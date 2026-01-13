import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="space-bg min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <FaRocket className="text-9xl mx-auto text-space-purple animate-float" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-space-purple via-cosmic-pink to-star-yellow bg-clip-text text-transparent"
        >
          StellarStep
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl md:text-3xl mb-12 text-gray-300"
        >
          Your Space Learning Adventure Begins Here! 🌟
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/dashboard">
            <button className="btn-primary text-xl">
              🚀 Start Mission
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { emoji: '🎯', text: 'Daily Missions' },
            { emoji: '🎮', text: 'Fun Games' },
            { emoji: '📚', text: 'Space School' }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="card text-center p-8"
            >
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold">{item.text}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
