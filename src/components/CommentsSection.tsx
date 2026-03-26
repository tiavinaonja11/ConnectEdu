import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Reply, MoreHorizontal, Send } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  initials: string;
  time: string;
  content: string;
  likes: number;
  replies?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Sarah Benali",
    initials: "SB",
    time: "il y a 1h",
    content: "Super chapitre ! La partie sur l'intrication quantique est très bien expliquée.",
    likes: 5,
    replies: [
      {
        id: "1-1",
        author: "Pr. Leclerc",
        initials: "JL",
        time: "il y a 45min",
        content: "Merci Sarah ! J'ai ajouté des exercices supplémentaires sur cette partie.",
        likes: 2,
      },
      {
        id: "1-2",
        author: "Karim Touré",
        initials: "KT",
        time: "il y a 30min",
        content: "J'ai eu du mal avec l'exercice 3, quelqu'un peut m'aider ?",
        likes: 0,
      },
    ],
  },
  {
    id: "2",
    author: "Youssef El Amri",
    initials: "YE",
    time: "il y a 2h",
    content: "Est-ce que ce chapitre sera au partiel ? Merci professeur !",
    likes: 3,
  },
];

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div className={`${depth > 0 ? "ml-10 border-l-2 border-border/40 pl-4" : ""}`}>
      <div className="flex gap-3 py-3">
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
          {comment.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-surface-alt rounded-2xl rounded-tl-md px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold">{comment.author}</span>
              <span className="text-[11px] text-muted-foreground">{comment.time}</span>
            </div>
            <p className="text-sm leading-relaxed">{comment.content}</p>
          </div>

          <div className="flex items-center gap-4 mt-1.5 ml-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                liked ? "text-destructive" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
              {comment.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Reply className="w-3.5 h-3.5" />
              Répondre
            </button>
          </div>

          <AnimatePresence>
            {showReplyInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                  A
                </div>
                <div className="flex-1 flex items-center bg-surface-alt rounded-full px-3 py-2">
                  <input
                    type="text"
                    placeholder={`Répondre à ${comment.author}...`}
                    className="flex-1 bg-transparent text-sm outline-none"
                    autoFocus
                  />
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <>
          {!showReplies && (
            <button
              onClick={() => setShowReplies(true)}
              className="ml-10 text-xs text-primary font-medium hover:underline mb-2"
            >
              Voir {comment.replies.length} réponse{comment.replies.length > 1 ? "s" : ""}
            </button>
          )}
          {showReplies && comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
}

export function CommentsSection({ postIndex }: { postIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="px-5 pb-4"
    >
      <div className="border-t border-border/30 pt-3">
        {mockComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}

        {/* New comment input */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/30">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            A
          </div>
          <div className="flex-1 flex items-center bg-surface-alt rounded-full px-4 py-2.5">
            <input
              type="text"
              placeholder="Écrire un commentaire..."
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button className="text-primary hover:text-primary/80 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
