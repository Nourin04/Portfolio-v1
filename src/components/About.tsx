import React from "react";
import { User, Heart, BrainCircuit, Code, Rocket, BookOpen } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const pillars = [
    {
      icon: <BrainCircuit className="text-indigo-600 dark:text-indigo-400" size={20} />,
      title: "AI & NLP Development",
      description: "Fascinated by Large Language Models, prompt architectures, Retrieval-Augmented Generation (RAG), and agentic workflows."
    },
    {
      icon: <Code className="text-violet-600 dark:text-violet-400" size={20} />,
      title: "Full-Stack Software",
      description: "Dedicated to creating fast, scalable, and responsive frontend modules paired with highly secure and performant API backends."
    },
    {
      icon: <Rocket className="text-pink-600 dark:text-pink-400" size={20} />,
      title: "Product Mindset",
      description: "Engineering with the end-user in mind. I prioritize high-fidelity UX, accessibility, and clear, practical business outcomes."
    },
    {
      icon: <BookOpen className="text-emerald-600 dark:text-emerald-400" size={20} />,
      title: "Continuous Learning",
      description: "Consistently researching state-of-the-art advances in LLMs, fine-tuning processes (QLoRA), and cloud orchestration."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <User size={14} />
            <span>01 . PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            Who am I?
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Conversational narrative */}
          <div className="lg:col-span-6 space-y-6 text-left text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-base">
            <p>
              Hi, I’m <strong className="font-semibold text-gray-900 dark:text-white">Noureen</strong>, a Software Engineer & AI Engineer based in Kozhikode, Kerala. I’m currently completing my Bachelor of Technology in Computer Science and Engineering at <span className="font-semibold text-gray-800 dark:text-gray-100">Government Engineering College, Kozhikode</span> (class of 2026).
            </p>
            <p>
              My journey into tech began with a deep curiosity for building things that make an immediate impact. As the landscape evolved, I found myself drawn to the intersections of traditional Software Engineering and modern Artificial Intelligence. I don’t believe in AI as a standalone novelty—instead, I believe in embedding cognitive reasoning directly into product-first workflows to build applications that solve concrete, real-world struggles.
            </p>
            <p>
              Whether it’s developing full-stack portals, building advanced semantic code-search engines, or writing AST chunkers to retain logical code structures, I love diving deep into the architecture. I approach engineering with high discipline, structural honesty, and a pursuit for elegant simplicity.
            </p>
            
            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>Passionate about LLM safety, developer tooling, and healthcare systems.</span>
            </div>
          </div>

          {/* Right Column: Focus Areas (Grid) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150 dark:border-slate-850 p-6 rounded-2xl text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-gray-200/60 dark:border-slate-800 flex items-center justify-center shadow-sm">
                    {pillar.icon}
                  </div>
                  <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
