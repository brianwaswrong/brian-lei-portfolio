import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { navItems, type SectionId } from '../data/navigation';

type HeaderProps = {
  activeSection: SectionId;
  onSelect: (section: SectionId) => void;
};

export function Header({
  activeSection,
  onSelect,
}: HeaderProps) {
  return (
    <>
      <header className="site-header">
        <button
          type="button"
          className="brand-home"
          onClick={() => onSelect('welcome')}
          aria-label="Go to Background"
          title="Brian Lei"
        >
          <span className="brand-signature" aria-hidden="true">
            BL
          </span>
        </button>

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

    </>
  );
}
