import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, BookOpen, Users, FileText, Settings, Mail, Award, Edit3, Camera, Link as LinkIcon } from "lucide-react";
import { PostCard } from "@/components/PostCard";

const profileData = {
  name: "Amina Diallo",
  role: "Étudiante",
  filiere: "M2 Informatique — Intelligence Artificielle",
  bio: "Passionnée par le deep learning et le NLP. Actuellement en stage de recherche sur les modèles de langage. Toujours prête à aider et collaborer !",
  location: "Dakar, Sénégal",
  joinDate: "Septembre 2023",
  stats: { posts: 47, followers: 234, following: 189, resources: 12 },
  skills: ["Python", "PyTorch", "NLP", "Deep Learning", "React", "TensorFlow"],
  badges: [
    { emoji: "🏆", label: "Top Contributeur" },
    { emoji: "🔥", label: "Streak 30j" },
    { emoji: "📚", label: "Bibliophile" },
  ],
};

const userPosts = [
  {
    author: "Amina Diallo",
    role: "Étudiante · M2 IA",
    initials: "AD",
    time: "il y a 1j",
    content: "Je viens de terminer mon implémentation d'un modèle BERT fine-tuné pour la classification de textes en wolof. Les résultats sont prometteurs avec 87% d'accuracy ! Paper à venir bientôt.",
    tags: ["NLP", "BERT", "wolof"],
    likes: 38,
    comments: 14,
    index: 0,
  },
  {
    author: "Amina Diallo",
    role: "Étudiante · M2 IA",
    initials: "AD",
    time: "il y a 3j",
    content: "Quelques notes de ma conférence sur les transformers au labo. Merci à tous ceux qui sont venus ! Les slides sont disponibles dans les ressources.",
    tags: ["conférence", "transformers", "IA"],
    likes: 25,
    comments: 7,
    hasAttachment: true,
    attachmentName: "slides-transformers-conf.pdf",
    index: 1,
  },
];

const tabs = ["Publications", "Ressources", "Badges"];

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState("Publications");

  return (
    <div className="max-w-[800px] mx-auto px-4 py-5">
      {/* Cover + Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-card card-elevated overflow-hidden mb-5"
      >
        <div className="h-40 relative gradient-primary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--accent)/0.4),transparent_60%)]" />
          <button className="absolute top-3 right-3 p-2 rounded-xl bg-primary-foreground/20 backdrop-blur text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground border-4 border-card shadow-xl">
                AD
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-1 right-1 online-indicator" />
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <h1 className="text-2xl mb-0.5">{profileData.name}</h1>
              <p className="text-sm text-muted-foreground">{profileData.filiere}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/20"
              >
                Modifier le profil
              </motion.button>
              <button className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-all">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed mb-4 max-w-2xl">{profileData.bio}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{profileData.role}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{profileData.location}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Inscrit en {profileData.joinDate}</span>
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />amina.diallo@univ.edu</span>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            {[
              { value: profileData.stats.posts, label: "Publications" },
              { value: profileData.stats.followers, label: "Abonnés" },
              { value: profileData.stats.following, label: "Abonnements" },
              { value: profileData.stats.resources, label: "Ressources" },
            ].map((s) => (
              <button key={s.label} className="group">
                <span className="text-lg font-bold group-hover:text-primary transition-colors">{s.value}</span>
                <span className="text-xs text-muted-foreground ml-1">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills + Badges Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card card-elevated p-5"
        >
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-primary" /> Compétences
          </h3>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((s) => (
              <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-card card-elevated p-5"
        >
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-warning" /> Badges
          </h3>
          <div className="flex gap-3">
            {profileData.badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-alt">
                <span className="text-lg">{b.emoji}</span>
                <span className="text-xs font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-1 mb-5 bg-card card-elevated rounded-2xl p-1.5"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? "gradient-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      {activeTab === "Publications" && (
        <div className="space-y-4">
          {userPosts.map((post, i) => (
            <PostCard key={i} {...post} />
          ))}
        </div>
      )}

      {activeTab === "Ressources" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-card card-elevated p-6"
        >
          <div className="grid gap-3">
            {[
              { name: "Notes Algo Avancée", type: "PDF", size: "2.4 MB", date: "il y a 2j" },
              { name: "Slides Transformers", type: "PPTX", size: "8.1 MB", date: "il y a 5j" },
              { name: "Dataset Wolof NLP", type: "CSV", size: "12 MB", date: "il y a 1 sem" },
            ].map((r) => (
              <div
                key={r.name}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-alt/50 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.type} · {r.size}</p>
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "Badges" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-card card-elevated p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: "🏆", label: "Top Contributeur", desc: "Plus de 50 publications", earned: true },
              { emoji: "🔥", label: "Streak 30 jours", desc: "Connexion quotidienne", earned: true },
              { emoji: "📚", label: "Bibliophile", desc: "10+ ressources partagées", earned: true },
              { emoji: "🤝", label: "Mentor", desc: "Aider 20 étudiants", earned: false },
              { emoji: "⭐", label: "Star du cercle", desc: "100 likes sur un post", earned: false },
              { emoji: "🎯", label: "Quiz Master", desc: "10 quiz parfaits", earned: false },
            ].map((b) => (
              <div
                key={b.label}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  b.earned
                    ? "bg-card border-primary/20"
                    : "bg-surface-alt/30 border-border opacity-50"
                }`}
              >
                <span className="text-3xl block mb-2">{b.emoji}</span>
                <p className="text-sm font-semibold">{b.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
