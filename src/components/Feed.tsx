import { PostCard } from "./PostCard";
import { Plus, TrendingUp, Image, Paperclip, Smile, Video } from "lucide-react";
import { motion } from "framer-motion";

const stories = [
  { name: "Toi", initials: "A", isOwn: true },
  { name: "Sarah B.", initials: "SB" },
  { name: "Pr. Leclerc", initials: "JL" },
  { name: "Karim T.", initials: "KT" },
  { name: "Dr. Ndiaye", initials: "FN" },
  { name: "Youssef E.", initials: "YE" },
];

const posts = [
  {
    author: "Pr. Jean-Marc Leclerc",
    role: "Professeur · Physique",
    initials: "JL",
    time: "il y a 2h",
    content:
      "Nouveau chapitre publié sur la mécanique quantique relativiste. J'ai inclus les corrections des exercices du TD3 ainsi que des ressources complémentaires sur l'équation de Dirac. N'hésitez pas à poser vos questions ici.",
    tags: ["physique", "quantique", "TD3"],
    likes: 24,
    comments: 8,
    verified: true,
    hasAttachment: true,
    attachmentName: "chapitre-7-mecanique-quantique.pdf",
  },
  {
    author: "Sarah Benali",
    role: "Étudiante · M1 IA",
    initials: "SB",
    time: "il y a 4h",
    content:
      "Quelqu'un a réussi à implémenter le transformer avec attention multi-tête en PyTorch ? Je bloque sur la normalisation des poids. Voici mon code et l'erreur que j'obtiens. Toute aide est la bienvenue !",
    tags: ["IA", "PyTorch", "transformer"],
    likes: 15,
    comments: 12,
  },
  {
    author: "Dr. Fatou Ndiaye",
    role: "Maître de conférences · Littérature",
    initials: "FN",
    time: "il y a 6h",
    content:
      "Rappel : la dissertation sur « Les Fleurs du Mal » est à rendre vendredi. J'ai partagé une grille d'évaluation détaillée dans les ressources du cercle Littérature Comparée. Pensez à citer au moins 3 sources académiques.",
    tags: ["littérature", "dissertation", "Baudelaire"],
    likes: 9,
    comments: 3,
    verified: true,
  },
  {
    author: "Karim Touré",
    role: "Étudiant · L3 Informatique",
    initials: "KT",
    time: "il y a 8h",
    content:
      "Je viens de publier mes notes complètes du cours d'algorithmique avancée. Ça couvre les graphes, la programmation dynamique et les algorithmes d'approximation. Bon courage pour les partiels !",
    tags: ["algorithmique", "révisions", "partiels"],
    likes: 42,
    comments: 17,
    hasAttachment: true,
    attachmentName: "notes-algo-avancee-complet.pdf",
  },
];

export function Feed() {
  return (
    <div className="flex-1 min-w-0 max-w-[680px] mx-auto px-4 py-6">
      {/* Stories */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-3 mb-6 overflow-x-auto scrollbar-hidden pb-2"
      >
        {stories.map((s, i) => (
          <button key={i} className="flex flex-col items-center gap-1.5 shrink-0">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold ${
              s.isOwn
                ? "border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200"
                : "gradient-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
            }`}>
              {s.isOwn ? <Plus className="w-5 h-5" /> : s.initials}
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">{s.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Create Post */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl bg-card card-elevated p-4 mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            A
          </div>
          <div className="flex-1 bg-surface-alt/60 hover:bg-surface-alt rounded-full px-4 py-2.5 cursor-pointer transition-colors duration-200">
            <span className="text-sm text-muted-foreground">Quoi de neuf, Amina ?</span>
          </div>
        </div>
        <div className="flex items-center gap-1 pt-3 border-t border-border/50">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-muted-foreground hover:bg-surface-alt/50 transition-colors duration-200">
            <Video className="w-4 h-4 text-destructive" />
            <span className="font-medium text-xs">Vidéo</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-muted-foreground hover:bg-surface-alt/50 transition-colors duration-200">
            <Image className="w-4 h-4 text-success" />
            <span className="font-medium text-xs">Photo</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-muted-foreground hover:bg-surface-alt/50 transition-colors duration-200">
            <Paperclip className="w-4 h-4 text-primary" />
            <span className="font-medium text-xs">Document</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-muted-foreground hover:bg-surface-alt/50 transition-colors duration-200">
            <Smile className="w-4 h-4 text-warning" />
            <span className="font-medium text-xs">Humeur</span>
          </button>
        </div>
      </motion.div>

      {/* Trending */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card card-elevated mb-6"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">Tendances</span>
        <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hidden">
          {["#partiels2025", "#IA", "#quantique"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium cursor-pointer hover:bg-primary/20 transition-colors duration-200 shrink-0"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} index={i} />
        ))}
      </div>
    </div>
  );
}
