import { motion } from "framer-motion";
import { FileText, Download, Eye, Bookmark } from "lucide-react";

const resources = [
  { title: "Chapitre 7 — Mécanique Quantique", type: "PDF", size: "2.4 MB", author: "Pr. Leclerc", date: "12 mars 2025", downloads: 128 },
  { title: "Notes Algo Avancée — Complet", type: "PDF", size: "5.1 MB", author: "Karim Touré", date: "10 mars 2025", downloads: 342 },
  { title: "Slides — Introduction aux Transformers", type: "PPTX", size: "8.7 MB", author: "Pr. Kamara", date: "8 mars 2025", downloads: 89 },
  { title: "Exercices corrigés — Programmation Dynamique", type: "PDF", size: "1.2 MB", author: "Dr. Dupont", date: "5 mars 2025", downloads: 215 },
  { title: "Bibliographie — Baudelaire et la modernité", type: "PDF", size: "0.8 MB", author: "Dr. Ndiaye", date: "1 mars 2025", downloads: 45 },
];

export default function RessourcesPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <h1 className="text-3xl mb-1">Ressources</h1>
      <p className="font-mono-ui text-muted-foreground mb-6">Documents partagés par votre réseau</p>
      <div className="space-y-2">
        {resources.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex items-center gap-4 border border-border rounded-lg px-4 py-3 hover:border-muted-foreground/30 transition-colors duration-300 group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{r.title}</p>
              <p className="font-mono-ui text-xs text-muted-foreground">{r.author} · {r.date} · {r.size}</p>
            </div>
            <span className="font-mono-ui text-xs text-muted-foreground/60 group-hover:text-muted-foreground tabular-nums transition-colors duration-300">{r.downloads} ↓</span>
            <button className="text-muted-foreground hover:text-foreground transition-colors duration-300"><Download className="w-4 h-4" /></button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
