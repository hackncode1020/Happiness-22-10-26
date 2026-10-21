import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, Share2, Check, Heart, Shield, Zap, Coffee } from 'lucide-react';
import { QUIZ_QUESTIONS, ARCHETYPES, ArchetypeResult } from '../data/quiz';
import { soundManager } from '../utils/audio';
import { fireSurpriseExplosion, fireSparkleShower } from '../utils/confetti';

interface SceneVibeTestProps {
  onProceedToPlayground: () => void;
  onIncrementHappiness: () => void;
}

export const SceneVibeTest: React.FC<SceneVibeTestProps> = ({
  onProceedToPlayground,
  onIncrementHappiness,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<ArchetypeResult | null>(null);
  const [copied, setCopied] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (archetype: string) => {
    soundManager.playPop();
    const newAnswers = [...selectedAnswers, archetype];
    setSelectedAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate outcome
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers: string[]) => {
    // Count frequencies
    const counts: Record<string, number> = {};
    answers.forEach((arch) => {
      counts[arch] = (counts[arch] || 0) + 1;
    });

    let bestArch = 'cinnamon';
    let maxCount = -1;
    Object.entries(counts).forEach(([arch, cnt]) => {
      if (cnt > maxCount) {
        maxCount = cnt;
        bestArch = arch;
      }
    });

    const finalArchetype = ARCHETYPES[bestArch] || ARCHETYPES.cinnamon;
    setResult(finalArchetype);
    soundManager.playSuccessFanfare();
    fireSurpriseExplosion();
    fireSparkleShower();
    onIncrementHappiness();
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setResult(null);
    soundManager.playPop();
  };

  const handleShareResult = () => {
    if (!result) return;
    const text = `🧪 My Unofficial Happiness Archetype: "${result.name} ${result.emoji}"\nSuperpower: ${result.superpower}\nPrescription: ${result.prescription}\nDiscovered on The Happiness Machine 💖`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      soundManager.playPop();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-8 select-none">
      {/* Scene Header */}
      <div className="text-center mb-8">
        <div className="text-xs uppercase tracking-widest text-pink-300/80 mb-2 font-medium">
          SCENE 04 · RIGOROUS METHODOLOGY
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-2">
          IMPORTANT SCIENTIFIC TEST 🧪
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
          Discover your extremely unofficial happiness personality.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          /* Active Question View */
          <motion.div
            key={`question-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-slate-900/60 to-purple-950/30 shadow-[0_0_35px_rgba(168,85,247,0.15)]"
          >
            {/* Progress Bar & Question Counter */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span className="font-semibold text-purple-300">
                QUESTION 0{currentQuestionIndex + 1} OF 0{QUIZ_QUESTIONS.length}
              </span>
              <span>100% Peer-Reviewed Humor</span>
            </div>

            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ width: `${(currentQuestionIndex / QUIZ_QUESTIONS.length) * 100}%` }}
                animate={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2 leading-snug">
              {currentQ.question}
            </h3>
            <p className="text-xs text-slate-400 mb-6 italic">
              {currentQ.context}
            </p>

            {/* 4 Options Grid */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => (
                <motion.button
                  key={opt.letter}
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption(opt.archetype)}
                  className="w-full p-4 rounded-2xl glass-panel border border-white/10 hover:border-pink-400/50 hover:bg-white/[0.08] text-left flex items-start gap-3.5 transition-all cursor-pointer group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-pink-500 text-slate-200 group-hover:text-white font-bold text-xs flex items-center justify-center shrink-0 transition-colors">
                    {opt.letter}
                  </span>
                  <span className="text-sm sm:text-base text-slate-200 group-hover:text-white leading-relaxed font-normal pt-0.5">
                    {opt.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Result Archetype Card */
          <motion.div
            key="quiz-result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`p-6 sm:p-8 rounded-3xl glass-panel border ${result.color} bg-gradient-to-b from-purple-950/60 to-slate-900/80 shadow-[0_0_50px_rgba(236,72,153,0.25)] relative overflow-hidden`}
          >
            {/* Header Badge */}
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-pink-300 font-semibold border border-white/10 mb-3 inline-block">
                OFFICIAL DIAGNOSIS COMPLETE
              </span>

              <div className="text-5xl sm:text-6xl mb-2 animate-bounce">
                {result.emoji}
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                {result.name}
              </h3>

              <p className="text-xs sm:text-sm text-pink-200 font-medium">
                {result.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6 text-center max-w-xl mx-auto">
              {result.description}
            </p>

            {/* Stat Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 text-center">
              <div>
                <div className="text-[11px] text-slate-400 mb-1">COZY LEVEL</div>
                <div className="text-lg font-bold text-amber-300 font-mono tabular-nums">
                  {result.stats.cozyLevel}%
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 mb-1">CHAOS ENERGY</div>
                <div className="text-lg font-bold text-pink-300 font-mono tabular-nums">
                  {result.stats.chaosEnergy}%
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 mb-1">HEART PURITY</div>
                <div className="text-lg font-bold text-purple-300 font-mono tabular-nums">
                  {result.stats.heartPurity}%
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 mb-1">UNBOTHERED</div>
                <div className="text-lg font-bold text-cyan-300 font-mono tabular-nums">
                  {result.stats.unbotheredVibe}%
                </div>
              </div>
            </div>

            {/* Superpower & Kryptonite */}
            <div className="space-y-3 mb-6 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-200">Unofficial Superpower:</strong>{' '}
                  <span className="text-slate-200">{result.superpower}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-400/20 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pink-200">Kryptonite:</strong>{' '}
                  <span className="text-slate-200">{result.kryptonite}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-start gap-2.5">
                <Coffee className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-200">Doctor's Prescription:</strong>{' '}
                  <span className="text-slate-200">{result.prescription}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleShareResult}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-2 shadow-lg cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>COPIED TO CLIPBOARD!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-pink-200" />
                    <span>SHARE MY VIBE 💖</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>Retake Test</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={onProceedToPlayground}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>VISIT HAPPINESS PLAYGROUND</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
