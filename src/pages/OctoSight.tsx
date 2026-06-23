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

const FeatureCard: React.FC<{
  title: string;
  description: string;
  index: number;
}> = ({ title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      className="p-6 bg-surface-container/20 border border-outline-variant/10 rounded-2xl hover:border-primary/30 transition-all"
    >
      <h3 className="text-lg font-bold text-on-surface mb-2 font-mono">{title}</h3>
      <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
    </motion.div>
  );
};

const OctoSight: React.FC = () => {
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

  const userFeatures = [
    { title: "Incident Reporting", description: "Submit phishing/fraud reports (SMS, WhatsApp, Email, Web) with screenshot uploads." },
    { title: "Hybrid Risk Analysis", description: "Real-time risk preview scoring using combined rule heuristics and ML predictions." },
    { title: "Ticket Tracking", description: "Real-time status tracking and push alerts for report status transitions." },
    { title: "Gamified Education", description: "8 microlearning modules, quizzes, streaks, and achievements (14 types) to improve engagement." },
  ];

  const adminFeatures = [
    { title: "Kanban Board & Triage", description: "Interactive drag-and-drop workspace across 7 status columns with assignment rules." },
    { title: "Investigation Panel", description: "Deep-dive view with OCR screenshot text extraction, ML feedback, and AI summary notes." },
    { title: "Dynamic Rule Engine", description: "Real-time CRUD dashboard to adjust 40+ classification rules across 5 categories." },
    { title: "Audit Trail & Logs", description: "Forward-only immutable security log tracking all admin actions and transitions." },
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
            <span className="font-mono text-[11px] text-primary opacity-70 tracking-[0.2em] uppercase">Capstone_Project // CAP-01</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-on-surface mb-8 tracking-tight leading-tight">
            OctoSight <br />
            <span className="text-primary italic">Anti-Phishing Platform</span>
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
            An end-to-end anti-phishing and fraud detection system built to protect digital banking environments. 
            By integrating a hybrid risk engine (Rule-based + Machine Learning) with automated OCR triage workflows 
            and interactive training, the platform bridges the gap between customer reporting and security operations.
          </p>
        </motion.div>
      </section>

      {/* Hero Image Preview */}
      <motion.section 
        variants={itemVariants}
        className="relative aspect-video w-full overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container"
      >
        <img 
          src="/octosight.webp" 
          alt="OctoSight Anti-Phishing System Landing Page Mockup" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </motion.section>

      {/* Detection Engine Metrics */}
      <motion.section variants={itemVariants}>
        <SectionHeader title="Detection_Engine_Specs" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Hybrid Scoring Formula', value: 'Rule (35%) + ML (65%)', icon: 'calculate', desc: 'Combines heuristic checks with NLP text categorization.' },
            { label: 'Model Accuracy', value: '87% Target Performance', icon: 'verified', desc: 'Logistic Regression + TF-IDF pipeline trained on 2,000+ samples.' },
            { label: 'OCR Extraction', value: 'Tesseract Engine Integration', icon: 'screenshot_keyboard', desc: 'Extracts malicious text strings directly from screenshot uploads.' }
          ].map((spec) => (
            <div key={spec.label} className="p-6 bg-surface-container/30 border border-outline-variant/20 rounded-2xl group hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary mb-4">{spec.icon}</span>
                <div className="font-mono text-[10px] text-outline tracking-widest uppercase mb-1">{spec.label}</div>
                <div className="text-lg font-bold text-on-surface mb-2">{spec.value}</div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-2">{spec.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Feature Capabilities */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeader title="For_End_Users" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userFeatures.map((feat, i) => (
              <FeatureCard key={feat.title} {...feat} index={i} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeader title="For_Security_Admins" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adminFeatures.map((feat, i) => (
              <FeatureCard key={feat.title} {...feat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Specs */}
      <motion.section variants={itemVariants}>
        <SectionHeader title="System_Architecture" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs">
          {[
            { category: 'Frontend', items: ['Next.js 15 (App Router)', 'React 19 / TypeScript 6', 'Tailwind CSS 3', 'Chart.js / Recharts'] },
            { category: 'Backend API', items: ['FastAPI (Python 3.11)', 'SQLAlchemy 2.0 ORM', 'Pydantic v2 validation', 'Slowapi (Rate Limiting)'] },
            { category: 'Async Tasks', items: ['Celery task runner', 'Redis (Broker & Cache)', 'Gmail SMTP Notification', 'Gemini API integration'] },
            { category: 'Deployment', items: ['Docker Compose (8 services)', 'MySQL 8.0 Database', 'Caddy Reverse Proxy (HTTPS)', 'Supabase Storage'] }
          ].map((stack) => (
            <div key={stack.category} className="p-6 bg-surface-container/20 border border-outline-variant/10 rounded-2xl">
              <div className="text-primary font-bold tracking-widest uppercase mb-4 border-b border-outline-variant/20 pb-2">
                {stack.category}
              </div>
              <ul className="space-y-2 text-on-surface-variant">
                {stack.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Buttons */}
      <motion.section 
        variants={itemVariants}
        className="p-12 bg-primary/5 border border-primary/20 rounded-3xl text-center flex flex-col items-center justify-center gap-6"
      >
        <div>
          <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Explore the Repository & Deployments</h3>
          <p className="text-on-surface-variant max-w-xl mx-auto text-sm leading-relaxed">
            Examine the code architecture, run the containerized stack locally, or test the demo environment directly.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <a 
            href="https://github.com/G4l1le30/octosight-web-app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1"
          >
            <Button variant="secondary" size="lg" className="w-full rounded-xl" icon="code">
              Repository
            </Button>
          </a>
          <a 
            href="https://octosight.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1"
          >
            <Button variant="primary" size="lg" className="w-full rounded-xl" icon="open_in_new">
              Live Demo
            </Button>
          </a>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default OctoSight;
