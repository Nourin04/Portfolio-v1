import React, { useRef } from "react";
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink, Award, BookOpen, UserCheck } from "lucide-react";
import { portfolioData } from "../data";

interface ResumePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumePreview({ isOpen, onClose }: ResumePreviewProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const info = portfolioData.personalInfo;

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // In a regular browser window, we can trigger print cleanly
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Noureen_K_Resume</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <style>
                body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; }
              </style>
            </head>
            <body class="p-8">
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      } else {
        // Fallback print
        window.print();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl border border-gray-150 dark:border-slate-850 p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Modal Controls */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-6 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            <h3 className="font-display font-extrabold text-sm text-gray-900 dark:text-white">
              Professional Resume Preview
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-gray-100 dark:border-slate-850 text-gray-500 dark:text-gray-400 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Print Resume"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-gray-100 dark:border-slate-850 text-gray-500 dark:text-gray-400 cursor-pointer"
              aria-label="Close Preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto pr-2">
          
          <div
            ref={printAreaRef}
            className="bg-white text-gray-800 p-6 md:p-10 border border-gray-150 rounded-2xl shadow-inner max-w-3xl mx-auto text-left font-sans text-xs leading-relaxed"
          >
            {/* Resume Header */}
            <div className="border-b-2 border-indigo-600 pb-5 mb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-950">{info.fullName}</h1>
                <p className="text-sm font-semibold text-indigo-600 mt-1 uppercase tracking-wider">{info.title}</p>
                <p className="text-[10px] text-gray-500 font-light max-w-md mt-1.5">
                  B.Tech Computer Science graduate passionate about combining full-stack development with Large Language Model operations.
                </p>
              </div>
              <div className="space-y-1 text-left md:text-right text-[10px] text-gray-500 font-mono shrink-0">
                <div className="flex items-center md:justify-end gap-1.5">
                  <Mail size={12} className="text-indigo-600" />
                  <span>{info.email}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <MapPin size={12} className="text-indigo-600" />
                  <span>{info.location}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 pt-1">
                  <span className="font-semibold text-gray-700">GitHub:</span>
                  <span className="underline">github.com/noureen</span>
                </div>
              </div>
            </div>

            {/* Resume Core Contents split */}
            <div className="space-y-5">
              
              {/* Education Block */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-gray-200 pb-1 mb-2.5 flex items-center gap-1.5">
                  <BookOpen size={13} />
                  <span>Education</span>
                </h2>
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-semibold text-gray-950">
                      <span>{edu.degree}</span>
                      <span className="font-mono text-[10px] font-normal">{edu.duration}</span>
                    </div>
                    <div className="text-indigo-600 font-medium">{edu.college}</div>
                    <div className="text-[10px] text-gray-500 font-light pt-1">
                      <span className="font-semibold text-gray-700">Merits:</span> {edu.academicAchievements.join(" | ")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills block */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-gray-200 pb-1 mb-2.5 flex items-center gap-1.5">
                  <UserCheck size={13} />
                  <span>Technical Skills</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[10px]">
                  {portfolioData.skills.map((category) => (
                    <div key={category.title}>
                      <span className="font-bold text-gray-950 block mb-0.5">{category.title}:</span>
                      <span className="text-gray-500">
                        {category.skills.map(s => s.name).join(", ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience block */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-gray-200 pb-1 mb-2.5 flex items-center gap-1.5">
                  <Award size={13} />
                  <span>Work Experience</span>
                </h2>
                <div className="space-y-4">
                  {portfolioData.experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between font-semibold text-gray-950">
                        <span>{exp.role} — {exp.company}</span>
                        <span className="font-mono text-[10px] font-normal text-gray-400">{exp.duration}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 pl-1 text-[10px] text-gray-500 font-light">
                        {exp.responsibilities.map((r, rIdx) => (
                          <li key={rIdx}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pinned Projects block */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-gray-200 pb-1 mb-2.5 flex items-center gap-1.5">
                  <Award size={13} />
                  <span>Selected Projects</span>
                </h2>
                <div className="space-y-3">
                  {portfolioData.projects.slice(0, 3).map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between font-semibold text-gray-950">
                        <span>{proj.name} ({proj.tagline})</span>
                        <span className="text-[10px] text-indigo-600 font-mono font-medium">{proj.category}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-light">{proj.shortDescription}</p>
                      <p className="text-[10px] text-indigo-700 font-semibold">Tech: {proj.technologies.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
