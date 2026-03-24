import { motion } from "framer-motion";
import { FileText, Download, Filter, Search } from "lucide-react";

const resources = [
  { title: "Chapitre 7 — Mécanique Quantique", type: "PDF", size: "2.4 MB", author: "Pr. Leclerc", date: "12 mars", downloads: 128, color: "text-destructive" },
  { title: "Notes Algo Avancée — Complet", type: "PDF", size: "5.1 MB", author: "Karim Touré", date: "10 mars", downloads: 342, color: "text-destructive" },
  { title: "Slides — Introduction aux Transformers", type: "PPTX", size: "8.7 MB", author: "Pr. Kamara", date: "8 mars", downloads: 89, color: "text-warning" },
  { title: "Exercices corrigés — Prog. Dynamique", type: "PDF", size: "1.2 MB", author: "Dr. Dupont", date: "5 mars", downloads: 215, color: "text-destructive" },
  { title: "Bibliographie — Baudelaire", type: "PDF", size: "0.8 MB", author: "Dr. Ndiaye", date: "1 mars", downloads: 45, color: "text-destructive" },
];

export default function RessourcesPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl mb-1">Ressources</h1>
        <p className="text-sm text-muted-foreground mb-5">Documents partagés par votre réseau</p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex-1 flex items-center gap-2 bg-surface-alt rounded-xl px-4 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input placeholder="Rechercher une ressource..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-alt text-sm text-muted-foreground hover:text-foreground transition-all duration-200">
          <Filter className="w-4 h-4" />
          Filtrer
        </button>
      </motion.div>

      <div className="space-y-2">
        {resources.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex items-center gap-4 rounded-2xl bg-card card-elevated card-hover px-5 py-4 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-surface-alt flex items-center justify-center shrink-0">
              <FileText className={`w-5 h-5 ${r.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{r.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{r.author} · {r.date} · {r.size}</p>
            </div>
            <span className="text-xs font-medium rounded-full px-2.5 py-1 bg-surface-alt text-muted-foreground">
              {r.type}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">{r.downloads} ↓</span>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 opacity-0 group-hover:opacity-100">
              <Download className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
