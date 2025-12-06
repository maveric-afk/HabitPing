import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Background = () => {
  const [particles, setParticles] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const colors = ['#fbc8cd', '#000', '#fac3cd', '#fadfc8'];

    // Generate glowing particles
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
    }));

    // Generate neon lines
    const newLines = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      length: Math.random() * 250 + 100,
      angle: Math.random() * 360,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
    setLines(newLines);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Glowing Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-70"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 5}px ${p.color}, 0 0 ${p.size * 10}px ${p.color}`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated Neon Lines */}
      {lines.map(line => (
        <motion.div
          key={line.id}
          className="absolute opacity-30"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: `${line.length}px`,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${line.color}, transparent)`,
            transform: `rotate(${line.angle}deg)`,
            borderRadius: '999px',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default Background;
