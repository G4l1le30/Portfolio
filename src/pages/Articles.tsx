import React, { useState } from 'react';
import { StatusChip } from '../components';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
// Import the pre-fetched data
import localPosts from '../data/posts.json';

interface ArticleItem {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  snippet: string;
  categories: string[];
  guid: string;
}

const Articles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially
  
  // Hard filter for blog tagged posts only
  const posts: ArticleItem[] = (localPosts as ArticleItem[]).filter(post => 
    post.categories.some(cat => cat.toLowerCase().includes('blog'))
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 } // Very snappy stagger
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '.');
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto space-y-16"
    >
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full shadow-[0_0_8px_rgba(142,213,255,0.5)]"></div>
          <span className="font-mono text-[10px] text-primary opacity-70 tracking-[0.2em] uppercase">Static_Local_Uplink</span>
        </div>
        
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-on-surface mb-8 uppercase tracking-tight">
          Intel_Reports
        </motion.h1>
        
        <motion.div variants={itemVariants} className="relative group">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(6); // Reset pagination on search
            }}
            className="w-full bg-transparent border-b-2 border-outline-variant/30 py-4 font-mono text-xl text-on-surface placeholder:text-outline-variant outline-none focus:border-primary transition-all uppercase"
            placeholder="> QUERY SYSTEM LOGS..."
          />
          <motion.div 
            animate={{ width: searchQuery ? '100%' : '0%' }}
            className="absolute bottom-0 left-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(142,213,255,0.5)]"
          />
        </motion.div>
      </section>

      <section className="flex flex-col gap-12">
        <AnimatePresence mode="popLayout">
          {visiblePosts.length > 0 ? (
            <>
              {visiblePosts.map((post) => (
                <motion.article 
                  key={post.guid}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group border-l-2 border-outline-variant/20 pl-8 py-2 hover:border-primary transition-all duration-500"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-on-surface-variant tracking-widest uppercase">
                      <span className="text-secondary">{formatDate(post.pubDate)}</span>
                      <span className="w-1 h-1 bg-outline-variant/50 rounded-full"></span>
                      <span>{post.creator}</span>
                      <div className="ml-auto flex gap-2">
                        {post.categories.slice(0, 2).map(cat => (
                          <StatusChip key={cat} label={cat} variant="info" />
                        ))}
                      </div>
                    </div>
                    
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="block group">
                      <h2 className="text-2xl md:text-3xl font-bold text-on-surface group-hover:text-primary transition-colors leading-tight tracking-tight">
                        {post.title}
                      </h2>
                    </a>
                    
                    <p className="text-on-surface-variant text-lg leading-relaxed line-clamp-2 max-w-3xl font-sans opacity-80">
                      {post.snippet}
                    </p>
                    
                    <motion.a 
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 text-primary font-mono text-[11px] font-bold uppercase tracking-[0.2em] w-fit"
                    >
                      READ_FULL_LOG 
                      <span className="material-symbols-outlined text-sm">east</span>
                    </motion.a>
                  </div>
                </motion.article>
              ))}
              
              {visibleCount < filteredPosts.length && (
                <motion.button
                  variants={itemVariants}
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="mt-8 py-4 border border-outline-variant/30 font-mono text-[10px] font-bold text-primary uppercase tracking-[0.3em] hover:bg-primary/5 transition-all w-full flex items-center justify-center gap-2 rounded-lg"
                >
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                  Load_More_Entries
                </motion.button>
              )}
            </>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center border border-dashed border-outline-variant/30 rounded-2xl bg-surface-container/30"
            >
              <span className="material-symbols-outlined text-5xl text-outline/30 mb-4">database_off</span>
              <p className="font-mono text-outline uppercase tracking-widest">No entries match your query</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <motion.div variants={itemVariants} className="mt-24 pt-12 border-t border-outline-variant/10 flex items-center justify-between font-mono text-[10px] text-outline opacity-40 uppercase">
        <span>Source: PRE_FETCHED_JSON</span>
        <span className="text-secondary tracking-widest">Database_Ready</span>
      </motion.div>
    </motion.div>
  );
};

export default Articles;
