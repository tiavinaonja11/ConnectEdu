import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  BookOpen,
  HelpCircle,
  ClipboardCheck,
  Lightbulb,
  X,
  ChevronRight,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickActions = [
  { icon: BookOpen, label: "Résumer un cours", prompt: "Résume-moi le dernier chapitre de mécanique quantique en points clés" },
  { icon: HelpCircle, label: "Générer un quiz", prompt: "Génère un quiz de 5 questions sur les transformers en IA" },
  { icon: ClipboardCheck, label: "Corriger un exercice", prompt: "Corrige mon exercice sur la programmation dynamique" },
  { icon: Lightbulb, label: "Expliquer un concept", prompt: "Explique-moi le concept d'attention multi-tête dans les transformers" },
];

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Bonjour ! Je suis **EduConnect AI**, votre assistant académique. Je peux résumer vos cours, générer des quiz, corriger des exercices et expliquer des concepts. Comment puis-je vous aider ?",
  },
];

export function AIChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateResponse = (userMsg: string) => {
    setIsTyping(true);
    setTimeout(() => {
      let response = "";
      if (userMsg.toLowerCase().includes("résume")) {
        response =
          "📚 **Résumé — Mécanique Quantique Ch.7**\n\n• L'équation de Dirac unifie la mécanique quantique et la relativité restreinte\n• Elle prédit l'existence de l'antimatière (positron)\n• Le spin émerge naturellement de l'équation\n• Les matrices gamma (γ⁰, γ¹, γ², γ³) forment l'algèbre de Clifford\n\n*Besoin d'approfondir un point en particulier ?*";
      } else if (userMsg.toLowerCase().includes("quiz")) {
        response =
          "🧠 **Quiz — Transformers en IA**\n\n**Q1.** Quelle est la complexité temporelle de l'attention standard ?\na) O(n) b) O(n²) c) O(n log n) d) O(n³)\n\n**Q2.** Que calcule la fonction softmax dans le mécanisme d'attention ?\na) La norme b) Les poids d'attention c) Le gradient d) La perte\n\n**Q3.** Combien de têtes d'attention possède le modèle BERT-base ?\na) 8 b) 12 c) 16 d) 24\n\n*Envoyez vos réponses et je les corrigerai !*";
      } else if (userMsg.toLowerCase().includes("corrige")) {
        response =
          "✅ **Correction — Programmation Dynamique**\n\nVotre approche est correcte dans l'ensemble. Voici mes observations :\n\n1. **Sous-structure optimale** : bien identifiée ✓\n2. **Table de mémoïsation** : la dimension est correcte, mais initialisez avec `-1` plutôt que `0` pour distinguer les cas non calculés\n3. **Complexité** : O(n×W) — correct ✓\n\n*Note : Pensez à ajouter la reconstruction de la solution optimale.*";
      } else if (userMsg.toLowerCase().includes("explique")) {
        response =
          "💡 **Attention Multi-Tête (Multi-Head Attention)**\n\nL'idée est de permettre au modèle de « regarder » l'entrée sous plusieurs angles simultanément.\n\n**Fonctionnement :**\n1. L'entrée est projetée en h espaces différents (les « têtes »)\n2. Chaque tête calcule Q, K, V indépendamment\n3. `Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V`\n4. Les résultats sont concaténés et projetés\n\n**Intuition :** Une tête peut se concentrer sur la syntaxe, une autre sur la sémantique.\n\n*Voulez-vous un exemple avec du code PyTorch ?*";
      } else {
        response =
          "Je comprends votre question. Pourriez-vous préciser le sujet ou le cours concerné ? Je pourrai ainsi vous fournir une réponse plus pertinente avec des références académiques.";
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

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-primary text-primary-foreground ai-glow hover:scale-105 transition-transform duration-300"
      >
        <Sparkles className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-[360px] min-w-[360px] h-screen border-l border-border flex flex-col bg-background animate-pulse-glow ai-glow-border"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">EduConnect AI</h3>
            <p className="font-mono-ui text-xs text-muted-foreground">Assistant académique</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden px-4 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface border border-border"
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
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-muted-foreground text-sm px-1"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            <span className="font-mono-ui text-xs">EduConnect AI réfléchit...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="font-mono-ui text-xs text-muted-foreground mb-2">Actions rapides</p>
          <div className="grid grid-cols-2 gap-1.5">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition-colors duration-300"
              >
                <action.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2 bg-surface rounded-lg border border-border px-3 py-2 focus-within:border-primary/40 transition-colors duration-300">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Posez une question..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-1.5 rounded-md bg-primary text-primary-foreground disabled:opacity-30 hover:bg-primary/90 transition-all duration-300"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
