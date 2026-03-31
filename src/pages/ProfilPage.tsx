import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, BookOpen, Users, FileText, Settings, Mail, Award, Edit3, Camera, Link as LinkIcon, UserPlus, UserMinus, Save, X } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { useAuth } from "@/hooks/use-auth";

const userPosts = [
  {
    author: "Vous",
    role: "Publication récente",
    initials: "...",
    time: "il y a 1j",
    content: "Je viens de terminer mon implémentation d'un modèle BERT fine-tuné pour la classification de textes en wolof. Les résultats sont prometteurs avec 87% d'accuracy !",
    tags: ["NLP", "BERT", "wolof"],
    likes: 38,
    comments: 14,
    index: 0,
  },
];

const tabs = ["Publications", "Ressources", "Badges"];

export default function ProfilPage() {
  const { profile, role, isEnseignant, user } = useAuth();
  const [activeTab, setActiveTab] = useState("Publications");
  const [editing, setEditing] = useState(false);
  const [editBio, setEditBio] = useState(profile?.bio || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = profile?.full_name || "Utilisateur";
  const initials = displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const roleLabel = isEnseignant
    ? "Enseignant"
    : role === "admin"
      ? "Administrateur"
      : [profile?.promotion, profile?.filiere].filter(Boolean).join(" · ") || "Étudiant";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // UI-only for now — storage upload will be implemented later
      console.log("File selected:", file.name);
    }
  };

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
            <div className="relative group">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-card shadow-xl"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground border-4 border-card shadow-xl">
                  {initials}
                </div>
              )}
              <button
                onClick={handleAvatarClick}
                className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="absolute top-1 right-1 online-indicator" />
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <h1 className="text-2xl mb-0.5 flex items-center gap-2">
                {displayName}
                {isEnseignant && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    ✓ Vérifié
                  </span>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">{roleLabel}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditing(!editing)}
                className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/20"
              >
                {editing ? "Annuler" : "Modifier le profil"}
              </motion.button>
              <button className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-all">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bio — editable */}
          {editing ? (
            <div className="mb-4">
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Écrivez votre bio..."
                rows={3}
                className="w-full p-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none transition-all"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" /> Annuler
                </button>
                <button
                  onClick={() => { setEditing(false); /* save later */ }}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground font-medium"
                >
                  <Save className="w-3 h-3" /> Enregistrer
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[15px] leading-relaxed mb-4 max-w-2xl">
              {profile?.bio || "Aucune bio pour le moment. Cliquez sur « Modifier le profil » pour en ajouter une."}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {isEnseignant ? "Enseignant" : "Étudiant"}
            </span>
            {profile?.filiere && (
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                {profile.filiere}
              </span>
            )}
            {profile?.promotion && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {profile.promotion}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              {user?.email || "email@univ.edu"}
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            {[
              { value: 12, label: "Publications" },
              { value: 47, label: "Abonnés" },
              { value: 23, label: "Abonnements" },
              { value: 5, label: "Ressources" },
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
            {(profile?.filiere ? [profile.filiere, "Recherche", "Collaboration"] : ["Aucune compétence ajoutée"]).map((s) => (
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
            {[
              { emoji: "🎓", label: "Nouveau membre" },
              { emoji: "📝", label: "1ère publication" },
            ].map((b) => (
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
            <PostCard key={i} {...post} author={displayName} initials={initials} role={roleLabel} />
          ))}
        </div>
      )}

      {activeTab === "Ressources" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-card card-elevated p-6">
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Aucune ressource partagée pour le moment</p>
            <p className="text-xs mt-1">Vos ressources partagées apparaîtront ici</p>
          </div>
        </motion.div>
      )}

      {activeTab === "Badges" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-card card-elevated p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: "🎓", label: "Nouveau membre", desc: "Inscription sur EduConnect", earned: true },
              { emoji: "📝", label: "1ère publication", desc: "Publier votre premier post", earned: false },
              { emoji: "🏆", label: "Top Contributeur", desc: "Plus de 50 publications", earned: false },
              { emoji: "🔥", label: "Streak 30 jours", desc: "Connexion quotidienne", earned: false },
              { emoji: "📚", label: "Bibliophile", desc: "10+ ressources partagées", earned: false },
              { emoji: "🤝", label: "Mentor", desc: "Aider 20 étudiants", earned: false },
            ].map((b) => (
              <div
                key={b.label}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  b.earned ? "bg-card border-primary/20" : "bg-surface-alt/30 border-border opacity-50"
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
