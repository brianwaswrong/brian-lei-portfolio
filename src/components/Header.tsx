import { FileText, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { navItems, type SectionId } from '../data/navigation';

type HeaderProps = {
  activeSection: SectionId;
  theme: 'light' | 'dark';
  onSelect: (section: SectionId) => void;
  onToggleTheme: () => void;
};

export function Header({
  activeSection,
  theme,
  onSelect,
  onToggleTheme,
}: HeaderProps) {
  return (
    <>
      <header className="site-header">
        <nav className="section-tabs" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`section-tab ${activeSection === item.id ? 'is-active' : ''}`}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-icon-row" aria-label="Profile links">
          <a className="nav-icon-button" href="/BrianLeiResume_2026.pdf" target="_blank" rel="noreferrer" aria-label="Open resume" title="Resume">
            <FileText size={18} />
          </a>
          <a className="nav-icon-button" href="mailto:brianlei22@gmail.com" aria-label="Email Brian Lei" title="Email">
            <Mail size={18} />
          </a>
          <a className="nav-icon-button" href="https://www.linkedin.com/in/brian-lei" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a className="nav-icon-button" href="https://github.com/brianwaswrong" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <Github size={18} />
          </a>
        </div>
      </header>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </>
  );
}
