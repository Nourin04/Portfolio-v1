import React, { useState, useRef, useEffect } from "react";
import { MessageSquareCode, X, Send, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "../data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm Noureen's AI Assistant. 🧠\nI am grounded in her verified portfolio, projects, skills, and speaking history. Feel free to ask me anything, or try some suggestion chips below!`
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPromptError, setHasPromptError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "What projects has she built?",
    "Show me her AI experiences.",
    "What technologies does she know?",
    "How can I contact her?",
  ];

  // Auto scroll to bottom when message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);
    setHasPromptError(false);

    const updatedMessages = [...messages, userMsg];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      console.warn("API chatbot endpoint failed, falling back to local reasoning agent.", err);
      // Fallback: Smart local response generator
      const fallbackReply = generateFallbackResponse(text);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fallbackReply }
        ]);
        setHasPromptError(true); // Flag to show a small helpful hint about GEMINI_API_KEY
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  // Safe and helpful local conversational dictionary fallback if Gemini API is not yet configured
  const generateFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("project") || q.includes("build") || q.includes("develop")) {
      return `Noureen has built several outstanding projects. Here are her featured ones:\n\n1. **OmniSearch AI**: An AI-powered semantic code search platform utilizing AST chunking, FastAPI, and pgvector.\n2. **MedGPT Assistant**: A clinical NLP summarizer that translates unstructured EHR transcripts into patient-friendly advice. Powered by fine-tuned LLaMA-3.\n3. **AutoEval.AI**: An automated LLM red-teaming sandbox evaluating prompt injections.\n4. **KubeFlow Visualizer**: Interactive ML pipelines dashboard constructed with D3.js and React.\n\nWhich project would you like to hear more about?`;
    }

    if (q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("stack")) {
      return `Noureen's technical proficiencies cover:\n\n- **AI/ML Engineering**: Large Language Models, LangChain, Groq API, Hugging Face, Fine-Tuning (QLoRA), OpenCV.\n- **Frontend**: React, TypeScript, JavaScript, Tailwind CSS, Zustand, Redux.\n- **Backend & DB**: FastAPI, Python, Express, Node.js, PostgreSQL (pgvector), MongoDB.\n- **Cloud & Tools**: Docker, Vercel, Render, Git/GitHub.\n\nShe is particularly passionate about optimizing LLM safety and RAG accuracy!`;
    }

    if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("intern")) {
      return `Noureen has completed two notable engineering internships:\n\n1. **AI Software Engineer Intern** at *Cognitive Computing Labs* (May 2025 - Present): Built fastapi and pgvector RAG agents. Reduced latency by 40%.\n2. **Full-Stack Developer Intern** at *Vectra AI* (June 2024 - Nov 2024): Maintained microfrontends in React and secured express backends. Improved performance scores by 30%.`;
    }

    if (q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("message")) {
      return `You can reach Noureen directly through:\n\n- 📧 **Email**: [noureenbcse202226@geckkd.ac.in](mailto:noureenbcse202226@geckkd.ac.in)\n- 📍 **Location**: Kozhikode, Kerala, India\n- 💼 **LinkedIn** & **GitHub**: Available on her navbar profiles.\n\nFeel free to write to her—she is open to internships and junior developer roles!`;
    }

    if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("study")) {
      return `Noureen is pursuing her **Bachelor of Technology (B.Tech) in Computer Science & Engineering** at **Government Engineering College, Kozhikode** (2022 - 2026).\n\nShe has a stellar current GPA of **9.1/10.0** and serves as the Lead Coordinator of the IEEE Computer Society Student Branch!`;
    }

    if (q.includes("talk") || q.includes("workshop") || q.includes("speaking")) {
      return `Noureen is a skilled speaker who loves sharing technical knowledge! Her sessions include:\n\n- *Demystifying Retrieval-Augmented Generation (RAG)* at IEEE GECKKD (Audience of 150+).\n- *Building Intelligent Agents with LangChain* full-day workshop.\n- *Fine-Tuning LLMs with QLoRA* for Kochi Python group.\n\nShe is excellent at translating complex concepts into structured, practical steps.`;
    }

    if (q.includes("achievement") || q.includes("hackathon") || q.includes("win")) {
      return `Some of Noureen's achievements include:\n\n- **1st Place** at the national *Smart India Hackathon 2025* (Healthcare Track) for her patient monitor system.\n- **Winner** of the *Kozhikode Regional TechFest Hackathon*.\n- **IEEE Computer Society Student Merit Scholarship** recipient (2024) for academic excellence.`;
    }

    return `I am familiar with Noureen's background, projects, academic honors, talks, and skills. Feel free to ask questions like "What are her core AI skills?" or "Tell me about OmniSearch AI"!`;
  };

  return (
    <>
      {/* Chat floating trigger FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/30 border border-indigo-500/20 cursor-pointer"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X size={20} /> : <MessageSquareCode size={20} />}
      </motion.button>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-[350px] sm:w-[380px] h-[500px] bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
          >
            {/* Header info */}
            <div className="p-4 bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold">
                  🤖
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans tracking-wide">Noureen's Agent</h4>
                  <p className="text-[10px] text-indigo-200 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Offline-Ready Grounding
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* API Key reminder status banner if offline fallback was triggered */}
            {hasPromptError && (
              <div className="px-4 py-2 bg-indigo-50/70 dark:bg-indigo-950/30 border-b border-indigo-100/40 dark:border-indigo-950/20 flex items-center gap-2 text-[10px] text-indigo-700 dark:text-indigo-400">
                <AlertCircle size={12} className="shrink-0 text-indigo-500" />
                <span className="leading-tight">
                  I'm currently answering using built-in grounding. Configure a **GEMINI_API_KEY** in secrets to enable Gemini.
                </span>
              </div>
            )}

            {/* Message Chat stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-wrap font-sans ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-gray-100/80 dark:bg-slate-950/40 text-gray-800 dark:text-gray-200 border border-gray-150/40 dark:border-slate-850/60 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing loader state */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100/80 dark:bg-slate-950/40 border border-gray-150/40 dark:border-slate-850/60 rounded-2xl rounded-bl-none p-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {messages.length === 1 && !loading && (
              <div className="px-4 pb-1 pt-2 flex flex-wrap gap-1.5 border-t border-gray-100 dark:border-slate-850">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-indigo-50/50 hover:bg-indigo-100/70 dark:bg-indigo-950/30 dark:hover:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-950/20 transition-all cursor-pointer text-left"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Bottom input area */}
            <div className="p-3 border-t border-gray-100 dark:border-slate-850 bg-white dark:bg-slate-900 flex gap-2">
              <input
                type="text"
                placeholder="Ask about her projects, experience..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-150 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-gray-150 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={loading || !inputValue.trim()}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white disabled:opacity-40 transition-opacity cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
