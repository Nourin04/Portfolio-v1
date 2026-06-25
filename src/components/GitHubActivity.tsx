import React, { useState } from "react";
import { Github, Star, GitFork, Activity, ShieldAlert, GitCommit, ChevronRight, BarChart2 } from "lucide-react";
import { portfolioData } from "../data";

export default function GitHubActivity() {
  const [activeTab, setActiveTab] = useState<"graph" | "pinned">("graph");

  // Simulated GitHub Contribution Grid data
  // 52 weeks of columns, each column having 7 squares
  const weeks = 40; // simplified for layout scaling on mobile
  const daysPerWeek = 7;

  // Function to seed realistic contribution colors
  // 0: none, 1: low, 2: medium, 3: high, 4: very high
  const getContributionLevel = (weekIndex: number, dayIndex: number) => {
    // Generate a pseudo-random pattern that looks like an active developer (dense blocks of green)
    const seed = (weekIndex * 3 + dayIndex * 5) % 29;
    if (seed % 7 === 0) return 0;
    if (seed % 7 === 1 || seed % 7 === 5) return 1;
    if (seed % 7 === 2 || seed % 7 === 6) return 2;
    if (seed % 7 === 3) return 3;
    return 4;
  };

  const getCellColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-100 dark:bg-slate-850";
      case 1:
        return "bg-emerald-200/60 dark:bg-emerald-950/20";
      case 2:
        return "bg-emerald-300 dark:bg-emerald-900/40";
      case 3:
        return "bg-emerald-500 dark:bg-emerald-700/60";
      case 4:
        return "bg-emerald-600 dark:bg-emerald-500";
      default:
        return "bg-gray-100 dark:bg-slate-800";
    }
  };

  const pinnedRepos = [
    {
      name: "omnisearch-ai",
      desc: "Self-hosted AST-aware semantic code search and indexation query system powered by FastAPI and pgvector.",
      stars: 124,
      forks: 18,
      lang: "Python",
      langColor: "bg-blue-500"
    },
    {
      name: "medgpt-assistant",
      desc: "Clinical transcript synthesizer and patient discharge summary automation pipeline using Unsloth-optimized QLoRA models.",
      stars: 84,
      forks: 9,
      lang: "Python",
      langColor: "bg-blue-500"
    },
    {
      name: "autoeval-ai",
      desc: "Adversarial evaluation sandbox and red-teaming orchestrator for validating prompt-injection vulnerabilities in LLMs.",
      stars: 46,
      forks: 4,
      lang: "TypeScript",
      langColor: "bg-yellow-500"
    }
  ];

  const recentCommits = [
    {
      repo: "omnisearch-ai",
      msg: "feat: implement localized custom AST tree chunker for TS parser",
      time: "2 hours ago",
      hash: "82bc31f"
    },
    {
      repo: "medgpt-assistant",
      msg: "refactor: enforce secondary regex validation checks on dosage values",
      time: "1 day ago",
      hash: "cf30e1a"
    },
    {
      repo: "autoeval-ai",
      msg: "docs: publish core adversarial template datasets for healthcare models",
      time: "3 days ago",
      hash: "df39a02"
    }
  ];

  return (
    <section id="github" className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Github size={14} />
            <span>05 . OPEN SOURCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            GitHub Contributions
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-sans font-light">
            An overview of my contribution streams, open-source repositories, and recent code check-ins.
          </p>
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Graph and Commits (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Control Panel Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab("graph")}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === "graph"
                      ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 pb-4 -mb-5"
                      : "text-gray-500 hover:text-gray-800 dark:hover:text-white"
                  }`}
                >
                  Activity Grid
                </button>
                <button
                  onClick={() => setActiveTab("pinned")}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === "pinned"
                      ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 pb-4 -mb-5"
                      : "text-gray-500 hover:text-gray-800 dark:hover:text-white"
                  }`}
                >
                  Pinned Repositories
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Activity size={12} className="text-emerald-500 animate-pulse" />
                <span className="font-mono">Sync: OK</span>
              </div>
            </div>

            {/* Content Tabs */}
            {activeTab === "graph" ? (
              <div className="space-y-6 pt-2">
                
                {/* Simulated Grid Box */}
                <div className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150 dark:border-slate-850 p-6 rounded-3xl relative overflow-x-auto">
                  <div className="min-w-[620px]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-medium text-gray-600 dark:text-gray-300">
                        1,482 contributions in the last year
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                        <span>Less</span>
                        <div className="w-2.5 h-2.5 rounded bg-gray-150 dark:bg-slate-800" />
                        <div className="w-2.5 h-2.5 rounded bg-emerald-200/60" />
                        <div className="w-2.5 h-2.5 rounded bg-emerald-400" />
                        <div className="w-2.5 h-2.5 rounded bg-emerald-600" />
                        <span>More</span>
                      </div>
                    </div>

                    {/* Contribution Cell Grid mapping */}
                    <div className="flex gap-[3px]">
                      {Array.from({ length: weeks }).map((_, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-[3px]">
                          {Array.from({ length: daysPerWeek }).map((_, dayIdx) => {
                            const level = getContributionLevel(weekIdx, dayIdx);
                            return (
                              <div
                                key={dayIdx}
                                className={`w-[11px] h-[11px] rounded-[2px] transition-colors ${getCellColor(level)}`}
                                title={`${level === 0 ? "No" : level * 2 + 1} contributions on day ${dayIdx + 1}, week ${weekIdx + 1}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-3 px-1">
                      <span>Jul 2025</span>
                      <span>Oct 2025</span>
                      <span>Jan 2026</span>
                      <span>Apr 2026</span>
                      <span>Jun 2026 (Now)</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Recent Commit logs */}
                <div className="space-y-3 text-left">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <GitCommit size={14} />
                    <span>Recent Push Activities</span>
                  </h4>
                  <div className="space-y-2">
                    {recentCommits.map((commit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150 dark:border-slate-850"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                            git
                          </span>
                          <div className="text-left space-y-0.5">
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                              {commit.repo}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 font-light font-sans">
                              {commit.msg}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-[10px] font-mono text-indigo-500 font-medium">
                            {commit.hash}
                          </span>
                          <span className="text-[10px] font-sans text-gray-400">
                            {commit.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {pinnedRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="p-5 bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150 dark:border-slate-850 rounded-2xl text-left flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                          R
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">
                          {repo.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                        {repo.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-5 text-[10px] font-mono text-gray-400">
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                        <span>{repo.lang}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-amber-500" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={11} className="text-gray-400" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Block: Statistics Panels (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Metrics */}
            <div className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150 dark:border-slate-850 p-6 rounded-3xl space-y-4 text-left">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-2">
                <BarChart2 size={14} />
                <span>Languages & Metrics</span>
              </h4>

              {/* Language Bars */}
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    <span>Python</span>
                    <span>48%</span>
                  </div>
                  <div className="w-full bg-gray-150 dark:bg-slate-850 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 dark:bg-indigo-500 h-full" style={{ width: "48%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    <span>TypeScript</span>
                    <span>32%</span>
                  </div>
                  <div className="w-full bg-gray-150 dark:bg-slate-850 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-violet-600 dark:bg-violet-500 h-full" style={{ width: "32%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    <span>JavaScript</span>
                    <span>12%</span>
                  </div>
                  <div className="w-full bg-gray-150 dark:bg-slate-850 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-pink-600 dark:bg-pink-500 h-full" style={{ width: "12%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    <span>Bash / Docker</span>
                    <span>8%</span>
                  </div>
                  <div className="w-full bg-gray-150 dark:bg-slate-850 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 dark:bg-emerald-500 h-full" style={{ width: "8%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Development Streak metrics */}
            <div className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150 dark:border-slate-850 p-6 rounded-3xl text-left space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Commit Consistency
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-3 rounded-2xl">
                  <span className="block text-xs text-gray-400 font-mono">Longest Streak</span>
                  <span className="text-xl font-display font-extrabold text-gray-800 dark:text-white">48 Days</span>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-3 rounded-2xl">
                  <span className="block text-xs text-gray-400 font-mono">Total Commits</span>
                  <span className="text-xl font-display font-extrabold text-gray-800 dark:text-white">1,482</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
