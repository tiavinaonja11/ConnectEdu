import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle, MoreHorizontal } from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollCardProps {
  author: string;
  initials: string;
  role: string;
  time: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  index: number;
}

export function PollCard({ author, initials, role, time, question, options: initialOptions, totalVotes: initialTotal, index }: PollCardProps) {
  const [voted, setVoted] = useState<string | null>(null);
  const [options, setOptions] = useState(initialOptions);
  const [totalVotes, setTotalVotes] = useState(initialTotal);

  const handleVote = (optionId: string) => {
    if (voted) return;
    setVoted(optionId);
    setTotalVotes((p) => p + 1);
    setOptions((prev) =>
      prev.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o))
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="rounded-2xl bg-card card-elevated overflow-hidden"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0 shadow-md shadow-primary/20">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold">{author}</span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <span>{role}</span>
              <span>·</span>
              <span>{time}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold flex items-center gap-1">
              <BarChart3 className="w-3 h-3" /> Sondage
            </span>
            <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-[15px] font-semibold mb-4">{question}</h3>

        <div className="space-y-2.5">
          {options.map((option) => {
            const percentage = voted ? Math.round((option.votes / totalVotes) * 100) : 0;
            const isSelected = voted === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={!!voted}
                className={`w-full relative rounded-xl overflow-hidden text-left transition-all duration-300 ${
                  voted ? "cursor-default" : "hover:border-primary cursor-pointer"
                } border-2 ${isSelected ? "border-primary" : "border-border"}`}
              >
                {voted && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    className={`absolute inset-y-0 left-0 ${isSelected ? "bg-primary/15" : "bg-surface-alt/50"}`}
                  />
                )}
                <div className="relative flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2">
                    {isSelected && <CheckCircle className="w-4 h-4 text-primary" />}
                    <span className="text-sm font-medium">{option.text}</span>
                  </div>
                  {voted && (
                    <span className={`text-sm font-bold tabular-nums ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                      {percentage}%
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-3">{totalVotes} votes</p>
      </div>
    </motion.article>
  );
}
