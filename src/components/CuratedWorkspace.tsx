import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User, Briefcase, Cpu, Award, Trophy, ShieldCheck, Presentation,
  ExternalLink, Github, Star, GitFork, Activity, ChevronRight,
  Search, ArrowUpRight, CheckCircle2, GraduationCap, Calendar, Mail, FileText
} from "lucide-react";
import { portfolioData, Project } from "../data";

interface CuratedWorkspaceProps {
  onOpenResume: () => void;
  onShowToast: (message: string) => void;
}

export default function CuratedWorkspace({ onOpenResume, onShowToast }: CuratedWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"bio" | "projects" | "timeline" | "beyond">("bio");
  
  // Projects states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // GitHub states
  const [githubTab, setGithubTab] = useState<"contributions" | "repos">("contributions");

  const categories = ["All", "AI", "ML", "Web", "Open Source"];

  const filteredProjects = portfolioData.projects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Simulated GitHub Contribution Grid
  const weeks = 36;
  const daysPerWeek = 7;
  const getContributionLevel = (weekIndex: number, dayIndex: number) => {
    const seed = (weekIndex * 4 + dayIndex * 7) % 31;
    if (seed % 8 === 0) return 0;
    if (seed % 8 === 1 || seed % 8 === 5) return 1;
    if (seed % 8 === 2 || seed % 8 === 6) return 2;
    if (seed % 8 === 3) return 3;
    return 4;
  };

  const getCellColor = (level: number) => {
    switch (level) {
      case 0: return "bg-slate-100 dark:bg-slate-800/60";
      case 1: return "bg-emerald-100 dark:bg-emerald-950/20";
      case 2: return "bg-emerald-300/80 dark:bg-emerald-900/40";
      case 3: return "bg-emerald-500/80 dark:bg-emerald-700/60";
      case 4: return "bg-emerald-600 dark:bg-emerald-500";
      default: return "bg-slate-100 dark:bg-slate-800";
    }
  };

  return (
    <div id="workspace" className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Workspace Menu Bar - Interactive, thin borders, elegant minimalist look */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 mb-12 overflow-x-auto scrollbar-none">
        <div className="flex space-x-8 min-w-[500px] pb-1">
          {[
            { id: "bio", label: "01 / BIOGRAPHY", icon: User },
            { id: "projects", label: "02 / SELECTED WORK", icon: Cpu },
            { id: "timeline", label: "03 / EXPERIENCE & ACADEMICS", icon: Briefcase },
            { id: "beyond", label: "04 / BEYOND CODE", icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setActiveProject(null); // Reset active project detail when switching tabs
                }}
                className={`relative pb-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-extrabold"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <Icon size={12} className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"} />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabBorder"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 dark:bg-indigo-400"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panel contents wrapped in beautiful fade animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="min-h-[500px]"
        >
          
          {/* ==================== 01 / BIOGRAPHY PANEL ==================== */}
          {activeTab === "bio" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Portrait, Editorial Bio, and Details (7 Columns) */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 uppercase font-semibold">
                    <span>Grounding Statement</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                    Optimizing the space between <span className="font-sans italic font-normal text-indigo-600 dark:text-indigo-400">intelligent reasoning</span> and <span className="font-sans italic font-normal text-slate-600 dark:text-slate-400">standard engineering</span>.
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 font-sans text-sm leading-relaxed font-light">
                    {portfolioData.personalInfo.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm">
                    <span className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Status</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Seeking Internships & Roles (2026 Grad)
                    </span>
                  </div>
                  <div className="p-5 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm">
                    <span className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Based In</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {portfolioData.personalInfo.location}
                    </span>
                  </div>
                </div>

                {/* Direct buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors cursor-pointer shadow-sm"
                  >
                    <FileText size={13} />
                    <span>View / Save PDF Resume</span>
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-slate-700 transition-colors"
                  >
                    <Mail size={13} />
                    <span>Inquire Direct</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Skills Matrix (5 Columns) */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 bg-white dark:bg-slate-900">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-5">
                    Technical Toolkit
                  </h3>
                  
                  <div className="space-y-6">
                    {portfolioData.skills.map((category) => (
                      <div key={category.title} className="space-y-2.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                          {category.title}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill.name}
                              className={`text-[10px] font-sans font-medium px-3 py-1.5 rounded-lg border flex items-center gap-2 ${
                                skill.level === "Expert"
                                  ? "bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-indigo-100/40 dark:border-indigo-900/30"
                                  : "bg-slate-50/50 dark:bg-slate-950/20 text-slate-600 dark:text-slate-350 border-slate-200/40 dark:border-slate-800/40"
                              }`}
                            >
                              <span>{skill.name}</span>
                              {skill.level === "Expert" && (
                                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ==================== 02 / SELECTED WORK PANEL ==================== */}
          {activeTab === "projects" && (
            <div className="space-y-8 text-left">
              
              {/* Category selector & search search container */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-850 pb-5">
                
                {/* Search Bar */}
                <div className="relative w-full sm:max-w-xs">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Search size={13} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search stack or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
                        selectedCategory === cat
                          ? "bg-indigo-600 dark:bg-indigo-500 text-white border-transparent font-bold"
                          : "bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

              </div>

              {/* Projects Split layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Projects high-density grid list (7 Columns or 12 if no project is active) */}
                <div className={`${activeProject ? "lg:col-span-5" : "lg:col-span-12"} grid grid-cols-1 ${activeProject ? "gap-4" : "sm:grid-cols-2 gap-6"} transition-all duration-300`}>
                  {filteredProjects.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs font-mono border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl col-span-full">
                      No matching software systems found.
                    </div>
                  ) : (
                    filteredProjects.map((p) => {
                      const isCurrentlyActive = activeProject?.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setActiveProject(p)}
                          className={`p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between cursor-pointer group ${
                            isCurrentlyActive
                              ? "bg-indigo-50/20 dark:bg-indigo-950/10 border-indigo-500"
                              : "bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-850 border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 uppercase font-semibold">
                                {p.category}
                              </span>
                              <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                                p.status === "Production"
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400"
                                  : "bg-slate-50 dark:bg-slate-950/20 text-slate-500"
                              }`}>
                                {p.status}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h3 className="font-display font-bold text-base text-slate-950 dark:text-white flex items-center justify-between">
                                <span>{p.name}</span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-slate-400" />
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans line-clamp-2">
                                {p.shortDescription}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-5">
                            {p.technologies.slice(0, 3).map((t) => (
                              <span key={t} className="text-[9px] font-mono text-slate-400 border border-slate-150 dark:border-slate-800/60 px-1.5 py-0.5 rounded bg-slate-50/30">
                                {t}
                              </span>
                            ))}
                            {p.technologies.length > 3 && (
                              <span className="text-[9px] font-mono text-indigo-500 font-bold px-1 py-0.5">
                                +{p.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right Side: Case Study detailed viewport panel (7 Columns, shown if a project is selected) */}
                {activeProject && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-7 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 bg-white dark:bg-slate-900 space-y-6 shadow-sm overflow-hidden text-left"
                  >
                    
                    {/* Header Case Study Controls */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-indigo-500 uppercase tracking-widest font-bold">
                          System Case Study
                        </span>
                        <h4 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                          {activeProject.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => setActiveProject(null)}
                        className="text-xs font-mono font-medium text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg cursor-pointer"
                      >
                        [ close ]
                      </button>
                    </div>

                    {/* Detailed Case Study Scroll Area */}
                    <div className="space-y-5 text-xs font-sans max-h-[480px] overflow-y-auto pr-1">
                      
                      {/* Section: Overview */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-bold">System Concept:</span>
                        <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-light font-sans">
                          {activeProject.description}
                        </p>
                      </div>

                      {/* Section: Problem Statement */}
                      <div className="space-y-1.5 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-700 dark:text-amber-400">
                        <span className="text-[10px] font-mono uppercase font-bold">Problem Statement:</span>
                        <p className="leading-relaxed font-light">{activeProject.problemStatement}</p>
                      </div>

                      {/* Section: Key Features */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-bold">Core Capabilities:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeProject.keyFeatures.map((f) => (
                            <div key={f} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                              <CheckCircle2 size={13} className="text-indigo-500 shrink-0 mt-0.5" />
                              <span className="font-light">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section: Challenges Solved */}
                      <div className="space-y-1.5 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-700 dark:text-indigo-400">
                        <span className="text-[10px] font-mono uppercase font-bold">Key Engineering Challenge Solved:</span>
                        <p className="leading-relaxed font-light">{activeProject.challengesSolved}</p>
                      </div>

                      {/* Technologies & links */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.technologies.map((t) => (
                            <span key={t} className="text-[9px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          {activeProject.githubUrl && (
                            <a
                              href={activeProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              <Github size={12} />
                              <span>View Source Code</span>
                            </a>
                          )}
                          {activeProject.liveDemoUrl && (
                            <button
                              onClick={() => onShowToast("Mocking active endpoint demonstration pipeline.")}
                              className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                            >
                              <ExternalLink size={12} />
                              <span>Launch Interactive Demo</span>
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

              </div>

            </div>
          )}

          {/* ==================== 03 / TIMELINE PANEL ==================== */}
          {activeTab === "timeline" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Experience (7 Columns) */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-semibold">
                  <Briefcase size={12} />
                  <span>Work Experience Timeline</span>
                </div>

                <div className="relative border-l border-slate-150 dark:border-slate-850 pl-6 space-y-10">
                  {portfolioData.experience.map((exp) => (
                    <div key={exp.id} className="relative group">
                      
                      {/* Circle indicator node */}
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-indigo-600 dark:border-indigo-400 bg-white dark:bg-slate-900 group-hover:scale-125 transition-transform" />
                      
                      <div className="space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                            {exp.role}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400">
                            <Calendar size={10} />
                            {exp.duration}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {exp.company}
                        </div>
                      </div>

                      <div className="mt-3.5 space-y-2">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-350">
                            <ChevronRight size={12} className="text-indigo-500 shrink-0 mt-0.5" />
                            <p className="leading-relaxed font-light">{resp}</p>
                          </div>
                        ))}
                      </div>

                      {exp.achievements.length > 0 && (
                        <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-1.5">
                          <span className="block text-[9px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                            Business Impact:
                          </span>
                          {exp.achievements.map((ach, aIdx) => (
                            <div key={aIdx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                              <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span className="font-light">{ach}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mt-4">
                        {exp.technologies.map((t) => (
                          <span key={t} className="text-[9px] font-mono text-slate-400 border border-slate-200/40 dark:border-slate-800/60 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Academics (5 Columns) */}
              <div className="lg:col-span-5 space-y-8 text-left">
                <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-semibold">
                  <GraduationCap size={12} />
                  <span>Academic Background</span>
                </div>

                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 bg-white dark:bg-slate-900 space-y-5">
                    <div className="space-y-1.5">
                      <span className="inline-block text-[9px] font-mono text-slate-400 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 rounded-full">
                        {edu.duration}
                      </span>
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {edu.college}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-3">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        Academic Honors:
                      </span>
                      <div className="space-y-2">
                        {edu.academicAchievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-350">
                            <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="font-light">{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        Relevant Coursework:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {edu.relevantCoursework.map((c) => (
                          <span key={c} className="text-[9px] font-sans text-slate-500 border border-slate-200/60 dark:border-slate-800/40 px-2 py-1 rounded-lg">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================== 04 / BEYOND CODE PANEL ==================== */}
          {activeTab === "beyond" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
              
              {/* Left Column: Pinned Github repos & grid activity (7 columns) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Header buttons to switch between github view */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setGithubTab("contributions")}
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer ${
                        githubTab === "contributions"
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Contribution Stream
                    </button>
                    <button
                      onClick={() => setGithubTab("repos")}
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer ${
                        githubTab === "repos"
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Open Source Systems
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Activity size={10} className="text-emerald-500 animate-pulse" />
                    <span className="font-mono">Ready</span>
                  </div>
                </div>

                {githubTab === "contributions" ? (
                  <div className="space-y-6">
                    {/* Compact GitHub Contribution Board */}
                    <div className="border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl bg-white dark:bg-slate-900 relative overflow-x-auto">
                      <div className="min-w-[550px]">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono font-medium text-slate-500">
                            1,482 open source contributions (GECKKD engineering lead)
                          </span>
                          <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono">
                            <span>Less</span>
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-slate-800" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200/60" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600" />
                            <span>More</span>
                          </div>
                        </div>

                        {/* Flex squares */}
                        <div className="flex gap-[3px]">
                          {Array.from({ length: weeks }).map((_, weekIdx) => (
                            <div key={weekIdx} className="flex flex-col gap-[3px]">
                              {Array.from({ length: daysPerWeek }).map((_, dayIdx) => {
                                const level = getContributionLevel(weekIdx, dayIdx);
                                return (
                                  <div
                                    key={dayIdx}
                                    className={`w-[11px] h-[11px] rounded-[2px] transition-colors ${getCellColor(level)}`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-3">
                          <span>Jul 2025</span>
                          <span>Nov 2025</span>
                          <span>Mar 2026</span>
                          <span>Jun 2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick push updates summary */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                        Recent Repository Pushes:
                      </span>
                      <div className="space-y-2">
                        {[
                          { repo: "omnisearch-ai", msg: "feat: localized custom AST chunker module", hash: "82bc31f" },
                          { repo: "medgpt-assistant", msg: "refactor: safe regex boundaries for medication validation", hash: "cf30e1a" }
                        ].map((commit, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/40 dark:border-slate-800/60 bg-white dark:bg-slate-900">
                            <div className="text-left space-y-0.5">
                              <span className="text-xs font-semibold text-slate-800 dark:text-slate-250">{commit.repo}</span>
                              <p className="text-[11px] text-slate-400 line-clamp-1">{commit.msg}</p>
                            </div>
                            <span className="font-mono text-[10px] text-indigo-500 font-semibold">{commit.hash}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "omnisearch-ai", desc: "AST-aware semantic code indexing search system using FastAPI and pgvector.", stars: 124, forks: 18, lang: "Python" },
                      { name: "medgpt-assistant", desc: "EHR transcription cleanup and patient-friendly note generator using QLoRA LLaMA-3.", stars: 84, forks: 9, lang: "Python" },
                      { name: "autoeval-ai", desc: "Adversarial evaluation pipeline red-teaming safety prompt injections in LLMs.", stars: 46, forks: 4, lang: "TypeScript" }
                    ].map((repo) => (
                      <div key={repo.name} className="p-4 border border-slate-200/60 dark:border-slate-800/80 rounded-xl bg-white dark:bg-slate-900 text-left flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">{repo.name}</span>
                          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{repo.desc}</p>
                        </div>
                        <div className="flex items-center gap-4 text-[9px] font-mono text-slate-400 mt-4">
                          <span>{repo.lang}</span>
                          <span className="flex items-center gap-1"><Star size={10} className="text-amber-500" />{repo.stars}</span>
                          <span className="flex items-center gap-1"><GitFork size={10} />{repo.forks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Speaking & Certifications & Academic honors (5 columns) */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Talks/Speaking */}
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-bold">
                    <Presentation size={12} />
                    <span>Technical Workshops Led</span>
                  </div>
                  <div className="space-y-3.5">
                    {portfolioData.talks.map((t, idx) => (
                      <div key={idx} className="border border-slate-200/40 dark:border-slate-850 p-4 rounded-xl bg-white dark:bg-slate-900 text-left space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-slate-400">{t.date}</span>
                          <span className="text-[9px] font-mono text-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                            {t.audience}
                          </span>
                        </div>
                        <h5 className="font-display font-semibold text-xs text-slate-900 dark:text-white leading-snug">
                          {t.topic}
                        </h5>
                        <p className="text-[11px] text-slate-400 font-light leading-relaxed">{t.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Certifications */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-bold">
                    <ShieldCheck size={12} />
                    <span>Professional Certifications</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {portfolioData.certifications.map((c, idx) => (
                      <div key={idx} className="p-3 border border-slate-200/40 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-between">
                        <div className="text-left space-y-0.5">
                          <span className="block font-semibold text-xs text-slate-900 dark:text-white leading-snug">{c.title}</span>
                          <span className="block text-[10px] text-indigo-500 font-medium">{c.organization} ({c.year})</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 underline">[ Verified ]</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
