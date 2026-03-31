import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, ChevronRight, ChevronLeft, Eye, EyeOff, Users, Lock, Mail, BookOpen, ToggleLeft } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface SettingSection {
  icon: any;
  title: string;
  desc: string;
  color: string;
  id: string;
}

const sections: SettingSection[] = [
  { icon: User, title: "Profil", desc: "Nom, photo, bio et informations académiques", color: "text-primary", id: "profil" },
  { icon: Bell, title: "Notifications", desc: "Préférences d'alertes et de mises à jour", color: "text-warning", id: "notifications" },
  { icon: Shield, title: "Confidentialité", desc: "Visibilité du profil et des publications", color: "text-success", id: "confidentialite" },
  { icon: Palette, title: "Apparence", desc: "Thème et personnalisation de l'interface", color: "text-accent", id: "apparence" },
  { icon: Globe, title: "Langue", desc: "Langue de l'interface et des notifications", color: "text-muted-foreground", id: "langue" },
];

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        enabled ? "bg-primary" : "bg-border"
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState<"public" | "members" | "private">("members");
  const [showEmail, setShowEmail] = useState(false);
  const [showFiliere, setShowFiliere] = useState(true);
  const [showBio, setShowBio] = useState(true);
  const [allowFollow, setAllowFollow] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  const visibilityOptions = [
    { value: "public" as const, label: "Public", desc: "Tout le monde peut voir votre profil", icon: Eye },
    { value: "members" as const, label: "Membres uniquement", desc: "Seuls les membres inscrits peuvent vous voir", icon: Users },
    { value: "private" as const, label: "Privé", desc: "Seuls vos abonnés peuvent voir votre profil", icon: Lock },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Visibilité du profil</h4>
        <div className="space-y-2">
          {visibilityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setProfileVisibility(opt.value)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                profileVisibility === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                profileVisibility === opt.value ? "bg-primary/10" : "bg-surface-alt"
              }`}>
                <opt.icon className={`w-4 h-4 ${profileVisibility === opt.value ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                profileVisibility === opt.value ? "border-primary" : "border-border"
              }`}>
                {profileVisibility === opt.value && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Settings */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Informations visibles</h4>
        <div className="space-y-1">
          {[
            { label: "Adresse email", desc: "Afficher votre email sur votre profil", icon: Mail, enabled: showEmail, toggle: () => setShowEmail(!showEmail) },
            { label: "Filière et promotion", desc: "Montrer votre parcours académique", icon: BookOpen, enabled: showFiliere, toggle: () => setShowFiliere(!showFiliere) },
            { label: "Bio", desc: "Afficher votre biographie", icon: User, enabled: showBio, toggle: () => setShowBio(!showBio) },
            { label: "Autoriser les abonnements", desc: "Permettre aux membres de vous suivre", icon: Users, enabled: allowFollow, toggle: () => setAllowFollow(!allowFollow) },
            { label: "Statut en ligne", desc: "Montrer quand vous êtes connecté", icon: Eye, enabled: showOnlineStatus, toggle: () => setShowOnlineStatus(!showOnlineStatus) },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-alt/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-surface-alt flex items-center justify-center">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
              <ToggleSwitch enabled={item.enabled} onToggle={item.toggle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ParametresPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const renderSectionContent = (id: string) => {
    switch (id) {
      case "confidentialite":
        return <PrivacySettings />;
      case "apparence":
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold mb-3">Thème</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "light", label: "☀️ Clair", desc: "Interface lumineuse" },
                { value: "dark", label: "🌙 Sombre", desc: "Confortable pour les yeux" },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => { if (theme !== t.value) toggleTheme(); }}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    theme === t.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-[11px] text-muted-foreground">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold mb-3">Préférences de notification</h4>
            <p className="text-sm text-muted-foreground">Les préférences de notification seront bientôt disponibles.</p>
          </div>
        );
      case "profil":
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold mb-3">Modifier le profil</h4>
            <p className="text-sm text-muted-foreground">Accédez à votre page de profil pour modifier vos informations.</p>
          </div>
        );
      case "langue":
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold mb-3">Langue de l'interface</h4>
            <div className="space-y-2">
              {[
                { code: "fr", label: "🇫🇷 Français", active: true },
                { code: "en", label: "🇬🇧 English", active: false },
                { code: "ar", label: "🇸🇦 العربية", active: false },
              ].map((l) => (
                <button
                  key={l.code}
                  className={`w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                    l.active ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[680px] mx-auto px-6 py-6">
      <AnimatePresence mode="wait">
        {activeSection ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour aux paramètres
            </button>
            <h1 className="text-3xl mb-1">{sections.find(s => s.id === activeSection)?.title}</h1>
            <p className="text-sm text-muted-foreground mb-6">{sections.find(s => s.id === activeSection)?.desc}</p>
            {renderSectionContent(activeSection)}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl mb-1">Paramètres</h1>
              <p className="text-sm text-muted-foreground mb-6">Gérez votre compte et vos préférences</p>
            </motion.div>

            <div className="space-y-2">
              {sections.map((s, i) => (
                <motion.button
                  key={s.title}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onClick={() => setActiveSection(s.id)}
                  className="w-full flex items-center gap-4 rounded-2xl bg-card card-elevated card-hover px-5 py-4 text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-alt flex items-center justify-center">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-200" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
