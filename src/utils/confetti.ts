import confetti from 'canvas-confetti';

export const triggerBirthdayConfetti = () => {
  // Center blast
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#A78BFA', '#C084FC', '#F472B6', '#FBBF24', '#DDD6FE', '#FCE7F3'],
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
    });
  }, 200);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
    });
  }, 400);
};

export const triggerHeartConfetti = () => {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['circle' as const],
    colors: ['#F472B6', '#EC4899', '#A855F7', '#C084FC', '#FDA4AF'],
  };

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
  });
};
