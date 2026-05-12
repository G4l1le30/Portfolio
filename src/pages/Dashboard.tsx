import React from 'react';
import { Button } from '../components';
import { motion, type Variants } from 'framer-motion';

const Dashboard: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-32"
    >
      {/* High-Impact Hero */}
      <motion.section variants={itemVariants} className="py-12 md:py-24 text-center md:text-left max-w-5xl">
        <motion.div 
          variants={itemVariants}
          className="inline-block px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-8"
        >
          Cybersecurity Solutions Architect
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-7xl font-sans font-bold text-on-surface mb-10 leading-[1.1] tracking-tight"
        >
          Building resilient <br />
          <span className="text-primary italic border-b-4 border-primary/20">security architectures</span> <br />
          for the cloud-native era.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-14 leading-relaxed"
        >
          Specializing in cloud security, automated threat detection, and infrastructure hardening. 
          I turn complex security requirements into scalable, automated workflows that defend at speed.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
          <Button variant="primary" size="lg" className="px-10 rounded-lg shadow-lg shadow-primary/20">
            VIEW PROJECTS
          </Button>
          <Button variant="secondary" size="lg" className="px-10 rounded-lg border-outline-variant/30 text-on-surface hover:bg-surface-bright/20">
            GET IN TOUCH
          </Button>
        </motion.div>
      </motion.section>

      {/* Featured Projects Summary */}
      <motion.section 
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-32"
      >
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight uppercase">Selected Operations</h2>
          <motion.a 
            whileHover={{ x: 5 }}
            href="/projects" 
            className="text-primary text-sm font-bold tracking-[0.2em] uppercase hover:underline underline-offset-8"
          >
            View Repository →
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <FeaturedCard 
            title="Sentinel-AI"
            category="Threat Detection"
            year="2024"
            description="Neural network-based engine for real-time zero-day vulnerability identification and automated response."
            color="primary"
            index={0}
          />
          <FeaturedCard 
            title="Iron-Vault"
            category="Infrastructure"
            year="2023"
            description="Infrastructure-as-code for deploying hardened multi-cloud Kubernetes clusters with zero-trust defaults."
            color="secondary"
            index={1}
          />
        </div>
      </motion.section>
    </motion.div>
  );
};

const FeaturedCard: React.FC<{
  title: string;
  category: string;
  year: string;
  description: string;
  color: 'primary' | 'secondary';
  index: number;
}> = ({ title, category, year, description, color, index }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.8 } }
    }}
    className="group cursor-pointer"
  >
    <div className="aspect-video mb-8 overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/10 relative">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`material-symbols-outlined text-8xl opacity-10 group-hover:opacity-30 transition-all duration-700 group-hover:scale-110 text-${color}`}>
            {color === 'primary' ? 'monitoring' : 'hub'}
          </span>
        </div>
        <div className="w-full h-full bg-surface-bright/10 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-700" />
      </motion.div>
    </div>
    
    <div className="flex justify-between items-center mb-4">
      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase text-${color}`}>
        {category}
      </span>
      <span className="text-[10px] text-on-surface-variant font-mono opacity-60">
        {year}
      </span>
    </div>
    
    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">
      {title}
    </h3>
    
    <p className="text-on-surface-variant text-sm leading-relaxed max-w-md">
      {description}
    </p>
  </motion.div>
);

export default Dashboard;
