"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import projects from "../data/projects";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Hover3D from "./components/Hover3D";

export const dynamic = "force-static";

const skillIcons = [
  // Languages
  { label: "Python", icon: "python" },
  { label: "JavaScript", icon: "javascript" },
  { label: "C++", icon: "cplusplus" },
  { label: "C", icon: "c" },
  { label: "R", icon: "r" },
  { label: "SQL", icon: "mysql" },
  { label: "HTML5", icon: "html5" },
  { label: "CSS3", icon: "css3" },
  { label: "PowerShell", icon: "powershell" },
  
  // ML/AI Frameworks
  { label: "TensorFlow", icon: "tensorflow" },
  { label: "PyTorch", icon: "pytorch" },
  { label: "Keras", icon: "keras" },
  { label: "Scikit-learn", icon: "scikitlearn" },
  { label: "OpenCV", icon: "opencv" },
  
  // Backend
  { label: "FastAPI", icon: "fastapi" },
  { label: "Flask", icon: "flask" },
  { label: "Django", icon: "django" },
  { label: "Node.js", icon: "nodejs" },
  { label: ".NET Core", icon: "dotnetcore" },
  { label: "React", icon: "react" },
  
  // Databases
  { label: "SQLite", icon: "sqlite" },
  { label: "MySQL", icon: "mysql" },
  { label: "MongoDB", icon: "mongodb" },
  
  // DevOps & Version Control
  { label: "Docker", icon: "docker" },
  { label: "Git", icon: "git" },
  { label: "GitHub", icon: "github" },
  { label: "Bash", icon: "bash" },
  
  // Data Science & Visualization
  { label: "Pandas", icon: "pandas" },
  { label: "NumPy", icon: "numpy" },
  { label: "Streamlit", icon: "streamlit" },
  { label: "Plotly", icon: "plotly" },
  { label: "Matplotlib", icon: "matplotlib" },
  { label: "Anaconda", icon: "anaconda" },
  { label: "Google Colab", icon: "googlecolab" },
  
  // Cloud Platforms
  { label: "Google Cloud", icon: "googlecloud" },
  { label: "Azure", icon: "azure" },
  { label: "Vercel", icon: "vercel" },

  // DevOps & Tools
  { label: "Linux", icon: "linux" },
  { label: "Visual Studio", icon: "visualstudio" },
  { label: "Vite", icon: "vite" },
  { label: "Twilio", icon: "twilio" },

  // Design
  { label: "Figma", icon: "figma" },
  { label: "Photoshop", icon: "photoshop" },
  { label: "Adobe XD", icon: "xd" },
];

const quickLinks = [
  {
    label: "GitHub",
    href: "https://github.com/vvndsz",
    icon: FaGithub,
    iconClassName: "text-zinc-100",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vivian-s-dsouza/",
    icon: FaLinkedinIn,
    iconClassName: "text-[#0A66C2]",
  },
  {
    label: "Email",
    href: "mailto:hello@yourdomain.com",
    icon: MdEmail,
    iconClassName: "text-zinc-100",
  },
];

const sections = [
  { id: "intro", label: "Intro", color: "bg-[#b3f5ff] text-zinc-900" },
  { id: "about", label: "About Me", color: "bg-[#ffe3a8] text-zinc-900" },
  { id: "skills", label: "Skills", color: "bg-[#c9ffdb] text-zinc-900" },
  { id: "projects", label: "Projects", color: "bg-[#c4d2ff] text-zinc-900" },
  { id: "contact", label: "Contact", color: "bg-[#ffb6b6] text-zinc-900" },
];

