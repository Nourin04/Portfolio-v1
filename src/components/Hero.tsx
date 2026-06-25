import React from "react";
import { ArrowRight, Github, Linkedin, Mail, Sparkles, FileText } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data";

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const info = portfolioData.personalInfo;

  return (
    <section
      id="home"
      className="relative min-h-[70vh] flex flex-col justify-center pt-32 pb-16 bg-dot-pattern"
    >
      {/* Editorial glowing backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 w-full text-center space-y-8 relative z-10">
        
        {/* Active status indicator badge - very minimal, non-cliché */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/30 dark:border-indigo-950/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Systems Engineer & AI Scholar</span>
        </motion.div>

        {/* Elegant typography pairing: Playfair Display + Plus Jakarta Sans */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-slate-950 dark:text-white leading-tight"
          >
            Designing intelligent <span className="font-sans italic font-normal text-indigo-600 dark:text-indigo-400">interfaces</span> <br className="hidden sm:inline" />
            & agentic <span className="font-sans italic font-normal text-slate-600 dark:text-slate-400">software systems</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-sans font-light leading-relaxed"
          >
            I'm <span className="font-semibold text-slate-800 dark:text-slate-200">Noureen K.</span>, a computer science scholar crafting full-stack software backed by Large Language Models.
          </motion.p>
        </div>

        {/* Dynamic primary CTAs - clean layout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#workspace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-slate-950 hover:bg-indigo-600 dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-indigo-500 dark:hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <span>Explore Curated Deck</span>
            <ArrowRight size={13} />
          </a>
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-slate-700 transition-colors cursor-pointer"
          >
            <FileText size={13} />
            <span>Interactive Resume</span>
          </button>
        </motion.div>

        {/* Horizontal social line - very minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center space-x-6 pt-4 text-slate-400 dark:text-slate-500"
        >
          <a
            href={info.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-xs font-mono flex items-center gap-1.5"
          >
            <Github size={13} />
            <span>github</span>
          </a>
          <span className="text-slate-200 dark:text-slate-800">/</span>
          <a
            href={info.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-xs font-mono flex items-center gap-1.5"
          >
            <Linkedin size={13} />
            <span>linkedin</span>
          </a>
          <span className="text-slate-200 dark:text-slate-800">/</span>
          <a
            href={`mailto:${info.email}`}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-xs font-mono flex items-center gap-1.5"
          >
            <Mail size={13} />
            <span>email</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
