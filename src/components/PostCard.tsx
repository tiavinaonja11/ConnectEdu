import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Bookmark, Share2, FileText, CheckCircle, MoreHorizontal, Flag, BookOpen, HelpCircle, Megaphone, FolderOpen } from "lucide-react";
import { ReactionsPopover, useReactions } from "./ReactionsPopover";
import { CommentsSection } from "./CommentsSection";

const categoryConfig = {
  cours: { label: "Cours", icon: BookOpen, accent: "bg-primary/10 text-primary border-primary/20", bar: "bg-primary" },
  question: { label: "Question", icon: HelpCircle, accent: "bg-warning/10 text-warning border-warning/20", bar: "bg-warning" },
  annonce: { label: "Annonce", icon: Megaphone, accent: "bg-destructive/10 text-destructive border-destructive/20", bar: "bg-destructive" },
  ressource: { label: "Ressource", icon: FolderOpen, accent: "bg-success/10 text-success border-success/20", bar: "bg-success" },
} as const;

interface PostCardProps {
  author: string;
  role: string;
  initials: string;
  time: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  verified?: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
  index: number;
  category?: keyof typeof categoryConfig;
}

export function PostCard({
  author, role, initials, time, content, tags, likes, comments,
  verified, hasAttachment, attachmentName, index, category,
}: PostCardProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { activeReaction, toggleReaction, getReactionEmoji } = useReactions();

  const handleReact = (key: string) => {
    const wasActive = activeReaction === key;
    toggleReaction(key);
    setLikeCount(wasActive ? likes : likes + 1);
    setShowReactions(false);
  };

  const cat = category ? categoryConfig[category] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-card card-elevated overflow-hidden group/card"
    >
      <div className="flex">
        {/* Category accent bar */}
        {cat && <div className={`w-1 shrink-0 ${cat.bar}`} />}

        <div className="flex-1 min-w-0">
          <div className="p-5">
            {/* Category badge + header */}
            <div className="flex items-start gap-3 mb-3.5">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0 shadow-md shadow-primary/15">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{author}</span>
                  {verified && <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/20" />}
                  {cat && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${cat.accent} ml-1 flex items-center gap-1`}>
                      <cat.icon className="w-2.5 h-2.5" />
                      {cat.label}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <span>{role}</span>
                  <span className="opacity-40">·</span>
                  <span>{time}</span>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowReport(!showReport)}
                  className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-surface-alt transition-all duration-200 opacity-0 group-hover/card:opacity-100"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showReport && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -4 }}
                      className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-xl z-40 overflow-hidden"
                    >
                      <button
                        onClick={() => setShowReport(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 w-full transition-colors"
                      >
                        <Flag className="w-4 h-4" />
                        Signaler
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Content */}
            <p className="text-[14px] leading-[1.65] mb-3.5 text-foreground/90">{content}</p>

            {/* Attachment */}
            {hasAttachment && (
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-surface-alt/60 border border-border/40 mb-3.5 hover:bg-surface-alt hover:border-border/60 transition-all duration-200 cursor-pointer group/file">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/file:bg-primary/15 transition-colors">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] font-medium truncate block">{attachmentName}</span>
                  <span className="text-[10px] text-muted-foreground">PDF · Cliquez pour ouvrir</span>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-surface-alt text-muted-foreground font-medium hover:text-primary hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions — minimal, academic */}
          <div className="flex items-center border-t border-border/30 px-3">
            <div className="relative flex-1">
              <button
                onClick={() => handleReact("love")}
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all duration-200 rounded-lg mx-0.5 my-0.5 ${
                  activeReaction
                    ? "text-destructive"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
                }`}
              >
                {activeReaction ? (
                  <span className="text-base leading-none">{getReactionEmoji(activeReaction)}</span>
                ) : (
                  <Heart className="w-4 h-4" />
                )}
                <span className="tabular-nums">{likeCount}</span>
              </button>
              <div
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                <ReactionsPopover show={showReactions} onReact={handleReact} />
              </div>
            </div>
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all duration-200 rounded-lg mx-0.5 my-0.5 ${
                showComments ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="tabular-nums">{comments}</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-surface-alt/50 transition-all duration-200 rounded-lg mx-0.5 my-0.5">
              <Share2 className="w-4 h-4" />
              <span>Partager</span>
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2.5 transition-all duration-200 rounded-lg mx-0.5 my-0.5 ${
                saved ? "text-warning" : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Comments */}
          <AnimatePresence>
            {showComments && <CommentsSection postIndex={index} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
