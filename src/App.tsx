import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, Sparkles, BatteryCharging, ArrowLeft, RefreshCw, Send } from 'lucide-react';
import { StarryBackground } from './components/StarryBackground';
import { TopNav } from './components/TopNav';
import { SceneArrival } from './components/SceneArrival';
import { SceneMoodCheck, MoodType } from './components/SceneMoodCheck';
import { SceneSurpriseBox } from './components/SceneSurpriseBox';
import { SceneVibeTest } from './components/SceneVibeTest';
import { HappinessPlayground } from './components/HappinessPlayground';
import { ShareGiftModal } from './components/ShareGiftModal';
import { soundManager } from './utils/audio';
import { fireSparkleShower, fireHeartConfetti } from './utils/confetti';

type Scene = 'arrival' | 'mood' | 'surprise' | 'quiz' | 'playground';

export default function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('arrival');
  const [isActivated, setIsActivated] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [isMuted, setIsMuted] = useState(true); // OFF by default as required by prompt
  const [happinessScore, setHappinessScore] = useState<number>(30);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  // Sound toggle handler
  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Serotonin score increment
  const handleIncrementHappiness = () => {
    setHappinessScore((prev) => Math.min(100, prev + 12));
  };

  // Scene navigation
  const handleNavigate = (scene: Scene) => {
    soundManager.playPop();
    setCurrentScene(scene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Activation from Scene 1
  const handleActivateMachine = () => {
    setIsActivated(true);
    setCurrentScene('mood');
    setHappinessScore(45);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between selection:bg-pink-500/30 selection:text-pink-200">
      {/* Background canvas stars */}
      <StarryBackground />

      {/* Top Navigation: Shown if activated or visitor wants to jump */}
      {isActivated && (
        <TopNav
          currentScene={currentScene}
          onNavigate={handleNavigate}
          onOpenGiftModal={() => setIsGiftModalOpen(true)}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          happinessScore={happinessScore}
        />
      )}

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentScene === 'arrival' && (
            <motion.div
              key="scene-arrival"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              <SceneArrival
                onActivate={handleActivateMachine}
                isMuted={isMuted}
                onToggleSound={handleToggleSound}
              />
            </motion.div>
          )}

          {currentScene === 'mood' && (
            <motion.div
              key="scene-mood"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-6"
            >
              {/* Serotonin meter indicator */}
              <div className="max-w-4xl mx-auto px-4 mb-4 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-pink-400" />
                  <span>Serotonin Level:</span>
                  <span className="font-bold text-pink-300 font-mono tabular-nums">{happinessScore}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span>Step 1 of 4</span>
                </div>
              </div>

              <SceneMoodCheck
                selectedMood={selectedMood}
                onSelectMood={(m) => {
                  setSelectedMood(m);
                  handleIncrementHappiness();
                }}
                onUnlockSurprise={(m) => {
                  setSelectedMood(m);
                  handleIncrementHappiness();
                  handleNavigate('surprise');
                }}
              />
            </motion.div>
          )}

          {currentScene === 'surprise' && (
            <motion.div
              key="scene-surprise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-6"
            >
              <div className="max-w-3xl mx-auto px-4 mb-4 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => handleNavigate('mood')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Vibe Check</span>
                </button>
                <div className="flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-pink-400" />
                  <span className="font-bold text-pink-300 font-mono tabular-nums">{happinessScore}%</span>
                </div>
              </div>

              <SceneSurpriseBox
                initialMood={selectedMood}
                onProceedToQuiz={() => handleNavigate('quiz')}
                onIncrementHappiness={handleIncrementHappiness}
              />
            </motion.div>
          )}

          {currentScene === 'quiz' && (
            <motion.div
              key="scene-quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-6"
            >
              <div className="max-w-3xl mx-auto px-4 mb-4 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => handleNavigate('surprise')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Surprise Box</span>
                </button>
                <div className="flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-pink-400" />
                  <span className="font-bold text-pink-300 font-mono tabular-nums">{happinessScore}%</span>
                </div>
              </div>

              <SceneVibeTest
                onProceedToPlayground={() => handleNavigate('playground')}
                onIncrementHappiness={handleIncrementHappiness}
              />
            </motion.div>
          )}

          {currentScene === 'playground' && (
            <motion.div
              key="scene-playground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-6"
            >
              <div className="max-w-4xl mx-auto px-4 mb-4 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => handleNavigate('quiz')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Vibe Test</span>
                </button>
                <div className="flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-pink-400" />
                  <span className="font-bold text-pink-300 font-mono tabular-nums">
                    {happinessScore >= 100 ? '100% (OVERCHARGED! 💖)' : `${happinessScore}%`}
                  </span>
                </div>
              </div>

              <HappinessPlayground onIncrementHappiness={handleIncrementHappiness} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-4 text-center mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">The Happiness Machine</span>
            <span aria-hidden="true">·</span>
            <span>Created by @hack.n.code</span>
          </div>

          <div className="text-pink-300/80 italic">
            "You Didn't Find This Website. This Website Found You."
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundManager.playPop();
                fireHeartConfetti();
                setIsGiftModalOpen(true);
              }}
              className="hover:text-pink-300 transition-colors cursor-pointer"
            >
              Share with a Friend 🎁
            </button>
            <button
              onClick={() => {
                soundManager.playPowerUp();
                handleNavigate('arrival');
              }}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Machine</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Gift / Share Modal */}
      <ShareGiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />
    </div>
  );
}
