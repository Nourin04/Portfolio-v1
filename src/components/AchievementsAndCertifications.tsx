import React from "react";
import { Award, Trophy, ShieldCheck, ExternalLink } from "lucide-react";
import { portfolioData } from "../data";

export default function AchievementsAndCertifications() {
  const achievements = portfolioData.achievements;
  const certifications = portfolioData.certifications;

  return (
    <>
      {/* Achievements Section */}
      <section id="achievements" className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Heading */}
          <div className="flex flex-col items-start text-left mb-16 space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
              <Trophy size={14} />
              <span>07 . ACHIEVEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
              Honors & Competition Wins
            </h2>
            <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-sans font-light">
              Scholarships, competition milestones, and hackathon awards earned throughout my academic and software journey.
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150 dark:border-slate-850 p-6 rounded-3xl text-left flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-gray-200/60 dark:border-slate-800 flex items-center justify-center shadow-sm">
                      <Trophy className="text-amber-500" size={18} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full">
                      {ach.year}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white tracking-tight">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                    {ach.description}
                  </p>
                </div>
                <div className="text-[10px] font-mono font-semibold uppercase text-gray-400 mt-5">
                  Category: {ach.category}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 bg-gray-50/50 dark:bg-slate-950/20 border-t border-gray-100 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Heading */}
          <div className="flex flex-col items-start text-left mb-16 space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
              <ShieldCheck size={14} />
              <span>08 . CERTIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
              Verified Certifications
            </h2>
            <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-sans font-light">
              Professional credentials completed to deepen my technical expertise in machine learning and cloud engineering.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-6 rounded-3xl text-left flex flex-col justify-between hover:border-indigo-100 dark:hover:border-indigo-950/40 transition-colors shadow-sm relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-150 dark:border-slate-850 flex items-center justify-center">
                      <Award className="text-indigo-600 dark:text-indigo-400" size={18} />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-gray-400">
                      {cert.year}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white tracking-tight leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      {cert.organization}
                    </p>
                  </div>
                </div>

                {/* Credential link */}
                <div className="pt-4 border-t border-gray-50 dark:border-slate-800/60 mt-5">
                  <a
                    href={cert.credentialUrl}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
