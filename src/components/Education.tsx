import React from "react";
import { GraduationCap, Award, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { portfolioData } from "../data";

export default function Education() {
  const education = portfolioData.education;

  return (
    <section id="education" className="py-24 bg-gray-50/50 dark:bg-slate-950/20 border-t border-gray-100 dark:border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <GraduationCap size={14} />
            <span>06 . ACADEMICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            Academic Background
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-sans font-light">
            My formal engineering education and associated computer science credentials.
          </p>
        </div>

        {/* Education Blocks */}
        <div className="max-w-3xl mx-auto space-y-8 text-left">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              
              {/* Header block info */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-5">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {edu.college}
                  </div>
                </div>
                <span className="inline-block text-xs font-mono font-medium text-gray-400 bg-gray-50 dark:bg-slate-950 px-3 py-1 rounded-full border border-gray-100 dark:border-slate-850 shrink-0 self-start">
                  {edu.duration}
                </span>
              </div>

              {/* Coursework & Achievements Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                
                {/* Coursework column */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <BookOpen size={14} />
                    <span>Relevant Coursework</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.relevantCoursework.map((course) => (
                      <span
                        key={course}
                        className="text-xs font-sans font-light bg-gray-50 dark:bg-slate-950 text-gray-600 dark:text-gray-300 border border-gray-150 dark:border-slate-850 px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <ChevronRight size={10} className="text-indigo-500" />
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements column */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <Award size={14} />
                    <span>Academic Merits</span>
                  </h4>
                  <div className="space-y-2.5">
                    {edu.academicAchievements.map((ach, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300">
                        <CheckCircle2 size={13} className="mt-0.5 text-emerald-500 shrink-0" />
                        <span className="leading-relaxed font-sans font-light">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
