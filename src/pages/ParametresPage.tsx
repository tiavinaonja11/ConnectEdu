import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe } from "lucide-react";

const sections = [
  { icon: User, title: "Profil", desc: "Nom, photo, bio et informations académiques" },
  { icon: Bell, title: "Notifications", desc: "Préférences d'alertes et de mises à jour" },
  { icon: Shield, title: "Confidentialité", desc: "Visibilité du profil et des publications" },
  { icon: Palette, title: "Apparence", desc: "Thème et personnalisation de l'interface" },
  { icon: Globe, title: "Langue", desc: "Langue de l'interface et des notifications" },
];

export default function ParametresPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <h1 className="text-3xl mb-1">Paramètres</h1>
      <p className="font-mono-ui text-muted-foreground mb-6">Gérez votre compte et vos préférences</p>
      <div className="space-y-2">
        {sections.map((s, i) => (
          <motion.button
            key={s.title}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full flex items-center gap-4 border border-border rounded-lg px-5 py-4 hover:border-muted-foreground/30 transition-colors duration-300 text-left"
          >
            <s.icon className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{s.title}</p>
              <p className="font-mono-ui text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
