import React from "react";
import { Cpu, Terminal, Sparkles, Database } from "lucide-react";
import { portfolioData } from "../data";

export default function Skills() {
  const categories = portfolioData.skills;

  // Icon mapping helper based on category index
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="text-indigo-600 dark:text-indigo-400" size={18} />;
      case 1:
        return <Cpu className="text-violet-600 dark:text-violet-400" size={18} />;
      case 2:
        return <Sparkles className="text-pink-600 dark:text-pink-400" size={18} />;
      case 3:
        return <Database className="text-emerald-600 dark:text-emerald-400" size={18} />;
      default:
        return <Cpu className="text-indigo-600 dark:text-indigo-400" size={18} />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-gray-50/50 dark:bg-slate-950/20 border-t border-gray-100 dark:border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Cpu size={14} />
            <span>04 . TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            Technical Proficiency
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-sans font-light">
            An organized matrix of technologies, frameworks, and developer architectures that I actively deploy in systems development.
          </p>
        </div>

        {/* Categorized Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {categories.map((category, idx) => (
            <div
              key={category.title}
              className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-6 rounded-3xl shadow-sm text-left flex flex-col space-y-6 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-850 flex items-center justify-center">
                  {getCategoryIcon(idx)}
                </div>
                <h3 className="font-display font-extrabold text-base text-gray-800 dark:text-gray-100 tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/50 dark:bg-slate-950/20 border border-gray-100 dark:border-slate-850 group hover:border-indigo-100 dark:hover:border-indigo-950/50 transition-colors"
                  >
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 font-sans group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {skill.name}
                    </span>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wide px-2 py-0.5 rounded ${
                      skill.level === "Expert"
                        ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                        : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400"
                    }`}>
                      {skill.level || "Intermediate"}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
