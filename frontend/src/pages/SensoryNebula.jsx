import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const SensoryNebula = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-space-dark">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ cursor: 'none' }}
      />

      <div className="relative z-10 p-4 md:p-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-center mt-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Sensory Nebula
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl text-white/80 mb-8"
          >
            Watch the stars dance. Take deep breaths. Feel calm. ✨
          </motion.p>

          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block text-8xl mb-8"
          >
            🌌
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="card bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg"
          >
            <h2 className="text-3xl font-bold mb-4">Breathing Exercise</h2>
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mb-4"
            />
            <p className="text-xl">
              Breathe in... Hold... Breathe out...
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-gray-400"
          >
            <p className="text-lg mb-4">💫 Move your finger to create star trails</p>
            <p className="text-lg">🎵 Turn on calm music for the best experience</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SensoryNebula;
