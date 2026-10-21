import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, Heart, Sparkles, Share2, Check, ArrowRight } from 'lucide-react';
import { SURPRISES, SurpriseMessage } from '../data/surprises';
import { soundManager } from '../utils/audio';
import { fireSurpriseExplosion, fireHeartConfetti } from '../utils/confetti';
import { MoodType } from './SceneMoodCheck';

interface SceneSurpriseBoxProps {
  initialMood?: MoodType | null;
  onProceedToQuiz: () => void;
  onIncrementHappiness: () => void;
}

export const SceneSurpriseBox: React.FC<SceneSurpriseBoxProps> = ({
  initialMood,
  onProceedToQuiz,
  onIncrementHappiness,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [currentSurprise, setCurrentSurprise] = useState<SurpriseMessage | null>(null);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [smileLiked, setSmileLiked] = useState(false);
  const [showGratitude, setShowGratitude] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initialize or choose surprise
  const getNextSurprise = (): SurpriseMessage => {
    let available = SURPRISES.filter((s) => !seenIds.includes(s.id));
    if (available.length === 0) {
      // Reset seen if all used
      available = SURPRISES;
      setSeenIds([]);
    }
    const picked = available[Math.floor(Math.random() * available.length)];
    setSeenIds((prev) => [...prev, picked.id]);
    return picked;
  };

  const handleOpenBox = () => {
    if (isShaking) return;
    setIsShaking(true);
    soundManager.playPop();

    setTimeout(() => {
      setIsShaking(false);
      setIsOpen(true);
      setSmileLiked(false);
      setShowGratitude(false);
      const next = getNextSurprise();
      setCurrentSurprise(next);
      soundManager.playBoxOpen();
      fireSurpriseExplosion();
      fireHeartConfetti();
      onIncrementHappiness();
    }, 450);
  };

  const handleAnotherSurprise = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleOpenBox();
    }, 150);
  };

  const handleSmileClick = () => {
    if (!smileLiked) {
      setSmileLiked(true);
      setShowGratitude(true);
      soundManager.playSuccessFanfare();
      fireHeartConfetti();
      onIncrementHappiness();
      setTimeout(() => setShowGratitude(false), 4000);
    }
  };

  const handleShare = () => {
    if (!currentSurprise) return;
    const shareText = `"${currentSurprise.text}" — Found on The Happiness Machine 💖`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      soundManager.playPop();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-8 select-none flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-xs uppercase tracking-widest text-pink-300/80 mb-2 font-medium">
          SCENE 03 · THE SURPRISE GENERATOR
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-2">
          Your Personalized Surprise 🎁
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          {isOpen
            ? "A little parcel of unadulterated joy delivered straight to your screen."
            : "Tap the glowing magic box below to unlock your unexpected message."}
        </p>
      </div>

      {/* Box and Surprise Reveal Container */}
      <div className="w-full flex flex-col items-center justify-center min-h-[380px] my-2">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Unopened Gift Box */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -10, 0],
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.4 },
              }}
              onClick={handleOpenBox}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              {/* Radial glow around box */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-400/25 blur-3xl group-hover:scale-125 transition-transform duration-500" />

              {/* Shaking Gift Box Graphic */}
              <motion.div
                animate={
                  isShaking
                    ? {
                        rotate: [-6, 6, -8, 8, -4, 4, 0],
                        scale: [1, 1.08, 1.12, 1],
                      }
                    : {
                        rotate: 0,
                      }
                }
                transition={{ duration: 0.4 }}
                className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center"
              >
                {/* Custom SVG Gift Box */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full drop-shadow-[0_15px_30px_rgba(236,72,153,0.35)] group-hover:drop-shadow-[0_20px_40px_rgba(236,72,153,0.55)] transition-all"
                >
                  <defs>
                    <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#be185d" />
                    </linearGradient>
                    <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                    <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  {/* Box Body */}
                  <rect x="40" y="80" width="120" height="95" rx="14" fill="url(#boxGrad)" />

                  {/* Vertical Ribbon */}
                  <rect x="88" y="80" width="24" height="95" fill="url(#ribbonGrad)" />

                  {/* Horizontal Ribbon */}
                  <rect x="40" y="120" width="120" height="20" fill="url(#ribbonGrad)" />

                  {/* Box Lid */}
                  <rect x="30" y="62" width="140" height="24" rx="8" fill="url(#lidGrad)" />
                  <rect x="88" y="62" width="24" height="24" fill="url(#ribbonGrad)" />

                  {/* Ribbon Bow Left */}
                  <path
                    d="M100 62 C80 30, 45 40, 75 62 Z"
                    fill="url(#ribbonGrad)"
                    className="drop-shadow-sm"
                  />
                  {/* Ribbon Bow Right */}
                  <path
                    d="M100 62 C120 30, 155 40, 125 62 Z"
                    fill="url(#ribbonGrad)"
                    className="drop-shadow-sm"
                  />
                  {/* Bow Center knot */}
                  <circle cx="100" cy="62" r="9" fill="#fef08a" />
                </svg>

                {/* Floating sparkles around box */}
                <div className="absolute top-2 right-4 text-yellow-300 animate-pulse text-lg">✦</div>
                <div className="absolute bottom-4 left-4 text-pink-300 animate-ping text-sm">✨</div>
                <div className="absolute top-8 left-6 text-purple-300 animate-bounce text-sm">★</div>
              </motion.div>

              {/* Click prompt tag */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-4 px-5 py-2 rounded-full glass-panel border border-pink-400/40 text-pink-200 text-sm font-semibold tracking-wide flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>TAP TO OPEN SURPRISE</span>
              </motion.div>
            </motion.div>
          ) : (
            /* Opened Surprise Card */
            <motion.div
              key="opened-surprise"
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 240 }}
              className="w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-panel border border-pink-400/40 bg-gradient-to-br from-purple-950/70 via-slate-900/90 to-pink-950/60 shadow-[0_0_50px_rgba(236,72,153,0.25)] relative overflow-hidden"
            >
              {/* Background ambient sparkle */}
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-pink-500/20 blur-2xl pointer-events-none" />

              {/* Category tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-pink-300 font-semibold border border-white/10">
                  {currentSurprise?.tag || 'SURPRISE DISPATCH'}
                </span>

                <div className="text-2xl animate-bounce">
                  {currentSurprise?.emoji || '🎁'}
                </div>
              </div>

              {/* Surprise Headline Quote */}
              <blockquote className="text-xl sm:text-2xl font-bold font-display text-white mb-4 leading-snug">
                "{currentSurprise?.text}"
              </blockquote>

              {/* Humorous / Heartfelt Subtext */}
              <p className="text-sm text-slate-300/90 leading-relaxed mb-6 font-normal">
                {currentSurprise?.subtext}
              </p>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />

              {/* Gratitude Alert if clicked */}
              <AnimatePresence>
                {showGratitude && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 rounded-xl bg-pink-500/20 border border-pink-400/40 text-xs sm:text-sm text-pink-200 text-center font-medium flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-pink-400 text-pink-400 animate-pulse" />
                    <span>Serotonin captured! Your smile just brightened the entire server.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSmileClick}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    smileLiked
                      ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)]'
                      : 'bg-white/10 hover:bg-pink-500/20 text-pink-200 border border-pink-400/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${smileLiked ? 'fill-white' : 'fill-pink-400 text-pink-400'}`} />
                  <span>{smileLiked ? 'SMILE LOGGED! ❤️' : 'THIS MADE ME SMILE ❤️'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAnotherSurprise}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Dices className="w-4 h-4 text-purple-200" />
                  <span>ANOTHER SURPRISE 🎲</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleShare}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5 cursor-pointer"
                  title="Copy quote to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 text-xs">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-slate-400" />
                      <span className="text-xs">Share</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Progress counter */}
              <div className="text-center mt-5 text-[11px] text-slate-400">
                Surprise {seenIds.length} of {SURPRISES.length} discovered in this session
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button to Next Scene: The Scientific Vibe Test */}
      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onProceedToQuiz}
          className="px-6 py-3 rounded-xl font-bold text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-purple-400/30 hover:border-purple-400/60 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <span>TAKE THE IMPORTANT SCIENTIFIC TEST 🧪</span>
          <ArrowRight className="w-4 h-4 text-pink-400" />
        </motion.button>
      </div>
    </section>
  );
};
