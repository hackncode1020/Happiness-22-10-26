import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, Heart, RotateCcw, Plus, Flame, Check, MessageSquare } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireSparkleShower, fireHeartConfetti, fireSurpriseExplosion } from '../utils/confetti';

interface HappinessPlaygroundProps {
  onIncrementHappiness: () => void;
}

const INITIAL_SMILES = [
  { id: '1', author: 'Maya', text: 'My cat slept on my chest and purred like an engine this morning.' },
  { id: '2', author: 'Anonymous Wanderer', text: 'Drank an iced latte that was so good it almost fixed my credit score.' },
  { id: '3', author: 'Leo', text: 'Finished a giant project after 3 months of sweat. We survived!' },
  { id: '4', author: 'Sam K.', text: 'A stranger told me they liked my jacket and I will be thinking about it for 5 years.' }
];

const COMPLIMENTS = [
  "Your laughter is genuinely contagious in the best possible way.",
  "You have exceptional taste in websites (especially this one).",
  "If kindness was a currency, your bank account would be overflowing.",
  "You are somebody's reason to look forward to tomorrow.",
  "Your energy makes rooms feel warmer and less awkward.",
  "You handle difficult things with way more grace than you realize.",
  "The universe worked for 13.8 billion years just to make someone as cool as you."
];

