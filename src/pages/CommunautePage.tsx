import { motion } from "framer-motion";
import { MessageSquare, UserPlus, Search } from "lucide-react";

const members = [
  { name: "Pr. Jean-Marc Leclerc", role: "Professeur · Physique", initials: "JL", posts: 47, following: true },
  { name: "Dr. Fatou Ndiaye", role: "MCF · Littérature", initials: "FN", posts: 32, following: false },
  { name: "Sarah Benali", role: "Étudiante · M1 IA", initials: "SB", posts: 28, following: true },
  { name: "Karim Touré", role: "Étudiant · L3 Info", initials: "KT", posts: 19, following: false },
  { name: "Pr. Aïcha Kamara", role: "Professeur · IA", initials: "AK", posts: 53, following: true },
  { name: "Youssef El Amrani", role: "Doctorant · Maths", initials: "YE", posts: 14, following: false },
];

export default function CommunautePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl mb-1">Communauté</h1>
        <p className="text-sm text-muted-foreground mb-5">{members.length} membres actifs dans votre réseau</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5">
        <div className="flex items-center gap-2 bg-surface-alt rounded-xl px-4 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input placeholder="Rechercher un membre..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50" />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-2xl bg-card card-elevated card-hover overflow-hidden"
          >
            {/* Cover */}
            <div className="h-16 gradient-primary opacity-30" />
            <div className="px-4 pb-4 -mt-6">
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-sm font-bold ring-4 ring-card gradient-primary text-primary-foreground mb-2">
                {m.initials}
              </div>
              <p className="text-sm font-semibold">{m.name}</p>
              <p className="text-[11px] text-muted-foreground mb-3">{m.role}</p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />{m.posts} posts
                </span>
                <button className={`ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                  m.following
                    ? "bg-surface-alt text-muted-foreground hover:text-foreground"
                    : "gradient-primary text-primary-foreground shadow-sm shadow-primary/20 hover:shadow-md"
                }`}>
                  {m.following ? "Suivi" : <><UserPlus className="w-3 h-3" />Suivre</>}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
