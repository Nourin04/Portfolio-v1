export interface Project {
  id: string;
  name: string;
  category: "AI" | "Web" | "ML" | "Open Source";
  tagline: string;
  shortDescription: string;
  description: string;
  problemStatement: string;
  technologies: string[];
  keyFeatures: string[];
  challengesSolved: string;
  role: string;
  architectureOverview: string;
  resultsImpact: string;
  status: "Production" | "Personal" | "Open Source";
  liveDemoUrl?: string;
  githubUrl?: string;
  lessonsLearned: string;
  futureImprovements: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; iconName?: string; level?: string }[];
}

export interface Education {
  degree: string;
  college: string;
  duration: string;
  relevantCoursework: string[];
  academicAchievements: string[];
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  category: string;
  link?: string;
}

export interface Certification {
  title: string;
  organization: string;
  year: string;
  credentialUrl: string;
}

export interface Talk {
  topic: string;
  audience: string;
  organization: string;
  date: string;
  description: string;
  presentationLink?: string;
}

export const portfolioData = {
  personalInfo: {
    name: "Noureen",
    fullName: "Noureen K.",
    title: "Software Engineer & AI Engineer",
    subTitle: "Building AI-powered software that solves real-world problems.",
    bio: "I craft elegant, production-ready full-stack applications and intelligent systems. By combining standard software engineering excellence with the power of Large Language Models, I design systems that aren't just fast—they are smart.",
    email: "noureenbcse202226@geckkd.ac.in",
    location: "Kozhikode, Kerala, India",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    resumeUrl: "#", // Handled via visual browser preview & download
  },

  projects: [
    {
      id: "omnisearch-ai",
      name: "OmniSearch AI",
      category: "AI",
      tagline: "AI-Powered Semantic Code Search Engine",
      shortDescription: "A self-hosted semantic search platform that understands your codebase using AST chunking and vector search.",
      description: "OmniSearch AI parses your code repositories, constructs an Abstract Syntax Tree (AST) to preserve function boundaries, and embeds them into a vector space. It enables developers to ask natural language questions about their codebase (e.g., 'where do we handle payment retries?') and get precise code snippets and explanations.",
      problemStatement: "Traditional search (grep, regex) fails when developers don't know the exact keyword used. Onboarding developers to large legacy codebases typically takes weeks due to navigation complexity.",
      technologies: ["React", "FastAPI", "Python", "LangChain", "Hugging Face", "PostgreSQL", "pgvector", "Docker"],
      keyFeatures: [
        "Language-aware AST-based semantic chunking",
        "Hybrid search (combining sparse keyword and dense vector search)",
        "Interactive chat interface grounded on your actual code",
        "Pre-commit hooks and GitHub Actions integration"
      ],
      challengesSolved: "Standard token-based chunking breaks function definitions in half, destroying semantical coherence. I wrote a custom Python AST parser for TypeScript, Python, and Go that extracts logical blocks (classes, functions) as single chunks.",
      role: "Lead Creator & AI Engineer",
      architectureOverview: "Frontend in React requests chunk status and poses queries. FastAPI backend queues indexing via Celery/Redis, stores vector embeddings in PostgreSQL (pgvector) using Hugging Face models, and generates contextual answers using LLaMA models on Groq.",
      resultsImpact: "Reduced developer onboarding time by an estimated 55% across beta testing teams and allowed engineers to locate relevant utility functions in seconds.",
      status: "Production",
      liveDemoUrl: "#",
      githubUrl: "https://github.com",
      lessonsLearned: "I learned that raw chunking size is less important than chunking boundaries. Context preservation beats model size in RAG (Retrieval-Augmented Generation) applications.",
      futureImprovements: [
        "Multi-repository cross-reference mapping",
        "Automated code review agent to flag anti-patterns",
        "Support for local Ollama deployments"
      ]
    },
    {
      id: "medgpt-assistant",
      name: "MedGPT Assistant",
      category: "AI",
      tagline: "Clinical NLP & Medical Note Simplification Engine",
      shortDescription: "Fine-tuned LLaMA-based medical assistant converting dense clinical jargon into friendly, patient-centric action plans.",
      description: "MedGPT is an NLP system designed for healthcare providers. It takes unstructured doctor-patient transcripts or EHR notes, structures them into standardized schema, and creates a beautifully readable, patient-friendly medical summary containing dosage instructions, warning signs, and follow-ups.",
      problemStatement: "Patients routinely misinterpret complex medical discharge notes, leading to poor medication adherence and elevated readmission rates.",
      technologies: ["Python", "FastAPI", "LLaMA-3", "QLoRA", "Unsloth", "Hugging Face", "MongoDB", "React"],
      keyFeatures: [
        "Jargon translator leveraging fine-tuned medical weights",
        "Structured JSON schema output conforming to medical standards",
        "Patient adherence tracker with automatic SMS reminders",
        "Anonymized patient data filter to ensure strict data privacy"
      ],
      challengesSolved: "Quantized models frequently hallucinated dosage details. I addressed this by enforcing a secondary Validation Agent that double-checks medical numeric instructions against the original transcript using hardcoded regex extraction.",
      role: "NLP & Full-Stack Developer",
      architectureOverview: "EHR transcripts are cleaned using regular expressions and passed to an offline Unsloth-optimized LLaMA model. A FastAPI controller serves the inference, validated by a Pydantic guardrail, and stored in MongoDB.",
      resultsImpact: "Achieved a 94% medical information accuracy score in evaluation tests and reduced note-taking overhead for practitioners by 2.5 hours per day.",
      status: "Personal",
      liveDemoUrl: "#",
      githubUrl: "https://github.com",
      lessonsLearned: "System safety in medical LLMs must be hardcoded. Relying entirely on prompt engineering is a critical vulnerability; hybrid systems containing classic NLP validation are infinitely safer.",
      futureImprovements: [
        "Integration with open EHR standards (FHIR API)",
        "Voice-to-text live patient consulting dictation",
        "Support for 12 local Indian languages"
      ]
    },
    {
      id: "autoeval-ai",
      name: "AutoEval.AI",
      category: "ML",
      tagline: "Automated LLM Red-Teaming & Evaluation Sandbox",
      shortDescription: "A pipeline that automatically subjects LLM systems to hundreds of prompt-injection and jailbreak attacks to evaluate their safety.",
      description: "AutoEval.AI acts as an adversary. It spins up an 'attacker agent' designed to trick a target LLM into outputting forbidden responses (e.g. generating malware, bypassing system prompts). It maps the results, calculates a vulnerability rating, and suggests concrete guardrails.",
      problemStatement: "Deploying generative AI systems to production involves serious security risks. Manual red-teaming is slow, expensive, and cannot scale as system prompts change.",
      technologies: ["React", "Express", "Node.js", "Groq API", "LangChain", "Tailwind CSS", "Recharts"],
      keyFeatures: [
        "Automatic generation of 150+ adversarial injection templates",
        "Real-time safety score meter with breakdown by attack vector",
        "Automated PDF report generator for engineering sign-offs",
        "Interactive testing playground with live terminal output"
      ],
      challengesSolved: "Evaluating whether a target LLM's response was actually a 'jailbreak' or a 'polite refusal' is notoriously hard. I trained a light classifier that evaluates candidate answers based on semantic similarity to predefined successful jailbreak goals.",
      role: "Creator & Security Enthusiast",
      architectureOverview: "An attacker agent is configured in LangChain. It converses with the target agent over WebSockets. The safety score is computed incrementally and rendered on the React frontend using Recharts.",
      resultsImpact: "Helped developer groups audit and fix over 30 critical system-prompt injections prior to their deployment.",
      status: "Open Source",
      liveDemoUrl: "#",
      githubUrl: "https://github.com",
      lessonsLearned: "Jailbreaks evolve daily. Creating a resilient LLM application requires continuous verification pipelines, much like standard Unit Testing.",
      futureImprovements: [
        "Expand to image-based prompt injections (VLM jailbreaks)",
        "One-click export of system prompt sanitization rules",
        "Adversarial fine-tuning dataset generation"
      ]
    },
    {
      id: "kubeflow-visualizer",
      name: "KubeFlow Pipeline Visualizer",
      category: "Web",
      tagline: "Enterprise ML Pipeline Drag-and-Drop Dashboard",
      shortDescription: "A highly responsive interactive canvas for designing, verifying, and launching containerized machine learning pipelines.",
      description: "An elegant enterprise React dashboard that visualizes complex, multi-stage machine learning workflows. It enables engineers to connect ingestion nodes, training steps, and inference deployments with real-time health monitors.",
      problemStatement: "Configuring machine learning pipelines in raw YAML is highly prone to syntactic errors, leading to wasted compute time and failed runs.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "D3.js", "Zustand", "Express"],
      keyFeatures: [
        "Fluid drag-and-drop workflow canvas",
        "Instant YAML generation and syntax checking",
        "Live container logs and CPU/Memory usage nodes",
        "Pre-built component drawer with presets for PyTorch, TensorFlow, and XGBoost"
      ],
      challengesSolved: "Rendering hundreds of fully interactive connections smoothly was taxing the browser's main thread. I implemented a localized canvas rendering system using D3 and requestAnimationFrame to throttle redraws.",
      role: "Front-End Architect",
      architectureOverview: "React flow canvas maps graph structures stored in Zustand. Node configurations map directly to Kubernetes-compatible ML Pipeline specs. Express backend proxies direct cluster state metrics.",
      resultsImpact: "Replaced tedious YAML editing with a visual flow, reducing pipeline compilation errors by 82% across internal testing teams.",
      status: "Personal",
      liveDemoUrl: "#",
      githubUrl: "https://github.com",
      lessonsLearned: "Interactive canvases require extreme care regarding re-renders in React. Decoupling visual state from config details is essential to sustain high frame rates.",
      futureImprovements: [
        "Direct connection to GCP Vertex AI",
        "Collaborative multi-user real-time board",
        "Historical run metric overlay comparison charts"
      ]
    }
  ] as Project[],

  experience: [
    {
      id: "exp-1",
      company: "Cognitive Computing Labs",
      role: "AI Software Engineer Intern",
      duration: "May 2025 - Present",
      responsibilities: [
        "Architected and deployed enterprise-grade Retrieval-Augmented Generation (RAG) pipelines using FastAPI, pgvector, and LangChain.",
        "Engineered intelligent agents using hierarchical reasoning patterns, decreasing operational processing times for document review.",
        "Collaborated on fine-tuning specialized domain models using Unsloth and Hugging Face pipelines to optimize inference speeds."
      ],
      technologies: ["Python", "FastAPI", "LangChain", "pgvector", "PostgreSQL", "Docker", "Groq API"],
      achievements: [
        "Reduced average system search response latency by 40% through strict caching and optimized indexing.",
        "Authored internal guidelines on prompt sanitization, protecting consumer chatbots against prominent jailbreak techniques."
      ]
    },
    {
      id: "exp-2",
      company: "Vectra AI Solutions",
      role: "Full-Stack Developer Intern",
      duration: "June 2024 - November 2024",
      responsibilities: [
        "Designed and maintained responsive React single-page applications using TypeScript and Tailwind CSS.",
        "Built robust Express API integrations connecting PostgreSQL databases, securing authorization tokens via standard JSON Web Tokens (JWT).",
        "Developed reusable high-performance UI components with smooth interactive animations using Framer Motion."
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Git"],
      achievements: [
        "Re-architected client dashboard structures, leading to a 30% improvement in lighthouse performance scores.",
        "Collaborated in a fast-paced environment to build 12+ production-ready client interface modules."
      ]
    }
  ] as Experience[],

  skills: [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: "Expert" },
        { name: "TypeScript", level: "Expert" },
        { name: "JavaScript", level: "Expert" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "HTML5/CSS3", level: "Expert" },
        { name: "Zustand / Redux", level: "Intermediate" }
      ]
    },
    {
      title: "Backend & Systems",
      skills: [
        { name: "FastAPI", level: "Expert" },
        { name: "Python", level: "Expert" },
        { name: "Node.js", level: "Intermediate" },
        { name: "Express", level: "Intermediate" },
        { name: "REST APIs", level: "Expert" }
      ]
    },
    {
      title: "AI / ML Engineering",
      skills: [
        { name: "Large Language Models", level: "Expert" },
        { name: "Groq API & LLaMA", level: "Expert" },
        { name: "LangChain", level: "Expert" },
        { name: "Hugging Face", level: "Expert" },
        { name: "Fine-Tuning (QLoRA)", level: "Intermediate" },
        { name: "OpenCV", level: "Intermediate" }
      ]
    },
    {
      title: "Databases & Cloud",
      skills: [
        { name: "PostgreSQL / pgvector", level: "Expert" },
        { name: "MongoDB", level: "Intermediate" },
        { name: "Docker", level: "Intermediate" },
        { name: "Vercel / Render", level: "Expert" },
        { name: "Git / GitHub", level: "Expert" }
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      college: "Government Engineering College, Kozhikode (GECKKD)",
      duration: "2022 - 2026",
      relevantCoursework: [
        "Design & Analysis of Algorithms",
        "Artificial Intelligence & Machine Learning",
        "Database Management Systems",
        "Compiler Design",
        "Neural Networks & Deep Learning"
      ],
      academicAchievements: [
        "Current GPA: 9.1 / 10.0 (Top 5% of class)",
        "Undergraduate research focus on LLM performance bottlenecks",
        "IEEE Computer Society Student Branch Lead Coordinator"
      ]
    }
  ] as Education[],

  achievements: [
    {
      title: "1st Place Winner - Smart India Hackathon (Healthcare Track)",
      description: "Spearheaded a 6-member team to construct a real-time computer-vision assistant that monitors patient vitals in ICUs using standard web cameras.",
      year: "2025",
      category: "Hackathon"
    },
    {
      title: "Winner - Kozhikode Regional TechFest Hackathon",
      description: "Developed an open-source decentralized agent system that automates localized weather reporting using sensor node triggers.",
      year: "2024",
      category: "Competition"
    },
    {
      title: "IEEE Computer Society Student Merit Scholarship",
      description: "Awarded annually to selected IEEE members displaying academic excellence and active contributions to community tech outreach.",
      year: "2024",
      category: "Academic"
    }
  ] as Achievement[],

  certifications: [
    {
      title: "Generative AI with Large Language Models",
      organization: "DeepLearning.AI & AWS",
      year: "2025",
      credentialUrl: "#"
    },
    {
      title: "Associate Cloud Engineer",
      organization: "Google Cloud Certified",
      year: "2024",
      credentialUrl: "#"
    },
    {
      title: "Fundamentals of Deep Learning",
      organization: "NVIDIA Deep Learning Institute",
      year: "2024",
      credentialUrl: "#"
    }
  ] as Certification[],

  talks: [
    {
      topic: "Demystifying Retrieval-Augmented Generation (RAG)",
      audience: "150+ Computer Science students & faculty",
      organization: "IEEE GECKKD Student Branch",
      date: "October 25, 2025",
      description: "Delivered a comprehensive hands-on lecture explaining RAG mechanics, AST chunking, vector embeddings, and real-time validation pipelines.",
      presentationLink: "#"
    },
    {
      topic: "Building Intelligent Agents with LangChain",
      audience: "75+ Developers & Tech enthusiasts",
      organization: "GECKKD TechFest Workshop",
      date: "March 12, 2025",
      description: "Conducted a full-day workshop guiding participants on building multi-agent systems, writing robust custom tool definitions, and securing prompts.",
      presentationLink: "#"
    },
    {
      topic: "Introduction to Fine-Tuning LLMs with QLoRA",
      audience: "120+ Python developers (Online)",
      organization: "Kochi Python User Group",
      date: "January 18, 2025",
      description: "Discussed memory optimization, Unsloth libraries, and fine-tuning lightweight models (e.g. LLaMA-3-8B) on consumer-grade hardware.",
      presentationLink: "#"
    }
  ] as Talk[]
};
