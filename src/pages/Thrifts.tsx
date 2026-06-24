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

const Thrifts: React.FC = () => {
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

  const buyerFeatures = [
    { title: "Product Catalog", description: "Filter by category, size, color, and price with keyword search and pagination." },
    { title: "Wishlist & Cart", description: "Add items with variant selection (color, size) to wishlist or shopping cart." },
    { title: "Internal Wallet Checkout", description: "Checkout using internal user balance with order status tracking." },
    { title: "Real-Time Chat", description: "Socket.IO-powered messaging with sellers directly from product pages." },
    { title: "Product Reviews", description: "Post and read reviews — restricted to verified buyers who completed a purchase." },
  ];

  const sellerFeatures = [
    { title: "Store Dashboard", description: "Overview of products and incoming orders with quick action links." },
    { title: "Product Management", description: "Add, edit, and soft-delete products with multi-image upload support." },
    { title: "Order Fulfillment", description: "View buyer orders and transition status from pending to shipped to completed." },
  ];

  const techStack = [
    { category: 'Backend', items: ['Node.js 20 / Express 5', 'mysql2/promise (prepared statements)', 'JWT (jsonwebtoken) + bcrypt', 'Multer (image upload)'] },
    { category: 'Real-Time', items: ['Socket.IO 4', 'Cookie-based handshake auth', 'Room-scoped conversations', 'Event-driven chat handlers'] },
    { category: 'Frontend', items: ['Handlebars (hbs) templates', 'Modular partials system', 'Responsive CSS (flexbox/grid)', 'Custom UI component styling'] },
    { category: 'DevOps', items: ['Docker Compose (app + MySQL)', 'Docker multi-stage production build', 'GitHub Actions CI (Node 20/22)', 'ESLint + Prettier'] }
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
            <span className="font-mono text-[11px] text-primary opacity-70 tracking-[0.2em] uppercase">Full-Stack Project // ECOM-01</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-on-surface mb-8 tracking-tight leading-tight">
            Thrifts <br />
            <span className="text-primary italic">Thrift Store E-Commerce Platform</span>
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
            A complete e-commerce platform for thrift stores featuring real-time chat between buyers and sellers, 
            a seller dashboard with product and order management, internal wallet-based checkout, and a modular 
            architecture refactored from a monolith — built entirely from scratch with Node.js and MySQL.
          </p>
        </motion.div>
      </section>

      {/* Hero Image Preview */}
      <motion.section 
        variants={itemVariants}
        className="relative aspect-video w-full overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container"
      >
        <img 
          src="/thrifts.webp" 
          alt="Thrifts E-Commerce Platform Landing Page" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </motion.section>

      {/* Buyer Features */}
      <section>
        <SectionHeader title="Buyer_Experience" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {buyerFeatures.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} index={i} />
          ))}
        </div>
      </section>

      {/* Seller Features */}
      <section>
        <SectionHeader title="Seller_Dashboard" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sellerFeatures.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} index={i} />
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <motion.section variants={itemVariants}>
        <SectionHeader title="System_Architecture" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs">
          {techStack.map((stack) => (
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

      {/* Refactoring Highlights */}
      <motion.section variants={itemVariants}>
        <SectionHeader title="Refactoring_Journey" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Initial State', value: 'Single 423-line app.js', icon: 'code', desc: 'Monolithic Express file with inline Handlebars helpers, Socket.IO logic, and route definitions.' },
            { label: 'Refactored Structure', value: 'Modular Architecture', icon: 'account_tree', desc: 'Separated into server.js, app.js, controllers/, routes/, sockets/, views/helpers.js — each with single responsibility.' },
            { label: 'Hardening & CI', value: '11 Tests / 172 Lint Clean', icon: 'shield', desc: 'Added node --test unit tests for auth, middleware, and sockets. ESLint + Prettier + GitHub Actions CI with MySQL service container.' }
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

      {/* Call to Action Buttons */}
      <motion.section 
        variants={itemVariants}
        className="p-12 bg-primary/5 border border-primary/20 rounded-3xl text-center flex flex-col items-center justify-center gap-6"
      >
        <div>
          <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Explore the Repository</h3>
          <p className="text-on-surface-variant max-w-xl mx-auto text-sm leading-relaxed">
            Dive into the codebase — review the architecture, run the Dockerized stack, and examine the full refactoring diff.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <a 
            href="https://github.com/G4l1le30/authenYt" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1"
          >
            <Button variant="primary" size="lg" className="w-full rounded-xl" icon="code">
              Repository
            </Button>
          </a>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Thrifts;
