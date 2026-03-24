import { PostCard } from "./PostCard";
import { Plus, TrendingUp } from "lucide-react";

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
    <div className="flex-1 min-w-0 max-w-[800px] mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl">Fil d'actualité</h1>
          <p className="font-mono-ui text-muted-foreground mt-1">
            Dernières publications de votre réseau
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300">
          <Plus className="w-4 h-4" />
          Publier
        </button>
      </div>

      {/* Trending */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border mb-6">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">Tendances :</span>
        <div className="flex gap-2">
          {["#partiels2025", "#IA", "#quantique"].map((tag) => (
            <span
              key={tag}
              className="font-mono-ui text-xs px-2 py-0.5 rounded bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} index={i} />
        ))}
      </div>
    </div>
  );
}
