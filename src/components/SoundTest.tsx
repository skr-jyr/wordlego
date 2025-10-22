import { useState } from 'react';
import { soundManager } from '../utils/sounds';
import { GameButton } from './GameButton';

export function SoundTest() {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  };

  const sounds = [
    { name: 'Button Click', id: 'buttonClick' },
    { name: 'Hover', id: 'hover' },
    { name: 'Success', id: 'success' },
    { name: 'Error', id: 'error' },
    { name: 'Complete', id: 'complete' },
    { name: 'Popup', id: 'popup' },
    { name: 'Select', id: 'select' },
    { name: 'Start', id: 'start' },
    { name: 'Level Up', id: 'levelUp' },
    { name: 'Countdown', id: 'countDown' },
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-80 z-50">
      <div className="space-y-4">
        <h3 className="font-bold text-lg dark:text-white">Sound Test Panel</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm dark:text-gray-200">Volume: {Math.round(volume * 100)}%</label>
            <button
              onClick={handleMuteToggle}
              className={`px-2 py-1 text-xs rounded ${
                isMuted ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {sounds.map((sound) => (
            <GameButton
              key={sound.id}
              size="sm"
              variant="primary"
              onClick={() => soundManager.playSound(sound.id)}
            >
              {sound.name}
            </GameButton>
          ))}
        </div>
      </div>
    </div>
  );
}