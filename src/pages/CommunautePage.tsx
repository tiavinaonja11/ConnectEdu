import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, UserPlus, UserMinus, Search, Filter, BadgeCheck, SlidersHorizontal } from "lucide-react";

const members = [
  { name: "Pr. Jean-Marc Leclerc", role: "Professeur · Physique", initials: "JL", posts: 47, following: true, isEnseignant: true },
  { name: "Dr. Fatou Ndiaye", role: "MCF · Littérature", initials: "FN", posts: 32, following: false, isEnseignant: true },
  { name: "Sarah Benali", role: "Étudiante · M1 IA", initials: "SB", posts: 28, following: true, isEnseignant: false },
  { name: "Karim Touré", role: "Étudiant · L3 Info", initials: "KT", posts: 19, following: false, isEnseignant: false },
  { name: "Pr. Aïcha Kamara", role: "Professeur · IA", initials: "AK", posts: 53, following: true, isEnseignant: true },
  { name: "Youssef El Amrani", role: "Doctorant · Maths", initials: "YE", posts: 14, following: false, isEnseignant: false },
  { name: "Mariama Sow", role: "Étudiante · M2 Data", initials: "MS", posts: 8, following: false, isEnseignant: false },
  { name: "Pr. Ousmane Ba", role: "Professeur · Chimie", initials: "OB", posts: 61, following: false, isEnseignant: true },
];

const filters = ["Tous", "Enseignants", "Étudiants", "Suivis"];

export default function CommunautePage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [followState, setFollowState] = useState<Record<string, boolean>>(
    Object.fromEntries(members.map(m => [m.name, m.following]))
  );

  const toggleFollow = (name: string) => {
    setFollowState(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const filtered = members.filter(m => {
    const matchesQuery = m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.role.toLowerCase().includes(query.toLowerCase());
    if (!matchesQuery) return false;
    if (activeFilter === "Enseignants") return m.isEnseignant;
    if (activeFilter === "Étudiants") return !m.isEnseignant;
    if (activeFilter === "Suivis") return followState[m.name];
    return true;
  });

  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl mb-1">Communauté</h1>
        <p className="text-sm text-muted-foreground mb-5">{members.length} membres actifs dans votre réseau</p>
      </motion.div>

      {/* Search + Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5 space-y-3">
        <div className="flex items-center gap-2 bg-surface-alt rounded-xl px-4 py-2.5 border border-border/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom, filière, rôle..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
              <span className="text-xs">✕</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                activeFilter === f
                  ? "gradient-primary text-primary-foreground shadow-sm"
                  : "bg-surface-alt text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-3">
        {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Members Grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((m, i) => (
            <motion.div
              key={m.name}
              layout
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-2xl bg-card card-elevated card-hover overflow-hidden"
            >
              <div className="h-16 gradient-primary opacity-30" />
              <div className="px-4 pb-4 -mt-6">
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-sm font-bold ring-4 ring-card gradient-primary text-primary-foreground mb-2">
                  {m.initials}
                </div>
                <p className="text-sm font-semibold flex items-center gap-1">
                  {m.name}
                  {m.isEnseignant && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
                </p>
                <p className="text-[11px] text-muted-foreground mb-3">{m.role}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />{m.posts} posts
                  </span>
                  <button
                    onClick={() => toggleFollow(m.name)}
                    className={`ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 active:scale-95 ${
                      followState[m.name]
                        ? "bg-surface-alt text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        : "gradient-primary text-primary-foreground shadow-sm shadow-primary/20 hover:shadow-md"
                    }`}
                  >
                    {followState[m.name] ? (
                      <><UserMinus className="w-3 h-3" />Suivi</>
                    ) : (
                      <><UserPlus className="w-3 h-3" />Suivre</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Aucun membre trouvé</p>
          <p className="text-xs mt-1">Essayez avec un autre terme de recherche</p>
        </motion.div>
      )}
    </div>
  );
}
