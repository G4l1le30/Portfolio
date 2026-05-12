import React from 'react';
import { Button, StatusChip } from '../components';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  statusVariant: 'success' | 'error' | 'info' | 'warning';
  category: string;
}

const PROJECTS: Project[] = [
  {
    id: 'LAB-01',
    title: 'Home Lab Deployment',
    category: 'Infrastructure',
    description: 'Architecting a high-availability defensive environment utilizing Proxmox, segmented VLANs, and an ELK stack for centralized log management.',
    tags: ['PFSense', 'Proxmox', 'Suricata'],
    status: 'ACTIVE',
    statusVariant: 'success',
  },
  {
    id: 'SIM-04',
    title: 'Incident Response Simulation',
    category: 'Operations',
    description: 'Full-spectrum simulation of a multi-stage ransomware attack. Documenting the detection, containment, and eradication phases with forensic artifacts.',
    tags: ['Snort', 'Wireshark', 'Volatility'],
    status: 'CRITICAL',
    statusVariant: 'error',
  },
  {
    id: 'CTF-09',
    title: 'CTF Write-ups Repository',
    category: 'Training',
    description: 'Consolidated methodology and exploit chains for various TryHackMe and HackTheBox machines, focusing on privilege escalation and lateral movement.',
    tags: ['Metasploit', 'BurpSuite', 'Nmap'],
    status: 'FLAGS: 100%',
    statusVariant: 'info',
  },
  {
    id: 'NET-02',
    title: 'Zero-Trust Architecture',
    category: 'Architecture',
    description: 'Implementing identity-aware proxying and micro-segmentation in a hybrid cloud environment to enforce least-privileged access.',
    tags: ['BeyondCorp', 'Identity-Aware-Proxy', 'GCP'],
    status: 'STABLE',
    statusVariant: 'success',
  },
  {
    id: 'FOR-03',
    title: 'Memory Forensics Toolkit',
    category: 'Forensics',
    description: 'Custom Python scripts for automated memory dump analysis and extraction of volatility-based artifacts during live-box investigations.',
    tags: ['Python', 'Forensics', 'Volatility-3'],
    status: 'DEV_MODE',
    statusVariant: 'warning',
  },
  {
    id: 'CLD-05',
    title: 'Cloud Security Guardrails',
    category: 'Cloud',
    description: 'Automated compliance checking and remediation for AWS infrastructure using AWS Config, CloudWatch, and custom Lambda functions.',
    tags: ['AWS', 'Lambda', 'Terraform'],
    status: 'COMPLIANT',
    statusVariant: 'success',
  },
];

const Projects: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24"
    >
      {/* Page Header */}
      <section className="max-w-3xl">
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          <span className="font-mono text-[11px] text-primary opacity-70 tracking-[0.2em] uppercase">Security Research Repository</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight">
          Project Overview
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg text-on-surface-variant leading-relaxed">
          A curated collection of infrastructure security projects, incident response playbooks, and threat intelligence research. 
          Each project is documented as a verified operational environment.
        </motion.p>
      </section>

      {/* Projects Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
      >
        {PROJECTS.map((project, i) => (
          <motion.div 
            key={project.id}
            variants={itemVariants}
            className="group flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/20 mb-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-8xl opacity-10 group-hover:opacity-25 transition-all duration-700">
                    {['database', 'security', 'terminal', 'hub', 'biotech', 'cloud'][i % 6]}
                  </span>
                </div>
                <div className="w-full h-full bg-surface-bright/10 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-700" />
              </motion.div>
              
              <div className="absolute top-4 right-4 px-2 py-1 bg-background/80 backdrop-blur-md border border-outline-variant/30 rounded font-mono text-[9px] text-primary tracking-tighter">
                {project.id}
              </div>
              
              <div className="absolute top-4 left-4">
                <StatusChip label={project.status} variant={project.statusVariant} />
              </div>
            </div>

            <div className="flex flex-col flex-grow px-2">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                  {project.category}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">
                {project.title}
              </h3>
              
              <p className="text-sm text-on-surface-variant mb-8 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-surface-variant/50 font-mono text-[9px] text-outline border border-outline-variant/20 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <Button 
                variant="ghost" 
                className="w-full justify-between group/btn border border-outline-variant/20 hover:border-primary/40 rounded-xl" 
                icon="arrow_forward"
              >
                EXPLORE_REPORT
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
