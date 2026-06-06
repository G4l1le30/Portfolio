import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components';

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
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED';
  index: number;
}> = ({ phase, title, date, description, status, index }) => {
  const statusColors = {
    COMPLETED: 'text-success border-success/20 bg-success/5',
    IN_PROGRESS: 'text-warning border-warning/20 bg-warning/5',
    PLANNED: 'text-outline border-outline-variant/20 bg-surface-variant/5'
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
      phase: "Phase 01",
      title: "Hypervisor & Network Foundations",
      date: "JAN_2024",
      description: "Provisioning a Proxmox VE cluster on bare metal. Configuring pfSense as the primary gateway with segmented VLANs for Management, IoT, and Security Lab environments.",
      status: "COMPLETED" as const
    },
    {
      phase: "Phase 02",
      title: "SIEM Operations & Log Management",
      date: "FEB_2024",
      description: "Deploying the Wazuh manager and ELK stack. Configuring log shippers across Linux and Windows nodes to establish central visibility and detection rules.",
      status: "COMPLETED" as const
    },
    {
      phase: "Phase 03",
      title: "Active Directory & Identity Lab",
      date: "MAR_2024",
      description: "Setting up a vulnerable Windows Server domain to simulate corporate network attacks. Implementing GPOs for hardening and monitoring AD logs.",
      status: "IN_PROGRESS" as const
    },
    {
      phase: "Phase 04",
      title: "Automated Threat Hunting",
      date: "APR_2024",
      description: "Developing custom Python scripts and Sigma rules for automated threat hunting against generated telemetry in the ELK environment.",
      status: "PLANNED" as const
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
            <span className="text-primary italic">Continuous Operations</span>
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
            A comprehensive, multi-phase project focused on architecting a production-grade security lab. 
            From bare-metal hypervisors to advanced SIEM operations, this series documents the evolution 
            of a private defensive infrastructure.
          </p>
        </motion.div>
      </section>

      {/* Lab Specifications Grid */}
      <motion.section variants={itemVariants}>
        <SectionHeader title="System_Specs" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Hypervisor', value: 'Proxmox VE (Cluster)', icon: 'layers' },
            { label: 'Gateway', value: 'pfSense (Segmented)', icon: 'router' },
            { label: 'Monitoring', value: 'Wazuh / ELK Stack', icon: 'monitoring' }
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
        <SectionHeader title="Series_Timeline" />
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
