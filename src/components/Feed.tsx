import { PostCard } from "./PostCard";
import { PollCard } from "./PollCard";
import { SearchBar } from "./SearchBar";
import { Plus, TrendingUp, Image, Paperclip, Smile, Video, Flame, Calendar, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const stories = [
  { name: "Toi", initials: "A", isOwn: true, color: "" },
  { name: "Sarah B.", initials: "SB", color: "from-pink-500 to-rose-500" },
  { name: "Pr. Leclerc", initials: "JL", color: "from-blue-500 to-cyan-500" },
  { name: "Karim T.", initials: "KT", color: "from-violet-500 to-purple-500" },
  { name: "Dr. Ndiaye", initials: "FN", color: "from-amber-500 to-orange-500" },
  { name: "Youssef E.", initials: "YE", color: "from-emerald-500 to-teal-500" },
  { name: "Pr. Kamara", initials: "AK", color: "from-indigo-500 to-blue-500" },
];

const quickStats = [
  { icon: Flame, label: "Streak", value: "12 jours", color: "text-warning" },
  { icon: BookOpen, label: "Cours", value: "4 actifs", color: "text-primary" },
  { icon: Calendar, label: "Prochain", value: "TD demain", color: "text-success" },
];

const feedTabs = ["Pour toi", "Récent", "Populaire", "Suivis"];

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

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 }}
          className="mb-5"
        >
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl">Bonjour, Amina</h1>
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-2xl"
            >
              👋
            </motion.span>
          </div>
          <p className="text-sm text-muted-foreground">Voici les dernières nouvelles de votre réseau académique</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-3 gap-3 mb-5"
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-2xl bg-card card-elevated p-3.5 flex items-center gap-3 card-hover cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-surface-alt flex items-center justify-center">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-sm font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-3 mb-5 overflow-x-auto scrollbar-hidden pb-1"
        >
          {stories.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div className={`relative w-[60px] h-[60px] rounded-full flex items-center justify-center ${
                s.isOwn
                  ? "border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200"
                  : ""
              }`}>
                {!s.isOwn && (
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.color} p-[2.5px]`}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <div className={`w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-sm font-bold text-primary-foreground`}>
                        {s.initials}
                      </div>
                    </div>
                  </div>
                )}
                {s.isOwn && <Plus className="w-5 h-5" />}
              </div>
              <span className="text-[11px] text-muted-foreground font-medium max-w-[60px] truncate">{s.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl bg-card card-elevated p-4 mb-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-md shadow-primary/20">
              A
            </div>
            <div className="flex-1 bg-surface-alt/50 hover:bg-surface-alt rounded-full px-4 py-2.5 cursor-text transition-colors duration-200 border border-transparent hover:border-border/50">
              <span className="text-sm text-muted-foreground/70">Partagez une idée, une question ou un document...</span>
            </div>
          </div>
          <div className="flex items-center pt-3 border-t border-border/40">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200">
              <Video className="w-[18px] h-[18px]" />
              <span className="font-medium text-xs">Vidéo</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-success/10 hover:text-success transition-all duration-200">
              <Image className="w-[18px] h-[18px]" />
              <span className="font-medium text-xs">Photo</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200">
              <Paperclip className="w-[18px] h-[18px]" />
              <span className="font-medium text-xs">Document</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-warning/10 hover:text-warning transition-all duration-200">
              <Smile className="w-[18px] h-[18px]" />
              <span className="font-medium text-xs">Humeur</span>
            </button>
          </div>
        </motion.div>

        {/* Feed Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1 mb-5 bg-card card-elevated rounded-2xl p-1.5"
        >
          {feedTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "gradient-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Trending */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card card-elevated mb-5"
        >
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-sm shadow-primary/20">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tendances</span>
          <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hidden">
            {["#partiels2025", "#IA", "#quantique", "#Baudelaire"].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold cursor-pointer hover:bg-primary/20 transition-colors duration-200 shrink-0"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* AI Suggestion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl overflow-hidden mb-5 relative group cursor-pointer"
        >
          <div className="absolute inset-0 gradient-primary opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.4),transparent_60%)]" />
          <div className="relative flex items-center gap-4 px-5 py-4">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-foreground">EduConnect AI recommande</p>
              <p className="text-xs text-primary-foreground/80 mt-0.5">Révisez le chapitre 7 de Mécanique Quantique — votre partiel est dans 5 jours</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-primary-foreground/20 backdrop-blur text-xs font-semibold text-primary-foreground hover:bg-primary-foreground/30 transition-all duration-200">
              Commencer
            </div>
          </div>
        </motion.div>

        {/* Posts + Poll */}
        <div className="space-y-4">
          {posts.slice(0, 2).map((post, i) => (
            <PostCard key={i} {...post} index={i} />
          ))}

          {/* Poll */}
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
