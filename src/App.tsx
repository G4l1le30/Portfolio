import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import { Dashboard, About, Projects, Articles } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
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
    </Router>
  );
}

export default App;
