import confetti from 'canvas-confetti';

const SOUNDS = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  achievement: '/sounds/achievement.mp3',
  levelUp: '/sounds/level-up.mp3'
} as const;

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  constructor() {
    Object.entries(SOUNDS).forEach(([key, path]) => {
      if (typeof window !== 'undefined') {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sounds.set(key, audio);
      }
    });
  }

  play(sound: keyof typeof SOUNDS) {
    if (!this.enabled) return;
    const audio = this.sounds.get(sound);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = new SoundManager();

export function playCorrectAnimation() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#22c55e', '#16a34a', '#15803d']
  });
}

export function playAchievementAnimation() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.8 },
    colors: ['#fbbf24', '#f59e0b', '#d97706'],
    shapes: ['star']
  });
}

export function playLevelUpAnimation() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#8b5cf6', '#7c3aed', '#6d28d9']
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#8b5cf6', '#7c3aed', '#6d28d9']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
} 