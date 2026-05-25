{
  /*import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement chat functionality
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <>
      
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-primary rounded-full shadow-luxury flex items-center justify-center text-white hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaComments className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 max-w-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass rounded-2xl shadow-glass overflow-hidden">
             
              <div className="bg-gradient-primary p-4 text-white">
                <h3 className="font-semibold text-lg">Need Help?</h3>
                <p className="text-sm opacity-90">
                  We're here to assist you with gifting!
                </p>
              </div>

            
              <div className="h-64 p-4 overflow-y-auto bg-white/50 dark:bg-neutral-800/50">
                <div className="space-y-3">
                  <div className="flex">
                    <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-neutral-800 dark:text-neutral-200">
                        Hi! How can we help you find the perfect gift today?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="p-4 bg-white/70 dark:bg-neutral-800/70 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-2 bg-gradient-primary text-white rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  We typically respond within 5 minutes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;*/
}

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaWhatsapp,
  FaRobot,
  FaUser,
  FaGift,
} from "react-icons/fa";

// ─── Config ──────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "919000328100";
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ─── Types ───────────────────────────────────────────────────────
interface Message {
  id: string;
  text: string;
  fromUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface ConversationMessage {
  role: string;
  content: string;
}

// ─── Quick Replies ────────────────────────────────────────────────
const QUICK_REPLIES = [
  "🎁 Find a gift",
  "💰 Budget options",
  "🚚 Delivery info",
  "🏢 Corporate gifts",
  "💍 Wedding gifts",
  "🎂 Birthday gifts",
];

// ─── AI System Prompt ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are EasyGifting's friendly AI assistant for a premium Indian gifting e-commerce website called EasyGifting (easygifting.in).

Your responsibilities:
1. Help customers find the perfect gift based on occasion, budget, and recipient
2. Answer questions about products, delivery, and orders
3. Suggest from these gift categories: Hampers, Personalised gifts, Corporate gifts, Festive gifts, Wedding gifts, Birthday gifts, Dry fruits, Chocolates, Spa kits, Plants
4. Handle budget queries — suggest options from ₹500 to ₹10,000+
5. For delivery: orders are delivered in 2-5 business days across India, same-day available in select cities
6. For corporate/bulk orders (50+ pieces): redirect to WhatsApp +91 9000328100
7. For order tracking: ask for order ID and tell them to check their email or WhatsApp
8. Always be warm, helpful, and enthusiastic about gifting
9. Keep responses SHORT and conversational — 2-3 sentences max
10. Use emojis occasionally to keep it friendly and warm
11. If you cannot help, always suggest WhatsApp: +91 9000328100
12. Never make up product prices — say "prices start from ₹X" only if you're confident

You represent EasyGifting — a premium corporate gifting solutions brand based in India. Always reflect the brand's premium, warm, and thoughtful personality.`;

// ─── FloatingChat Component ───────────────────────────────────────
const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! 👋 I'm your EasyGifting AI assistant. I can help you find the perfect gift, explore our collections, or answer any questions. What are you looking for today?",
      fromUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setHasNewMessage(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // ─── Send to Gemini via backend ─────────────────────────────────
  const sendToAI = async (userMessage: string): Promise<string> => {
    const newHistory: ConversationMessage[] = [
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ Gemini format — no model/max_tokens
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const aiReply =
        data.content?.[0]?.text ||
        "I'm sorry, I couldn't process that. Please try again or contact us on WhatsApp! 🙏";

      setConversationHistory([
        ...newHistory,
        { role: "assistant", content: aiReply },
      ]);

      return aiReply;
    } catch (error) {
      return "Oops! Something went wrong. Please reach us on WhatsApp at +91 9000328100 🙏";
    }
  };

  // ─── Handle Send ───────────────────────────────────────────────
  const handleSendMessage = async (text?: string) => {
    const msgText = (text || message).trim();
    if (!msgText || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: msgText,
      fromUser: true,
      timestamp: new Date(),
    };

    const typingMsg: Message = {
      id: "typing",
      text: "",
      fromUser: false,
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setMessage("");
    setIsLoading(true);

    const aiReply = await sendToAI(msgText);

    setMessages((prev) => [
      ...prev.filter((m) => m.id !== "typing"),
      {
        id: `ai-${Date.now()}`,
        text: aiReply,
        fromUser: false,
        timestamp: new Date(),
      },
    ]);

    setIsLoading(false);
  };

  // ─── WhatsApp Handler ──────────────────────────────────────────
  const handleWhatsApp = () => {
    const text = "Hi! I need help finding the perfect gift. 🎁";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      {/* ─── Floating Button ──────────────────────────────────── */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-luxury flex items-center justify-center text-white"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}

        {/* New message dot */}
        {hasNewMessage && !isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaComments className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ─── Chat Window ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-[370px] max-w-[calc(100vw-24px)]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div
              className="rounded-2xl overflow-hidden border border-white/20"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 25px 60px rgba(124,58,237,0.2), 0 8px 32px rgba(31,38,135,0.15)",
              }}
            >
              {/* ─── Header ─────────────────────────────────── */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #ec4899 100%)",
                }}
                className="p-4 text-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <FaGift className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-base leading-tight">
                        EasyGifting AI
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-green-400"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-xs text-white/80">
                          Online · Replies instantly
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleWhatsApp}
                    className="bg-green-500 hover:bg-green-600 transition-colors p-2.5 rounded-full"
                    title="Chat on WhatsApp"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ─── Messages ───────────────────────────────── */}
              <div
                className="h-72 overflow-y-auto p-4 space-y-3"
                style={{
                  background:
                    "linear-gradient(to bottom, #faf5ff, #fdf2f8, #faf5ff)",
                }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-end gap-2 ${
                      msg.fromUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white ${
                        msg.fromUser
                          ? "bg-gradient-to-br from-primary-500 to-secondary-500"
                          : "bg-gradient-to-br from-primary-800 to-primary-600"
                      }`}
                    >
                      {msg.fromUser ? (
                        <FaUser className="w-3 h-3" />
                      ) : (
                        <FaRobot className="w-3 h-3" />
                      )}
                    </div>

                    <div
                      className={`max-w-[78%] flex flex-col gap-1 ${
                        msg.fromUser ? "items-end" : "items-start"
                      }`}
                    >
                      {msg.isTyping ? (
                        <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-primary-100">
                          <div className="flex gap-1 items-center h-4">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-primary-400"
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.fromUser
                              ? "text-white rounded-br-sm"
                              : "bg-white text-neutral-800 rounded-bl-sm border border-primary-100"
                          }`}
                          style={
                            msg.fromUser
                              ? {
                                  background:
                                    "linear-gradient(135deg, #7c3aed, #a855f7)",
                                }
                              : {}
                          }
                        >
                          {msg.text}
                        </div>
                      )}
                      {!msg.isTyping && (
                        <span className="text-[10px] text-neutral-400 px-1">
                          {formatTime(msg.timestamp)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* ─── Quick Replies ───────────────────────────── */}
              <div
                className="px-4 py-2.5 border-t border-primary-100 overflow-x-auto"
                style={{ background: "rgba(250,245,255,0.9)" }}
              >
                <p className="text-[10px] text-neutral-400 mb-2 font-medium uppercase tracking-wide">
                  Quick options
                </p>
                <div className="flex gap-2 min-w-max pb-1">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSendMessage(reply)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition-all whitespace-nowrap disabled:opacity-50 font-medium"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* ─── WhatsApp CTA ────────────────────────────── */}
              {/* <div
                className="px-4 pt-3"
                style={{ background: "rgba(255,255,255,0.95)" }}
              >
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-xl transition-all text-sm font-semibold hover:shadow-md"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Chat directly on WhatsApp
                </button>
              </div> */}

              {/* ─── Input ───────────────────────────────────── */}
              <div
                className="p-4 border-t border-primary-100 mt-3"
                style={{ background: "rgba(255,255,255,0.95)" }}
              >
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSendMessage()
                    }
                    placeholder="Ask me anything about gifts..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 border border-primary-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm disabled:opacity-60 transition-all"
                  />
                  <motion.button
                    onClick={() => handleSendMessage()}
                    disabled={!message.trim() || isLoading}
                    className="p-2.5 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <FaPaperPlane className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
                <p className="text-[10px] text-neutral-400 mt-2 text-center"></p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
