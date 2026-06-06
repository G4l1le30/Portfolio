import React, { useEffect, useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

// --- Animated glitch text ---
const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 150);
    }, 15000 + Math.random() * 5000); // Extremely infrequent
    return () => clearInterval(interval);
  }, []);
  return (
    <span className={`${className} ${glitching ? 'text-primary' : ''} relative inline-block transition-colors duration-200`}>
      {text}
      {glitching && (
        <span className="absolute inset-0 animate-pulse bg-primary/5 -z-10" />
      )}
    </span>
  );
};

// --- Section header with memoized tag ---
const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  const tag = useMemo(() => String(Math.floor(Math.random() * 900) + 100).padStart(4, '0'), []);
  return (
    <div className="flex items-center gap-4 mb-12">
      <h2 className="text-xl font-bold text-primary tracking-[0.2em] uppercase whitespace-nowrap flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" />
        {title}
      </h2>
      <div className="flex-grow h-px bg-outline-variant/20"></div>
      <span className="font-mono text-[10px] text-outline opacity-40">[{tag}]</span>
    </div>
  );
};

// --- Skill bar component ---
const levelMap: Record<string, number> = {
  Expert: 95, Advanced: 80, Operational: 70, Intermediate: 60,
};

const SkillBar: React.FC<{ name: string; icon: string; level: string }> = ({ name, icon, level }) => {
  const pct = levelMap[level] ?? 50;
  return (
    <div className="p-4 bg-surface-container/30 border border-outline-variant/20 rounded-xl flex flex-col gap-3 group hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-xl text-primary/70 group-hover:text-primary transition-colors">{icon}</span>
          <span className="font-mono text-xs font-bold text-on-surface-variant group-hover:text-on-surface uppercase tracking-wider">{name}</span>
        </div>
        <span className="font-mono text-[9px] text-outline uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">{level}</span>
      </div>
      <div className="h-1 bg-outline-variant/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-primary/60 group-hover:bg-primary transition-colors"
        />
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    },
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24"
    >
      {/* Biography Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        <motion.div variants={itemVariants} className="md:col-span-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary/60"></span>
            <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Personnel_Dossier</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-on-surface mb-8 tracking-tight leading-tight">
            Vigilance is a <br />
            <span className="text-primary italic relative inline-block">
              <GlitchText text="Process" />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/20 -z-10" />
            </span>, Not a State.
          </h1>
          
          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed font-sans max-w-2xl">
            <p className="relative group">
              <span className="absolute -left-8 top-1 text-primary/20 font-mono transition-opacity group-hover:opacity-100 opacity-50">/&gt;</span>
              I specialize in security operations and threat detection, with a focus on analyzing vulnerabilities and monitoring network integrity to develop proactive defense strategies. My work combines hands-on SIEM operations with a disciplined approach to incident triage and system hardening.
            </p>
            <p className="relative group">
              <span className="absolute -left-8 top-1 text-primary/20 font-mono transition-opacity group-hover:opacity-100 opacity-50">//</span>
              I leverage tools like Wazuh, Wireshark, and Metasploit to hunt for threats and investigate anomalies. To me, cybersecurity is about more than just defense—it's about understanding the mechanics of every packet and process to build truly resilient infrastructure.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
          <div className="aspect-square rounded-2xl border border-outline-variant bg-surface-container-high relative overflow-hidden group shadow-xl">
            <img 
              src="/Foto1.webp"
              alt="Joshua Washington Hutasoit"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 w-full animate-scan pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="p-6 border border-outline-variant/30 bg-surface-container-low rounded-xl font-mono text-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-outline uppercase tracking-widest">UID</span>
              <span className="text-primary font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-outline uppercase tracking-widest">Location</span>
              <span className="text-on-surface">Jakarta, Indonesia</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Education */}
      <motion.section variants={itemVariants} whileInView="visible" viewport={{ once: true }}>
        <SectionHeader title="Education" />
        <div className="space-y-4">
          {[
            {
              degree: 'Bachelor of Computer Science (Informatics Engineering)',
              school: 'Universitas Brawijaya, Malang, Indonesia',
              period: 'August 2023 — Present',
              gpa: '3.50',
              icon: 'school',
            },
            {
              degree: 'High School Diploma, Science Track',
              school: 'SMAK 7 Penabur, Jakarta, Indonesia',
              period: '2020 — 2023',
              icon: 'book',
            },
          ].map((edu) => (
            <motion.div
              key={edu.degree}
              whileHover={{ x: 8 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-surface-container/30 border border-outline-variant/20 rounded-2xl hover:border-primary/40 transition-all cursor-default group"
            >
              <div className="flex gap-6 items-center">
                <div className="w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary/70 shrink-0 bg-surface-container-high/50 group-hover:border-primary/40 transition-colors">
                  <span className="material-symbols-outlined text-2xl">{edu.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-on-surface-variant font-sans">{edu.school}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-left md:text-right font-mono shrink-0">
                <span className="block text-[10px] text-outline tracking-wider uppercase mb-1">{edu.period}</span>
                {edu.gpa && <span className="text-[10px] font-bold text-secondary px-2 py-0.5 bg-secondary/10 border border-secondary/20 rounded">GPA {edu.gpa}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technical Stack */}
      <motion.section variants={itemVariants} whileInView="visible" viewport={{ once: true }}>
        <SectionHeader title="Technical_Stack" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              category: 'Security Operations',
              tools: [
                { name: 'Wazuh SIEM', icon: 'security', level: 'Operational' },
                { name: 'Wireshark', icon: 'settings_input_antenna', level: 'Advanced' },
                { name: 'Burp Suite', icon: 'bug_report', level: 'Intermediate' },
                { name: 'Metasploit', icon: 'terminal', level: 'Advanced' },
                { name: 'Nmap', icon: 'explore', level: 'Expert' },
                { name: 'OpenVAS', icon: 'radar', level: 'Intermediate' },
              ],
            },
            {
              category: 'Forensics & Systems',
              tools: [
                { name: 'Autopsy', icon: 'biotech', level: 'Intermediate' },
                { name: 'Linux Hardening', icon: 'terminal', level: 'Expert' },
                { name: 'Windows Security', icon: 'desktop_windows', level: 'Advanced' },
                { name: 'VMware', icon: 'layers', level: 'Advanced' },
              ],
            },
            {
              category: 'Analysis & Automation',
              tools: [
                { name: 'Python', icon: 'code', level: 'Advanced' },
                { name: 'KQL (Log Analysis)', icon: 'search', level: 'Intermediate' },
                { name: 'AWS Cloud', icon: 'cloud', level: 'Advanced' },
                { name: 'Security Reporting', icon: 'description', level: 'Advanced' },
              ],
            },
          ].map((cat) => (
            <div key={cat.category} className="space-y-6">
              <h3 className="font-mono text-[10px] font-bold text-outline uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-1 h-1 bg-outline/50 rounded-full" />
                {cat.category}
              </h3>
              <div className="flex flex-col gap-3">
                {cat.tools.map(tool => (
                  <SkillBar key={tool.name} {...tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Certifications List */}
      <motion.section variants={itemVariants} whileInView="visible" viewport={{ once: true }}>
        <SectionHeader title="Certifications" />
        <div className="space-y-4">
          {[
            {
              name: 'Google Cybersecurity Professional Certificate',
              desc: 'Threat detection, incident response, SIEM tools, Linux, SQL, and Python automation.',
              id: '5Y2AN50H46FY',
              year: 'June 2026',
              icon: 'shield',
              color: 'text-secondary',
              url: 'https://coursera.org/share/265b7335ca33a4a11a6d0a6ca338507c'
            },
            { 
              name: 'AWS Certified Cloud Practitioner', 
              desc: 'Foundational understanding of AWS Cloud platform and security services.', 
              id: 'a22738962d8c40c7a2bdcbf33e8a99c9', 
              year: 'Feb 2026', 
              icon: 'cloud', 
              color: 'text-primary',
              url: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/a22738962d8c40c7a2bdcbf33e8a99c9'
            },
            { 
              name: 'AWS re/Start Graduate', 
              desc: 'Applied security in cloud infrastructures, IAM policies, and system hardening.', 
              id: '952cb46f-d4ec-4235-9a42-5c729c54f5c3', 
              year: 'Dec 2025', 
              icon: 'cloud_done', 
              color: 'text-primary',
              url: 'https://www.credly.com/badges/952cb46f-d4ec-4235-9a42-5c729c54f5c3/public_url'
            },
            { 
              name: 'Introduction to SOC — JadiHacker.id', 
              desc: 'Security Operations Center workflows, alert monitoring, and incident triage.', 
              id: 'SOC-2025', 
              year: 'March 2025', 
              icon: 'radar', 
              color: 'text-secondary' 
            },
            { 
              name: 'Fundamental Network Computing', 
              desc: 'Core networking protocols, infrastructure fundamentals, and OSI model.', 
              id: 'NET-2024', 
              year: '2024', 
              icon: 'settings_ethernet', 
              color: 'text-outline' 
            },
          ].map((cert) => (
            <motion.div 
              key={cert.name}
              whileHover={{ x: 8 }}
              className="flex flex-col md:flex-row md:items-start justify-between p-8 bg-surface-container/30 border border-outline-variant/20 rounded-2xl hover:border-primary/40 transition-all cursor-default group"
            >
              <div className="flex gap-6 items-start">
                <div className={`w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center bg-surface-container-high/50 shrink-0 group-hover:border-primary/40 transition-colors ${cert.color}`}>
                  <span className="material-symbols-outlined text-2xl">{cert.icon}</span>
                </div>
                <div>
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors hover:underline flex items-center gap-2"
                    >
                      {cert.name}
                      <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100">open_in_new</span>
                    </a>
                  ) : (
                    <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {cert.name}
                    </h3>
                  )}
                  <p className="text-sm text-on-surface-variant font-sans mt-1">{cert.desc}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-left md:text-right font-mono shrink-0">
                <span className="block text-[10px] text-outline tracking-wider uppercase mb-1">{cert.id}</span>
                <span className={`text-xs font-bold ${cert.color}`}>{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience & Training Section */}
      <motion.section variants={itemVariants} whileInView="visible" viewport={{ once: true }}>
        <SectionHeader title="Experience_&_Training" />
        <div className="space-y-4">
          {[
            {
              role: 'Member, Poros FILKOM UB (Cybersecurity Community)',
              desc: 'Active researcher and competitor in national CTF competitions, focusing on vulnerability assessment and network defense.',
              location: 'Universitas Brawijaya',
              period: 'Feb 2025 — Present',
              icon: 'diversity_3'
            },
            {
              role: 'AWS re/Start Bootcamp Graduate',
              desc: 'Secured cloud infrastructures by implementing strict IAM policies and system hardening following the AWS Shared Responsibility Model.',
              location: 'Orbit Future Academy',
              period: 'Oct 2025 — Dec 2025',
              icon: 'cloud_sync'
            },
            {
              role: 'INKOR SMT Program Indonesia',
              desc: 'Completed Security Manpower Training focusing on vulnerability assessment methodologies and foundational penetration testing.',
              location: 'Security Manpower Training (SMT)',
              period: 'July 2025 — Aug 2025',
              icon: 'verified_user'
            },
            {
              role: 'Practical Basic Penetration Testing',
              desc: 'Focused on recon, network discovery (Nmap/OpenVAS), and post-exploitation fundamentals in virtualized labs.',
              location: 'PT Linuxhackingid Cyber Security',
              period: 'May 2025 — June 2025',
              icon: 'biotech'
            },
            {
              role: 'SOC Analyst Bootcamp',
              desc: 'Performed alert triage, incident investigation, and log collection using Wazuh within a simulated SOC environment.',
              location: 'JadiHacker.id',
              period: 'March 2025',
              icon: 'radar'
            },
          ].map((exp) => (
            <motion.div
              key={exp.role}
              whileHover={{ x: 8 }}
              className="p-8 bg-surface-container/30 border border-outline-variant/20 rounded-2xl hover:border-primary/40 transition-all cursor-default group"
            >
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center text-secondary shrink-0 bg-surface-container-high/50 group-hover:border-primary/40 transition-colors">
                  <span className="material-symbols-outlined text-2xl">{exp.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-on-surface-variant font-sans mt-2 leading-relaxed max-w-xl">
                    {exp.desc}
                  </p>
                  <span className="inline-block mt-4 text-[10px] font-mono text-outline tracking-wider uppercase opacity-60">
                    {exp.location} — {exp.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;