export const HappinessPlayground: React.FC<HappinessPlaygroundProps> = ({
  onIncrementHappiness,
}) => {
  // Bubble Wrap State: 24 bubbles
  const [bubbles, setBubbles] = useState<boolean[]>(Array(24).fill(false));
  const [bubbleNote, setBubbleNote] = useState<string | null>(null);

  // Worry Shredder State
  const [worryText, setWorryText] = useState('');
  const [isShredding, setIsShredding] = useState(false);
  const [shreddedMessage, setShreddedMessage] = useState<string | null>(null);

  // Compliment Dispenser State
  const [currentCompliment, setCurrentCompliment] = useState<string>(COMPLIMENTS[0]);
  const [isDispensing, setIsDispensing] = useState(false);

  // Community Smiles
  const [smiles, setSmiles] = useState(INITIAL_SMILES);
  const [newSmileText, setNewSmileText] = useState('');
  const [newSmileAuthor, setNewSmileAuthor] = useState('');
  const [showAddSmile, setShowAddSmile] = useState(false);

  // Active Tool Tab
  const [activeTab, setActiveTab] = useState<'bubbles' | 'shredder' | 'dispenser' | 'wall'>('bubbles');

  // Handle Bubble Pop
  const handlePopBubble = (index: number) => {
    if (bubbles[index]) return;
    const newBubbles = [...bubbles];
    newBubbles[index] = true;
    setBubbles(newBubbles);

    soundManager.playPop();
    onIncrementHappiness();

    const poppedCount = newBubbles.filter(Boolean).length;
    if (poppedCount % 4 === 0) {
      const compliments = [
        "POP! You are doing great today!",
        "POP! Beautiful soul alert!",
        "POP! Sending you a virtual high-five!",
        "POP! Release that tension!",
        "POP! Keep that gentle heart!"
      ];
      setBubbleNote(compliments[Math.floor(Math.random() * compliments.length)]);
      fireSparkleShower();
    }
  };

  const handleResetBubbles = () => {
    setBubbles(Array(24).fill(false));
    setBubbleNote(null);
    soundManager.playPop();
  };

  // Handle Worry Shredder
  const handleShredWorry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!worryText.trim() || isShredding) return;

    setIsShredding(true);
    soundManager.playShred();

    setTimeout(() => {
      setIsShredding(false);
      setShreddedMessage(`"${worryText}" was successfully shredded into cosmic stardust. Take a deep breath: it no longer has power over this moment.`);
      setWorryText('');
      fireSurpriseExplosion();
      onIncrementHappiness();
    }, 1200);
  };

  // Handle Compliment Dispense
  const handleDispenseCompliment = () => {
    if (isDispensing) return;
    setIsDispensing(true);
    soundManager.playPop();

    setTimeout(() => {
      const next = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
      setCurrentCompliment(next);
      setIsDispensing(false);
      soundManager.playChime();
      fireHeartConfetti();
      onIncrementHappiness();
    }, 350);
  };

  // Handle Add Smile
  const handleAddSmile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSmileText.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      author: newSmileAuthor.trim() || 'Friendly Soul',
      text: newSmileText.trim()
    };
    setSmiles([newEntry, ...smiles]);
    setNewSmileText('');
    setNewSmileAuthor('');
    setShowAddSmile(false);
    soundManager.playSuccessFanfare();
    fireSparkleShower();
    onIncrementHappiness();
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-xs uppercase tracking-widest text-pink-300/80 mb-2 font-medium">
          SCENE 05 · THE HAPPINESS ARCADE
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-2">
          The Serotonin Playground 🎡
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
          Tactile mini-toys, worry destructors, and instant heart warmers.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => { setActiveTab('bubbles'); soundManager.playPop(); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'bubbles'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          🫧 Bubble Wrap Popper
        </button>

        <button
          onClick={() => { setActiveTab('shredder'); soundManager.playPop(); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'shredder'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          🔥 The Worry Shredder
        </button>

        <button
          onClick={() => { setActiveTab('dispenser'); soundManager.playPop(); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'dispenser'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          🎰 Compliment Dispenser
        </button>

        <button
          onClick={() => { setActiveTab('wall'); soundManager.playPop(); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'wall'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.4)]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          💌 Smile Wall ({smiles.length})
        </button>
      </div>

      {/* Main Tool Container */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 bg-gradient-to-b from-purple-950/40 via-slate-900/60 to-purple-950/30 shadow-[0_0_40px_rgba(168,85,247,0.15)] min-h-[360px]">
        {/* TAB 1: BUBBLE WRAP POPPER */}
        {activeTab === 'bubbles' && (
          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold font-display text-white mb-1">
                Satisfying Infinite Bubble Wrap 🫧
              </h3>
              <p className="text-xs text-slate-300">
                Tap every bubble for instant tactile stress release. Popped:{' '}
                <span className="text-pink-300 font-bold tabular-nums">
                  {bubbles.filter(Boolean).length} / 24
                </span>
              </p>
            </div>

            {/* Bubble Note Alert */}
            <AnimatePresence>
              {bubbleNote && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 px-4 py-2 rounded-xl bg-pink-500/20 border border-pink-400/40 text-xs font-bold text-pink-200"
                >
                  {bubbleNote}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bubble Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner mb-6">
              {bubbles.map((isPopped, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handlePopBubble(idx)}
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full transition-all cursor-pointer flex items-center justify-center text-xs font-bold ${
                    isPopped
                      ? 'bg-purple-950/60 border border-purple-500/20 text-purple-400/40 shadow-inner'
                      : 'bg-gradient-to-tr from-pink-500/40 to-purple-400/30 border border-pink-300/60 shadow-[0_4px_12px_rgba(244,114,182,0.3)] hover:scale-105 hover:border-pink-200'
                  }`}
                >
                  {isPopped ? '•' : '🫧'}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleResetBubbles}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-300 border border-white/10 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Bubbles</span>
            </motion.button>
          </div>
        )}

        {/* TAB 2: THE WORRY SHREDDER */}
        {activeTab === 'shredder' && (
          <div className="max-w-xl mx-auto flex flex-col items-center text-center">
            <h3 className="text-xl font-bold font-display text-white mb-1">
              The Heavy Thought & Worry Shredder 🔥
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Write whatever is weighing on your mind. Watch it turn into harmless space dust.
            </p>

            <form onSubmit={handleShredWorry} className="w-full space-y-4">
              <div className="relative">
                <textarea
                  value={worryText}
                  onChange={(e) => setWorryText(e.target.value)}
                  placeholder="e.g., 'I am worried I forgot to reply to that email and everyone hates me...'"
                  rows={3}
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400/60 focus:outline-none text-slate-200 text-sm placeholder:text-slate-500 resize-none"
                  disabled={isShredding}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={!worryText.trim() || isShredding}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-red-500 via-rose-500 to-purple-600 hover:from-red-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>{isShredding ? 'SHREDDING INTO SPACE DUST...' : 'SHRED THIS THOUGHT FOREVER 🔥'}</span>
              </motion.button>
            </form>

            <AnimatePresence>
              {shreddedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm text-left flex items-start gap-3"
                >
                  <Sparkles className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-1">Dissolved into Stardust:</strong>
                    <span>{shreddedMessage}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TAB 3: COMPLIMENT DISPENSER */}
        {activeTab === 'dispenser' && (
          <div className="max-w-lg mx-auto flex flex-col items-center text-center">
            <h3 className="text-xl font-bold font-display text-white mb-1">
              Emergency Compliment Dispenser 🎰
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Pull the digital lever whenever you need a pure injection of appreciation.
            </p>

            <motion.div
              key={currentCompliment}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl glass-panel border border-amber-400/30 bg-gradient-to-b from-amber-950/20 to-purple-950/40 w-full mb-6 shadow-md"
            >
              <div className="text-3xl mb-3">✨</div>
              <p className="text-base sm:text-lg font-bold font-display text-amber-200 leading-snug">
                "{currentCompliment}"
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDispenseCompliment}
              disabled={isDispensing}
              className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-100" />
              <span>{isDispensing ? 'DISPENSING LOVE...' : 'DISPENSE NEW COMPLIMENT 🎰'}</span>
            </motion.button>
          </div>
        )}

        {/* TAB 4: SMILE WALL */}
        {activeTab === 'wall' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  The Collective Kindness Wall 💌
                </h3>
                <p className="text-xs text-slate-300">
                  Real reasons people smiled today from around the cosmos.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddSmile(!showAddSmile)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your Smile</span>
              </motion.button>
            </div>

            {/* Add Smile Drawer Form */}
            <AnimatePresence>
              {showAddSmile && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddSmile}
                  className="p-4 rounded-2xl glass-panel border border-pink-400/40 mb-6 space-y-3 bg-pink-950/20"
                >
                  <input
                    type="text"
                    value={newSmileAuthor}
                    onChange={(e) => setNewSmileAuthor(e.target.value)}
                    placeholder="Your Name / Nickname (optional)"
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-400"
                  />
                  <textarea
                    value={newSmileText}
                    onChange={(e) => setNewSmileText(e.target.value)}
                    placeholder="What made you smile or grateful today?"
                    rows={2}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-400 resize-none"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddSmile(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg text-xs font-bold bg-pink-600 text-white hover:bg-pink-500 cursor-pointer"
                    >
                      Post Smile 💖
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Wall Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {smiles.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl glass-panel border border-white/10 bg-white/[0.02] flex flex-col justify-between"
                >
                  <p className="text-sm text-slate-200 mb-3 leading-relaxed">
                    "{item.text}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="text-pink-300 font-medium">@{item.author}</span>
                    <Heart className="w-3.5 h-3.5 text-pink-400/60" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
