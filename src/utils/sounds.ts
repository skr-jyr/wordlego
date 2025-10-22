// Sound effect utility for consistent audio feedback across the app
class SoundManager {
  private static instance: SoundManager;
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private volume: number = 0.5; // Default volume 50%
  private debugMode: boolean = true; // Enable debug logging
  private initialized: boolean = false;
  
  // Fallback to very simple base64 click sound if CDN fails
  private fallbackSound = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADrAD///////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAw7kmHx6EAAAAAAAAAAAAAAAAAAAAAP/7UGQAAANUAEe0AAAIhYAY9oAAAQz4YyLdzQAiFvBmW7mAAEMEMakIxQAAAgECQ3IBA0EmY2MCgYGigqIEAp/4YGCg4PyAQBA4P/KAgCAIHB/ygIBAEDg//ygIAgcDg//+UBAEAQOH///8oCBwEAQf///ygIHAQBB////KBwEAQOD////wQEAQOD/////BAQBA4P/////BAQBA////////wQEAQOD///////8=';
  
  // Using embedded base64 sounds for instant loading and no external dependencies
  private soundUrls: { [key: string]: string } = {
    // Soft click (very short, 0.1s)
    buttonClick: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tUZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAADAAAGhgBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr///////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQbB4jWZAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZCIP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',
    
    // Light hover (very short, 0.05s)
    hover: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tUZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAAEVABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmb///////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAUTJYnv5AAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZB4P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',
    
    // Success sound (short, 0.2s)
    success: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tUZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAAHzQB3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3eSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSra2tra2tra2tra2tra2tra2tra2tra2trc/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAB83n/BMAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//vQZB4P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEAABpAAAACAAADSAAAAEAABpAAAACAAADSAAAAEAABpAAAACAAADSAAAAEAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',
    
    // Error sound (short, 0.15s)
    error: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tUZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAADAAAGhgBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr///////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQbJFnBBAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//vQZB4P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEAABpAAAACAAADSAAAAEAABpAAAACAAADSAAAAEAABpAAAACAAADSAAAAEAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',

    // For the longer sounds, we'll use the public folder
    complete: '/sounds/complete.mp3',
    popup: '/sounds/popup.mp3',
    select: '/sounds/select.mp3',
    start: '/sounds/start.mp3',
    levelUp: '/sounds/level-up.mp3',
    countDown: '/sounds/countdown.mp3'
  };

  private constructor() {
    if (typeof window !== 'undefined') {
      // Create AudioContext for better mobile support
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const audioContext = new AudioContext();
        // Resume audio context on user interaction
        document.addEventListener('click', () => {
          audioContext.resume();
        }, { once: true });
      }
      
      this.initializeOnUserInteraction();
    }
  }

  private debug(message: string) {
    if (this.debugMode) {
      console.log(`[SoundManager] ${message}`);
    }
  }

  private initializeOnUserInteraction() {
    const initSound = () => {
      if (this.initialized) return;
      this.initialized = true;
      this.debug('Initializing sound manager...');
      
      // Pre-create all audio elements
      Object.entries(this.soundUrls).forEach(([name, url]) => {
        this.createAudioElement(name, url);
      });
      
      // Remove the event listeners once initialized
      document.removeEventListener('click', initSound);
      document.removeEventListener('touchstart', initSound);
      document.removeEventListener('keydown', initSound);
    };

    document.addEventListener('click', initSound);
    document.addEventListener('touchstart', initSound);
    document.addEventListener('keydown', initSound);
  }

  private async createAudioElement(name: string, url: string) {
    try {
      const audio = new Audio();
      audio.volume = this.volume;
      
      // First try loading the CDN URL
      audio.src = url;
      
      const loadPromise = new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', () => resolve(true), { once: true });
        audio.addEventListener('error', () => reject(), { once: true });
      });
      
      // Wait for 3 seconds max for the sound to load
      await Promise.race([
        loadPromise,
        new Promise((_, reject) => setTimeout(() => reject(), 3000))
      ]);
      
      this.audioElements.set(name, audio);
      this.debug(`Loaded sound: ${name}`);
      
    } catch (error) {
      this.debug(`Failed to load sound ${name} from CDN, using fallback`);
      // Use fallback sound
      const fallbackAudio = new Audio(this.fallbackSound);
      fallbackAudio.volume = this.volume;
      this.audioElements.set(name, fallbackAudio);
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public async playSound(soundName: string): Promise<void> {
    if (!(soundName in this.soundUrls)) {
      this.debug(`Invalid sound name: ${soundName}`);
      return;
    }
    try {
      const audio = this.audioElements.get(soundName);
      if (!audio) {
        this.debug(`Sound ${soundName} not loaded yet, creating...`);
        await this.createAudioElement(soundName, this.soundUrls[soundName]);
      }
      
      const audioToPlay = this.audioElements.get(soundName);
      if (audioToPlay) {
        audioToPlay.currentTime = 0;
        await audioToPlay.play();
        this.debug(`Played sound: ${soundName}`);
      }
    } catch (error) {
      this.debug(`Error playing sound ${soundName}: ${error}`);
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audioElements.forEach(audio => {
      audio.volume = this.volume;
    });
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(muted: boolean): void {
    this.audioElements.forEach(audio => {
      audio.muted = muted;
    });
  }

  public isMuted(): boolean {
    const firstAudio = this.audioElements.values().next().value;
    return firstAudio ? firstAudio.muted : false;
  }

  public toggleMuted(): void {
    const newMutedState = !this.isMuted();
    this.setMuted(newMutedState);
  }
}

// Export a singleton instance
export const soundManager = SoundManager.getInstance();