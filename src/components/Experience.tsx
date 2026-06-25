import React from "react";
import { Briefcase, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import { portfolioData } from "../data";

export default function Experience() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Briefcase size={14} />
            <span>03 . EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            Work History & Milestones
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-sans font-light">
            A history of positions where I applied software engineering principles to automate services and improve operational performance.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-gray-150 dark:border-slate-800 max-w-3xl mx-auto text-left pl-6 sm:pl-8 space-y-12">
          
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-indigo-600 dark:border-indigo-400 bg-white dark:bg-slate-900 group-hover:scale-125 transition-transform duration-350 shadow-sm" />
              <div className="absolute -left-[27px] sm:-left-[35px] top-[14px] w-2 h-2 rounded-full bg-indigo-100 dark:bg-indigo-950/40 pointer-events-none group-hover:bg-indigo-500 transition-colors" />

              {/* Header Box */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-display font-extrabold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-gray-400">
                    <Calendar size={12} />
                    {exp.duration}
                  </span>
                </div>
                <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {exp.company}
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="mt-4 space-y-2.5">
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                    <ChevronRight size={14} className="mt-1 text-indigo-500 shrink-0" />
                    <p className="leading-relaxed font-sans font-light">{resp}</p>
                  </div>
                ))}
              </div>

              {/* Key Impact & Achievements */}
              {exp.achievements.length > 0 && (
                <div className="mt-5 p-4 rounded-2xl bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-100/30 dark:border-indigo-950/10">
                  <span className="block text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-2">
                    Core Achievements & Business Impact:
                  </span>
                  <div className="space-y-2">
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <CheckCircle2 size={13} className="mt-0.5 text-emerald-500 shrink-0" />
                        <span className="leading-relaxed font-sans font-medium text-gray-700 dark:text-gray-250">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono font-medium bg-gray-50 dark:bg-slate-950 border border-gray-150 dark:border-slate-850 text-gray-500 dark:text-gray-400 px-2.5 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
