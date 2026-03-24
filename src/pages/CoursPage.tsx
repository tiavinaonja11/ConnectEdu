import { motion } from "framer-motion";
import { BookOpen, FileText, Download, Play, Clock } from "lucide-react";

const courses = [
  { title: "Mécanique Quantique Avancée", prof: "Pr. Jean-Marc Leclerc", progress: 72, chapters: 12, icon: "⚛️" },
  { title: "Intelligence Artificielle", prof: "Pr. Aïcha Kamara", progress: 45, chapters: 8, icon: "🤖" },
  { title: "Algorithmique Avancée", prof: "Dr. Marc Dupont", progress: 90, chapters: 10, icon: "📊" },
  { title: "Littérature Comparée", prof: "Dr. Fatou Ndiaye", progress: 30, chapters: 6, icon: "📚" },
];

export default function CoursPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <h1 className="text-3xl mb-1">Mes Cours</h1>
      <p className="font-mono-ui text-muted-foreground mb-6">4 cours en cours ce semestre</p>
      <div className="space-y-4">
        {courses.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="border border-border rounded-lg p-5 hover:border-muted-foreground/30 transition-colors duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl">{c.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{c.title}</h3>
                <p className="font-mono-ui text-muted-foreground">{c.prof}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 h-1.5 bg-surface-alt rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="font-mono-ui text-xs text-muted-foreground tabular-nums">{c.progress}%</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="font-mono-ui text-xs text-muted-foreground flex items-center gap-1"><BookOpen className="w-3 h-3" />{c.chapters} chapitres</span>
                  <span className="font-mono-ui text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Mis à jour récemment</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
