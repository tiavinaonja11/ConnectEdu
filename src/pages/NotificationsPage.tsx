import { motion } from "framer-motion";
import { Bell, BookOpen, MessageSquare, Heart, CheckCircle } from "lucide-react";

const notifications = [
  { icon: BookOpen, text: "Pr. Leclerc a publié un nouveau chapitre dans Mécanique Quantique", time: "il y a 2h", unread: true },
  { icon: MessageSquare, text: "Sarah Benali a commenté votre publication", time: "il y a 4h", unread: true },
  { icon: Heart, text: "Karim Touré a aimé vos notes d'algorithmique", time: "il y a 6h", unread: true },
  { icon: CheckCircle, text: "Votre exercice a été corrigé par EduConnect AI", time: "il y a 8h", unread: false },
  { icon: MessageSquare, text: "Dr. Ndiaye a répondu à votre question sur Baudelaire", time: "il y a 1j", unread: false },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <h1 className="text-3xl mb-1">Notifications</h1>
      <p className="font-mono-ui text-muted-foreground mb-6">3 nouvelles notifications</p>
      <div className="space-y-1">
        {notifications.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${n.unread ? "bg-surface border border-primary/20" : "hover:bg-surface-alt/50"}`}
          >
            <n.icon className={`w-4 h-4 mt-0.5 shrink-0 ${n.unread ? "text-primary" : "text-muted-foreground"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm">{n.text}</p>
              <p className="font-mono-ui text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
            {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
