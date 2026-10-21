import React from 'react';
import { Heart, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface TopNavProps {
  currentScene: 'arrival' | 'mood' | 'surprise' | 'quiz' | 'playground';
  onNavigate: (scene: 'arrival' | 'mood' | 'surprise' | 'quiz' | 'playground') => void;
  onOpenGiftModal: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  happinessScore: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScene,
  onNavigate,
  onOpenGiftModal,
  isMuted,
  onToggleSound,
  happinessScore
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090514]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('arrival')}
          className="text-base sm:text-lg font-extrabold tracking-tight font-display text-white whitespace-nowrap shrink-0 hover:text-pink-300 transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>The Happiness Machine</span>
          <Heart className="w-4 h-4 fill-pink-500 text-pink-400 inline" />
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('arrival')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentScene === 'arrival' ? 'text-pink-300 font-semibold' : ''
            }`}
          >
            Arrival
          </button>
          <button
            onClick={() => onNavigate('mood')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentScene === 'mood' ? 'text-pink-300 font-semibold' : ''
            }`}
          >
            Vibe Check
          </button>
          <button
            onClick={() => onNavigate('surprise')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentScene === 'surprise' ? 'text-pink-300 font-semibold' : ''
            }`}
          >
            Surprises
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentScene === 'quiz' ? 'text-pink-300 font-semibold' : ''
            }`}
          >
            Vibe Test
          </button>
          <button
            onClick={() => onNavigate('playground')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentScene === 'playground' ? 'text-pink-300 font-semibold' : ''
            }`}
          >
            Arcade
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Subtle sound toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors cursor-pointer"
            title={isMuted ? "Sound is off (click to unmute)" : "Sound is on (click to mute)"}
            aria-label="Toggle sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-pink-400" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenGiftModal}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Send A Smile</span>
          </button>
        </div>
      </div>
    </header>
  );
};
