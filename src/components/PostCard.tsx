import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Bookmark, Share2, FileText, CheckCircle, MoreHorizontal, Flag } from "lucide-react";
import { ReactionsPopover, useReactions } from "./ReactionsPopover";
import { CommentsSection } from "./CommentsSection";

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
}

export function PostCard({
  author, role, initials, time, content, tags, likes, comments,
  verified, hasAttachment, attachmentName, index,
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

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="rounded-2xl bg-card card-elevated card-hover overflow-hidden"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0 shadow-md shadow-primary/20">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold">{author}</span>
              {verified && <CheckCircle className="w-4 h-4 text-primary fill-primary/20" />}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <span>{role}</span>
              <span>·</span>
              <span>{time}</span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowReport(!showReport)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-all duration-200"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showReport && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
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

        {/* Content with @mentions */}
        <p className="text-[15px] leading-relaxed mb-4">{content}</p>

        {/* Attachment */}
        {hasAttachment && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-alt/80 border border-border/50 mb-4 hover:bg-surface-alt transition-colors duration-200 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium truncate block">{attachmentName}</span>
              <span className="text-[11px] text-muted-foreground">PDF · Cliquez pour ouvrir</span>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center border-t border-border/50 px-2">
        <div className="relative flex-1">
          <button
            onClick={() => handleReact("love")}
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
            className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-200 rounded-lg mx-1 my-1 ${
              activeReaction
                ? "text-destructive"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
            }`}
          >
            {activeReaction ? (
              <span className="text-lg leading-none">{getReactionEmoji(activeReaction)}</span>
            ) : (
              <Heart className="w-[18px] h-[18px]" />
            )}
            <span className="tabular-nums text-xs">{likeCount}</span>
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
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-200 rounded-lg mx-1 my-1 ${
            showComments ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
          }`}
        >
          <MessageSquare className="w-[18px] h-[18px]" />
          <span className="tabular-nums text-xs">{comments}</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-alt/50 transition-all duration-200 rounded-lg mx-1 my-1">
          <Share2 className="w-[18px] h-[18px]" />
          <span className="text-xs">Partager</span>
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className={`p-3 transition-all duration-200 rounded-lg mx-1 my-1 ${
            saved ? "text-warning" : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
          }`}
        >
          <Bookmark className={`w-[18px] h-[18px] ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && <CommentsSection postIndex={index} />}
      </AnimatePresence>
    </motion.article>
  );
}
