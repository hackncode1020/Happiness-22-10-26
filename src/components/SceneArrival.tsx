import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireHeartConfetti, fireSurpriseExplosion } from '../utils/confetti';

interface SceneArrivalProps {
  onActivate: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const SceneArrival: React.FC<SceneArrivalProps> = ({
  onActivate,
  isMuted,
  onToggleSound
}) => {
  const [isPoweringUp, setIsPoweringUp] = useState(false);
  const [powerPhase, setPowerPhase] = useState<'idle' | 'charging' | 'burst'>('idle');

  const handleActivate = () => {
    if (isPoweringUp) return;
    setIsPoweringUp(true);
    setPowerPhase('charging');
    soundManager.playPowerUp();

    setTimeout(() => {
      setPowerPhase('burst');
      fireHeartConfetti();
      fireSurpriseExplosion();
    }, 700);

    setTimeout(() => {
      onActivate();
    }, 1300);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 select-none overflow-hidden">
      {/* Sound toggle at top right */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={onToggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all cursor-pointer"
          title={isMuted ? "Sound is muted (click to unmute)" : "Sound is active (click to mute)"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-pink-400" />
              <span className="text-pink-300">Sound On</span>
            </>
          )}
        </button>
      </div>

      {/* Background ambient radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full text-center flex flex-col items-center relative z-10"
      >
        {/* Creator tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-widest text-pink-300/80 mb-6 font-medium"
        >
          @hack.n.code presents
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display mb-4 bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent"
        >
          HEY, YOU. YES, YOU. 👀
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-base sm:text-lg text-slate-300/90 max-w-md mx-auto mb-10 leading-relaxed font-normal"
        >
          Your daily happiness level needs a little upgrade.
        </motion.p>

        {/* Magical Machine Centerpiece */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-4 flex items-center justify-center">
          {/* Energy shockwave effect on burst */}
          <AnimatePresence>
            {powerPhase === 'burst' && (
              <motion.div
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 4.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border-2 border-pink-400 bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-sm pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Glowing Aura */}
          <motion.div
            animate={{
              scale: isPoweringUp ? [1, 1.4, 1.8] : [1, 1.15, 1],
              opacity: isPoweringUp ? [0.6, 0.9, 0.2] : [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: isPoweringUp ? 0.7 : 3,
              repeat: isPoweringUp ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-400/20 blur-2xl"
          />

          {/* Outer Ring 1 - Golden Dashed */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: isPoweringUp ? 1 : 18,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-dashed border-amber-300/40"
          />

          {/* Middle Ring 2 - Lavender Neon */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: isPoweringUp ? 0.8 : 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-purple-400/50 shadow-[0_0_15px_rgba(192,132,252,0.3)]"
          >
            {/* Tiny orbiting satellite particle */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6]" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          </motion.div>

          {/* Inner Ring 3 - Electric Blue */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: isPoweringUp ? 0.5 : 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute w-28 h-28 sm:w-34 sm:h-34 rounded-full border border-dashed border-cyan-400/40"
          />

          {/* Core Machine Capsule */}
          <motion.div
            animate={{
              scale: isPoweringUp ? [1, 1.25, 1.4] : [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: isPoweringUp ? 0.7 : 2.4,
              repeat: isPoweringUp ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-pink-500/40 via-purple-700/60 to-indigo-950/80 border border-pink-400/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_35px_rgba(236,72,153,0.45)] cursor-pointer"
            onClick={handleActivate}
          >
            {/* Heart Core with Beating Animation */}
            <motion.div
              animate={{
                scale: isPoweringUp ? [1, 1.5, 2] : [1, 1.18, 1],
              }}
              transition={{
                duration: isPoweringUp ? 0.6 : 1.2,
                repeat: isPoweringUp ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="text-pink-300 drop-shadow-[0_0_12px_rgba(244,114,182,0.9)]"
            >
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-pink-500 stroke-pink-200" />
            </motion.div>
          </motion.div>
        </div>

        {/* Machine Status Note */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-4 mb-8">
          <span>Machine Status</span>
          <span aria-hidden="true">·</span>
          <span className="text-pink-300 font-medium">Ready for Serotonin Injection</span>
          <span aria-hidden="true">·</span>
          <span>100% Free</span>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleActivate}
          disabled={isPoweringUp}
          className="relative group px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:via-rose-400 hover:to-purple-500 shadow-[0_0_25px_rgba(244,63,94,0.45)] hover:shadow-[0_0_35px_rgba(244,63,94,0.65)] transition-all cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{isPoweringUp ? 'CHARGING HAPPINESS...' : 'ACTIVATE MY HAPPINESS ✨'}</span>
          </span>
        </motion.button>

        {/* Footer Tagline */}
        <p className="text-xs text-slate-400 mt-12 max-w-sm mx-auto">
          "You Didn't Find This Website. This Website Found You."
        </p>
      </motion.div>
    </div>
  );
};
