import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Search, Plus, Phone, Video, MoreVertical, Smile, Paperclip,
  Image, Mic, AtSign, Hash, Star, ArrowLeft
} from "lucide-react";

interface ChatMessage {
  id: number;
  author: string;
  initials: string;
  content: string;
  time: string;
  isMe?: boolean;
  reaction?: string;
}

interface Conversation {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
  color: string;
  status?: string;
}

const conversations: Conversation[] = [
  { id: "1", name: "Sarah Benali", initials: "SB", lastMessage: "Tu as compris l'exo 3 du TD ?", time: "14:32", unread: 2, online: true, color: "from-rose-500 to-orange-400", status: "Étudiante en Physique" },
  { id: "2", name: "Karim Touré", initials: "KT", lastMessage: "Merci pour les notes !", time: "12:10", unread: 0, online: true, color: "from-emerald-500 to-teal-400", status: "M1 Informatique" },
  { id: "3", name: "Pr. Leclerc", initials: "JL", lastMessage: "Vous pouvez passer me voir demain.", time: "Hier", unread: 1, color: "from-sky-500 to-blue-400", status: "Professeur de Physique" },
  { id: "4", name: "Groupe IA — Projet", initials: "IA", lastMessage: "J'ai push le code sur le repo", time: "Hier", unread: 0, color: "from-violet-500 to-purple-400", status: "5 membres" },
  { id: "5", name: "Youssef El Amrani", initials: "YE", lastMessage: "On se retrouve à la BU ?", time: "Lun", unread: 0, online: true, color: "from-amber-500 to-yellow-400", status: "L3 Mathématiques" },
];

