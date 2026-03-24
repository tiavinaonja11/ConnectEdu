import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Search, Plus, Phone, Video, MoreVertical, Smile, Paperclip, Image } from "lucide-react";

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
  online?: boolean;
}

const conversations: Conversation[] = [
  { id: "1", name: "Sarah Benali", initials: "SB", lastMessage: "Tu as compris l'exo 3 du TD ?", time: "14:32", unread: 2, online: true },
  { id: "2", name: "Karim Touré", initials: "KT", lastMessage: "Merci pour les notes !", time: "12:10", unread: 0, online: true },
  { id: "3", name: "Pr. Leclerc", initials: "JL", lastMessage: "Vous pouvez passer me voir demain.", time: "Hier", unread: 1 },
  { id: "4", name: "Groupe IA — Projet", initials: "IA", lastMessage: "J'ai push le code sur le repo", time: "Hier", unread: 0 },
  { id: "5", name: "Youssef El Amrani", initials: "YE", lastMessage: "On se retrouve à la BU ?", time: "Lun", unread: 0, online: true },
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
      <div className="w-[320px] min-w-[320px] border-r border-border flex flex-col bg-surface/50">
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl">Messages</h2>
            <button className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-alt/80 transition-all duration-200">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-surface-alt rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans Messenger..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          {filtered.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setActiveConvo(convo.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left ${
                activeConvo === convo.id
                  ? "bg-primary/10"
                  : "hover:bg-surface-alt/50"
              }`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  activeConvo === convo.id ? "gradient-primary text-primary-foreground" : "bg-surface-alt text-foreground"
                }`}>
                  {convo.initials}
                </div>
                {convo.online && <div className="absolute bottom-0 right-0 online-indicator" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm truncate ${convo.unread > 0 ? "font-bold" : "font-medium"}`}>{convo.name}</span>
                  <span className={`text-[11px] shrink-0 ml-2 ${convo.unread > 0 ? "text-primary font-semibold" : "text-muted-foreground"}`}>{convo.time}</span>
                </div>
                <p className={`text-xs truncate mt-0.5 ${convo.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] flex items-center justify-center font-bold shrink-0">
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
          <div className="relative">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
              {activeConversation?.initials}
            </div>
            {activeConversation?.online && <div className="absolute bottom-0 right-0 online-indicator" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{activeConversation?.name}</p>
            <p className="text-[11px] text-success font-medium">En ligne</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-all duration-200">
              <Phone className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-all duration-200">
              <Video className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-all duration-200">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-hidden px-5 py-4 space-y-3">
          <AnimatePresence>
            {currentMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-end gap-2 max-w-[65%] ${msg.isMe ? "flex-row-reverse" : ""}`}>
                  {!msg.isMe && (
                    <div className="w-7 h-7 rounded-full bg-surface-alt flex items-center justify-center text-[10px] font-bold shrink-0">
                      {msg.initials}
                    </div>
                  )}
                  <div>
                    <div
                      className={`px-4 py-2.5 text-sm leading-relaxed ${
                        msg.isMe
                          ? "gradient-primary text-primary-foreground rounded-2xl rounded-br-md"
                          : "bg-surface-alt rounded-2xl rounded-bl-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <p className={`text-[10px] text-muted-foreground/50 mt-1 ${msg.isMe ? "text-right" : ""}`}>
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
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-all duration-200">
                <Image className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-all duration-200">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-surface-alt rounded-full px-4 py-2.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Aa"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
              />
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground disabled:opacity-30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
