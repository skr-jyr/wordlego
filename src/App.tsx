import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { ThemeSelectionScreen } from './components/ThemeSelectionScreen';
import { GameplayScreen } from './components/GameplayScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { QuickMatchLoadingScreen } from './components/QuickMatchLoadingScreen';
import { CreateRoomScreen } from './components/CreateRoomScreen';
import { JoinRoomScreen } from './components/JoinRoomScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { DetailedStatsScreen } from './components/DetailedStatsScreen';
import { SoundTest } from './components/SoundTest';

type Screen = 'splash' | 'login' | 'home' | 'quick-match-loading' | 'create-room' | 'join-room' | 'theme-selection' | 'gameplay' | 'results' | 'profile' | 'leaderboard' | 'detailed-stats';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [username, setUsername] = useState('Player');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [gameResult, setGameResult] = useState<'win' | 'lose'>('win');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSplashContinue = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setUsername('Player'); // In a real app, this would come from the login form
    setCurrentScreen('home');
  };

  const handleGuestPlay = () => {
    setUsername('Guest');
    setCurrentScreen('home');
  };

  const handleRandomMatch = () => {
    setCurrentScreen('quick-match-loading');
  };

  const handleQuickMatchFound = () => {
    setCurrentScreen('theme-selection');
  };

  const handleCreateRoom = () => {
    setCurrentScreen('create-room');
  };

  const handleJoinRoom = () => {
    setCurrentScreen('join-room');
  };

  const handlePlayerJoined = () => {
    setCurrentScreen('theme-selection');
  };

  const handleRoomJoined = () => {
    setCurrentScreen('theme-selection');
  };

  const handleLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  const handleThemeSelected = (theme: string) => {
    setSelectedTheme(theme);
    setCurrentScreen('gameplay');
  };

  const handleGameEnd = (result: 'win' | 'lose') => {
    setGameResult(result);
    setCurrentScreen('results');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('theme-selection');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleProfile = () => {
    setCurrentScreen('profile');
  };

  const handleViewStats = () => {
    setCurrentScreen('detailed-stats');
  };

  const handleSignOut = () => {
    setUsername('Player');
    setCurrentScreen('login');
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'quick-match-loading':
      case 'create-room':
      case 'join-room':
      case 'theme-selection':
      case 'profile':
      case 'leaderboard':
        setCurrentScreen('home');
        break;
      case 'detailed-stats':
        setCurrentScreen('profile');
        break;
      case 'gameplay':
        setCurrentScreen('theme-selection');
        break;
      case 'results':
        setCurrentScreen('home');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const getBackgroundClass = () => {
    if (isDarkMode) {
      switch (currentScreen) {
        case 'splash':
          return 'bg-[radial-gradient(ellipse_at_top_right,#854d0e,#7f1d1d,#9a3412)]';
        case 'login':
          return 'bg-[conic-gradient(from_0deg_at_top,#3f6212,#15803d,#065f46)]';
        case 'home':
          return 'bg-[radial-gradient(ellipse_at_bottom_left,#075985,#9f1239,#4d7c0f)]';
        case 'quick-match-loading':
          return 'bg-[radial-gradient(ellipse_at_center,#1e3a8a,#6b21a8,#9f1239)]';
        case 'create-room':
          return 'bg-[conic-gradient(from_90deg_at_center,#15803d,#1e3a8a,#7e22ce)]';
        case 'join-room':
          return 'bg-[radial-gradient(ellipse_at_top_left,#0e7490,#1e3a8a,#4338ca)]';
        case 'theme-selection':
          return 'bg-[conic-gradient(from_45deg_at_bottom_right,#4338ca,#0e7490,#1e40af)]';
        case 'gameplay':
          return 'bg-[radial-gradient(ellipse_at_center,#6b21a8,#1e3a8a,#0e7490)]';
        case 'results':
          return gameResult === 'win' 
            ? 'bg-[conic-gradient(from_180deg_at_center,#15803d,#1e3a8a,#6b21a8)]'
            : 'bg-[radial-gradient(ellipse_at_top,#991b1b,#a16207,#c2410c)]';
        case 'profile':
          return 'bg-[conic-gradient(from_270deg_at_top_left,#0f766e,#a16207,#c2410c)]';
        case 'leaderboard':
          return 'bg-[radial-gradient(ellipse_at_bottom,#a16207,#c2410c,#b91c1c)]';
        case 'detailed-stats':
          return 'bg-[conic-gradient(from_135deg_at_top_right,#0e7490,#6b21a8,#be123c)]';
        default:
          return 'bg-[radial-gradient(ellipse_at_top_right,#854d0e,#7f1d1d,#9a3412)]';
      }
    } else {
      switch (currentScreen) {
        case 'splash':
          return 'bg-[radial-gradient(ellipse_at_top_right,#fbbf24,#ef4444,#ea580c)]';
        case 'login':
          return 'bg-[conic-gradient(from_0deg_at_top,#bef264,#4ade80,#10b981)]';
        case 'home':
          return 'bg-[radial-gradient(ellipse_at_bottom_left,#38bdf8,#fb7185,#a3e635)]';
        case 'quick-match-loading':
          return 'bg-[radial-gradient(ellipse_at_center,#3b82f6,#8b5cf6,#ec4899)]';
        case 'create-room':
          return 'bg-[conic-gradient(from_90deg_at_center,#22c55e,#3b82f6,#a855f7)]';
        case 'join-room':
          return 'bg-[radial-gradient(ellipse_at_top_left,#06b6d4,#3b82f6,#6366f1)]';
        case 'theme-selection':
          return 'bg-[conic-gradient(from_45deg_at_bottom_right,#6366f1,#22d3ee,#2563eb)]';
        case 'gameplay':
          return 'bg-[radial-gradient(ellipse_at_center,#8b5cf6,#3b82f6,#06b6d4)]';
        case 'results':
          return gameResult === 'win' 
            ? 'bg-[conic-gradient(from_180deg_at_center,#86efac,#3b82f6,#8b5cf6)]'
            : 'bg-[radial-gradient(ellipse_at_top,#f87171,#fbbf24,#fb923c)]';
        case 'profile':
          return 'bg-[conic-gradient(from_270deg_at_top_left,#2dd4bf,#fbbf24,#fb923c)]';
        case 'leaderboard':
          return 'bg-[radial-gradient(ellipse_at_bottom,#fbbf24,#f97316,#ef4444)]';
        case 'detailed-stats':
          return 'bg-[conic-gradient(from_135deg_at_top_right,#06b6d4,#8b5cf6,#ec4899)]';
        default:
          return 'bg-[radial-gradient(ellipse_at_top_right,#fbbf24,#ef4444,#ea580c)]';
      }
    }
  };

  return (
    <div className={`size-full min-h-screen overflow-x-hidden ${getBackgroundClass()} ${isDarkMode ? 'dark' : ''}`}>
      {currentScreen === 'splash' && (
        <SplashScreen onContinue={handleSplashContinue} />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} onGuestPlay={handleGuestPlay} />
      )}
      
      {currentScreen === 'home' && (
        <HomeScreen
          onRandomMatch={handleRandomMatch}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          onLeaderboard={handleLeaderboard}
          onProfile={handleProfile}
          username={username}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}

      {currentScreen === 'quick-match-loading' && (
        <QuickMatchLoadingScreen
          onMatchFound={handleQuickMatchFound}
          onCancel={handleBack}
        />
      )}

      {currentScreen === 'create-room' && (
        <CreateRoomScreen
          onPlayerJoined={handlePlayerJoined}
          onBack={handleBack}
        />
      )}

      {currentScreen === 'join-room' && (
        <JoinRoomScreen
          onJoinRoom={handleRoomJoined}
          onBack={handleBack}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen
          onBack={handleBack}
          username={username}
        />
      )}
      
      {currentScreen === 'theme-selection' && (
        <ThemeSelectionScreen
          onThemeSelected={handleThemeSelected}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'gameplay' && (
        <GameplayScreen
          theme={selectedTheme}
          onGameEnd={handleGameEnd}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'results' && (
        <ResultsScreen
          result={gameResult}
          onPlayAgain={handlePlayAgain}
          onHome={handleBackToHome}
        />
      )}
      
      {currentScreen === 'profile' && (
        <ProfileScreen
          onBack={handleBack}
          onViewStats={handleViewStats}
          onSignOut={handleSignOut}
          username={username}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}

      {currentScreen === 'detailed-stats' && (
        <DetailedStatsScreen
          onBack={handleBack}
          username={username}
        />
      )}
      
      {/* Sound Test Panel - always visible for development */}
      <SoundTest />
    </div>
  );
}