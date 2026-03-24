import { motion } from "framer-motion";
import { BookOpen, Clock, Play, ChevronRight } from "lucide-react";

const courses = [
  { title: "Mécanique Quantique Avancée", prof: "Pr. Jean-Marc Leclerc", progress: 72, chapters: 12, icon: "⚛️", color: "from-primary/20 to-accent/10" },
  { title: "Intelligence Artificielle", prof: "Pr. Aïcha Kamara", progress: 45, chapters: 8, icon: "🤖", color: "from-accent/20 to-primary/10" },
  { title: "Algorithmique Avancée", prof: "Dr. Marc Dupont", progress: 90, chapters: 10, icon: "📊", color: "from-success/20 to-primary/10" },
  { title: "Littérature Comparée", prof: "Dr. Fatou Ndiaye", progress: 30, chapters: 6, icon: "📚", color: "from-warning/20 to-destructive/10" },
];

export default function CoursPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl mb-1">Mes Cours</h1>
        <p className="text-sm text-muted-foreground mb-6">4 cours en cours ce semestre</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {courses.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-2xl bg-card card-elevated card-hover overflow-hidden cursor-pointer group"
          >
            {/* Cover */}
            <div className={`h-24 bg-gradient-to-br ${c.color} flex items-center justify-center relative`}>
              <span className="text-4xl">{c.icon}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg shadow-primary/20">
                <Play className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-sm mb-0.5">{c.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{c.prof}</p>

              {/* Progress */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-2 bg-surface-alt rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
                <span className="text-xs font-bold text-primary tabular-nums">{c.progress}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1"><BookOpen className="w-3 h-3" />{c.chapters} ch.</span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Récent</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-200" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
