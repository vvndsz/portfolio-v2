export type Project = {
  title: string;
  value: string; // short description
  howItWorks?: string;
  stack: string[];
  image?: string;
  href?: string;
  linkLabel?: string;
};

const projects: Project[] = [
  {
    title: "Agentic-RAG",
    value:
      "Production-ready Retrieval Augmented Generation AI agent. Uploads & processes PDFs, stores embeddings in Qdrant, and answers natural language questions using LLM augmentation.",
    stack: ["Python", "FastAPI", "Streamlit", "Llama Index", "Qdrant", "OpenAI", "Docker"],
    image: "/project_ss/Agentic-RAG.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "Maritime Turnaround Predictor & ML Observability Pipeline",
    value: "Architected a real-time maritime analytics platform, delivering vessel prediction, observability, reliable deployment alignment, and interactive operational insights.",
    stack: ["Python", "Kafka", "MLflow", "FastAPI", "Streamlit"],
    image: "/project_ss/Maritime-Turnaround-Predictor.jpg",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "ai-agents-for-beginners",
    value: "11 lessons to get started building AI agents — an educational resource for learning agent development.",
    stack: ["Documentation", "Learning Resources"],
    image: "/project_ss/ai-agents-for-beginners.png",
    href: "",
    linkLabel: "Docs",
  },
  {
    title: "AI-Image-Caption-Generator",
    value: "Intelligent image captioning with customizable tones (casual, formal, humorous, poetic).",
    stack: ["React", "FastAPI", "TailwindCSS", "Salesforce BLIP", "Transformers", "Redis"],
    image: "/project_ss/AI-Image-Caption-Generator.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "AI_Adaptive_Traffic_Control",
    value: "AI-powered adaptive traffic management system that optimizes traffic light timing based on real-time conditions.",
    stack: ["AI/ML", "TBD"],
    image: "/project_ss/AI_Adaptive_Traffic_Control.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "Computer-vision",
    value: "Advanced computer vision demos using multimodal foundation models: embeddings, zero-shot classification, captioning, and object detection.",
    stack: ["Python", "Jupyter", "CLIP", "Qwen-VL", "PyTorch", "Transformers"],
    image: "/project_ss/Computer-vision.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "Ham-Radio-Assistant",
    value: "Local-first intelligent assistant for amateur radio operators in India — Q-codes, frequency info, morse encoding, logbook, contests, and more.",
    stack: ["Python", "Flask", "Vosk", "Gemini API", "pyttsx3"],
    image: "/project_ss/Ham-Radio-Assistant.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "Image-captioning-v1",
    value: "First-version image captioning implementation (v1) implemented in a Jupyter notebook.",
    stack: ["Jupyter", "Python", "Notebook"],
    href: "",
    linkLabel: "Notebook",
  },
  {
    title: "RAG-agent-python",
    value: "Production-ready RAG AI agent (Python implementation) — uploads PDFs, vectorizes content, answers questions using retrieved context.",
    stack: ["Python", "FastAPI", "Streamlit", "Llama Index", "Qdrant", "OpenAI", "Docker"],
    image: "/project_ss/RAG-agent-python.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "Refinery",
    value: "Local CLI tool for prompt optimization using Ollama — iterative refinement, clipboard integration, and prompt history.",
    stack: ["Python", "Ollama", "SQLite", "Click", "Rich"],
    image: "/project_ss/Refinery.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "support",
    value: "Support and utility project offering general helper functionality.",
    stack: ["TypeScript"],
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "TaskManager",
    value: "Task management application to organize and track tasks with persistent storage.",
    stack: ["React", "Firebase"],
    image: "/project_ss/Taskmanager.png",
    href: "",
    linkLabel: "App",
  },
  {
    title: "Virtual-Assistant",
    value: "AI voice assistant with real-time conversation — customizable personality and spoken replies.",
    stack: ["Python", "ElevenLabs", "PyAudio"],
    image: "/project_ss/Virtual-Assistant.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "Prompt Proxy",
    value: "**Prompt Optimizer** is a Chrome/Edge extension that sends your raw prompt to an API and automatically replaces it in the chat box with an enhanced version.",
    stack: ["Javascript", "OpenRouter", "Manifest V3"],
    image: "/project_ss/PromptProxy.png",
    href: "",
    linkLabel: "Repo",
  },
  {
    title: "VisionTranscribe",
    value: "Visual speech recognition from lip-reading using AV-HuBERT transformer models to transcribe speech from video without audio.",
    stack: ["Flask", "React", "PyTorch", "AV-HuBERT", "MediaPipe", "OpenCV"],
    image: "/project_ss/VisionTranscribe.png",
    href: "",
    linkLabel: "Repo",
  },
];

export default projects;
