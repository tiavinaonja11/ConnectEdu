import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, FileText, ArrowLeft, Heart, MessageSquare, CheckCircle, Share2, UserPlus } from "lucide-react";

const circlesData: Record<string, {
  name: string;
  description: string;
  members: number;
  icon: string;
  gradient: string;
  posts: { author: string; initials: string; role: string; content: string; time: string; likes: number; comments: number; verified?: boolean }[];
  resources: { title: string; type: string; author: string }[];
  topMembers: { name: string; initials: string; role: string; online?: boolean }[];
}> = {
  "physique-quantique": {
    name: "Physique Quantique",
    description: "Discussions et ressources sur la mécanique quantique, la physique des particules et la cosmologie.",
    members: 128, icon: "⚛️", gradient: "from-primary/30 to-accent/20",
    posts: [
      { author: "Pr. Jean-Marc Leclerc", initials: "JL", role: "Professeur", content: "Nouveau support sur l'équation de Dirac avec exercices corrigés. Consultez les ressources du cercle.", time: "il y a 3h", likes: 18, comments: 5, verified: true },
      { author: "Youssef El Amrani", initials: "YE", role: "Doctorant", content: "Question : comment interpréter physiquement le spin 1/2 dans le formalisme de Dirac ?", time: "il y a 5h", likes: 7, comments: 12 },
    ],
    resources: [
      { title: "Chapitre 7 — Équation de Dirac", type: "PDF", author: "Pr. Leclerc" },
      { title: "Exercices corrigés — Spin", type: "PDF", author: "Pr. Leclerc" },
    ],
    topMembers: [
      { name: "Pr. Jean-Marc Leclerc", initials: "JL", role: "Professeur", online: true },
      { name: "Youssef El Amrani", initials: "YE", role: "Doctorant" },
      { name: "Amina Diallo", initials: "AD", role: "M2 Physique", online: true },
    ],
  },
  "intelligence-artificielle": {
    name: "Intelligence Artificielle",
    description: "Machine learning, deep learning, NLP et vision par ordinateur.",
    members: 342, icon: "🤖", gradient: "from-accent/30 to-primary/20",
    posts: [
      { author: "Pr. Aïcha Kamara", initials: "AK", role: "Professeur", content: "Le TP sur les GANs est disponible. Deadline : vendredi prochain.", time: "il y a 2h", likes: 32, comments: 9, verified: true },
      { author: "Sarah Benali", initials: "SB", role: "M1 IA", content: "Mon implémentation du Vision Transformer donne 94% sur CIFAR-10.", time: "il y a 6h", likes: 28, comments: 15 },
    ],
    resources: [
      { title: "Slides — Transformers et Attention", type: "PPTX", author: "Pr. Kamara" },
      { title: "TP GANs — Énoncé", type: "PDF", author: "Pr. Kamara" },
    ],
    topMembers: [
      { name: "Pr. Aïcha Kamara", initials: "AK", role: "Professeur", online: true },
      { name: "Sarah Benali", initials: "SB", role: "M1 IA", online: true },
      { name: "Karim Touré", initials: "KT", role: "L3 Info" },
    ],
  },
  "sciences-politiques": {
    name: "Sciences Politiques",
    description: "Géopolitique, relations internationales et analyse des politiques publiques.",
    members: 89, icon: "🌍", gradient: "from-success/30 to-primary/20",
    posts: [
      { author: "Dr. Claire Martin", initials: "CM", role: "MCF", content: "Débat cette semaine : l'impact de l'IA sur la gouvernance démocratique. Préparez vos arguments.", time: "il y a 1j", likes: 14, comments: 21, verified: true },
    ],
    resources: [{ title: "Bibliographie — Gouvernance numérique", type: "PDF", author: "Dr. Martin" }],
    topMembers: [
      { name: "Dr. Claire Martin", initials: "CM", role: "MCF", online: true },
      { name: "Omar Diop", initials: "OD", role: "M1 Sc. Po" },
    ],
  },
  "litterature-comparee": {
    name: "Littérature Comparée",
    description: "Analyse littéraire, poésie, roman et théâtre à travers les cultures et les époques.",
    members: 67, icon: "📚", gradient: "from-warning/30 to-destructive/20",
    posts: [
      { author: "Dr. Fatou Ndiaye", initials: "FN", role: "MCF", content: "Rappel : la dissertation sur Baudelaire est à rendre vendredi.", time: "il y a 6h", likes: 9, comments: 3, verified: true },
    ],
    resources: [
      { title: "Grille d'évaluation — Dissertation", type: "PDF", author: "Dr. Ndiaye" },
      { title: "Bibliographie — Baudelaire", type: "PDF", author: "Dr. Ndiaye" },
    ],
    topMembers: [
      { name: "Dr. Fatou Ndiaye", initials: "FN", role: "MCF" },
      { name: "Léa Rousseau", initials: "LR", role: "L3 Lettres", online: true },
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
      <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Link>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden bg-card card-elevated mb-6"
      >
        <div className={`h-32 bg-gradient-to-br ${circle.gradient} flex items-center justify-center relative`}>
          <span className="text-6xl">{circle.icon}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
        <div className="p-5 -mt-4 relative">
          <h1 className="text-3xl mb-1">{circle.name}</h1>
          <p className="text-sm text-muted-foreground mb-3">{circle.description}</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4" />{circle.members} membres
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              <FileText className="w-4 h-4" />{circle.resources.length} ressources
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button className="px-5 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-200">
                Rejoindre
              </button>
              <button className="w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-5">
        {/* Posts */}
        <div className="col-span-2 space-y-4">
          <h2 className="font-serif text-xl">Publications</h2>
          {circle.posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-card card-elevated card-hover p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm shadow-primary/20">
                  {post.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold">{post.author}</span>
                    {post.verified && <CheckCircle className="w-4 h-4 text-primary fill-primary/20" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{post.role} · {post.time}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive text-sm transition-colors duration-200">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs tabular-nums font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors duration-200">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs tabular-nums font-medium">{post.comments}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Members */}
          <div className="rounded-2xl bg-card card-elevated p-4">
            <h3 className="text-sm font-semibold mb-3">Membres actifs</h3>
            <div className="space-y-3">
              {circle.topMembers.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground">
                      {m.initials}
                    </div>
                    {m.online && <div className="absolute -bottom-0.5 -right-0.5 online-indicator" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))}
              <button className="w-full text-xs text-primary font-medium py-2 rounded-xl hover:bg-primary/10 transition-colors duration-200">
                Voir tous les membres
              </button>
            </div>
          </div>

          {/* Resources */}
          <div className="rounded-2xl bg-card card-elevated p-4">
            <h3 className="text-sm font-semibold mb-3">Ressources</h3>
            <div className="space-y-2">
              {circle.resources.map((r) => (
                <div key={r.title} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-surface-alt/50 transition-colors duration-200 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{r.title}</p>
                    <p className="text-[11px] text-muted-foreground">{r.author}</p>
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
