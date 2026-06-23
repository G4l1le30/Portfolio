import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components';

const HomeLabBanner: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0b1326] overflow-hidden flex flex-col items-center justify-center select-none font-mono">
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(137, 206, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Decorative Cyber Crosshairs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#89ceff]/5" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#89ceff]/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center p-6">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 bg-[#1f2a3c] px-4 py-1.5 rounded border border-[#4ae176]/20 shadow-[0_0_20px_rgba(74,225,118,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4ae176] animate-pulse" />
          <span className="text-xs font-bold text-[#4ae176] tracking-widest uppercase">system_online</span>
        </div>

        {/* Glitch Headline with Mouse Parallax */}
        <div 
          className="relative transition-transform duration-200 ease-out"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <h1 
            className="text-6xl md:text-8xl font-black text-[#dae2fd] tracking-tighter leading-none italic uppercase relative"
            style={{
              textShadow: '0.05em 0 0 rgba(255,0,193,0.75), -0.025em -0.05em 0 rgba(0,255,249,0.75)'
            }}
          >
            HOME LAB
          </h1>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#89ceff]/20" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#89ceff]/20" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#89ceff]/20" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#89ceff]/20" />
    </div>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 mb-12">
      <h2 className="text-xl font-bold text-primary tracking-[0.2em] uppercase whitespace-nowrap flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" />
        {title}
      </h2>
      <div className="flex-grow h-px bg-outline-variant/20"></div>
    </div>
  );
};

const EpisodeCard: React.FC<{
  phase: string;
  title: string;
  date: string;
  description: string;
  status: 'ACTIVE' | 'STANDBY' | 'DEPLOYED';
  index: number;
}> = ({ phase, title, date, description, status, index }) => {
  const statusColors = {
    DEPLOYED: 'text-success border-success/20 bg-success/5',
    ACTIVE: 'text-primary border-primary/20 bg-primary/5',
    STANDBY: 'text-warning border-warning/20 bg-warning/5'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      className="relative pl-12 pb-16 last:pb-0 group"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-outline-variant/20 group-last:h-8" />
      
      {/* Timeline Node */}
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-outline-variant group-hover:bg-primary transition-colors" />
      
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-primary tracking-widest uppercase">{phase}</span>
            <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors tracking-tight">
              {title}
            </h3>
          </div>
          <span className={`px-2 py-0.5 border rounded font-mono text-[9px] ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        
        <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">
          {description}
        </p>
        
        <div className="flex items-center gap-4 mt-2">
          <span className="text-[10px] text-outline font-mono uppercase tracking-widest">{date}</span>
          <div className="h-px w-8 bg-outline-variant/30" />
          <button className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline opacity-40 group-hover:opacity-100 transition-opacity">
            Read_Documentation →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const HomeLabSeries: React.FC = () => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const episodes = [
    {
      phase: "Segment 01",
      title: "Core Infrastructure & Virtualization",
      date: "PROXMOX_VE",
      description: "Provisioning a Proxmox VE 9.1 hypervisor on constrained hardware (Lenovo IdeaPad). Implementing strict memory ballooning strategies to distribute 16GB RAM efficiently across production VMs and LXC containers.",
      status: "DEPLOYED" as const
    },
    {
      phase: "Segment 02",
      title: "Zero-Trust Mesh Network",
      date: "TAILSCALE",
      description: "Implementing a decentralized mesh topology using Tailscale on every virtual node. Enforcing secure HTTPS contexts via MagicDNS and local SSH forwarding, replacing traditional centralized subnet routers.",
      status: "ACTIVE" as const
    },
    {
      phase: "Segment 03",
      title: "Security & Logging (Wazuh SIEM)",
      date: "SEC_OPS",
      description: "Deploying a Wazuh cluster (Manager, Indexer, Dashboard) on a dedicated VM. Monitoring internal traffic and agent logs to establish centralized visibility, often running in standby to manage host resource limits.",
      status: "STANDBY" as const
    },
    {
      phase: "Segment 04",
      title: "AI Lab & Production Services",
      date: "APP_LAYER",
      description: "Hosting the Docker-Prod environment (Nginx Proxy Manager, Password Manager, Calibre-Web) alongside an isolated Debian LXC instance running the Ollama LLM runtime for localized AI processing.",
      status: "ACTIVE" as const
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24"
    >
      {/* Header */}
      <section className="relative">
        <Link to="/projects" className="inline-flex items-center gap-2 text-outline-variant hover:text-primary transition-colors font-mono text-[10px] uppercase tracking-widest mb-12 group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back_to_Projects
        </Link>
        
        <motion.div variants={itemVariants} className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
            <span className="font-mono text-[11px] text-primary opacity-70 tracking-[0.2em] uppercase">Operational_Series // 001</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-on-surface mb-8 tracking-tight leading-tight">
            Home Lab Deployment <br />
            <span className="text-primary italic">Proxmox Virtual Kingdom</span>
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
            A comprehensive project focused on architecting a self-hosted operations and security lab on constrained hardware. 
            From hypervisor resource management to zero-trust mesh networking, this documents the live defensive infrastructure.
          </p>
        </motion.div>
      </section>

      {/* Hero Image Preview */}
      <motion.section 
        variants={itemVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-video w-full overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container cursor-crosshair"
      >
        <HomeLabBanner mousePos={mousePos} />
      </motion.section>

      {/* Lab Specifications Grid */}
      <motion.section variants={itemVariants}>
        <SectionHeader title="System_Specs" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Hypervisor', value: 'Proxmox VE (rvr-pve)', icon: 'layers' },
            { label: 'Hardware', value: 'Ryzen 5 / 16GB RAM', icon: 'memory' },
            { label: 'Network & Security', value: 'Tailscale Mesh / Wazuh', icon: 'security' }
          ].map((spec) => (
            <div key={spec.label} className="p-6 bg-surface-container/30 border border-outline-variant/20 rounded-2xl group hover:border-primary/40 transition-all">
              <span className="material-symbols-outlined text-primary mb-4">{spec.icon}</span>
              <div className="font-mono text-[10px] text-outline tracking-widest uppercase mb-1">{spec.label}</div>
              <div className="text-lg font-bold text-on-surface">{spec.value}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Series Timeline */}
      <section>
        <SectionHeader title="Infrastructure_Architecture" />
        <div className="max-w-4xl mx-auto">
          {episodes.map((episode, i) => (
            <EpisodeCard key={episode.phase} {...episode} index={i} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        variants={itemVariants}
        className="p-12 bg-primary/5 border border-primary/20 rounded-3xl text-center"
      >
        <h3 className="text-2xl font-bold text-on-surface mb-4 tracking-tight">Join the Mission</h3>
        <p className="text-on-surface-variant mb-8 max-w-xl mx-auto">
          Interested in the detailed technical configurations or want to collaborate on a similar setup?
        </p>
        <Button variant="primary" size="lg" className="rounded-xl px-12">
          <a href="mailto:joshuahutasoit809@gmail.com">CONTACT_STATION</a>
        </Button>
      </motion.section>
    </motion.div>
  );
};

export default HomeLabSeries;
