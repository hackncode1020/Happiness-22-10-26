import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Copy, Check, Sparkles, Send } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface ShareGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GIFT_TEMPLATES = [
  "You didn't find this website. This website found you. Passing along a little pocket of pure happiness for your day! 💖",
  "Hey! Thought of you today and wanted to send this little digital hug. You're doing amazing! 🌟",
  "Sending you emergency serotonin. Open when you need a smile: The Happiness Machine is waiting for you! 🎁",
];

export const ShareGiftModal: React.FC<ShareGiftModalProps> = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://thehappinessmachine.app';

  const fullShareMessage = `💖 FOR ${recipient ? recipient.toUpperCase() : 'SOMEONE SPECIAL'}:\n"${GIFT_TEMPLATES[selectedTemplate]}"\n\nExperience The Happiness Machine here: ${currentUrl}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullShareMessage);
      setCopied(true);
      soundManager.playSuccessFanfare();
      fireHeartConfetti();
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-panel border border-pink-400/40 bg-gradient-to-b from-[#180d30] to-[#0d071a] shadow-[0_0_60px_rgba(236,72,153,0.3)] text-left"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-pink-300 font-semibold mb-2">
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
            <span>Pass On The Magic</span>
          </div>

          <h3 className="text-2xl font-bold font-display text-white mb-2">
            Send A Pocket Of Happiness 🎁
          </h3>

          <p className="text-xs text-slate-300 mb-6">
            Make someone's day brighter. Send them a personal link to The Happiness Machine.
          </p>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Who are you sending this to?
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Maya, My best friend, Mum..."
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Choose a warm message:
              </label>
              <div className="space-y-2">
                {GIFT_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedTemplate(idx);
                      soundManager.playPop();
                    }}
                    className={`w-full p-3 text-left rounded-xl text-xs sm:text-sm border transition-all cursor-pointer ${
                      selectedTemplate === idx
                        ? 'border-pink-400 bg-pink-500/15 text-pink-100 shadow-[0_0_15px_rgba(244,114,182,0.2)]'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    "{tmpl}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY SHAREABLE GIFT 💌</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
