import React, { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Copy, Check, Send } from "lucide-react";
import { portfolioData } from "../data";

interface ContactProps {
  onShowToast: (message: string) => void;
}

export default function Contact({ onShowToast }: ContactProps) {
  const info = portfolioData.personalInfo;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(info.email).then(() => {
      setCopied(true);
      onShowToast("Email address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast("Please fill in all form fields.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onShowToast("Thank you for your message! Noureen will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200/60 dark:border-slate-900 bg-dot-pattern">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            03 / Direct Inquiry
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-950 dark:text-white tracking-tight">
            Connect & Collaborate
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs max-w-lg mx-auto font-sans font-light leading-relaxed">
            I'm currently seeking role opportunities & professional internships. If you have an opening or a technical project, write to me directly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Direct channels card */}
          <div className="md:col-span-5 flex flex-col justify-between p-6 border border-slate-200/60 dark:border-slate-800/85 rounded-2xl bg-white dark:bg-slate-900 text-left">
            <div className="space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                Direct Channels
              </h3>

              <div className="space-y-4">
                {/* Email item */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/60">
                  <div className="min-w-0">
                    <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">Email Address</span>
                    <span className="block text-[11px] font-mono text-slate-700 dark:text-slate-300 truncate font-semibold">
                      {info.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                  </button>
                </div>

                {/* Location item */}
                <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/60">
                  <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">Location</span>
                  <span className="block text-[11px] text-slate-700 dark:text-slate-300 font-sans font-semibold">
                    {info.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-4 text-xs font-mono text-slate-400">
              <a
                href={info.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
              >
                <Github size={12} />
                <span>github</span>
              </a>
              <span>/</span>
              <a
                href={info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
              >
                <Linkedin size={12} />
                <span>linkedin</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 p-6 border border-slate-200/60 dark:border-slate-800/85 rounded-2xl bg-white dark:bg-slate-900 text-left">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">Message</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none"
                  placeholder="Tell me about your role or proposal"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-indigo-500 dark:hover:text-white font-mono text-[10px] uppercase tracking-widest cursor-pointer shadow transition-all disabled:opacity-50 font-bold"
              >
                {submitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send size={11} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
