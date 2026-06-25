import React, { useState } from "react";
import { Search, Filter, ExternalLink, Github, CodeXml, Eye, X, HelpCircle, Cpu, ShieldCheck, Trophy, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData, Project } from "../data";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ["All", "AI", "Web", "ML", "Open Source"];

  const filteredProjects = portfolioData.projects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory || (selectedCategory === "Open Source" && p.status === "Open Source");
    const cleanQuery = searchQuery.trim().toLowerCase();
    const matchesSearch =
      cleanQuery === "" ||
      p.name.toLowerCase().includes(cleanQuery) ||
      p.tagline.toLowerCase().includes(cleanQuery) ||
      p.shortDescription.toLowerCase().includes(cleanQuery) ||
      p.technologies.some((tech) => tech.toLowerCase().includes(cleanQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-gray-50/50 dark:bg-slate-950/20 border-t border-gray-100 dark:border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-12 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <CodeXml size={14} />
            <span>02 . PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-sans font-light">
            A selective collection of applications showcasing my engineering focus, combining standard software quality with advanced machine learning integration.
          </p>
        </div>

        {/* Search and Filters Controller */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100 dark:border-slate-850">
          
          {/* Categories Tab Selector */}
          <div className="flex flex-wrap items-center gap-1.5 order-2 md:order-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-600/10"
                    : "bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Keyword Search Input */}
          <div className="relative max-w-sm w-full order-1 md:order-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by name, tech or keyword..."
              value={searchQuery === " " ? "" : searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
            {searchQuery.trim() !== "" && (
              <button
                onClick={() => setSearchQuery(" ")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center border border-dashed border-gray-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 max-w-md mx-auto">
            <HelpCircle size={40} className="mx-auto text-gray-300 dark:text-gray-700 mb-3" />
            <p className="text-gray-600 dark:text-gray-400 font-semibold font-display text-sm">No projects match your query</p>
            <p className="text-xs text-gray-400 mt-1">Try resetting the filters or keyword search</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery(" ");
              }}
              className="mt-4 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-850 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
              onClick={() => setActiveProjectModal(project)}
            >
              
              {/* Category / Status Tags */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                  project.status === "Production"
                    ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                    : project.status === "Open Source"
                    ? "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400"
                    : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                }`}>
                  ● {project.status}
                </span>
              </div>

              {/* Title & Info */}
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs font-medium text-indigo-600/80 dark:text-indigo-400/80 font-mono">
                  {project.tagline}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed pt-1">
                  {project.shortDescription}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mt-5 mb-5 justify-start">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono bg-gray-50 dark:bg-slate-950 text-gray-500 dark:text-gray-400 border border-gray-150 dark:border-slate-850 px-2.5 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold pl-1">
                    +{project.technologies.length - 5} more
                  </span>
                )}
              </div>

              {/* Call-to-action indicators */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800/60 mt-auto">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <Eye size={14} />
                  <span>View Case Study</span>
                </div>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <span className="text-gray-400 hover:text-gray-600 dark:hover:text-white" title="Source Code">
                      <Github size={16} />
                    </span>
                  )}
                  {project.liveDemoUrl && (
                    <span className="text-gray-400 hover:text-gray-600 dark:hover:text-white" title="Live Demo">
                      <ExternalLink size={16} />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Project Case Study Modal */}
        <AnimatePresence>
          {activeProjectModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setActiveProjectModal(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl border border-gray-150 dark:border-slate-850 p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute right-4 top-4 p-2 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-gray-100 dark:border-slate-850 text-gray-500 dark:text-gray-400 cursor-pointer"
                  aria-label="Close case study"
                >
                  <X size={18} />
                </button>

                {/* Categories & Title */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full">
                      {activeProjectModal.category}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                      {activeProjectModal.status}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {activeProjectModal.name}
                  </h3>
                  <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400">
                    {activeProjectModal.tagline}
                  </p>
                </div>

                <hr className="border-gray-100 dark:border-slate-800 my-5" />

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Main column (7 cols) */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Overview */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                        <Layers size={14} />
                        <span>Project Overview</span>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-sans font-light leading-relaxed">
                        {activeProjectModal.description}
                      </p>
                    </div>

                    {/* Problem Statement */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                        <HelpCircle size={14} />
                        <span>The Problem Statement</span>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-sans font-light leading-relaxed">
                        {activeProjectModal.problemStatement}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                        <Cpu size={14} />
                        <span>Key Engineering Features</span>
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeProjectModal.keyFeatures.map((feat, idx) => (
                          <li
                            key={idx}
                            className="bg-gray-50/50 dark:bg-slate-950/30 border border-gray-100 dark:border-slate-850 p-3 rounded-2xl text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed"
                          >
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400 block mb-0.5">Feature {idx + 1}</span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges Solved */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                        <ShieldCheck size={14} />
                        <span>Complex Challenges Solved</span>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-sans font-light leading-relaxed bg-amber-50/30 dark:bg-amber-950/10 border border-amber-100/40 dark:border-amber-950/20 p-4 rounded-2xl">
                        {activeProjectModal.challengesSolved}
                      </p>
                    </div>

                  </div>

                  {/* Right Sidebar column (4 cols) */}
                  <div className="lg:col-span-4 space-y-6 bg-gray-50/50 dark:bg-slate-950/30 p-5 rounded-3xl border border-gray-150 dark:border-slate-850">
                    
                    {/* Tech Stack List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProjectModal.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-350"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architectural Overview */}
                    <div className="space-y-2 border-t border-gray-150 dark:border-slate-800 pt-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                        Architecture & Core Role
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                        <span className="font-semibold block text-gray-700 dark:text-gray-200 text-xs mb-1">Role: {activeProjectModal.role}</span>
                        {activeProjectModal.architectureOverview}
                      </p>
                    </div>

                    {/* Impact / Results */}
                    <div className="space-y-2 border-t border-gray-150 dark:border-slate-800 pt-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                        <Trophy size={14} className="text-amber-500" />
                        <span>Business Impact</span>
                      </h4>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-relaxed font-sans">
                        {activeProjectModal.resultsImpact}
                      </p>
                    </div>

                    {/* Future Improvements */}
                    <div className="space-y-2 border-t border-gray-150 dark:border-slate-800 pt-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                        Lessons & Roadmaps
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2 font-sans">
                        {activeProjectModal.lessonsLearned}
                      </p>
                      <ul className="list-disc list-inside text-[10px] text-gray-400 pl-1 space-y-1">
                        {activeProjectModal.futureImprovements.map((imp, index) => (
                          <li key={index}>{imp}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-3 pt-2 border-t border-gray-150 dark:border-slate-800">
                      {activeProjectModal.githubUrl && (
                        <a
                          href={activeProjectModal.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-250 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900 text-gray-700 dark:text-gray-300 font-semibold text-xs cursor-pointer"
                        >
                          <Github size={14} />
                          <span>Repository</span>
                        </a>
                      )}
                      {activeProjectModal.liveDemoUrl && (
                        <a
                          href={activeProjectModal.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-xs cursor-pointer shadow-sm"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
