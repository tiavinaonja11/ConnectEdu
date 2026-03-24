import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  FileText,
  Bell,
  Settings,
  GraduationCap,
  Beaker,
  Globe,
  Code,
  PenTool,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Fil d'actualité", path: "/" },
  { icon: BookOpen, label: "Mes Cours", path: "/cours" },
  { icon: FileText, label: "Ressources", path: "/ressources" },
  { icon: Users, label: "Communauté", path: "/communaute" },
  { icon: Bell, label: "Notifications", path: "/notifications", badge: 3 },
  { icon: Settings, label: "Paramètres", path: "/parametres" },
];

const circles = [
  { icon: Beaker, label: "Physique Quantique", members: 128, color: "text-primary" },
  { icon: Code, label: "Intelligence Artificielle", members: 342, color: "text-accent" },
  { icon: Globe, label: "Sciences Politiques", members: 89, color: "text-emerald-400" },
  { icon: PenTool, label: "Littérature Comparée", members: 67, color: "text-amber-400" },
];

export function AppSidebar() {
  const [circlesOpen, setCirclesOpen] = useState(true);
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-[280px] min-w-[280px] h-screen border-r border-border bg-sidebar flex flex-col scrollbar-hidden overflow-y-auto"
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5">
          <GraduationCap className="w-7 h-7 text-primary" />
          <span className="font-serif text-xl tracking-tight">EduConnect</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-300 group relative ${
                  isActive
                    ? "bg-surface-alt text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/50"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-r" />
                )}
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto font-mono-ui text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Circles */}
        <div className="mt-6">
          <button
            onClick={() => setCirclesOpen(!circlesOpen)}
            className="flex items-center gap-2 px-3 py-2 w-full text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                circlesOpen ? "" : "-rotate-90"
              }`}
            />
            Cercles
          </button>
          {circlesOpen && (
            <div className="space-y-0.5 mt-1">
              {circles.map((circle) => (
                <button
                  key={circle.label}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface-alt/50 transition-colors duration-300 group"
                >
                  <circle.icon className={`w-4 h-4 ${circle.color}`} />
                  <span className="truncate">{circle.label}</span>
                  <span className="ml-auto font-mono-ui text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300">
                    {circle.members}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-alt/50 transition-colors duration-300 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Amina Diallo</p>
            <p className="font-mono-ui text-xs text-muted-foreground">M2 Informatique</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
