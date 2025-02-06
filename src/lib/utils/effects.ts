// Sound manager for handling game sound effects
class SoundManager {
  private correctSound: HTMLAudioElement | null = null;
  private incorrectSound: HTMLAudioElement | null = null;
  private achievementSound: HTMLAudioElement | null = null;
  private isSoundEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      // Only initialize audio elements in browser environment
      this.correctSound = new Audio('/sounds/correct.mp3');
      this.incorrectSound = new Audio('/sounds/incorrect.mp3');
      this.achievementSound = new Audio('/sounds/achievement.mp3');

      // Load sound preference from localStorage
      const soundEnabled = localStorage.getItem('soundEnabled');
      this.isSoundEnabled =
        soundEnabled === null ? true : soundEnabled === 'true';
    }
  }

  toggleSound(enabled: boolean) {
    this.isSoundEnabled = enabled;
    localStorage.setItem('soundEnabled', enabled.toString());
  }

  playCorrect() {
    if (this.isSoundEnabled && this.correctSound) {
      this.correctSound.currentTime = 0;
      this.correctSound
        .play()
        .catch((err) => console.error('Error playing sound:', err));
    }
  }

  playIncorrect() {
    if (this.isSoundEnabled && this.incorrectSound) {
      this.incorrectSound.currentTime = 0;
      this.incorrectSound
        .play()
        .catch((err) => console.error('Error playing sound:', err));
    }
  }

  playAchievement() {
    if (this.isSoundEnabled && this.achievementSound) {
      this.achievementSound.currentTime = 0;
      this.achievementSound
        .play()
        .catch((err) => console.error('Error playing sound:', err));
    }
  }

  get soundEnabled() {
    return this.isSoundEnabled;
  }
}

// Export a singleton instance
export const soundManager =
  typeof window !== 'undefined' ? new SoundManager() : null;
