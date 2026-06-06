import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/articles', label: 'Articles' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: "https://www.linkedin.com/in/joshua-hutasoit-245123304" },
    { name: 'GitHub', href: "https://github.com/G4l1le30" },
    { name: 'Email', href: "mailto:joshuahutasoit809@gmail.com" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary selection:text-background flex flex-col relative overflow-x-hidden">
      {/* Background Gradients from Simplified Design */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(142,213,255,0.03)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,rgba(74,225,118,0.02)_0%,transparent_40%)]" />
      </div>

      {/* Modern Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 h-20 transition-all">
        <nav className="flex justify-between items-center h-full px-6 md:px-16 max-w-7xl mx-auto w-full">
          <NavLink to="/" className="font-headline-sm text-primary tracking-tight font-bold text-xl hover:scale-105 transition-transform">
            JOSHUA_HUTASOIT
          </NavLink>
          
          <div className="hidden md:flex gap-x-12 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative group
                  ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}
                `}
              >
                {item.label}
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={false}
                  animate={{ width: location.pathname === item.path ? '100%' : '0%' }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a 
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary/10 text-primary border border-primary/20 px-6 py-2 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-primary/20 transition-all inline-block"
            >
              Resume
            </motion.a>
          </div>
        </nav>
      </header>

      {/* Main Content with Page Transitions */}
      <main className="flex-grow pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Simple Footer */}
      <footer className="w-full py-20 bg-surface-container-lowest/50 border-t border-outline-variant/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <div className="font-bold text-on-surface mb-3 tracking-tight text-lg uppercase">JOSHUA_HUTASOIT</div>
            <p className="text-xs text-on-surface-variant font-mono uppercase tracking-widest opacity-60">© 2026 Joshua Washington Hutasoit. ALL RIGHT RESERVED</p>
          </div>
          
          <div className="flex gap-12">
            {socialLinks.map(link => (
              <motion.a 
                key={link.name} 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, color: 'var(--color-primary)' }}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>

      {/* Mobile Nav (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg border-t border-outline-variant/30 flex justify-around items-center h-16 z-50">
        {navItems.map((item, i) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'text-primary' : 'text-on-surface-variant'}>
            <span className="material-symbols-outlined">{['home', 'person', 'work', 'description'][i]}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
