import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './layouts/Layout';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Articles = React.lazy(() => import('./pages/Articles'));
const HomeLabSeries = React.lazy(() => import('./pages/HomeLabSeries'));

// Loading Fallback
const LoadingSector = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    <span className="font-mono text-[10px] text-primary animate-pulse uppercase tracking-[0.3em]">Decrypting_Sector...</span>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingSector />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/home-lab-series" element={<HomeLabSeries />} />
            <Route path="articles" element={<Articles />} />
            
            {/* Fallback */}
            <Route path="*" element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center border border-dashed border-tertiary/30 p-12 bg-tertiary/5">
                <span className="material-symbols-outlined text-6xl text-tertiary mb-4 animate-bounce">warning</span>
                <h2 className="text-3xl font-mono font-bold text-tertiary mb-2">404: RESOURCE_NOT_FOUND</h2>
                <p className="text-outline font-mono">The requested sector does not exist or has been wiped.</p>
              </div>
            } />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
