# Sound Files Setup

To add sound effects to the game, place your MP3 files in the `public/sounds` folder using these filenames:

Required sound files:
```
public/sounds/
├── button-click.mp3   (Short click sound for buttons)
├── hover.mp3          (Subtle hover sound)
├── success.mp3        (Success notification)
├── error.mp3          (Error/invalid action)
├── complete.mp3       (Task completion)
├── popup.mp3          (Dialog/modal opening)
├── select.mp3         (Item selection)
├── start.mp3          (Game start sound)
├── level-up.mp3      (Achievement sound)
└── countdown.mp3      (Timer/countdown beep)
```

Recommended sound characteristics:
- `button-click.mp3`: Very short (0.1s), subtle click
- `hover.mp3`: Very short (0.05s), softer than click
- `success.mp3`: Short (0.3-0.5s), positive chime
- `error.mp3`: Short (0.2s), error buzz
- `complete.mp3`: Medium (0.5-1s), achievement sound
- `popup.mp3`: Short (0.2s), subtle pop
- `select.mp3`: Short (0.2s), selection click
- `start.mp3`: Medium (1s), game start fanfare
- `level-up.mp3`: Medium (1-2s), victory fanfare
- `countdown.mp3`: Short (0.2s), tick sound

Tips for sound files:
1. Use MP3 format
2. Keep files small (under 100KB each)
3. Use 44.1kHz or 48kHz sample rate
4. Use mono for UI sounds (stereo not needed)
5. Normalize volume levels
6. Test on mobile devices