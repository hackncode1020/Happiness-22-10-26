import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Check, RefreshCw } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type MoodType = 'happy' | 'sad' | 'tired' | 'overthinking' | 'existing';

interface MoodConfig {
  id: MoodType;
  title: string;
  emoji: string;
  desc: string;
  response: string;
  subResponse: string;
  gradient: string;
  border: string;
  glow: string;
  pillColor: string;
}

const MOODS: MoodConfig[] = [
  {
    id: 'happy',
    title: 'HAPPY',
    emoji: '😎',
    desc: 'Vibing, thriving, or smiling for no reason',
    response: 'Keep that smile. The world needs more of it. ✨',
    subResponse: 'Your positive frequency is infectious. Let\'s magnify it!',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-orange-500/20',
    border: 'border-amber-400/40 hover:border-amber-300',
    glow: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]',
    pillColor: 'text-amber-300'
  },
  {
    id: 'sad',
    title: 'SAD',
    emoji: '🥹',
    desc: 'A bit heavy, tender, or going through it',
    response: "You don't have to be okay every second. Be gentle with yourself. 🫂",
    subResponse: 'Even storm clouds carry rain that makes sweet flowers grow.',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20',
    border: 'border-blue-400/40 hover:border-blue-300',
    glow: 'hover:shadow-[0_0_30px_rgba(96,165,250,0.35)]',
    pillColor: 'text-blue-300'
  },
  {
    id: 'tired',
    title: 'TIRED',
    emoji: '😴',
    desc: 'Battery at 4%, soul craving 10 hours of sleep',
    response: 'Permission granted to slow down. Rest is productive too. 🌙',
    subResponse: 'You don\'t have to run at 100mph every single day. Breathe.',
    gradient: 'from-violet-500/20 via-purple-500/10 to-indigo-500/20',
    border: 'border-violet-400/40 hover:border-violet-300',
    glow: 'hover:shadow-[0_0_30px_rgba(167,139,250,0.35)]',
    pillColor: 'text-violet-300'
  },
  {
    id: 'overthinking',
    title: 'OVERTHINKING',
    emoji: '🫠',
    desc: '47 mental tabs open and 3 are playing music',
    response: 'Not every thought deserves a meeting in your brain. 😂',
    subResponse: 'Notice the thought, smile at its ridiculousness, and let it drift away.',
    gradient: 'from-fuchsia-500/20 via-pink-500/10 to-purple-500/20',
    border: 'border-fuchsia-400/40 hover:border-fuchsia-300',
    glow: 'hover:shadow-[0_0_30px_rgba(232,121,249,0.35)]',
    pillColor: 'text-fuchsia-300'
  },
  {
    id: 'existing',
    title: 'JUST EXISTING',
    emoji: '💀',
    desc: 'Floating in the void, running on autopiloted coffee',
    response: 'Honestly? Showing up is already something. 💗',
    subResponse: 'You woke up, you\'re here, you\'re human. That in itself is an achievement.',
    gradient: 'from-slate-400/20 via-purple-500/10 to-pink-500/20',
    border: 'border-slate-400/40 hover:border-pink-300',
    glow: 'hover:shadow-[0_0_30px_rgba(244,114,182,0.35)]',
    pillColor: 'text-pink-300'
  }
];

interface SceneMoodCheckProps {
  onUnlockSurprise: (mood: MoodType) => void;
  selectedMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
}

export const SceneMoodCheck: React.FC<SceneMoodCheckProps> = ({
  onUnlockSurprise,
  selectedMood,
  onSelectMood
}) => {
  const [activeMood, setActiveMood] = useState<MoodType | null>(selectedMood);

  const handleCardClick = (mood: MoodType) => {
    setActiveMood(mood);
    onSelectMood(mood);
    soundManager.playPop();
  };

  const currentConfig = MOODS.find((m) => m.id === activeMood);

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-xs uppercase tracking-widest text-pink-300/80 mb-2 font-medium">
          SCENE 02 · EMOTIONAL CALIBRATION
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-3">
          Let's check your current vibe. 💗
        </h2>
        <p className="text-sm sm:text-base text-slate-300/80 max-w-lg mx-auto">
          Tap how you feel right in this very moment. No pretending, no masks.
        </p>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
        {MOODS.map((mood) => {
          const isSelected = activeMood === mood.id;
          return (
            <motion.button
              key={mood.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(mood.id)}
              className={`relative text-left p-4 sm:p-5 rounded-2xl glass-panel border transition-all cursor-pointer flex flex-col justify-between min-h-[170px] ${
                mood.border
              } ${mood.glow} ${
                isSelected
                  ? 'bg-gradient-to-b from-white/15 to-white/5 ring-2 ring-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.4)]'
                  : 'bg-white/[0.03]'
              }`}
            >
              {/* Active Selection Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="text-3xl sm:text-4xl mb-3">{mood.emoji}</div>
                <h3 className={`font-display text-base font-bold ${mood.pillColor} tracking-wide mb-1`}>
                  {mood.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300/80 leading-snug">
                {mood.desc}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Personalized Response Area */}
      <AnimatePresence mode="wait">
        {currentConfig && (
          <motion.div
            key={currentConfig.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-2xl glass-panel border border-pink-400/30 text-center relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-pink-900/20 to-slate-900/60 shadow-[0_0_35px_rgba(236,72,153,0.15)]"
          >
            {/* Ambient background blob */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-3 animate-bounce">
                {currentConfig.emoji}
              </span>

              <h4 className="text-lg sm:text-2xl font-bold font-display text-white mb-2 max-w-xl leading-relaxed">
                "{currentConfig.response}"
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                {currentConfig.subResponse}
              </p>

              <div className="h-px w-24 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mb-6" />

              <div className="text-xs font-semibold tracking-wider text-pink-300 uppercase mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>YOUR PERSONAL SURPRISE IS READY.</span>
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  soundManager.playBoxOpen();
                  onUnlockSurprise(currentConfig.id);
                }}
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-[0_0_25px_rgba(244,63,94,0.5)] transition-all cursor-pointer flex items-center gap-2.5 text-base"
              >
                <Gift className="w-5 h-5 text-yellow-200" />
                <span>UNLOCK MY SURPRISE 🎁</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!currentConfig && (
        <div className="text-center py-6 text-xs text-slate-400">
          Pick any vibe above to reveal your tailored prescription & unlock the surprise box.
        </div>
      )}
    </section>
  );
};
