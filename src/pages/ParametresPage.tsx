import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, ChevronRight } from "lucide-react";

const sections = [
  { icon: User, title: "Profil", desc: "Nom, photo, bio et informations académiques", color: "text-primary" },
  { icon: Bell, title: "Notifications", desc: "Préférences d'alertes et de mises à jour", color: "text-warning" },
  { icon: Shield, title: "Confidentialité", desc: "Visibilité du profil et des publications", color: "text-success" },
  { icon: Palette, title: "Apparence", desc: "Thème et personnalisation de l'interface", color: "text-accent" },
  { icon: Globe, title: "Langue", desc: "Langue de l'interface et des notifications", color: "text-muted-foreground" },
];

export default function ParametresPage() {
  return (
    <div className="max-w-[680px] mx-auto px-6 py-6">
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
    </div>
  );
}
