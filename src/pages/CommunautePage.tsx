import { motion } from "framer-motion";
import { Users, MessageSquare } from "lucide-react";

const members = [
  { name: "Pr. Jean-Marc Leclerc", role: "Professeur · Physique", initials: "JL", posts: 47 },
  { name: "Dr. Fatou Ndiaye", role: "MCF · Littérature", initials: "FN", posts: 32 },
  { name: "Sarah Benali", role: "Étudiante · M1 IA", initials: "SB", posts: 28 },
  { name: "Karim Touré", role: "Étudiant · L3 Info", initials: "KT", posts: 19 },
  { name: "Pr. Aïcha Kamara", role: "Professeur · IA", initials: "AK", posts: 53 },
  { name: "Youssef El Amrani", role: "Doctorant · Maths", initials: "YE", posts: 14 },
];

export default function CommunautePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <h1 className="text-3xl mb-1">Communauté</h1>
      <p className="font-mono-ui text-muted-foreground mb-6">{members.length} membres actifs dans votre réseau</p>
      <div className="grid grid-cols-2 gap-3">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className="border border-border rounded-lg p-4 hover:border-muted-foreground/30 transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center text-sm font-semibold">{m.initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{m.name}</p>
                <p className="font-mono-ui text-xs text-muted-foreground">{m.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
              <span className="font-mono-ui text-xs text-muted-foreground flex items-center gap-1"><MessageSquare className="w-3 h-3" />{m.posts} publications</span>
              <button className="ml-auto text-xs px-3 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition-colors duration-300">Suivre</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
