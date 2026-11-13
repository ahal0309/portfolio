"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ShoppingCart, 
  BrainCircuit, 
  ArrowRight,
  ExternalLink,
  Mail,
  Phone
} from "lucide-react";

// Inline clean SVG icons for GitHub & LinkedIn to prevent version/bundle mismatches
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

// Spring animation preset for energetic neo-brutalist feel
const neoSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 14,
  mass: 0.8,
};

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("https://formsubmit.co/ajax/ahalabduljaleel8@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `New Portfolio Enquiry: ${formData.subject || "General Opportunity"} (from ${formData.name})`,
          subject: formData.subject,
          message: formData.message,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      const mailtoUrl = `mailto:ahalabduljaleel8@gmail.com?subject=${encodeURIComponent(
        (formData.subject || "AI Opportunity") + " - " + formData.name
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitStatus("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid-bg relative selection:bg-[#FFE033] selection:text-black">
      {/* Floating Status Pill */}
      <motion.a 
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        href="#contact" 
        className="fixed bottom-6 right-6 z-50 bg-[#121316] text-white border-2 border-white brutal-shadow px-4 py-2.5 rounded-full flex items-center gap-2.5 text-xs font-bold font-mono-code hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] status-dot-pulse"></span>
        <span>Available for Entry-Level Roles</span>
      </motion.a>

      {/* Top Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white brutal-border border-t-0 border-l-0 border-r-0">
        <div className="max-w-[1240px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 text-[#121316] no-underline">
            <div className="w-7 h-7 bg-[#FFE033] border-2 border-[#121316] brutal-shadow-sm flex items-center justify-center font-bold text-base font-heading">
              +
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight">Ahal Abdul Jaleel</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 font-mono-code text-[13px] font-bold">
            <a href="#about" className="hover:underline underline-offset-4 text-[#121316]">About</a>
            <a href="#skills" className="hover:underline underline-offset-4 text-[#121316]">Skills</a>
            <a href="#projects" className="hover:underline underline-offset-4 text-[#121316]">Projects</a>
            <a href="#client-work" className="hover:underline underline-offset-4 text-[#121316]">Client Work</a>
            <a href="#experience" className="hover:underline underline-offset-4 text-[#121316]">Education</a>
            <a href="#faq" className="hover:underline underline-offset-4 text-[#121316]">FAQ</a>
          </nav>

          <a href="#contact" className="brutal-btn text-xs py-2 px-4.5">
            Let's Connect &rarr;
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="brutal-border border-t-0 border-l-0 border-r-0 py-16 md:py-24 px-6 bg-[#FAF8F2]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="brutal-badge mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI & Machine Learning Engineer
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#121316] tracking-tight leading-[1.08] max-w-4xl my-4"
          >
            Engineering intelligent ML models & scalable AI applications that solve real-world problems.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#4A4D55] max-w-2xl leading-relaxed mb-8"
          >
            Enthusiastic AI & ML graduate from <strong>Yenepoya Institute of Technology (VTU)</strong> seeking an entry-level AI Engineer role. Specializing in machine learning, NLP, generative AI, and full-stack intelligent mobile systems.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a href="#projects" className="brutal-btn">
              View Featured Project &rarr;
            </a>
            <a href="#contact" className="brutal-btn brutal-btn-white">
              Get In Touch
            </a>
            <a 
              href="https://github.com/ahal0309" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-[#121316] px-3.5 py-2 font-mono-code text-xs font-bold text-[#121316] brutal-shadow-sm hover:bg-[#FFFDE6] transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              github.com/ahal0309
            </a>
            <a 
              href="https://www.linkedin.com/in/ahal-abdul-jaleel" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-[#121316] px-3.5 py-2 font-mono-code text-xs font-bold text-[#121316] brutal-shadow-sm hover:bg-[#FFFDE6] transition-all"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              linkedin.com/in/ahal-abdul-jaleel
            </a>
          </motion.div>

          {/* Retro OS Style Triple Preview Windows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Window 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
              className="bg-white brutal-border brutal-shadow flex flex-col overflow-hidden"
            >
              <div className="bg-[#3448C5] text-white px-3 py-2 brutal-border border-t-0 border-l-0 border-r-0 flex items-center justify-between font-mono-code text-xs font-bold">
                <span>APP_INTERFACE.EXE</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                </div>
              </div>
              <div className="bg-[#192038] text-white p-5 flex-1 flex flex-col justify-between min-h-[190px]">
                <div>
                  <span className="font-mono-code text-[11px] text-[#42E8E0] uppercase font-bold tracking-wider">Flagship System</span>
                  <h3 className="font-heading font-bold text-lg text-white mt-1.5">AI Dual Interface System</h3>
                  <p className="text-xs text-[#BAC2DE] mt-1.5 leading-relaxed">
                    Smart navigation, demand forecasting & customer analytics using Gemini API & React Native.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  <span className="bg-[#252D4D] text-white text-[11px] font-mono-code font-bold px-2 py-0.5 border border-[#434C73]">React Native</span>
                  <span className="bg-[#252D4D] text-white text-[11px] font-mono-code font-bold px-2 py-0.5 border border-[#434C73]">MongoDB</span>
                  <span className="bg-[#252D4D] text-white text-[11px] font-mono-code font-bold px-2 py-0.5 border border-[#434C73]">Gemini API</span>
                </div>
              </div>
            </motion.div>

            {/* Window 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
              className="bg-white brutal-border brutal-shadow flex flex-col overflow-hidden"
            >
              <div className="bg-[#FF85A2] text-[#121316] px-3 py-2 brutal-border border-t-0 border-l-0 border-r-0 flex items-center justify-between font-mono-code text-xs font-bold">
                <span>CERTIFICATIONS.TXT</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                </div>
              </div>
              <div className="bg-[#FFF5F7] p-5 flex-1 flex flex-col justify-between min-h-[190px]">
                <div>
                  <span className="font-mono-code text-[11px] text-[#D6225B] font-extrabold uppercase tracking-wider">Verified Credentials</span>
                  <h3 className="font-heading font-bold text-lg text-[#121316] mt-1.5">IBM & Microsoft Certified</h3>
                  <ul className="text-xs mt-2 space-y-1 font-semibold text-[#444] pl-4 list-disc">
                    <li>IBM: R Essential (Sep 2024)</li>
                    <li>Microsoft: Azure Fundamentals (May 2025)</li>
                  </ul>
                </div>
                <div className="font-mono-code text-[11px] text-[#777] mt-3 font-bold">
                  Status: Dual Certified
                </div>
              </div>
            </motion.div>

            {/* Window 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.45, ease: "easeOut" }}
              className="bg-white brutal-border brutal-shadow flex flex-col overflow-hidden"
            >
              <div className="bg-[#FFE033] text-[#121316] px-3 py-2 brutal-border border-t-0 border-l-0 border-r-0 flex items-center justify-between font-mono-code text-xs font-bold">
                <span>NIT_CALICUT_AIHC.LOG</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                </div>
              </div>
              <div className="bg-[#FFFFF0] p-5 flex-1 flex flex-col justify-between min-h-[190px]">
                <div>
                  <span className="font-mono-code text-[11px] text-[#9E7000] font-extrabold uppercase tracking-wider">Conference & Hackathon</span>
                  <h3 className="font-heading font-bold text-lg text-[#121316] mt-1.5">AIHC 2025 at NIT Calicut</h3>
                  <p className="text-xs text-[#555] mt-1.5 leading-relaxed">
                    Participated in International Conference on AI for Healthcare & served as Organizing Co-ordinator for MATRIX FUSION 4.0.
                  </p>
                </div>
                <div className="font-mono-code text-[11px] font-bold text-[#222] mt-3">
                  Leadership: Matrix Fusion 4.0
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section: "Oh, hey." (Placed BEFORE Skills) */}
      <section id="about" className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-[#FFFDF8]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[360px_1fr] gap-10 items-start">
          {/* Left Column Graphic Window */}
          <motion.div 
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={neoSpring}
            className="bg-[#121316] brutal-border brutal-shadow-lg overflow-hidden"
          >
            <div className="bg-[#121316] text-white px-3.5 py-2 flex items-center justify-end font-mono-code text-xs font-bold border-b-2 border-white/20">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 border border-white bg-white/20 inline-block"></span>
                <span className="w-2.5 h-2.5 border border-white bg-white/20 inline-block"></span>
                <span className="w-2.5 h-2.5 border border-white bg-white/20 inline-block"></span>
              </div>
            </div>
            <div className="relative aspect-[3/4] w-full bg-[#121316] overflow-hidden group">
              <img
                src="/portrait.jpg"
                alt="Ahal Abdul Jaleel"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-12 text-white">
                <h3 className="font-heading font-extrabold text-xl text-white">Ahal Abdul Jaleel</h3>
                <p className="font-mono-code text-xs font-bold text-[#FFE033] mt-0.5">AI & ML Engineer</p>
                <div className="mt-2.5 inline-block font-mono-code text-[11px] bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 border border-white/30">
                  Yenepoya Institute of Tech (VTU)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Yellow Content Box */}
          <motion.div 
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...neoSpring, delay: 0.1 }}
            className="bg-[#FFE033] brutal-border brutal-shadow-lg p-8 md:p-10"
          >
            <div className="brutal-badge bg-white mb-3">BIO & PROFILE</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316] tracking-tight mb-4">
              Oh, hey.
            </h2>
            <p className="text-base font-semibold leading-relaxed text-[#1E2026] mb-4">
              I'm an Artificial Intelligence and Machine Learning engineering student graduating in 2027 from <strong>Yenepoya Institute of Technology / VTU, Karnataka</strong>, with an academic record of <strong>8.0 CGPA</strong>.
            </p>
            <p className="text-sm sm:text-base text-[#2C2F38] leading-relaxed mb-6">
              My mission is to bridge theoretical AI research with production-grade software applications. From building full-stack smart retail apps using Gemini API and React Native to participating in international healthcare AI conferences at NIT Calicut, I love taking complex algorithms and transforming them into accessible, high-impact products.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { num: "8.0", label: "B.E. CGPA (VTU)" },
                { num: "6+", label: "Languages" },
                { num: "2027", label: "Graduation" },
                { num: "2+", label: "Certifications" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 140 }}
                  className="bg-white border-2 border-[#121316] brutal-shadow-sm p-3.5"
                >
                  <div className="font-heading font-extrabold text-2xl text-[#121316]">{stat.num}</div>
                  <div className="font-mono-code text-[10px] font-bold text-[#666] uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <a href="#contact" className="brutal-btn brutal-btn-black">
                Hire Me &rarr;
              </a>
              <a href="mailto:ahalabduljaleel8@gmail.com" className="brutal-btn brutal-btn-white">
                ahalabduljaleel8@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Notes Section: "Stuff I'm good at." (Placed AFTER About) */}
      <section id="skills" className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-[#FDFBF7]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="brutal-badge mb-3">CORE CAPABILITIES</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316] tracking-tight">
              Stuff I'm good at.
            </h2>
            <p className="text-sm sm:text-base text-[#555] mt-1 max-w-xl">
              A comprehensive breakdown of foundational AI/ML proficiencies, tools, frameworks, and programming toolkits from my degree and projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                bg: "bg-[#FF85A2]",
                rotateInit: -4,
                rotateRest: -1,
                tag: "Core Engineering",
                title: "Machine Learning",
                desc: "Predictive modeling, regression, supervised & unsupervised learning, model tuning and evaluation.",
                pill: "Scikit-Learn • Py",
                pillBg: "bg-white/80"
              },
              {
                bg: "bg-[#FFE033]",
                rotateInit: 4,
                rotateRest: 1,
                tag: "Specialization",
                title: "Natural Language Processing",
                desc: "Text processing, semantic analysis, tokenization, embeddings, and conversational AI architecture.",
                pill: "Transformers • NLP",
                pillBg: "bg-white/80"
              },
              {
                bg: "bg-[#42E8E0]",
                rotateInit: -4,
                rotateRest: -1,
                tag: "Modern AI",
                title: "Generative AI",
                desc: "Prompt engineering, multimodal model integration, Gemini API integration, and intelligent assistants.",
                pill: "Gemini API • LLMs",
                pillBg: "bg-white/80"
              },
              {
                bg: "bg-[#62E89D]",
                rotateInit: 4,
                rotateRest: 1.5,
                tag: "Scientific Stack",
                title: "Data Analytics & Math",
                desc: "Data wrangling, statistical analysis, feature engineering, and high-impact visual exploration.",
                pill: "NumPy • Pandas • Matplotlib",
                pillBg: "bg-white/80"
              },
              {
                bg: "bg-[#C497FF]",
                rotateInit: -5,
                rotateRest: -2,
                tag: "Languages",
                title: "Polyglot Dev",
                desc: "Fluent in Python, C, C++, Java, Julia, and R for data science and systems engineering.",
                pill: "Python • C++ • Java • Julia • R",
                pillBg: "bg-white/80"
              },
              {
                bg: "bg-[#FF7B39]",
                rotateInit: 4,
                rotateRest: 1,
                textColor: "text-white",
                tag: "Leadership & Tooling",
                title: "Problem-Solving",
                desc: "Agile workflows, team collaboration, technical communication, and event co-ordination.",
                pill: "Git • Teamwork • Organizing",
                pillBg: "bg-black/40 text-white border-white/50"
              }
            ].map((note, idx) => (
              <motion.div 
                key={note.title}
                initial={{ opacity: 0, y: 40, rotate: note.rotateInit, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotate: note.rotateRest, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 110, 
                  damping: 14, 
                  delay: idx * 0.08 
                }}
                whileHover={{ 
                  scale: 1.04, 
                  rotate: 0, 
                  y: -6,
                  transition: { duration: 0.2 } 
                }}
                className={`${note.bg} brutal-border brutal-shadow-lg p-6 min-h-[200px] flex flex-col justify-between relative cursor-default ${note.textColor || "text-[#121316]"}`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#121316] absolute top-3 left-1/2 -translate-x-1/2"></div>
                <div>
                  <span className={`font-mono-code text-[11px] font-bold uppercase opacity-80 ${note.textColor || ""}`}>{note.tag}</span>
                  <h3 className={`font-heading font-extrabold text-xl mt-2 mb-1 ${note.textColor || "text-[#121316]"}`}>{note.title}</h3>
                  <p className={`text-xs sm:text-[13px] font-semibold leading-relaxed ${note.textColor ? "text-white/90" : "text-[#222]"}`}>
                    {note.desc}
                  </p>
                </div>
                <div className={`inline-block self-start font-mono-code text-[11px] font-bold border border-[#121316] px-2 py-0.5 mt-3 ${note.pillBg}`}>
                  {note.pill}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Rust Section: "Projects I'm proud of." */}
      <section id="projects" className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-[#D94625] text-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="brutal-badge text-[#121316] mb-3">PORTFOLIO WORK</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Projects I'm proud of.
            </h2>
            <p className="text-sm sm:text-base text-[#FFE6E0] mt-1 max-w-xl">
              Selected academic and personal projects demonstrating AI pipeline development, API orchestration, and mobile systems engineering.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {/* Project 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...neoSpring, delay: 0.1 }}
              className="bg-white text-[#121316] brutal-border brutal-shadow-lg hover:-translate-y-1.5 transition-all overflow-hidden"
            >
              <div className="h-52 bg-gradient-to-br from-[#1A1F38] to-[#0F1222] p-6 text-white flex flex-col justify-between border-b-2 border-[#121316] relative">
                <div className="brutal-badge self-start text-[#121316]">FEATURED PROJECT</div>
                <div className="text-center my-auto">
                  <ShoppingCart className="w-10 h-10 text-[#FFE033] mx-auto" />
                  <h4 className="font-heading font-extrabold text-xl mt-2">AI Dual Interface System</h4>
                  <span className="font-mono-code text-xs text-[#8F9BB3]">Supermarket Operations Platform</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-2.5">
                  AI Dual Interface System Application for Supermarket
                </h3>
                <p className="text-sm text-[#4F5360] leading-relaxed">
                  Developed a comprehensive cross-platform mobile application that enhances supermarket operations through a dual interface system tailored for both customers and store owners.
                </p>
                <div className="flex flex-wrap gap-2 my-4">
                  {["React Native", "MongoDB", "Gemini API", "Machine Learning", "Data Analytics"].map((tag) => (
                    <span key={tag} className="bg-[#F1EFEA] border border-[#121316] font-mono-code text-[11px] font-bold px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="bg-[#F8F7F3] border border-[#121316] p-3.5 mt-3">
                  <span className="font-mono-code text-[11px] font-extrabold uppercase text-[#222] block mb-1.5">Key Highlights:</span>
                  <ul className="text-xs text-[#333] space-y-1 pl-4 list-disc font-medium">
                    <li>AI-based smart in-store navigation for customers</li>
                    <li>Demand forecasting algorithms for store inventory optimization</li>
                    <li>Customer analytics dashboards for data-driven decisions</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...neoSpring, delay: 0.2 }}
              className="bg-white text-[#121316] brutal-border brutal-shadow-lg hover:-translate-y-1.5 transition-all overflow-hidden"
            >
              <div className="h-52 bg-gradient-to-br from-[#1C2C24] to-[#0E1A14] p-6 text-white flex flex-col justify-between border-b-2 border-[#121316] relative">
                <div className="brutal-badge self-start text-[#121316] bg-[#42E8E0]">DATA & ML PIPELINES</div>
                <div className="text-center my-auto">
                  <BrainCircuit className="w-10 h-10 text-[#62E89D] mx-auto" />
                  <h4 className="font-heading font-extrabold text-xl mt-2">Predictive ML Architecture</h4>
                  <span className="font-mono-code text-xs text-[#8FA89B]">Scikit-learn & Python Workflows</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-2.5">
                  End-to-End Machine Learning Workflows
                </h3>
                <p className="text-sm text-[#4F5360] leading-relaxed">
                  Comprehensive data preprocessing, exploratory analysis, regression, and classification pipelines built with Python scientific libraries and evaluated on rigorous benchmarks.
                </p>
                <div className="flex flex-wrap gap-2 my-4">
                  {["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"].map((tag) => (
                    <span key={tag} className="bg-[#F1EFEA] border border-[#121316] font-mono-code text-[11px] font-bold px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="bg-[#F8F7F3] border border-[#121316] p-3.5 mt-3">
                  <span className="font-mono-code text-[11px] font-extrabold uppercase text-[#222] block mb-1.5">Key Highlights:</span>
                  <ul className="text-xs text-[#333] space-y-1 pl-4 list-disc font-medium">
                    <li>Exploratory Data Analysis (EDA) & feature engineering</li>
                    <li>Iterative model cross-validation and hyperparameter tuning</li>
                    <li>Modular code structures ready for production inference</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Work Section (Placed between Projects and Workflow Methodology) */}
      <section id="client-work" className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-[#FFFDF5]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <div className="brutal-badge mb-3 bg-[#FFE033]">PRODUCTION PORTFOLIO</div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#121316] tracking-tight">
                Works I've Done for Clients.
              </h2>
              <p className="text-sm sm:text-base text-[#555] mt-2 max-w-2xl leading-relaxed">
                Real-world web applications, production systems, and digital presences built and shipped for businesses, clinics, luxury brands, and enterprises.
              </p>
            </div>
            <div className="font-mono-code text-xs font-bold text-[#888] bg-white border-2 border-[#121316] px-3.5 py-2 brutal-shadow-sm self-start sm:self-auto">
              4 Production Deployments
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Chai Days",
                domain: "CHAIDAYS.VERCEL.APP",
                domainColor: "text-[#FFE033]",
                badge: "LIVE WEB APP",
                category: "Food & Beverage Brand",
                catColor: "text-[#D94625]",
                desc: "A modern, immersive digital experience designed for the contemporary ritual of tea culture. Built with sleek aesthetics, fast page performance, and smooth customer journey flows.",
                img: "/client-chaidays.png",
                link: "https://chaidays.vercel.app/",
                tags: ["Next.js", "React", "Tailwind CSS", "Vercel", "Responsive UX"],
                btnStyle: "brutal-btn"
              },
              {
                name: "Easy Support Typing Services",
                domain: "EASYSUPPORT.AE",
                domainColor: "text-[#42E8E0]",
                badge: "CORPORATE SERVICES",
                category: "UAE PRO & Business Setup",
                catColor: "text-[#3448C5]",
                desc: "Corporate portal engineered for a UAE-based typing, PRO, visa clearance, and business formation enterprise. Designed for trust, rapid inquiry conversions, and clear service breakdowns.",
                img: "/client-easysupport.png",
                link: "https://www.easysupport.ae/",
                tags: ["Business Portal", "SEO Optimization", "Lead Generation", "Corporate UI"],
                btnStyle: "brutal-btn brutal-btn-white"
              },
              {
                name: "Manasu Counselling Centre",
                domain: "MANASUCOUNSELLINGCENTRE.COM",
                domainColor: "text-[#62E89D]",
                badge: "HEALTHCARE & WELLNESS",
                category: "Mental Health & Wellness",
                catColor: "text-[#3CB371]",
                desc: "A compassionate, accessible healthcare platform for mental wellness therapy, counselling appointments, and specialist psychological guidance with empathetic, patient-centric design.",
                img: "/client-manasu.png",
                link: "https://www.manasucounsellingcentre.com/",
                tags: ["Healthcare Platform", "Appointment UX", "Accessibility", "Patient Portal"],
                btnStyle: "brutal-btn brutal-btn-white"
              },
              {
                name: "Afana's Angel",
                domain: "AFANASANGEL.COM",
                domainColor: "text-[#FF85A2]",
                badge: "HAUTE COUTURE & E-COMMERCE",
                category: "Luxury Fashion & Abayas",
                catColor: "text-[#C497FF]",
                desc: "High-end luxury fashion and haute couture boutique e-commerce showcase featuring bespoke abayas, editorial photography catalogs, and seamless luxury brand storytelling.",
                img: "/client-afanasangel.png",
                link: "https://www.afanasangel.com/",
                tags: ["E-Commerce", "Luxury Brand UI", "Product Showcase", "Mobile First"],
                btnStyle: "brutal-btn"
              }
            ].map((client, idx) => (
              <motion.div 
                key={client.domain}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ ...neoSpring, delay: idx * 0.12 }}
                className="bg-white brutal-border brutal-shadow-lg flex flex-col justify-between hover:-translate-y-1.5 transition-all overflow-hidden group"
              >
                <div>
                  {/* Retro Window Bar */}
                  <div className="bg-[#121316] text-white px-3.5 py-2 flex items-center justify-between font-mono-code text-xs font-bold border-b-2 border-[#121316]">
                    <span className={client.domainColor}>{client.domain}</span>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 border border-white bg-white/20 inline-block"></span>
                      <span className="w-2.5 h-2.5 border border-white bg-white/20 inline-block"></span>
                      <span className="w-2.5 h-2.5 border border-white bg-white/20 inline-block"></span>
                    </div>
                  </div>

                  {/* Screenshot Preview */}
                  <div className="relative aspect-[16/10] w-full bg-[#1A1A1A] overflow-hidden border-b-2 border-[#121316]">
                    <img
                      src={client.img}
                      alt={`${client.name} Preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-[#121316] text-white font-mono-code text-[10px] font-extrabold px-2 py-0.5 border border-white">
                      {client.badge}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className={`font-mono-code text-[11px] font-bold uppercase ${client.catColor}`}>{client.category}</span>
                        <h3 className="font-heading font-extrabold text-2xl text-[#121316] mt-0.5">
                          {client.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-[#4A4D55] leading-relaxed mt-2">
                      {client.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 my-4">
                      {client.tags.map((tag) => (
                        <span key={tag} className="bg-[#F1EFEA] border border-[#121316] font-mono-code text-[11px] font-bold px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 pt-0">
                  <a
                    href={client.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${client.btnStyle} w-full justify-center text-xs`}
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Green Steps Section: "From problem to production." */}
      <section className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-[#3CB371] text-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="brutal-badge bg-white text-[#121316] mb-3">WORKFLOW METHODOLOGY</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              From problem to production.
            </h2>
            <p className="text-sm sm:text-base text-[#E2F7EB] mt-1 max-w-xl">
              How I systematically approach an AI/ML engineering challenge from first principles to deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {[
              {
                step: "Step 01",
                title: "Problem Framing",
                desc: "Translating business or clinical objectives into well-defined machine learning tasks (supervised, classification, or LLM-based agent).",
                tag: "Requirement Discovery"
              },
              {
                step: "Step 02",
                title: "Data Engineering",
                desc: "Cleaning raw datasets, handling missing values, feature scaling, and generating informative tabular & text embeddings.",
                tag: "Pandas • NumPy • R"
              },
              {
                step: "Step 03",
                title: "Modeling & Tuning",
                desc: "Benchmarking multiple baseline algorithms, incorporating generative APIs (Gemini), and iterating until accuracy targets are met.",
                tag: "Scikit-Learn • Gemini"
              },
              {
                step: "Step 04",
                title: "App Integration",
                desc: "Integrating intelligence into reactive frontends (React Native) with scalable cloud backends (MongoDB, Azure) and clean APIs.",
                tag: "React Native • Cloud API"
              }
            ].map((s, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...neoSpring, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="bg-white text-[#121316] brutal-border brutal-shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-code font-extrabold text-xs uppercase bg-[#FFE033] px-2 py-0.5 border border-[#121316] inline-block mb-3">
                    {s.step}
                  </span>
                  <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-[13px] text-[#555] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="font-mono-code text-[11px] font-bold text-[#888] mt-4">
                  {s.tag}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid: Education & Credentials */}
      <section id="experience" className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-[#FAF8F2]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="brutal-badge mb-3">ACADEMICS & MILESTONES</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316] tracking-tight">
              Education & Credentials in the wild.
            </h2>
            <p className="text-sm sm:text-base text-[#555] mt-1">
              Verified qualifications, academic foundations, and key community milestones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-10">
            {/* Degree Card */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...neoSpring, delay: 0.1 }}
              className="lg:col-span-8 bg-white brutal-border brutal-shadow-lg p-6 sm:p-8 hover:-translate-y-1 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <span className="brutal-badge bg-[#FFE033]">2023 - 2027</span>
                  <h3 className="font-heading font-extrabold text-2xl text-[#121316] mt-2">
                    Bachelor of Engineering in Artificial Intelligence & Machine Learning
                  </h3>
                  <p className="text-sm font-semibold text-[#555] mt-1">
                    Yenepoya Institute of Technology / Visvesvaraya Technological University (VTU), Karnataka
                  </p>
                </div>
                <div className="bg-[#121316] text-white p-3 text-center border-2 border-[#121316] shadow-[3px_3px_0px_#FFE033] shrink-0 self-start">
                  <div className="font-heading font-extrabold text-2xl">8.0</div>
                  <div className="font-mono-code text-[10px] uppercase">Current CGPA</div>
                </div>
              </div>
              <p className="text-sm text-[#444] mt-4 leading-relaxed">
                Rigorous coursework covering machine learning architectures, statistical computing, algorithm design, data structures, neural networks, and generative AI systems.
              </p>
            </motion.div>

            {/* Schooling Card */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...neoSpring, delay: 0.2 }}
              className="lg:col-span-4 bg-[#FFFDF5] brutal-border brutal-shadow-lg p-6 hover:-translate-y-1 transition-all"
            >
              <span className="brutal-badge bg-[#42E8E0]">FOUNDATIONS</span>
              <h3 className="font-heading font-bold text-lg text-[#121316] mt-2">
                Sree Gokulam Public School, Calicut
              </h3>
              <div className="mt-4 space-y-3">
                <div className="border-l-4 border-[#FF85A2] pl-3">
                  <div className="font-bold text-sm">Class 12th (2023)</div>
                  <div className="font-mono-code text-xs text-[#555]">Score: 80%</div>
                </div>
                <div className="border-l-4 border-[#FFE033] pl-3">
                  <div className="font-bold text-sm">Class 10th (2021)</div>
                  <div className="font-mono-code text-xs text-[#555]">Score: 80%</div>
                </div>
              </div>
            </motion.div>

            {/* Conference Achievement Card */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...neoSpring, delay: 0.15 }}
              className="lg:col-span-6 bg-[#FAF5FF] brutal-border brutal-shadow-lg overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all"
            >
              <div className="bg-[#FF85A2] text-[#121316] px-4 py-2 brutal-border border-t-0 border-l-0 border-r-0 flex justify-between font-mono-code text-xs font-bold">
                <span>ACHIEVEMENT // AIHC_2025</span>
                <span>NIT CALICUT</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-[#121316] mb-2">
                  International Conference on AI for Healthcare (AIHC 2025)
                </h3>
                <p className="text-sm text-[#4C5061] leading-relaxed">
                  Selected participant at the prestigious AIHC 2025 conference held at National Institute of Technology (NIT) Calicut, exploring advancements in diagnostic AI and medical intelligence.
                </p>
              </div>
              <div className="px-6 pb-5 pt-0 font-mono-code text-xs font-bold text-[#888]">
                Host: National Institute of Technology Calicut
              </div>
            </motion.div>

            {/* Hackathon Coordinator Card */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...neoSpring, delay: 0.25 }}
              className="lg:col-span-6 bg-[#F0FFF4] brutal-border brutal-shadow-lg overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all"
            >
              <div className="bg-[#FFE033] text-[#121316] px-4 py-2 brutal-border border-t-0 border-l-0 border-r-0 flex justify-between font-mono-code text-xs font-bold">
                <span>LEADERSHIP // MATRIX_FUSION_4.0</span>
                <span>NATIONAL HACKATHON</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-[#121316] mb-2">
                  Organizing Co-ordinator - MATRIX FUSION 4.0
                </h3>
                <p className="text-sm text-[#4C5061] leading-relaxed">
                  Spearheaded operations, developer coordination, and logistical management for the national-level hackathon MATRIX FUSION 4.0, guiding multiple teams and technical challenges.
                </p>
              </div>
              <div className="px-6 pb-5 pt-0 font-mono-code text-xs font-bold text-[#888]">
                Role: Student Organizing Coordinator
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Purple Section: "What collaborators say." */}
      <section className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-[#C497FF]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="brutal-badge bg-[#121316] text-white mb-3">COLLABORATION & IMPACT</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316] tracking-tight">
              What collaborators say.
            </h2>
            <p className="text-sm sm:text-base text-[#2D1A4A] mt-1">
              Feedback from peer engineers, hackathon participants, and faculty mentors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              {
                bg: "bg-[#FF99B8]",
                rotInit: -4,
                rotRest: -1,
                quote: "Ahal demonstrated remarkable initiative integrating the Gemini API with React Native for the supermarket project. His grasp of demand forecasting algorithms is exceptional for an engineering student.",
                author: "Project Mentor • AI Lab"
              },
              {
                bg: "bg-[#FFE853]",
                rotInit: 4,
                rotRest: 1,
                quote: "Co-ordinating Matrix Fusion 4.0 alongside Ahal was seamless. He brings crystal-clear problem-solving, calm technical communication, and dedication to every challenge.",
                author: "Organizing Lead • Matrix Fusion"
              },
              {
                bg: "bg-[#6CE8C3]",
                rotInit: -3,
                rotRest: -0.5,
                quote: "Ahal's curiosity at the NIT Calicut AIHC conference was infectious. He is constantly upskilling in cutting-edge ML stacks and delivers clean, well-structured code.",
                author: "Peer Researcher • AIHC 2025"
              }
            ].map((rev, idx) => (
              <motion.div 
                key={rev.author}
                initial={{ opacity: 0, y: 40, rotate: rev.rotInit }}
                whileInView={{ opacity: 1, y: 0, rotate: rev.rotRest }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...neoSpring, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, rotate: 0, y: -4, transition: { duration: 0.15 } }}
                className={`${rev.bg} brutal-border brutal-shadow-lg p-6 flex flex-col justify-between`}
              >
                <p className="text-sm font-semibold leading-relaxed text-[#121316]">
                  "{rev.quote}"
                </p>
                <div className="mt-5 pt-3 border-t-2 border-[#121316] font-mono-code text-xs font-extrabold text-[#121316]">
                  {rev.author}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section: "Want to work together?" */}
      <section id="contact" className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-[#FDFBF7]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="brutal-badge mb-3">GET IN TOUCH</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#121316] tracking-tight">
              Want to work together?
            </h2>
            <p className="text-sm sm:text-base text-[#555] mt-1 max-w-xl">
              Have an AI/ML opportunity or engineering project in mind? I'd love to hear about it. Let's make something you're proud to put your name on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 mt-10">
            {/* Contact Window Form */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={neoSpring}
              className="bg-white brutal-border brutal-shadow-lg overflow-hidden"
            >
              <div className="bg-[#3448C5] text-white px-4 py-2.5 brutal-border border-t-0 border-l-0 border-r-0 flex items-center justify-between font-mono-code text-xs font-bold">
                <span>CONTACT.EXE</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                  <span className="w-2.5 h-2.5 border border-[#121316] bg-white inline-block"></span>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-5">
                <div>
                  <label className="block font-mono-code text-xs font-extrabold uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full border-2 border-[#121316] p-3 text-sm font-semibold outline-none focus:bg-[#FFFEF7] focus:shadow-[4px_4px_0px_#121316] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-xs font-extrabold uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full border-2 border-[#121316] p-3 text-sm font-semibold outline-none focus:bg-[#FFFEF7] focus:shadow-[4px_4px_0px_#121316] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-xs font-extrabold uppercase tracking-wider mb-2">
                    Subject / Role
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Entry-Level AI Engineer / ML Opportunity"
                    className="w-full border-2 border-[#121316] p-3 text-sm font-semibold outline-none focus:bg-[#FFFEF7] focus:shadow-[4px_4px_0px_#121316] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-xs font-extrabold uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your role or project..."
                    className="w-full border-2 border-[#121316] p-3 text-sm font-semibold outline-none focus:bg-[#FFFEF7] focus:shadow-[4px_4px_0px_#121316] transition-all"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="brutal-btn disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send message \u2192"}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-[#D4EDDA] border-2 border-[#155724] font-mono-code text-xs font-bold text-[#155724]"
                  >
                    ✓ Thank you! Your message has been sent directly to Ahal (ahalabduljaleel8@gmail.com). I will get back to you shortly.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Right Side Info Cards */}
            <div className="space-y-6">
              {/* Yellow Email Box */}
              <motion.div 
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...neoSpring, delay: 0.1 }}
                className="bg-[#FFE033] brutal-border brutal-shadow-lg p-6 hover:-translate-y-1 transition-all"
              >
                <span className="brutal-badge bg-white">EMAIL</span>
                <div className="font-mono-code text-base sm:text-lg font-bold mt-2.5 break-all">
                  <a href="mailto:ahalabduljaleel8@gmail.com" className="hover:underline text-[#121316]">
                    ahalabduljaleel8@gmail.com
                  </a>
                </div>
                <div className="font-mono-code text-xs font-bold text-[#333] mt-2">
                  Phone: +91 8547735911
                </div>
              </motion.div>

              {/* Mint Status Box */}
              <motion.div 
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...neoSpring, delay: 0.2 }}
                className="bg-[#62E89D] brutal-border brutal-shadow-lg p-6 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009944] status-dot-pulse"></span>
                  <span className="font-mono-code text-[11px] font-extrabold uppercase">
                    Available for New Roles
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#121316] leading-relaxed">
                  Actively seeking entry-level AI Engineer, ML Developer, and Data Science opportunities. Open to on-site and remote positions.
                </p>
              </motion.div>

              {/* White Socials Box */}
              <motion.div 
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...neoSpring, delay: 0.3 }}
                className="bg-white brutal-border brutal-shadow-lg p-6 hover:-translate-y-1 transition-all"
              >
                <span className="brutal-badge bg-[#FF85A2]">SOCIAL PROFILES</span>
                <div className="flex flex-col gap-2.5 mt-3">
                  <a 
                    href="https://www.linkedin.com/in/ahal-abdul-jaleel" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 bg-white border-2 border-[#121316] px-3.5 py-2 font-mono-code text-xs font-bold text-[#121316] brutal-shadow-sm hover:bg-[#FFFDE6] transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    LinkedIn: /in/ahal-abdul-jaleel
                  </a>
                  <a 
                    href="https://github.com/ahal0309" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 bg-white border-2 border-[#121316] px-3.5 py-2 font-mono-code text-xs font-bold text-[#121316] brutal-shadow-sm hover:bg-[#FFFDE6] transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub: github.com/ahal0309
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 px-6 brutal-border border-t-0 border-l-0 border-r-0 bg-white">
        <div className="max-w-[820px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <div className="brutal-badge mb-2">COMMON INQUIRIES</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#666] mt-1">
              Quick answers about my skills, graduation timeline, and collaboration model.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "What role are you actively seeking?",
                a: "I am seeking an entry-level AI Engineer or Machine Learning role where I can apply my knowledge of machine learning algorithms, Python pipelines, generative AI integrations, and full-stack data products while continuously contributing to impactful projects."
              },
              {
                q: "What is your tech stack of choice?",
                a: "My core stack includes Python, Scikit-learn, Pandas, NumPy, Matplotlib, and Jupyter Notebook for machine learning and data analysis. For applications, I use React Native, MongoDB, Gemini API, as well as languages like C, C++, Java, Julia, and R."
              },
              {
                q: "What are your key academic details & graduation year?",
                a: "I am pursuing a Bachelor of Engineering in Artificial Intelligence & Machine Learning at Yenepoya Institute of Technology / VTU, Karnataka, graduating in 2027 with a current CGPA of 8.0."
              },
              {
                q: "Do you work with teams remotely or on-site?",
                a: "I am flexible and open to both remote opportunities and on-site roles. I have experience coordinating national-level events like MATRIX FUSION 4.0 and working in agile, collaborative team environments."
              }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...neoSpring, delay: idx * 0.08 }}
                  className="bg-white brutal-border brutal-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="p-4 sm:p-5 flex items-center justify-between font-heading font-bold text-base sm:text-lg select-none">
                    <span>{faq.q}</span>
                    <div 
                      className={`w-7 h-7 border-2 border-[#121316] flex items-center justify-center font-mono-code text-sm font-extrabold brutal-shadow-sm transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? "bg-[#FF85A2] rotate-45" : "bg-[#FFE033]"
                      }`}
                    >
                      +
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="px-4 sm:px-5 pb-5 pt-1 text-sm text-[#444] border-t border-dashed border-[#CCD] leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0E15] text-white py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#282A3A]">
          <div>
            <h3 className="font-heading font-extrabold text-2xl mb-2 text-white">Ahal Abdul Jaleel</h3>
            <p className="text-xs sm:text-sm text-[#9A9EA6] leading-relaxed max-w-sm">
              Enthusiastic AI & ML Engineer dedicated to turning data and advanced machine learning models into intuitive, impactful applications.
            </p>
          </div>

          <div>
            <h4 className="font-mono-code text-xs uppercase tracking-wider text-[#FFE033] mb-4 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono-code text-xs text-[#AEB2C2]">
              <li><a href="#about" className="hover:text-white hover:underline">About & CGPA</a></li>
              <li><a href="#skills" className="hover:text-white hover:underline">Skills & Expertise</a></li>
              <li><a href="#projects" className="hover:text-white hover:underline">Supermarket AI Project</a></li>
              <li><a href="#client-work" className="hover:text-white hover:underline">Client Work</a></li>
              <li><a href="#experience" className="hover:text-white hover:underline">Education & Milestones</a></li>
              <li><a href="#contact" className="hover:text-white hover:underline">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-code text-xs uppercase tracking-wider text-[#FFE033] mb-4 font-bold">
              Direct Contact
            </h4>
            <ul className="space-y-2 font-mono-code text-xs text-[#AEB2C2]">
              <li><a href="mailto:ahalabduljaleel8@gmail.com" className="hover:text-white hover:underline">ahalabduljaleel8@gmail.com</a></li>
              <li><a href="tel:+918547735911" className="hover:text-white hover:underline">+91 8547735911</a></li>
              <li><a href="https://www.linkedin.com/in/ahal-abdul-jaleel" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">LinkedIn Profile</a></li>
              <li><a href="https://github.com/ahal0309" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">GitHub Profile</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between font-mono-code text-xs text-[#6C7086] gap-3">
          <div>&copy; 2026 Ahal Abdul Jaleel. All rights reserved.</div>
          <div>Crafted with Neo-Brutalist Architecture &bull; Next.js & React</div>
        </div>
      </footer>
    </main>
  );
}
