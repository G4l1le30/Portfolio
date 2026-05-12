import React from 'react';
import { motion, type Variants } from 'framer-motion';

const About: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Personnel_Dossier</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-on-surface mb-8 tracking-tight leading-tight">
            Vigilance is a <span className="text-primary italic border-b-2 border-primary/20">Process</span>, <br />
            Not a State.
          </h1>
          
          <div className="space-y-6 text-lg md:text-xl text-on-surface-variant leading-relaxed font-sans">
            <p>
              <span className="text-primary font-mono mr-3 inline-block">/&gt;</span>
              I am a Tier II SOC Analyst with a background in network architecture and a fundamental obsession with defensive security. My journey in cybersecurity began not in a classroom, but in the trenches of high-traffic server environments.
            </p>
            <p>
              I specialize in incident response and threat hunting, leveraging a methodology built on disciplined observation and rigorous data validation. To me, security isn't just about keeping people out; it's about understanding the "why" and "how" of every packet that crosses the perimeter.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
          <div className="aspect-square rounded-2xl border border-outline-variant bg-surface-container-high relative overflow-hidden group">
                      <img src="~/Downloads/scam.png"></img>

            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
            <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-[120px] text-outline/10 group-hover:scale-110 transition-transform duration-700">
              person
            </span>
            {/* Visual scan effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 w-full animate-scan pointer-events-none z-20" />
          </div>
          
          <div className="p-6 border border-outline-variant/30 bg-surface-container-low rounded-xl font-mono text-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-outline uppercase tracking-widest">UID</span>
              <span className="text-primary font-bold">8842-AX-09</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-outline uppercase tracking-widest">Clearance</span>
              <span className="text-secondary font-bold">CONFIDENTIAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-outline uppercase tracking-widest">Location</span>
              <span className="text-on-surface">US_EAST_01</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Grid */}
      <motion.section 
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-xl font-bold text-primary tracking-[0.2em] uppercase">Technical_Stack</h2>
          <div className="flex-grow h-px bg-outline-variant/20"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {['SPLUNK', 'WIRESHARK', 'ELK STACK', 'KALI LINUX', 'CROWDSTRIKE', 'PYTHON'].map((tool, i) => (
            <motion.div 
              key={tool}
              whileHover={{ y: -5, borderColor: 'var(--color-primary)' }}
              className="p-8 bg-surface-container border border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 cursor-default group"
            >
              <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">
                {['monitoring', 'router', 'database', 'terminal', 'security', 'code'][i]}
              </span>
              <span className="font-mono text-[10px] font-bold tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors">
                {tool}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certifications List */}
      <motion.section 
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-xl font-bold text-primary tracking-[0.2em] uppercase">Certifications</h2>
          <div className="flex-grow h-px bg-outline-variant/20"></div>
        </div>

        <div className="space-y-4">
          {[
            { name: 'CompTIA Security+', desc: 'Network security, threats, and cryptography.', id: '98231-SEC-PLUS', year: '2022', icon: 'verified_user', color: 'text-secondary' },
            { name: 'CompTIA CySA+', desc: 'Behavioral analytics and threat identification.', id: '44102-CYSA-V2', year: '2023', icon: 'biotech', color: 'text-primary' },
            { name: 'BTL1 (Security Blue Team)', desc: 'Hands-on practical blue team operations.', id: 'BTL1-55421', year: '2024', icon: 'shield_with_heart', color: 'text-tertiary' }
          ].map((cert) => (
            <motion.div 
              key={cert.name}
              whileHover={{ x: 8 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-surface-container border border-outline-variant/30 rounded-2xl hover:border-primary/40 transition-all cursor-default group"
            >
              <div className="flex gap-6 items-center">
                <div className={`w-14 h-14 rounded-full border-2 border-outline-variant/30 flex items-center justify-center ${cert.color}`}>
                  <span className="material-symbols-outlined text-3xl">{cert.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">{cert.name}</h3>
                  <p className="text-on-surface-variant font-sans">{cert.desc}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-left md:text-right font-mono flex flex-row md:flex-col justify-between md:justify-center gap-4">
                <span className="block text-[10px] text-outline tracking-wider uppercase">{cert.id}</span>
                <span className={`text-xs font-bold ${cert.color}`}>{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;
