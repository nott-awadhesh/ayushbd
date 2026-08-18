import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  type: 'heart' | 'star' | 'circle';
}

export const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(142, 148, 242, 0.4)', // #8E94F2 natural purple
      'rgba(255, 133, 161, 0.35)', // #FF85A1 soft rose
      'rgba(224, 195, 252, 0.4)', // soft violet
      'rgba(226, 240, 203, 0.45)', // soft sage
    ];

    const generated: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.floor(Math.random() * 14) + 8,
      duration: Math.floor(Math.random() * 12) + 14, // 14-26s
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: i % 4 === 0 ? 'heart' : i % 3 === 0 ? 'star' : 'circle',
    }));

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-[-40px] animate-float-particle select-none"
          style={{
            left: `${p.x}%`,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            color: p.color,
            fontSize: `${p.size}px`,
          }}
        >
          {p.type === 'heart' ? (
            '🤍'
          ) : p.type === 'star' ? (
            '✨'
          ) : (
            <div
              className="rounded-full blur-[1px]"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
              }}
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
