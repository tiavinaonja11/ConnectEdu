import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  BookOpen,
  HelpCircle,
  ClipboardCheck,
  Lightbulb,
  Trash2,
  Zap,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickActions = [
  { icon: BookOpen, label: "Résumer un cours", prompt: "Résume-moi le dernier chapitre de mécanique quantique en points clés", color: "text-primary" },
  { icon: HelpCircle, label: "Générer un quiz", prompt: "Génère un quiz de 5 questions sur les transformers en IA", color: "text-accent" },
  { icon: ClipboardCheck, label: "Corriger un exercice", prompt: "Corrige mon exercice sur la programmation dynamique", color: "text-success" },
  { icon: Lightbulb, label: "Expliquer un concept", prompt: "Explique-moi le concept d'attention multi-tête dans les transformers", color: "text-warning" },
];

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Bonjour ! Je suis **EduConnect AI**, votre assistant académique. Je peux résumer vos cours, générer des quiz, corriger des exercices et expliquer des concepts. Comment puis-je vous aider ?",
  },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateResponse = (userMsg: string) => {
    setIsTyping(true);
    setTimeout(() => {
      let response = "";
      if (userMsg.toLowerCase().includes("résume")) {
        response = "📚 **Résumé — Mécanique Quantique Ch.7**\n\n• L'équation de Dirac unifie la mécanique quantique et la relativité restreinte\n• Elle prédit l'existence de l'antimatière (positron)\n• Le spin émerge naturellement de l'équation\n• Les matrices gamma (γ⁰, γ¹, γ², γ³) forment l'algèbre de Clifford\n\n*Besoin d'approfondir un point en particulier ?*";
      } else if (userMsg.toLowerCase().includes("quiz")) {
        response = "🧠 **Quiz — Transformers en IA**\n\n**Q1.** Quelle est la complexité temporelle de l'attention standard ?\na) O(n) b) O(n²) c) O(n log n) d) O(n³)\n\n**Q2.** Que calcule la fonction softmax dans le mécanisme d'attention ?\na) La norme b) Les poids d'attention c) Le gradient d) La perte\n\n**Q3.** Combien de têtes d'attention possède le modèle BERT-base ?\na) 8 b) 12 c) 16 d) 24\n\n*Envoyez vos réponses et je les corrigerai !*";
      } else if (userMsg.toLowerCase().includes("corrige")) {
        response = "✅ **Correction — Programmation Dynamique**\n\nVotre approche est correcte dans l'ensemble. Voici mes observations :\n\n1. **Sous-structure optimale** : bien identifiée ✓\n2. **Table de mémoïsation** : la dimension est correcte, mais initialisez avec `-1` plutôt que `0`\n3. **Complexité** : O(n×W) — correct ✓\n\n*Note : Pensez à ajouter la reconstruction de la solution optimale.*";
      } else if (userMsg.toLowerCase().includes("explique")) {
        response = "💡 **Attention Multi-Tête (Multi-Head Attention)**\n\nL'idée est de permettre au modèle de « regarder » l'entrée sous plusieurs angles simultanément.\n\n**Fonctionnement :**\n1. L'entrée est projetée en h espaces différents\n2. Chaque tête calcule Q, K, V indépendamment\n3. `Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V`\n4. Les résultats sont concaténés et projetés\n\n**Intuition :** Une tête peut se concentrer sur la syntaxe, une autre sur la sémantique.\n\n*Voulez-vous un exemple avec du code PyTorch ?*";
      } else {
        response = "Je comprends votre question. Pourriez-vous préciser le sujet ou le cours concerné ? Je pourrai ainsi vous fournir une réponse plus pertinente avec des références académiques.";
      }
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    simulateResponse(userMsg);
  };

  const handleQuickAction = (prompt: string) => {
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    simulateResponse(prompt);
  };

  const handleClear = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 py-6 flex flex-col h-[calc(100vh)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5 shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25 ai-glow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl leading-tight">EduConnect AI</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Zap className="w-3 h-3 text-success" />
              <span className="text-[11px] text-success font-medium">En ligne · Prêt à vous aider</span>
            </div>
          </div>
        </div>
        {messages.length > 1 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-alt text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-surface-alt/80 transition-all duration-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Effacer
          </button>
        )}
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden space-y-4 pb-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end gap-2 max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center shrink-0 shadow-sm shadow-primary/20">
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground rounded-2xl rounded-br-md"
                      : "bg-card card-elevated rounded-2xl rounded-bl-md"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1.5" : ""}>
                      {line.split(/(\*\*.*?\*\*)/).map((part, k) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={k} className="font-semibold">
                            {part.slice(2, -2)}
                          </strong>
                        ) : (
                          <span key={k}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-1"
          >
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="bg-card card-elevated rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pb-4 shrink-0"
        >
          <p className="text-xs text-muted-foreground font-medium mb-3">Actions rapides</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-card card-elevated card-hover text-sm text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-surface-alt flex items-center justify-center shrink-0">
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                </div>
                <span className="font-medium text-muted-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="shrink-0 pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-surface-alt rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-primary/30 transition-all duration-200">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Posez une question..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground disabled:opacity-30 hover:shadow-lg hover:shadow-primary/25 transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
