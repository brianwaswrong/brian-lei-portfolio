import { Analytics } from '@vercel/analytics/react';
import { useEffect, useMemo, useState } from 'react';
import { AgentPortfolio } from './components/AgentPortfolio';
import { Artifacts } from './components/Artifacts';
import { CareerTimeline } from './components/CareerTimeline';
import { Header } from './components/Header';
import { Welcome } from './components/Welcome';
import { navItems, type SectionId } from './data/navigation';

const sectionIds = new Set(navItems.map((item) => item.id));

function readHashSection(): SectionId {
  const rawHash = window.location.hash.replace('#', '');
  if (rawHash === 'career') return 'welcome';
  return sectionIds.has(rawHash as SectionId) ? (rawHash as SectionId) : 'welcome';
}

function readPreferredTheme(): 'light' | 'dark' {
  const stored = window.localStorage.getItem('brian-lei-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(() => readHashSection());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => readPreferredTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('brian-lei-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(readHashSection());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash !== '#career' || activeSection !== 'welcome') return;

    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        document.getElementById('career-intro')?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [activeSection]);

  const activePanel = useMemo(() => {
    if (activeSection === 'agents') return <AgentPortfolio />;
    if (activeSection === 'artifacts') return <Artifacts />;
    return (
      <div className="home-flow">
        <Welcome />
        <CareerTimeline />
      </div>
    );
  }, [activeSection]);

  function selectSection(section: SectionId) {
    setActiveSection(section);
    window.history.pushState(null, '', `#${section}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <Header
        activeSection={activeSection}
        theme={theme}
        onSelect={selectSection}
        onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
      />
      <main className="main-shell">{activePanel}</main>
      <Analytics />
    </div>
  );
}
