import confetti from 'canvas-confetti';

export function fireHeartConfetti() {
  const heartShape = confetti.shapeFromPath({
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  });

  confetti({
    shapes: [heartShape, 'circle'],
    particleCount: 50,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff6b8b', '#ff8da1', '#fda4af', '#f43f5e', '#ec4899', '#fbcfe8'],
    scalar: 1.4,
  });
}

export function fireSurpriseExplosion() {
  const count = 180;
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f472b6', '#c084fc', '#fde047'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#38bdf8', '#818cf8', '#ec4899'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.1,
    colors: ['#f43f5e', '#fbbf24', '#a855f7'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#ffffff', '#f472b6', '#38bdf8'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#fef08a', '#e879f9'],
  });
}

export function fireSparkleShower() {
  confetti({
    particleCount: 60,
    spread: 100,
    origin: { y: 0.4 },
    colors: ['#facc15', '#f472b6', '#a78bfa', '#38bdf8', '#ffffff'],
    ticks: 200,
    gravity: 0.8,
    scalar: 0.9,
  });
}
