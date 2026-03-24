import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Search, Circle, Plus } from "lucide-react";

interface ChatMessage {
  id: number;
  author: string;
  initials: string;
  content: string;
  time: string;
  isMe?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const conversations: Conversation[] = [
  { id: "1", name: "Sarah Benali", initials: "SB", lastMessage: "Tu as compris l'exo 3 du TD ?", time: "14:32", unread: 2 },
  { id: "2", name: "Karim Touré", initials: "KT", lastMessage: "Merci pour les notes !", time: "12:10", unread: 0 },
  { id: "3", name: "Pr. Leclerc", initials: "JL", lastMessage: "Vous pouvez passer me voir demain.", time: "Hier", unread: 1 },
  { id: "4", name: "Groupe IA — Projet", initials: "IA", lastMessage: "J'ai push le code sur le repo", time: "Hier", unread: 0 },
  { id: "5", name: "Youssef El Amrani", initials: "YE", lastMessage: "On se retrouve à la BU ?", time: "Lun", unread: 0 },
];

const chatHistories: Record<string, ChatMessage[]> = {
  "1": [
    { id: 1, author: "Sarah Benali", initials: "SB", content: "Salut ! Tu as compris l'exercice 3 du TD de mécanique quantique ?", time: "14:28" },
    { id: 2, author: "Moi", initials: "A", content: "Salut ! Oui, il faut appliquer l'opérateur hamiltonien sur la fonction d'onde.", time: "14:30", isMe: true },
    { id: 3, author: "Sarah Benali", initials: "SB", content: "Ah ok, et pour la normalisation ?", time: "14:31" },
    { id: 4, author: "Sarah Benali", initials: "SB", content: "Tu as compris l'exo 3 du TD ?", time: "14:32" },
  ],
  "2": [
    { id: 1, author: "Karim Touré", initials: "KT", content: "Hey ! J'ai vu que tu avais partagé tes notes d'algo. Super utile !", time: "12:05" },
    { id: 2, author: "Moi", initials: "A", content: "De rien ! J'espère que ça t'aidera pour les partiels.", time: "12:08", isMe: true },
    { id: 3, author: "Karim Touré", initials: "KT", content: "Merci pour les notes !", time: "12:10" },
  ],
  "3": [
    { id: 1, author: "Pr. Leclerc", initials: "JL", content: "Bonjour, j'ai corrigé votre devoir. Quelques points à revoir.", time: "16:20" },
    { id: 2, author: "Moi", initials: "A", content: "Bonjour Professeur, merci. Quand puis-je passer en voir les détails ?", time: "16:45", isMe: true },
    { id: 3, author: "Pr. Leclerc", initials: "JL", content: "Vous pouvez passer me voir demain.", time: "17:00" },
  ],
};

export default function MessagesPage() {
  const [activeConvo, setActiveConvo] = useState<string>("1");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(chatHistories);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = messages[activeConvo] || [];
  const activeConversation = conversations.find((c) => c.id === activeConvo);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length, activeConvo]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      author: "Moi",
      initials: "A",
      content: input.trim(),
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };
    setMessages((prev) => ({
      ...prev,
      [activeConvo]: [...(prev[activeConvo] || []), newMsg],
    }));
    setInput("");
  };

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Conversations list */}
      <div className="w-[280px] min-w-[280px] border-r border-border flex flex-col">
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-xl">Messages</h2>
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-colors duration-300">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-surface rounded-lg border border-border px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          {filtered.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setActiveConvo(convo.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors duration-300 text-left ${
                activeConvo === convo.id
                  ? "bg-surface-alt"
                  : "hover:bg-surface-alt/50"
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-surface-alt flex items-center justify-center text-sm font-semibold shrink-0">
                {convo.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{convo.name}</span>
                  <span className="font-mono-ui text-xs text-muted-foreground shrink-0 ml-2">{convo.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium shrink-0">
                  {convo.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="px-5 py-3 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center text-sm font-semibold">
            {activeConversation?.initials}
          </div>
          <div>
            <p className="text-sm font-medium">{activeConversation?.name}</p>
            <p className="font-mono-ui text-xs text-muted-foreground">En ligne</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-hidden px-5 py-4 space-y-3">
          <AnimatePresence>
            {currentMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-end gap-2 max-w-[65%] ${msg.isMe ? "flex-row-reverse" : ""}`}>
                  {!msg.isMe && (
                    <div className="w-7 h-7 rounded-lg bg-surface-alt flex items-center justify-center text-xs font-semibold shrink-0">
                      {msg.initials}
                    </div>
                  )}
                  <div>
                    <div
                      className={`rounded-lg px-3.5 py-2 text-sm leading-relaxed ${
                        msg.isMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface border border-border"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <p className={`font-mono-ui text-xs text-muted-foreground/50 mt-1 ${msg.isMe ? "text-right" : ""}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-border">
          <div className="flex items-center gap-3 bg-surface rounded-lg border border-border px-4 py-2.5 focus-within:border-primary/40 transition-colors duration-300">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Écrire un message..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-1.5 rounded-md bg-primary text-primary-foreground disabled:opacity-30 hover:bg-primary/90 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
