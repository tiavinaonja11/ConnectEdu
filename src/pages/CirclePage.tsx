import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, FileText, ArrowLeft, BookOpen, Heart, MessageSquare, CheckCircle } from "lucide-react";

const circlesData: Record<string, {
  name: string;
  description: string;
  members: number;
  icon: string;
  posts: { author: string; initials: string; role: string; content: string; time: string; likes: number; comments: number; verified?: boolean }[];
  resources: { title: string; type: string; author: string }[];
  topMembers: { name: string; initials: string; role: string }[];
}> = {
  "physique-quantique": {
    name: "Physique Quantique",
    description: "Discussions et ressources sur la mécanique quantique, la physique des particules et la cosmologie.",
    members: 128,
    icon: "⚛️",
    posts: [
      { author: "Pr. Jean-Marc Leclerc", initials: "JL", role: "Professeur", content: "Nouveau support sur l'équation de Dirac avec exercices corrigés. Consultez les ressources du cercle.", time: "il y a 3h", likes: 18, comments: 5, verified: true },
      { author: "Youssef El Amrani", initials: "YE", role: "Doctorant", content: "Question : comment interpréter physiquement le spin 1/2 dans le formalisme de Dirac ?", time: "il y a 5h", likes: 7, comments: 12 },
    ],
    resources: [
      { title: "Chapitre 7 — Équation de Dirac", type: "PDF", author: "Pr. Leclerc" },
      { title: "Exercices corrigés — Spin", type: "PDF", author: "Pr. Leclerc" },
    ],
    topMembers: [
      { name: "Pr. Jean-Marc Leclerc", initials: "JL", role: "Professeur" },
      { name: "Youssef El Amrani", initials: "YE", role: "Doctorant" },
      { name: "Amina Diallo", initials: "AD", role: "M2 Physique" },
    ],
  },
  "intelligence-artificielle": {
    name: "Intelligence Artificielle",
    description: "Machine learning, deep learning, NLP et vision par ordinateur. Partagez vos projets et questions.",
    members: 342,
    icon: "🤖",
    posts: [
      { author: "Pr. Aïcha Kamara", initials: "AK", role: "Professeur", content: "Le TP sur les GANs est disponible. Deadline : vendredi prochain.", time: "il y a 2h", likes: 32, comments: 9, verified: true },
      { author: "Sarah Benali", initials: "SB", role: "M1 IA", content: "Mon implémentation du Vision Transformer donne 94% sur CIFAR-10. Voici mon notebook si ça intéresse quelqu'un.", time: "il y a 6h", likes: 28, comments: 15 },
    ],
    resources: [
      { title: "Slides — Transformers et Attention", type: "PPTX", author: "Pr. Kamara" },
      { title: "TP GANs — Énoncé", type: "PDF", author: "Pr. Kamara" },
    ],
    topMembers: [
      { name: "Pr. Aïcha Kamara", initials: "AK", role: "Professeur" },
      { name: "Sarah Benali", initials: "SB", role: "M1 IA" },
      { name: "Karim Touré", initials: "KT", role: "L3 Info" },
    ],
  },
  "sciences-politiques": {
    name: "Sciences Politiques",
    description: "Géopolitique, relations internationales et analyse des politiques publiques.",
    members: 89,
    icon: "🌍",
    posts: [
      { author: "Dr. Claire Martin", initials: "CM", role: "MCF", content: "Débat cette semaine : l'impact de l'IA sur la gouvernance démocratique. Préparez vos arguments.", time: "il y a 1j", likes: 14, comments: 21, verified: true },
    ],
    resources: [
      { title: "Bibliographie — Gouvernance numérique", type: "PDF", author: "Dr. Martin" },
    ],
    topMembers: [
      { name: "Dr. Claire Martin", initials: "CM", role: "MCF" },
      { name: "Omar Diop", initials: "OD", role: "M1 Sc. Po" },
    ],
  },
  "litterature-comparee": {
    name: "Littérature Comparée",
    description: "Analyse littéraire, poésie, roman et théâtre à travers les cultures et les époques.",
    members: 67,
    icon: "📚",
    posts: [
      { author: "Dr. Fatou Ndiaye", initials: "FN", role: "MCF", content: "Rappel : la dissertation sur Baudelaire est à rendre vendredi. Grille d'évaluation disponible dans les ressources.", time: "il y a 6h", likes: 9, comments: 3, verified: true },
    ],
    resources: [
      { title: "Grille d'évaluation — Dissertation", type: "PDF", author: "Dr. Ndiaye" },
      { title: "Bibliographie — Baudelaire", type: "PDF", author: "Dr. Ndiaye" },
    ],
    topMembers: [
      { name: "Dr. Fatou Ndiaye", initials: "FN", role: "MCF" },
      { name: "Léa Rousseau", initials: "LR", role: "L3 Lettres" },
    ],
  },
};

export default function CirclePage() {
  const { slug } = useParams();
  const circle = circlesData[slug || ""];

  if (!circle) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-6">
        <p className="text-muted-foreground">Cercle introuvable.</p>
        <Link to="/" className="text-primary text-sm mt-2 inline-block">← Retour au fil</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      {/* Header */}
      <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-4">
        <ArrowLeft className="w-3.5 h-3.5" />
        Retour
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="border border-border rounded-lg p-6 mb-6"
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl">{circle.icon}</span>
          <div className="flex-1">
            <h1 className="text-3xl">{circle.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{circle.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="font-mono-ui text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" />{circle.members} membres</span>
              <span className="font-mono-ui text-xs text-muted-foreground flex items-center gap-1"><FileText className="w-3 h-3" />{circle.resources.length} ressources</span>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300">
            Rejoindre
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Posts */}
        <div className="col-span-2 space-y-4">
          <h2 className="font-serif text-xl mb-3">Publications</h2>
          {circle.posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="border border-border rounded-lg p-4 hover:border-muted-foreground/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center text-xs font-semibold">{post.initials}</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{post.author}</span>
                    {post.verified && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <p className="font-mono-ui text-xs text-muted-foreground">{post.role} · {post.time}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3">{post.content}</p>
              <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                <span className="flex items-center gap-1 text-muted-foreground text-sm"><Heart className="w-3.5 h-3.5" /><span className="font-mono-ui text-xs tabular-nums">{post.likes}</span></span>
                <span className="flex items-center gap-1 text-muted-foreground text-sm"><MessageSquare className="w-3.5 h-3.5" /><span className="font-mono-ui text-xs tabular-nums">{post.comments}</span></span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Members */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Membres actifs</h3>
            <div className="space-y-2.5">
              {circle.topMembers.map((m) => (
                <div key={m.name} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-surface-alt flex items-center justify-center text-xs font-semibold">{m.initials}</div>
                  <div>
                    <p className="text-xs font-medium">{m.name}</p>
                    <p className="font-mono-ui text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Ressources</h3>
            <div className="space-y-2">
              {circle.resources.map((r) => (
                <div key={r.title} className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-surface-alt/50 transition-colors duration-300 cursor-pointer">
                  <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{r.title}</p>
                    <p className="font-mono-ui text-xs text-muted-foreground">{r.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
