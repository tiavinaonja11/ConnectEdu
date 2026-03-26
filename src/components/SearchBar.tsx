import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Users, FileText, BookOpen, Hash } from "lucide-react";

const searchResults = {
  members: [
    { name: "Sarah Benali", role: "M1 IA", initials: "SB" },
    { name: "Pr. Leclerc", role: "Physique", initials: "JL" },
  ],
  posts: [
    { title: "Implémentation Transformer en PyTorch", author: "Sarah B." },
    { title: "Chapitre 7 — Mécanique quantique", author: "Pr. Leclerc" },
  ],
  resources: [
    { title: "Notes Algo Avancée", type: "PDF" },
    { title: "Dataset NLP Wolof", type: "CSV" },
  ],
  tags: ["#physique", "#IA", "#transformers", "#partiels2025"],
};

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const hasQuery = query.length > 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-alt/50 hover:bg-surface-alt border border-border/50 hover:border-border text-muted-foreground text-sm transition-all duration-200 w-full max-w-sm"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Rechercher...</span>
        <kbd className="text-[10px] font-mono bg-surface-alt px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher des membres, posts, ressources..."
                  className="flex-1 bg-transparent text-sm outline-none"
                />
                {hasQuery && (
                  <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="max-h-[400px] overflow-y-auto p-3">
                {!hasQuery ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    <p>Tapez pour rechercher dans tout EduConnect</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Members */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> Membres
                      </p>
                      {searchResults.members.map((m) => (
                        <button
                          key={m.name}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-alt transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                            {m.initials}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.role}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Posts */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" /> Publications
                      </p>
                      {searchResults.posts.map((p) => (
                        <button
                          key={p.title}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-alt transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-xl bg-surface-alt flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{p.title}</p>
                            <p className="text-xs text-muted-foreground">par {p.author}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Resources */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Ressources
                      </p>
                      {searchResults.resources.map((r) => (
                        <button
                          key={r.title}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-alt transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-xl bg-warning/10 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-warning" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{r.title}</p>
                            <p className="text-xs text-muted-foreground">{r.type}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Tags */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5" /> Tags
                      </p>
                      <div className="flex flex-wrap gap-2 px-2">
                        {searchResults.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
