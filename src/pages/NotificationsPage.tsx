import { motion } from "framer-motion";
import { BookOpen, MessageSquare, Heart, CheckCircle, Settings } from "lucide-react";

const notifications = [
  { icon: BookOpen, text: "Pr. Leclerc a publié un nouveau chapitre dans Mécanique Quantique", time: "il y a 2h", unread: true, initials: "JL" },
  { icon: MessageSquare, text: "Sarah Benali a commenté votre publication", time: "il y a 4h", unread: true, initials: "SB" },
  { icon: Heart, text: "Karim Touré a aimé vos notes d'algorithmique", time: "il y a 6h", unread: true, initials: "KT" },
  { icon: CheckCircle, text: "Votre exercice a été corrigé par EduConnect AI", time: "il y a 8h", unread: false, initials: "AI" },
  { icon: MessageSquare, text: "Dr. Ndiaye a répondu à votre question sur Baudelaire", time: "il y a 1j", unread: false, initials: "FN" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-[680px] mx-auto px-6 py-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-3xl mb-0.5">Notifications</h1>
          <p className="text-sm text-muted-foreground">3 nouvelles notifications</p>
        </div>
        <button className="w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200">
          <Settings className="w-4 h-4" />
        </button>
      </motion.div>

      <div className="space-y-1">
        {notifications.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
              n.unread
                ? "bg-primary/8 hover:bg-primary/12"
                : "hover:bg-surface-alt/50"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              n.unread ? "gradient-primary text-primary-foreground" : "bg-surface-alt text-muted-foreground"
            }`}>
              {n.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug ${n.unread ? "font-medium" : "text-muted-foreground"}`}>{n.text}</p>
              <p className={`text-[11px] mt-0.5 ${n.unread ? "text-primary font-medium" : "text-muted-foreground"}`}>{n.time}</p>
            </div>
            {n.unread && <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
