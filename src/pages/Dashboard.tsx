import React from 'react';
import { Button } from '../components';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reduced from 0.2
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 }, // Smaller offset
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reduced from 0.6
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
          SOC Analyst & Security Researcher
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-7xl font-sans font-bold text-on-surface mb-10 leading-[1.1] tracking-tight"
        >
          Analyzing threats and <br />
          <span className="text-primary italic border-b-4 border-primary/20">securing architectures</span> <br />
          for the modern defense.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-14 leading-relaxed"
        >
          Specializing in network defense, automated threat detection, and incident response. 
          I leverage SIEM operations and vulnerability research to build resilient systems that defend against emerging threats.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
          <Button variant="primary" size="lg" className="px-10 rounded-lg shadow-lg shadow-primary/20">
            <a href="/projects">VIEW PROJECTS</a>
          </Button>
          <Button variant="secondary" size="lg" className="px-10 rounded-lg border-outline-variant/30 text-on-surface hover:bg-surface-bright/20">
            <a href="mailto:joshuahutasoit809@gmail.com">GET IN TOUCH</a>
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
            title="Home Lab Deployment (Series)"
            category="Infrastructure"
            year="2024"
            description="Architecting a high-availability defensive environment utilizing Proxmox, segmented VLANs, and an ELK stack for centralized log management."
            color="primary"
            index={0}
            link="/projects/home-lab-series"
          />
          <FeaturedCard 
            title="30-Day Cyber Challenge"
            category="Training"
            year="2025"
            description="Consolidated methodology and exploit chains for various CTF machines, focusing on privilege escalation and network defense."
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
  link?: string;
}> = ({ title, category, year, description, color, index, link }) => {
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
  } as const;

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.4 } }
      }}
      className="group cursor-pointer"
    >
      {link ? (
        <Link to={link}>
          <CardContent title={title} category={category} year={year} description={description} color={color} colorMap={colorMap} />
        </Link>
      ) : (
        <CardContent title={title} category={category} year={year} description={description} color={color} colorMap={colorMap} />
      )}
    </motion.div>
  );
};

const CardContent: React.FC<{
  title: string;
  category: string;
  year: string;
  description: string;
  color: 'primary' | 'secondary';
  colorMap: Record<string, string>;
}> = ({ title, category, year, description, color, colorMap }) => (
  <>
    <div className="aspect-video mb-8 overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/10 relative">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`material-symbols-outlined text-8xl opacity-10 group-hover:opacity-30 transition-all duration-700 group-hover:scale-110 ${colorMap[color]}`}>
            {color === 'primary' ? 'monitoring' : 'hub'}
          </span>
        </div>
        <div className="w-full h-full bg-surface-bright/10 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-700" />
      </motion.div>
    </div>
    
    <div className="flex justify-between items-center mb-4">
      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${colorMap[color]}`}>
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
  </>
);

export default Dashboard;
