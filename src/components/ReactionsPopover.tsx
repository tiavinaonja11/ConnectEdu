import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reactions = [
  { emoji: "❤️", label: "J'adore", key: "love" },
  { emoji: "👏", label: "Bravo", key: "clap" },
  { emoji: "🔥", label: "Incroyable", key: "fire" },
  { emoji: "💡", label: "Instructif", key: "idea" },
  { emoji: "😂", label: "Drôle", key: "laugh" },
  { emoji: "😮", label: "Waouh", key: "wow" },
];

interface ReactionsPopoverProps {
  show: boolean;
  onReact: (reaction: string) => void;
}

export function ReactionsPopover({ show, onReact }: ReactionsPopoverProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute bottom-full left-0 mb-2 flex items-center gap-1 bg-card border border-border rounded-full px-2 py-1.5 shadow-xl z-50"
        >
          {reactions.map((r, i) => (
            <motion.button
              key={r.key}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 500 }}
              whileHover={{ scale: 1.4, y: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onReact(r.key)}
              className="text-xl p-1 hover:bg-surface-alt rounded-full transition-colors"
              title={r.label}
            >
              {r.emoji}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useReactions() {
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const getReactionEmoji = (key: string) => {
    return reactions.find((r) => r.key === key)?.emoji ?? "❤️";
  };

  const toggleReaction = (key: string) => {
    setActiveReaction((prev) => (prev === key ? null : key));
  };

  return { activeReaction, toggleReaction, getReactionEmoji };
}