export default function Home() {
  const isScrollingRef = useRef(false);
  const [activeSection, setActiveSection] = useState("intro");
  const isIntro = activeSection === "intro";

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (isScrollingRef.current) {
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );

    const currentIndex = sections.findIndex((section) => {
      const bounds = section.getBoundingClientRect();
      return Math.abs(bounds.top) < bounds.height * 0.5;
    });

    if (currentIndex === -1) return;

    // If currently inside a no-snap section, allow native scrolling (no snapping).
    if (sections[currentIndex].dataset.noSnap !== undefined) {
      return;
    }

    const nextIndex = Math.min(
      Math.max(currentIndex + direction, 0),
      sections.length - 1
    );

    if (nextIndex === currentIndex) return;

    event.preventDefault();
    isScrollingRef.current = true;

    // If the next section is marked as no-snap, still scroll to it but
    // once landed the no-snap guard above lets the user scroll inside it
    sections[nextIndex].scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.5, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Fallback: update active section on scroll using bounding boxes.
  // This ensures the sidebar highlights correctly even when IntersectionObserver
  // thresholds don't trigger (e.g. varied section heights or nested content).
  useEffect(() => {
    const updateActiveOnScroll = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section]")
      );
      if (sections.length === 0) return;

      const found = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return Math.abs(bounds.top) < bounds.height * 0.5;
      });

      if (found) {
        setActiveSection(found.id);
        return;
      }

      // If scrolled to the very bottom, mark last section active.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setActiveSection(sections[sections.length - 1].id);
      }
    };

    updateActiveOnScroll();
    window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveOnScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_10%_-10%,rgba(56,189,248,0.12),transparent),radial-gradient(900px_600px_at_90%_20%,rgba(236,72,153,0.12),transparent)]" />
      <main className="mx-auto grid w-full max-w-6xl items-start gap-12 px-6 pb-0 pt-0 lg:grid-cols-[240px_1fr]">
        <aside className="top-[213px] hidden h-fit lg:sticky lg:block">
          <div
            className={`transition-all duration-500 ease-out ${
              isIntro ? "text-center" : "text-left"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 transition-all duration-500 ease-out ${
                isIntro ? "max-h-0 opacity-0" : "max-h-6 opacity-100"
              }`}
            >
              Contents
            </p>
            <nav
              className={`mt-6 flex flex-col transition-all duration-500 ease-out ${
                isIntro ? "items-center gap-3" : "items-start gap-4"
              }`}
            >
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`w-40 text-center transition-all duration-500 ease-out hover:-translate-y-0.5 ${
                      isIntro
                        ? `inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${section.color}`
                        : isActive
                          ? `rounded-xl px-4 py-3 text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${section.color}`
                          : "text-sm font-semibold text-zinc-300 hover:text-zinc-100"
                    }`}
                  >
                    {section.label}
                  </a>
                );
              })}
            </nav>
            <div
              className={`mt-8 space-y-2 text-sm text-zinc-400 transition-all duration-500 ease-out ${
                isIntro ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
              }`}
            >
              <p>vivien8534@gmail.com</p>
              <p>github.com/vvndsz</p>
            </div>
          </div>
        </aside>

        <div
          className="flex flex-col"
          onWheel={handleWheel}
        >
          <section
            id="intro"
            data-section
            className="snap-section flex min-h-screen flex-col justify-center py-16"
          >
            <h1
              className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl"
              style={{ fontFamily: '"Science Gothic", sans-serif' }}
            >
              Hi, I&apos;m Vivian. <br />
              Final-year engineering student.
            </h1>
            <p className="mt-4 max-w-2xl text-[20px] leading-[1.5] text-zinc-300">
              Turning{" "}
              <span style={{ fontFamily: '"Doto", sans-serif' }}>data</span>,{" "}
              <span style={{ fontFamily: '"Ubuntu Mono", monospace' }}>code</span>,{" "}
              and{" "}
              <span style={{ fontFamily: '"UnifrakturMaguntia", serif' }}>curiosity</span>{" "}
              into {" "}
              <span style={{ fontFamily: '"Tourney", serif' }}>intelligent innovation</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className={`h-4 w-4 ${link.iconClassName}`} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </section>

          <section
            id="about"
            data-section
            className="snap-section flex min-h-screen flex-col justify-center py-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              About Me
            </p>
            <p
              className="mt-4 leading-relaxed text-zinc-300"
              style={{ fontFamily: '"Ubuntu Mono", monospace', fontSize: '20px' }}
            >
              Most ML projects die between the notebook and production. I build for the part that comes after. I work across the AI/ML stack — modeling, pipelines, deployment with a bias toward systems that are fast, reliable, and actually used.
            </p>
          </section>

          <section
            id="skills"
            data-section
            className="snap-section flex min-h-screen flex-col justify-center py-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Skills
            </p>
            <div className="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-4 md:gap-8 md:grid-cols-5 lg:grid-cols-6">
              {skillIcons.map((skill) => (
                <div
                  key={skill.label}
                  title={skill.label}
                  aria-label={skill.label}
                  className="flex items-center justify-center transition duration-300 hover:scale-110"
                >
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-original.svg`}
                    alt={skill.label}
                    className="h-8 w-8 sm:h-10 sm:w-10 transition-all duration-300 grayscale hover:grayscale-0"
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.display = "none";
                      } else {
                        e.currentTarget.style.display = "none";
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          <section
            id="projects"
            data-section
            data-no-snap
            className="snap-section flex min-h-screen flex-col justify-center py-16"
          >
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Projects
                </p>
              </div>
            </div>
            <div className="columns-1 gap-6 sm:columns-2 xl:columns-2">
              {projects.map((project, index) => (
                <Hover3D
                  key={project.title}
                  as="article"
                  wrapperClassName={`mb-6 break-inside-avoid ${
                    index % 4 === 0
                      ? "mt-0"
                      : index % 4 === 1
                        ? "mt-12"
                        : index % 4 === 2
                          ? "mt-4"
                          : "mt-16"
                  }`}
                  className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#111113] shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
                >
                  <div
                    className={`relative isolate min-h-[36rem] overflow-hidden rounded-[28px] ${
                      project.image
                        ? "bg-zinc-950"
                        : [
                            "bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900",
                            "bg-gradient-to-br from-zinc-950 via-slate-900 to-black",
                            "bg-gradient-to-br from-emerald-950 via-green-900 to-zinc-950",
                            "bg-gradient-to-br from-stone-950 via-zinc-900 to-black",
                          ][index % 4]
                    }`}
                  >
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.78)_100%)]" />
                      </>
                    ) : (
                      <>
                        <div className={`absolute inset-0 opacity-70 ${
                          [
                            "bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.38),transparent_22%),radial-gradient(circle_at_80%_22%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.28),transparent_24%)]",
                            "bg-[radial-gradient(circle_at_12%_14%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.22),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.28),transparent_25%)]",
                            "bg-[radial-gradient(circle_at_18%_22%,rgba(34,197,94,0.28),transparent_22%),radial-gradient(circle_at_85%_16%,rgba(255,255,255,0.07),transparent_20%),radial-gradient(circle_at_56%_72%,rgba(6,182,212,0.18),transparent_24%)]",
                            "bg-[radial-gradient(circle_at_16%_18%,rgba(249,115,22,0.18),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_52%_76%,rgba(99,102,241,0.22),transparent_24%)]",
                          ][index % 4]
                        }`} />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_38%,rgba(0,0,0,0.72)_100%)]" />
                      </>
                    )}
                    <div className="absolute inset-0 z-10 flex flex-col p-6 pb-8 sm:p-7 sm:pb-10">
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/12 bg-black/25 px-3 py-1 text-[11px] font-medium text-zinc-100/90 backdrop-blur-md"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto space-y-3">
                        <h3 className="text-2xl font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-[2.15rem]">
                          {project.title}
                        </h3>
                        <p className="max-w-xl text-sm leading-relaxed text-zinc-100/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] sm:text-[1.05rem]">
                          {project.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </Hover3D>
              ))}
            </div>
          </section>

          <section
            id="contact"
            data-section
            className="snap-section flex min-h-screen flex-col justify-center py-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Contact
            </p>
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-lg font-semibold">Let&apos;s build</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                Reach out for collaborations, internships, or research projects.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-700"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon className={`h-4 w-4 ${link.iconClassName}`} />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
