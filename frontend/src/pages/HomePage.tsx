import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import { SiReact, SiTypescript, SiNextdotjs, SiNodedotjs, SiGraphql, SiPostgresql, SiTailwindcss, SiGit, SiDocker } from 'react-icons/si';
import { motion } from 'framer-motion';
import { translations } from '../utils/translations';
import Contact from '../components/Contact';

const technologies = [
  { name: 'React', icon: <SiReact className="text-blue-400 mx-auto mb-2" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-500 mx-auto mb-2" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white mx-auto mb-2" /> },
  { name: 'Node.js', icon: <SiNodedotjs className="text-green-500 mx-auto mb-2" /> },
  { name: 'GraphQL', icon: <SiGraphql className="text-pink-500 mx-auto mb-2" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-600 mx-auto mb-2" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400 mx-auto mb-2" /> },
  { name: 'Git', icon: <SiGit className="text-orange-500 mx-auto mb-2" /> },
  { name: 'Docker', icon: <SiDocker className="text-blue-400 mx-auto mb-2" /> },
];

interface HomePageProps {
  language: 'es' | 'en';
  setLanguage: (language: 'es' | 'en') => void;
}

const HomePage: React.FC<HomePageProps> = ({ language }) => {
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const cvMenuRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cvMenuRef.current && !cvMenuRef.current.contains(event.target as Node)) {
        setCvMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-zinc-100">
      <main className="pt-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
            <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 sm:px-8 py-24">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-6 drop-shadow-lg">
                {t.hero.title} <span className="text-blue-400">{t.hero.name}</span>
              </h1>
              <div className="text-xl sm:text-2xl md:text-3xl text-zinc-300 text-center mb-8 font-medium flex flex-col items-center">
                <span className="inline-block">
                  <span className="text-blue-400 font-bold">{t.hero.subtitle}</span>
                  <span className="ml-2 border-r-2 border-blue-400 animate-pulse" style={{ animation: 'blink 1s steps(1) infinite' }} aria-hidden="true"></span>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="#projects"
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:bg-blue-700 transition transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  aria-label={t.hero.viewWork}
                >
                  {t.hero.viewWork}
                </a>
                {/* Botón de CV con menú controlado por estado */}
                <div className="relative" ref={cvMenuRef}>
                  <button
                    type="button"
                    className="px-8 py-3 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-950 hover:text-white hover:scale-105 transition transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center gap-2"
                    aria-haspopup="true"
                    aria-expanded={cvMenuOpen}
                    onClick={() => setCvMenuOpen((open) => !open)}
                    onBlur={() => setTimeout(() => setCvMenuOpen(false), 150)}
                  >
                    {t.hero.downloadCV}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {cvMenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-20">
                      <a
                        href="/resumeSpanish.pdf"
                        download
                        className="block px-6 py-3 text-blue-400 hover:bg-blue-950 hover:text-white rounded-t-lg transition-colors text-center"
                        aria-label="Descargar CV en Español"
                        onClick={() => setCvMenuOpen(false)}
                      >
                        {t.hero.spanish}
                      </a>
                      <a
                        href="/resumeEnglish.pdf"
                        download
                        className="block px-6 py-3 text-blue-400 hover:bg-blue-950 hover:text-white rounded-b-lg transition-colors text-center"
                        aria-label="Download CV in English"
                        onClick={() => setCvMenuOpen(false)}
                      >
                        {t.hero.english}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {/* Social proof */}
              <div className="flex gap-4 justify-center mb-8">
                <a href="https://github.com/dimichiko" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-300 hover:text-blue-400 transition-colors text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/dimitrisvamvoukasgarcia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-300 hover:text-blue-400 transition-colors text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                </a>
                <a href="mailto:ianvamvoukas1230@gmail.com" aria-label="Email" className="text-zinc-300 hover:text-blue-400 transition-colors text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 13.065l-8-6.065v12h16v-12l-8 6.065zm8-8.065h-16l8 6.065 8-6.065z"/></svg>
          </a>
        </div>
              {/* Indicador scroll */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="text-blue-400 animate-bounce text-3xl" aria-hidden="true">↓</span>
                <span className="sr-only">Scroll para ver más</span>
      </div>
          </div>
        </section>

          {/* Technologies: 100vw, sin max-w, fondo full, grid responsive y centrado */}
          <section id="technologies" className="py-28 mb-16 shadow-2xl w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0 bg-black">
            <div className="w-full px-4 sm:px-8 lg:px-16">
              <motion.p
                className="text-blue-300 text-sm uppercase tracking-widest text-center mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              >{t.technologies.subtitle}</motion.p>
              <motion.h2
                className="text-4xl font-bold text-white mb-2 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >{t.technologies.title}</motion.h2>
            <motion.div
                className="w-24 h-1 bg-blue-500 mx-auto mb-12 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ originX: 0 }}
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {technologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                    className="bg-zinc-800 p-10 rounded-2xl text-center shadow-lg transform transition-transform hover:scale-110 hover:bg-blue-950/80 group flex flex-col items-center justify-center min-h-[220px]"
                    initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                >
                    <div className="flex justify-center mb-4">
                      {React.cloneElement(tech.icon, { className: 'text-6xl mx-auto mb-2 group-hover:text-blue-400 transition-colors' })}
                  </div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2 group-hover:text-white transition-colors">{tech.name}</h3>
                    <p className="text-zinc-400 text-base">{t.technologies.descriptions[tech.name as keyof typeof t.technologies.descriptions]}</p>
                </motion.div>
              ))}
            </div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="py-20 bg-black">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">{t.experience.title}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
            <div className="space-y-8">
              {t.experience.items.map((exp, idx) => (
                <div key={idx} className="bg-zinc-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{exp.role}</h3>
                  <p className="text-zinc-400 mb-1">{exp.period} - {exp.company}</p>
                  <p className="text-zinc-300 text-sm">{exp.description}</p>
            </div>
                ))}
              </div>
          </section>

          {/* Projects */}
          <section id="projects" className="py-20 bg-black">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">{t.projects.title}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
            <div className="grid md:grid-cols-2 gap-8">
              {t.projects.items.map((project, idx) => (
                <div key={idx} className="bg-zinc-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{project.name}</h3>
                  <p className="text-zinc-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs">{tech}</span>
                            ))}
                          </div>
                  <div className="flex space-x-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition-colors flex items-center"><FaGithub className="mr-1" />{t.projects.code}</a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition-colors flex items-center"><FaArrowRight className="mr-1" />{t.projects.liveDemo}</a>
                        </div>
                      </div>
                ))}
              </div>
          </section>
                </div>
      </main>

      {/* Contact Component */}
      <Contact language={language} translations={translations} />

      <footer className="py-8 border-t border-zinc-800 mt-12 text-center bg-black">
        <p className="text-zinc-400 text-sm">{t.footer.copyright}</p>
      </footer>
    </div>
  );
};

export default HomePage;
