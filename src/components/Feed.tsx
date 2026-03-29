import { PostCard } from "./PostCard";
import { PollCard } from "./PollCard";
import { SearchBar } from "./SearchBar";
import { Plus, Image, Paperclip, Smile, Video, Flame, Calendar, BookOpen, Sparkles, GraduationCap, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const circles = [
  { name: "Physique Q.", initials: "PQ", members: 128, color: "from-sky-500 to-blue-600", active: true },
  { name: "IA & ML", initials: "IA", members: 95, color: "from-emerald-500 to-green-600", active: true },
  { name: "Littérature", initials: "LT", members: 64, color: "from-rose-500 to-pink-600", active: false },
  { name: "Algo", initials: "AL", members: 82, color: "from-amber-500 to-orange-600", active: true },
  { name: "Droit Civil", initials: "DC", members: 47, color: "from-violet-500 to-purple-600", active: false },
];

const quickStats = [
  { icon: Flame, label: "Streak", value: "12 jours", color: "text-warning", bg: "bg-warning/10" },
  { icon: BookOpen, label: "Cours", value: "4 actifs", color: "text-primary", bg: "bg-primary/10" },
  { icon: Calendar, label: "Prochain", value: "TD demain", color: "text-success", bg: "bg-success/10" },
];

const feedTabs = [
  { label: "Pour toi", icon: Sparkles },
  { label: "Récent", icon: Zap },
  { label: "Populaire", icon: Flame },
  { label: "Cercles", icon: Users },
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
    category: "cours" as const,
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
    category: "question" as const,
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
    category: "annonce" as const,
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
    category: "ressource" as const,
  },
];

export function Feed() {
  const [activeTab, setActiveTab] = useState("Pour toi");

  return (
    <div className="flex-1 min-w-0">
      <div className="max-w-[680px] mx-auto px-4 py-5">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <SearchBar />
        </motion.div>

        {/* Welcome Header — editorial style */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 }}
          className="mb-6"
        >
          <h1 className="text-3xl leading-[1.1] mb-1">Bonjour, Amina</h1>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <p className="text-sm text-muted-foreground">3 nouveautés · Campus numérique actif</p>
          </div>
        </motion.div>

        {/* Quick Stats — horizontal chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-2 mb-5 overflow-x-auto scrollbar-hidden pb-1"
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.04 }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full ${stat.bg} border border-transparent hover:border-border/50 cursor-pointer transition-all duration-200 shrink-0`}
            >
              <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              <span className="text-xs font-semibold">{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Cercles actifs — replaces stories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vos cercles</span>
            <button className="text-xs text-primary font-medium hover:underline">Voir tout</button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hidden pb-1">
            {/* Create circle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">Créer</span>
            </motion.button>

            {circles.map((c, i) => (
              <motion.button
                key={c.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.14 + i * 0.04 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center gap-1.5 shrink-0 group"
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-black/10`}>
                    {c.initials}
                  </div>
                  {c.active && (
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-background" />
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground font-medium max-w-[56px] truncate group-hover:text-foreground transition-colors">{c.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Create Post — more compact, academic */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl bg-card card-elevated p-4 mb-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-md shadow-primary/20">
              A
            </div>
            <div className="flex-1 bg-surface-alt/50 hover:bg-surface-alt rounded-xl px-4 py-2.5 cursor-text transition-colors duration-200 border border-transparent hover:border-border/50">
              <span className="text-sm text-muted-foreground/70">Partagez une idée, une question...</span>
            </div>
          </div>
          <div className="flex items-center gap-1 pt-2 border-t border-border/30">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200">
              <Video className="w-4 h-4" />
              <span className="text-[11px] font-medium">Vidéo</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-success/10 hover:text-success transition-all duration-200">
              <Image className="w-4 h-4" />
              <span className="text-[11px] font-medium">Photo</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200">
              <Paperclip className="w-4 h-4" />
              <span className="text-[11px] font-medium">Document</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-warning/10 hover:text-warning transition-all duration-200">
              <Smile className="w-4 h-4" />
              <span className="text-[11px] font-medium">Humeur</span>
            </button>
          </div>
        </motion.div>

        {/* Feed Tabs — pill style with icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1.5 mb-5"
        >
          {feedTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.label
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-surface-alt border border-border/50"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* AI Suggestion — side accent bar style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl bg-card card-elevated mb-5 overflow-hidden cursor-pointer group"
        >
          <div className="flex">
            <div className="w-1 bg-gradient-to-b from-primary to-accent shrink-0" />
            <div className="flex items-center gap-4 px-4 py-3.5 flex-1">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-primary">Recommandation IA</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">Révisez le chapitre 7 — votre partiel est dans 5 jours</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/20 transition-all duration-200 shrink-0">
                Réviser
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts + Poll */}
        <div className="space-y-4">
          {posts.slice(0, 2).map((post, i) => (
            <PostCard key={i} {...post} index={i} />
          ))}

          <PollCard
            author="Pr. Kamara"
            initials="AK"
            role="Professeur · Informatique"
            time="il y a 5h"
            question="Quel framework préférez-vous pour le projet de fin d'année ?"
            options={[
              { id: "react", text: "React + TypeScript", votes: 45 },
              { id: "vue", text: "Vue.js 3", votes: 23 },
              { id: "angular", text: "Angular", votes: 12 },
              { id: "svelte", text: "Svelte", votes: 18 },
            ]}
            totalVotes={98}
            index={2}
          />

          {posts.slice(2).map((post, i) => (
            <PostCard key={i + 2} {...post} index={i + 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
