import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, BookOpen, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

const filieres = ["Informatique", "Physique", "Mathématiques", "Littérature", "Sciences Politiques", "Biologie", "Chimie", "Droit"];
const promotions = ["L1", "L2", "L3", "M1", "M2", "Doctorat"];

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"etudiant" | "enseignant">("etudiant");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,hsl(var(--accent)/0.4),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--primary)/0.3),transparent_50%)]" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <GraduationCap className="w-7 h-7" />
            </div>
            <span className="font-serif text-2xl tracking-tight">EduConnect</span>
          </div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-5xl leading-[1.1] tracking-tight"
            >
              Votre réseau<br />académique<br />intelligent
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-primary-foreground/80 max-w-md leading-relaxed"
            >
              Collaborez, échangez et progressez avec vos pairs grâce à l'intelligence artificielle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-8 pt-4"
            >
              {[
                { value: "2,847", label: "Étudiants" },
                { value: "142", label: "Enseignants" },
                { value: "38", label: "Cercles" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center gap-3 text-sm text-primary-foreground/50">
            <Sparkles className="w-4 h-4" />
            <span>Propulsé par l'IA · Sécurisé · Open Source</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Forms */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl tracking-tight">EduConnect</span>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-3xl mb-2">
              {mode === "login" ? "Content de vous revoir" : "Rejoignez-nous"}
            </h2>
            <p className="text-muted-foreground">
              {mode === "login"
                ? "Connectez-vous pour retrouver votre réseau"
                : "Créez votre compte avec votre email universitaire"}
            </p>
          </div>

          {/* Toggle login/signup */}
          <div className="flex bg-surface-alt rounded-2xl p-1.5 mb-6">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  mode === m
                    ? "gradient-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {mode === "signup" && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Nom complet</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Amina Diallo"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Role selector */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Vous êtes</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["etudiant", "enseignant"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                            role === r
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {r === "etudiant" ? "🎓 Étudiant" : "👨‍🏫 Enseignant"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {role === "etudiant" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Filière</label>
                        <select className="w-full px-3 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all duration-200 appearance-none">
                          <option value="">Choisir...</option>
                          {filieres.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Promotion</label>
                        <select className="w-full px-3 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all duration-200 appearance-none">
                          <option value="">Choisir...</option>
                          {promotions.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="text-sm font-medium mb-1.5 block">Email universitaire</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="amina.diallo@univ.edu"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">Mot de passe</label>
                  {mode === "login" && (
                    <button type="button" className="text-xs text-primary hover:underline">Mot de passe oublié ?</button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow duration-300 flex items-center justify-center gap-2"
              >
                {mode === "login" ? "Se connecter" : "Créer mon compte"}
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                {mode === "login" ? "Pas encore de compte ? " : "Déjà inscrit ? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-primary font-medium hover:underline"
                >
                  {mode === "login" ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
