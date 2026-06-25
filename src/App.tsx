import React, { useState, useEffect } from "react";
import { ArrowUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CuratedWorkspace from "./components/CuratedWorkspace";
import Contact from "./components/Contact";
import AIAssistant from "./components/AIAssistant";
import ResumePreview from "./components/ResumePreview";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Apply dark mode theme class to HTML root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Track scroll metrics
  useEffect(() => {
    const handleScroll = () => {
      // Scroll to Top visibility
      setShowScrollTop(window.scrollY > 400);

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate smooth loading screen on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Display toast alert
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      darkMode ? "bg-slate-950 text-slate-100" : "bg-[#FDFDFD] text-slate-800"
    }`}>
      
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col items-center justify-center space-y-4"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-12 h-12 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                N
              </span>
              <span className="absolute inset-0 rounded-xl border-2 border-indigo-300 dark:border-indigo-750 animate-ping opacity-30" />
            </div>
            <div className="space-y-1 text-center">
              <h3 className="font-display font-bold text-xs tracking-tight text-slate-900 dark:text-white">
                Noureen . Portfolio
              </h3>
              <p className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-semibold">
                Initializing Workspace...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Scroll Progress Bar */}
          <div className="fixed top-0 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-900 z-50 pointer-events-none">
            <div
              className="h-full bg-indigo-650 dark:bg-indigo-400 transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Sticky Header Navigation */}
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* Core Content Layout Sections */}
          <main className="relative">
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <CuratedWorkspace
              onOpenResume={() => setIsResumeOpen(true)}
              onShowToast={triggerToast}
            />
            <Contact onShowToast={triggerToast} />
          </main>

          {/* Footer Component */}
          <footer className="py-12 px-6 border-t border-slate-100 dark:border-slate-900 bg-slate-50/20 dark:bg-slate-950/20">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="text-left space-y-1">
                <div className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-white">
                  NK<span className="text-indigo-600 dark:text-indigo-400">.</span>
                </div>
                <p className="text-[10px] text-slate-400 italic font-light">
                  "Designing safe, agentic software pipelines."
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-400 font-mono">
                <span>© {new Date().getFullYear()} Noureen.</span>
                <span>•</span>
                <span>Plus Jakarta Sans & Playfair Display</span>
              </div>

            </div>
          </footer>

          {/* Floating Actions */}
          <AIAssistant />

          {/* Scroll-To-Top trigger */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={scrollToTop}
                className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                aria-label="Scroll to top"
              >
                <ArrowUp size={14} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Resume PDF Viewer Overlay */}
          <ResumePreview isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

          {/* Global notification feedback toast */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 20, x: "-50%" }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white border border-slate-900 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xl max-w-sm text-[11px] font-sans font-medium text-left"
              >
                <Check size={12} className="text-emerald-400 shrink-0" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

    </div>
  );
}
