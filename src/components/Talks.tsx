import React from "react";
import { Presentation, Users, Calendar, ExternalLink } from "lucide-react";
import { portfolioData } from "../data";

export default function Talks() {
  const talks = portfolioData.talks;

  return (
    <section id="talks" className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Presentation size={14} />
            <span>09 . SPEAKING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            Talks, Workshops & Sessions
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-sans font-light">
            An index of speaking engagements, workshops led, and technical training events I have conducted.
          </p>
        </div>

        {/* Talks List layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talks.map((talk, idx) => (
            <div
              key={idx}
              className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150 dark:border-slate-850 p-6 md:p-8 rounded-3xl text-left flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-4">
                
                {/* Header Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-150/60 dark:border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-gray-400">
                    <Calendar size={13} />
                    <span>{talk.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full">
                    <Users size={12} />
                    <span>{talk.audience}</span>
                  </div>
                </div>

                {/* Topic & Org */}
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
                    {talk.topic}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Hosted by: {talk.organization}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed font-light">
                  {talk.description}
                </p>

              </div>

              {/* Slide Link / Action */}
              {talk.presentationLink && (
                <div className="pt-4 border-t border-gray-150/40 dark:border-slate-850 mt-6 text-left">
                  <a
                    href={talk.presentationLink}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>View Presentation Material</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
