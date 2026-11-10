"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SiriAssistant() {
  const pathname = usePathname();
  const isSamsung = pathname?.startsWith("/samsung");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{id: string, role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("API Error");
      if (!response.body) throw new Error("No body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantMsg = { id: (Date.now() + 1).toString(), role: "assistant", content: "" };
      setMessages([...newMessages, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        assistantMsg.content += chunk;
        
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantMsg };
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-50 p-[2px] rounded-full overflow-hidden shadow-2xl group ${
              isSamsung ? "shadow-blue-500/25" : "shadow-purple-500/20"
            }`}
          >
            {/* Animated Brand Gradient Border */}
            <span
              className={`absolute inset-0 animate-spin-slow ${
                isSamsung
                  ? "bg-gradient-to-r from-[#2189ff] via-[#00d4ff] to-[#000f8d]"
                  : "bg-gradient-to-r from-[#ff00ff] via-[#00d4ff] to-[#ff00ff]"
              }`}
              style={{ animationDuration: '4s' }}
            />
            
            <div className="relative bg-black hover:bg-black/80 transition-colors rounded-full px-6 py-4 flex items-center gap-3">
              {/* Inner glowing orb / star */}
              <div
                className={`w-4 h-4 rounded-full blur-[2px] animate-pulse ${
                  isSamsung
                    ? "bg-gradient-to-r from-[#2189ff] via-[#00d4ff] to-[#000f8d]"
                    : "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                }`}
              />
              <span className="text-[#f5f5f7] font-medium tracking-tight">
                {isSamsung ? "Ask Galaxy AI" : "Ask Apple Intelligence"}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-[#1d1d1f]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full blur-[2px] animate-pulse ${
                    isSamsung
                      ? "bg-gradient-to-r from-[#2189ff] via-[#00d4ff] to-[#000f8d]"
                      : "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                  }`}
                />
                <h3 className="text-[#f5f5f7] font-semibold text-lg">
                  {isSamsung ? "Galaxy AI Concierge" : "Apple Intelligence"}
                </h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#86868b] hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                  <div
                    className={`w-16 h-16 rounded-full blur-xl opacity-50 mb-4 animate-pulse ${
                      isSamsung
                        ? "bg-gradient-to-r from-[#2189ff] via-[#00d4ff] to-[#000f8d]"
                        : "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                    }`}
                  />
                  <p className="text-[#f5f5f7] text-lg font-medium">How can I help you today?</p>
                  <p className="text-[#86868b] text-sm mt-2">
                    {isSamsung
                      ? "Ask about Galaxy Z Fold8 Ultra, Flip8, Flex Hinge, or AI."
                      : "Ask about the A20 Pro chip, cameras, or colors."}
                  </p>
                </div>
              )}
              
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white/10 text-[#f5f5f7] rounded-bl-sm backdrop-blur-md'
                    }`}
                  >
                    {/* Basic markdown bold parsing for the assistant */}
                    <div 
                      className="text-[15px] leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }}
                    />
                  </div>
                </div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-[#f5f5f7] rounded-2xl rounded-bl-sm px-5 py-4 backdrop-blur-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isSamsung
                      ? "Ask about Galaxy Z Fold8, Flip8, AI features..."
                      : "Ask about iPhone 18 Pro..."
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-12 py-4 text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 text-white bg-blue-600 hover:bg-blue-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
