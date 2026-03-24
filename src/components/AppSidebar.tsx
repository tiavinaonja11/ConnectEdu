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
  Sparkles,
  MessageCircle,
  GraduationCap,
  Beaker,
  Globe,
  Code,
  PenTool,
  ChevronDown,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Fil d'actualité", path: "/" },
  { icon: Sparkles, label: "EduConnect AI", path: "/assistant", gradient: true },
  { icon: MessageCircle, label: "Messages", path: "/messages", badge: 3 },
  { icon: BookOpen, label: "Mes Cours", path: "/cours" },
  { icon: FileText, label: "Ressources", path: "/ressources" },
  { icon: Users, label: "Communauté", path: "/communaute" },
  { icon: Bell, label: "Notifications", path: "/notifications", badge: 3 },
  { icon: Settings, label: "Paramètres", path: "/parametres" },
];

const circles = [
  { icon: Beaker, label: "Physique Quantique", members: 128, color: "text-primary", slug: "physique-quantique" },
  { icon: Code, label: "Intelligence Artificielle", members: 342, color: "text-accent", slug: "intelligence-artificielle" },
  { icon: Globe, label: "Sciences Politiques", members: 89, color: "text-success", slug: "sciences-politiques" },
  { icon: PenTool, label: "Littérature Comparée", members: 67, color: "text-warning", slug: "litterature-comparee" },
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
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl tracking-tight">EduConnect</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative ${
                  isActive
                    ? item.gradient
                      ? "bg-primary/15 text-primary"
                      : "bg-surface-alt text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/60"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={`w-[18px] h-[18px] ${item.gradient && isActive ? "text-primary" : ""}`} />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[11px] font-semibold bg-destructive text-destructive-foreground w-5 h-5 rounded-full flex items-center justify-center">
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
            className="flex items-center gap-2 px-3 py-2 w-full text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 font-semibold"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                circlesOpen ? "" : "-rotate-90"
              }`}
            />
            Cercles
          </button>
          {circlesOpen && (
            <div className="space-y-0.5 mt-1">
              {circles.map((circle) => {
                const isCircleActive = location.pathname === `/cercle/${circle.slug}`;
                return (
                  <Link
                    key={circle.label}
                    to={`/cercle/${circle.slug}`}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative ${
                      isCircleActive
                        ? "bg-surface-alt text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-alt/60"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg bg-surface-alt flex items-center justify-center`}>
                      <circle.icon className={`w-3.5 h-3.5 ${circle.color}`} />
                    </div>
                    <span className="truncate font-medium">{circle.label}</span>
                    <span className="ml-auto font-mono-ui text-[11px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-200">
                      {circle.members}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-alt/60 transition-all duration-200 cursor-pointer group">
          <div className="relative">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              A
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 online-indicator" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Amina Diallo</p>
            <p className="font-mono-ui text-[11px] text-muted-foreground">M2 Informatique</p>
          </div>
          <LogOut className="w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-200" />
        </div>
      </div>
    </motion.aside>
  );
}
