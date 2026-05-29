import { Analytics } from '@vercel/analytics/react';
import { useEffect, useMemo, useState } from 'react';
import { AgentPortfolio } from './components/AgentPortfolio';
import { Artifacts } from './components/Artifacts';
import { CareerTimeline } from './components/CareerTimeline';
import { Header } from './components/Header';
import { Welcome } from './components/Welcome';
import { navItems, type SectionId } from './data/navigation';

const sectionIds = new Set(navItems.map((item) => item.id));

type SiteSkin = 'editorial' | 'lavender' | 'events';

const skinOptions: Array<{ id: SiteSkin; label: string }> = [
  { id: 'editorial', label: 'Warm Editorial' },
  { id: 'lavender', label: 'Soft Lavender' },
  { id: 'events', label: 'Music / Events' },
];

function readHashSection(): SectionId {
  const rawHash = window.location.hash.replace('#', '');
  if (rawHash === 'career') return 'welcome';
  return sectionIds.has(rawHash as SectionId) ? (rawHash as SectionId) : 'welcome';
}

function readPreferredSkin(): SiteSkin {
  const stored = window.localStorage.getItem('brian-lei-skin');
  if (stored === 'editorial' || stored === 'lavender' || stored === 'events') return stored;
  return 'events';
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(() => readHashSection());
  const [skin, setSkin] = useState<SiteSkin>(() => readPreferredSkin());

  useEffect(() => {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.classList.remove('dark');
    window.localStorage.setItem('brian-lei-theme', 'light');
  }, []);

  useEffect(() => {
    document.documentElement.dataset.skin = skin;
    window.localStorage.setItem('brian-lei-skin', skin);
  }, [skin]);

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
        onSelect={selectSection}
      />
      <div className="skin-switcher" aria-label="Visual style selector">
        {skinOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`skin-switch ${skin === option.id ? 'is-active' : ''}`}
            onClick={() => setSkin(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <main className="main-shell">{activePanel}</main>
      <Analytics />
    </div>
  );
}