const chatHistories: Record<string, ChatMessage[]> = {
  "1": [
    { id: 1, author: "Sarah Benali", initials: "SB", content: "Salut ! Tu as compris l'exercice 3 du TD de mécanique quantique ?", time: "14:28" },
    { id: 2, author: "Moi", initials: "A", content: "Salut ! Oui, il faut appliquer l'opérateur hamiltonien sur la fonction d'onde.", time: "14:30", isMe: true },
    { id: 3, author: "Sarah Benali", initials: "SB", content: "Ah ok, et pour la normalisation ?", time: "14:31" },
    { id: 4, author: "Sarah Benali", initials: "SB", content: "Tu as compris l'exo 3 du TD ?", time: "14:32", reaction: "👍" },
  ],
  "2": [
    { id: 1, author: "Karim Touré", initials: "KT", content: "Hey ! J'ai vu que tu avais partagé tes notes d'algo. Super utile !", time: "12:05" },
    { id: 2, author: "Moi", initials: "A", content: "De rien ! J'espère que ça t'aidera pour les partiels.", time: "12:08", isMe: true },
    { id: 3, author: "Karim Touré", initials: "KT", content: "Merci pour les notes !", time: "12:10", reaction: "❤️" },
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
  const [isTyping, setIsTyping] = useState(false);
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

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Group messages by date-like separators
  const renderDateSeparator = (text: string) => (
    <div className="flex items-center gap-3 py-3">
      <div className="flex-1 h-px bg-border/50" />
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-medium">{text}</span>
      <div className="flex-1 h-px bg-border/50" />
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Conversations list */}
      <div className="w-[340px] min-w-[340px] border-r border-border flex flex-col">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Discussions</h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {conversations.filter(c => c.online).length} en ligne
              </p>
            </div>
            <button className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all duration-200 active:scale-95">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2.5 bg-surface-alt/80 rounded-2xl px-4 py-2.5 border border-border/50 focus-within:border-primary/30 transition-colors duration-200">
            <Search className="w-4 h-4 text-muted-foreground/60" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une discussion..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40"
            />
          </div>

          {/* Quick filters */}
          <div className="flex items-center gap-2 mt-3">
            {["Tous", "Non lus", "Groupes"].map((f, i) => (
              <button
                key={f}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 active:scale-95 ${
                  i === 0
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                    : "bg-surface-alt text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Online now */}
        <div className="px-5 py-3 border-b border-border/50">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-semibold mb-2.5">En ligne</p>
          <div className="flex items-center gap-3">
            {conversations.filter(c => c.online).map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConvo(c.id)}
                className="relative group"
              >
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold shadow-md transition-transform duration-200 group-hover:scale-110 group-active:scale-95`}>
                  {c.initials}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-background" />
              </button>
            ))}
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto scrollbar-hidden py-1">
          {filtered.map((convo, i) => (
            <motion.button
              key={convo.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              onClick={() => setActiveConvo(convo.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 transition-all duration-200 text-left relative ${
                activeConvo === convo.id
                  ? "bg-primary/8"
                  : "hover:bg-surface-alt/40"
              }`}
            >
              {activeConvo === convo.id && (
                <motion.div
                  layoutId="chat-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${convo.color} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                  {convo.initials}
                </div>
                {convo.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-background" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm truncate ${convo.unread > 0 ? "font-bold" : "font-medium"}`}>{convo.name}</span>
                  <span className={`text-[10px] shrink-0 ml-2 ${convo.unread > 0 ? "text-primary font-semibold" : "text-muted-foreground/60"}`}>{convo.time}</span>
                </div>
                <p className={`text-xs truncate mt-0.5 ${convo.unread > 0 ? "text-foreground/80 font-medium" : "text-muted-foreground/60"}`}>{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold shrink-0 shadow-sm shadow-primary/30">
                  {convo.unread}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col relative">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px"
        }} />

        {/* Chat header */}
        <div className="relative z-10 px-5 py-3 border-b border-border/50 flex items-center gap-3 backdrop-blur-sm bg-background/80">
          <div className="relative">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeConversation?.color} flex items-center justify-center text-sm font-bold text-white shadow-sm`}>
              {activeConversation?.initials}
            </div>
            {activeConversation?.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-background" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{activeConversation?.name}</p>
            <p className="text-[10px] text-muted-foreground/60">{activeConversation?.status}</p>
          </div>
          <div className="flex items-center gap-0.5">
            {[Phone, Video, Star, MoreVertical].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-surface-alt/60 transition-all duration-200 active:scale-95">
                <Icon className="w-[18px] h-[18px]" />
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hidden px-6 py-5">
          {renderDateSeparator("Aujourd'hui")}

          <div className="space-y-4">
            <AnimatePresence>
              {currentMessages.map((msg, idx) => {
                const showAvatar = !msg.isMe && (idx === 0 || currentMessages[idx - 1]?.isMe || currentMessages[idx - 1]?.author !== msg.author);
                const isLastInGroup = idx === currentMessages.length - 1 || currentMessages[idx + 1]?.isMe !== msg.isMe || currentMessages[idx + 1]?.author !== msg.author;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${msg.isMe ? "justify-end" : "justify-start"} ${!isLastInGroup ? "mb-0.5" : ""}`}
                  >
                    <div className={`flex items-end gap-2.5 max-w-[60%] ${msg.isMe ? "flex-row-reverse" : ""}`}>
                      {!msg.isMe && (
                        <div className={`w-7 h-7 rounded-lg shrink-0 ${showAvatar ? `bg-gradient-to-br ${conversations.find(c => c.name === msg.author)?.color || "from-gray-400 to-gray-500"} flex items-center justify-center text-[9px] font-bold text-white` : "invisible"}`}>
                          {msg.initials}
                        </div>
                      )}
                      <div className="relative group">
                        <div
                          className={`px-4 py-2.5 text-[13px] leading-relaxed ${
                            msg.isMe
                              ? `bg-gradient-to-br ${activeConversation?.color || "from-primary to-primary"} text-white rounded-2xl ${isLastInGroup ? "rounded-br-lg" : "rounded-br-lg"}`
                              : `bg-card border border-border/40 rounded-2xl ${isLastInGroup ? "rounded-bl-lg" : "rounded-bl-lg"}`
                          } shadow-sm`}
                        >
                          {msg.content}
                        </div>

                        {/* Reaction */}
                        {msg.reaction && (
                          <div className={`absolute -bottom-2 ${msg.isMe ? "left-2" : "right-2"} bg-card border border-border/50 rounded-full px-1.5 py-0.5 text-[11px] shadow-sm`}>
                            {msg.reaction}
                          </div>
                        )}

                        {/* Time - show on last in group */}
                        {isLastInGroup && (
                          <p className={`text-[9px] text-muted-foreground/40 mt-1.5 ${msg.isMe ? "text-right mr-1" : "ml-1"}`}>
                            {msg.time} {msg.isMe && "✓✓"}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-end gap-2.5"
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${activeConversation?.color} flex items-center justify-center text-[9px] font-bold text-white`}>
                    {activeConversation?.initials}
                  </div>
                  <div className="bg-card border border-border/40 rounded-2xl rounded-bl-lg px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="relative z-10 px-5 py-3 border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="flex items-end gap-2">
            {/* Action buttons */}
            <div className="flex items-center gap-0.5 pb-1">
              {[
                { icon: Image, color: "text-emerald-500 hover:bg-emerald-500/10" },
                { icon: Paperclip, color: "text-sky-500 hover:bg-sky-500/10" },
                { icon: Mic, color: "text-rose-500 hover:bg-rose-500/10" },
              ].map(({ icon: Icon, color }, i) => (
                <button key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center ${color} transition-all duration-200 active:scale-95`}>
                  <Icon className="w-[18px] h-[18px]" />
                </button>
              ))}
            </div>

            {/* Input field */}
            <div className="flex-1 flex items-end gap-2 bg-surface-alt/60 border border-border/40 rounded-2xl px-4 py-2.5 focus-within:border-primary/30 transition-colors duration-200">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Écrire un message..."
                rows={1}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40 resize-none min-h-[20px] max-h-[120px]"
                style={{ height: "20px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "20px";
                  target.style.height = target.scrollHeight + "px";
                }}
              />
              <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200 pb-0.5">
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Send */}
            <motion.button
              onClick={handleSend}
              disabled={!input.trim()}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white mb-0.5 transition-all duration-300 shadow-md active:scale-95 ${
                input.trim()
                  ? `bg-gradient-to-br ${activeConversation?.color || "from-primary to-primary"} shadow-primary/25`
                  : "bg-muted text-muted-foreground shadow-none"
              }`}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
