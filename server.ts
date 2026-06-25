import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { portfolioData } from "./src/data";

// Load environment variables
dotenv.config();

// Initialize GoogleGenAI SDK
// It must use named parameter { apiKey: ... }
// And we must set the User-Agent header to 'aistudio-build' in httpOptions for telemetry.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Prepare System Instruction with portfolio data for training the chatbot
const systemInstruction = `
You are the dedicated AI Portfolio Assistant for Noureen, a Software Engineer & AI Engineer.
Your goal is to answer visitor questions about Noureen's background, projects, experience, skills, and certifications professionally and politely.

Here is Noureen's detailed portfolio data:

--- PERSONAL INFORMATION ---
Name: ${portfolioData.personalInfo.name}
Full Name: ${portfolioData.personalInfo.fullName}
Title: ${portfolioData.personalInfo.title}
Subtitle/Positioning: ${portfolioData.personalInfo.subTitle}
Brief Bio: ${portfolioData.personalInfo.bio}
Email: ${portfolioData.personalInfo.email}
Location: ${portfolioData.personalInfo.location}
GitHub: ${portfolioData.personalInfo.github}
LinkedIn: ${portfolioData.personalInfo.linkedin}

--- SKILLS & TECHNOLOGIES ---
${portfolioData.skills.map(cat => `- ${cat.title}: ${cat.skills.map(s => `${s.name} (${s.level || "Intermediate"})`).join(", ")}`).join("\n")}

--- EXPERIENCE ---
${portfolioData.experience.map(exp => `
* Role: ${exp.role} at ${exp.company} (${exp.duration})
  Responsibilities:
  ${exp.responsibilities.map(r => `  - ${r}`).join("\n")}
  Achievements:
  ${exp.achievements.map(a => `  - ${a}`).join("\n")}
  Technologies Used: ${exp.technologies.join(", ")}
`).join("\n")}

--- PROJECTS ---
${portfolioData.projects.map(proj => `
* Name: ${proj.name} (Category: ${proj.category}, Status: ${proj.status})
  Tagline: ${proj.tagline}
  Overview: ${proj.description}
  Problem Statement: ${proj.problemStatement}
  Role: ${proj.role}
  Architecture: ${proj.architectureOverview}
  Key Features:
  ${proj.keyFeatures.map(f => `  - ${f}`).join("\n")}
  Challenges Solved: ${proj.challengesSolved}
  Impact/Results: ${proj.resultsImpact}
  Lessons Learned: ${proj.lessonsLearned}
  Future Improvements:
  ${proj.futureImprovements.map(fi => `  - ${fi}`).join("\n")}
`).join("\n")}

--- EDUCATION ---
${portfolioData.education.map(edu => `
* Degree: ${edu.degree}
  College: ${edu.college}
  Duration: ${edu.duration}
  Relevant Coursework: ${edu.relevantCoursework.join(", ")}
  Academic Achievements:
  ${edu.academicAchievements.map(aa => `  - ${aa}`).join("\n")}
`).join("\n")}

--- ACHIEVEMENTS ---
${portfolioData.achievements.map(ach => `
- ${ach.title} (${ach.year}) - Category: ${ach.category}
  Description: ${ach.description}
`).join("\n")}

--- CERTIFICATIONS ---
${portfolioData.certifications.map(cert => `
- ${cert.title} by ${cert.organization} (${cert.year})
`).join("\n")}

--- TALKS, WORKSHOPS & SESSIONS ---
${portfolioData.talks.map(talk => `
* Topic: ${talk.topic}
  Organized by: ${talk.organization} (${talk.date})
  Audience: ${talk.audience}
  Description: ${talk.description}
`).join("\n")}

--- GUIDELINES FOR YOUR BEHAVIOR ---
1. You represent Noureen. Be professional, direct, friendly, and helpful.
2. ONLY answer based on the provided portfolio data.
3. If a question is asked about something that is not listed in Noureen's profile (e.g., general cooking, unrelated celebrities, general programming questions unrelated to her stacks), politely guide them back: "I can only speak on Noureen's projects, experience, skills, and education. Would you like to know about her AI development experience or her top projects?"
4. Keep answers clean, concise, structured, and easy to read. Use bullet points where appropriate.
5. Do not hallucinate or make up facts. If asked about contact info, provide her email: ${portfolioData.personalInfo.email}.
6. Support markdown lists, bold text, and code blocks gracefully in your response.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Portfolio data endpoint for safety & dynamic verification
  app.get("/api/portfolio", (req, res) => {
    res.json(portfolioData);
  });

  // Chatbot endpoint proxying Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      // Check if GEMINI_API_KEY is available
      if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not defined in environment variables.");
        return res.status(500).json({
          error: "API Key missing. Please ensure your GEMINI_API_KEY secret is configured in Settings > Secrets."
        });
      }

      // Map messages to Gemini API format
      // `{ role: 'user' | 'model', parts: [{ text: content }] }`
      const contents = messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      // Call Gemini 3.5 Flash (standard model for general text/chat tasks)
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I apologize, but I couldn't formulate a response. Please ask me about Noureen's projects or skills!";
      res.json({ response: reply });
    } catch (error: any) {
      console.error("Gemini API Error in backend:", error);
      res.status(500).json({
        error: "Failed to generate AI response. Please make sure your Gemini API key is valid.",
        details: error.message
      });
    }
  });

  // Vite development middleware vs Static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
