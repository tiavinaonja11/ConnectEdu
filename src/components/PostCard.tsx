import { motion } from "framer-motion";
import { Heart, MessageSquare, Bookmark, Share2, FileText, CheckCircle } from "lucide-react";

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
  author,
  role,
  initials,
  time,
  content,
  tags,
  likes,
  comments,
  verified,
  hasAttachment,
  attachmentName,
  index,
}: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="border border-border rounded-lg p-5 hover:border-muted-foreground/30 transition-colors duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-surface-alt flex items-center justify-center text-sm font-semibold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{author}</span>
            {verified && (
              <CheckCircle className="w-3.5 h-3.5 text-primary" />
            )}
          </div>
          <div className="flex items-center gap-2 font-mono-ui text-muted-foreground">
            <span>{role}</span>
            <span>·</span>
            <span>{time}</span>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors duration-300">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed mb-3">{content}</p>

      {/* Attachment */}
      {hasAttachment && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-alt/50 border border-border mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">{attachmentName}</span>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono-ui text-xs px-2 py-0.5 rounded bg-surface-alt text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-border/50">
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
          <Heart className="w-4 h-4" />
          <span className="font-mono-ui text-xs tabular-nums">{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
          <MessageSquare className="w-4 h-4" />
          <span className="font-mono-ui text-xs tabular-nums">{comments}</span>
        </button>
        <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors duration-300">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
}
