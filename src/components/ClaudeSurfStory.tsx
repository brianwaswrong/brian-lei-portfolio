import {
  CheckCircle2,
  GitBranch,
  Github,
  ListChecks,
  MonitorCog,
  Route,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react';

type SurfMode = {
  label: string;
  title: string;
  body: string;
  architecture: string[];
};

const surfModes: SurfMode[] = [
  {
    label: 'Solo-Surf',
    title: 'Foreground work stays human-supervised.',
    body:
      'Complex, exploratory work gets an isolated git worktree and a dedicated Claude Code session. The human stays in the loop to decide direction, course-correct, and iterate while Claude implements.',
    architecture: ['Claude Code', 'Git Worktrees', 'Human review'],
  },
  {
    label: 'Robot-Surf',
    title: 'Clear tickets become background execution loops.',
    body:
      'Well-defined Linear tickets can run mostly autonomously: fetch the issue, assess complexity, optionally plan, implement in isolation, open a PR, wait on checks, review, and return ready for human eyes.',
    architecture: ['Linear MCP', 'Claude Code', 'GitHub PR', 'CI checks'],
  },
];

const robotLoop = [
  'Fetch Linear ticket',
  'Assess complexity',
  'Plan if needed',
  'Build in worktree',
  'Open PR + wait on CI',
  'Review loop',
  'Human handoff',
];

const designNotes = [
  {
    title: 'Split by supervision model',
    body:
      'The useful abstraction was not "AI writes code." It was deciding which work deserves human steering and which work can be delegated to a background loop.',
  },
  {
    title: 'Isolate every attempt',
    body:
      'Git worktrees keep parallel agent attempts from colliding with active work, which matters once multiple tickets or experiments are running at the same time.',
  },
  {
    title: 'Make the loop inspectable',
    body:
      'Commands, skills, agents, PRs, CI, and review checkpoints make agent work easier to audit than one long context-heavy terminal thread.',
  },
];

const architecture = [
  'Claude Code',
  'Linear MCP',
  'Git Worktrees',
  'Specialized agents',
  '/solo-surf',
  '/robot-surf',
  'GitHub PRs',
  'CI checks',
  'Code review loop',
];

const impactStats = [
  {
    value: '2 modes',
    label: 'Foreground collaboration for ambiguous work; background automation for well-scoped tickets.',
  },
  {
    value: 'PR-ready',
    label: 'Robot-Surf can move from ticket context to implementation, checks, review, and handoff.',
  },
  {
    value: 'Parallel-safe',
    label: 'Worktrees let multiple agent attempts run without trampling the main working branch.',
  },
];

const brandLogos = [
  {
    match: ['Claude'],
    alt: 'Anthropic logo',
    src: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=64',
  },
  {
    match: ['Linear'],
    alt: 'Linear logo',
    src: 'https://www.google.com/s2/favicons?domain=linear.app&sz=64',
  },
  {
    match: ['GitHub', 'PR'],
    alt: 'GitHub logo',
    src: 'https://www.google.com/s2/favicons?domain=github.com&sz=64',
  },
  {
    match: ['Git Worktrees'],
    alt: 'Git logo',
    src: 'https://www.google.com/s2/favicons?domain=git-scm.com&sz=64',
  },
];

function getBrandLogos(label: string) {
  return brandLogos.filter((brand) => brand.match.some((match) => label.includes(match)));
}

function SurfChip({ label }: { label: string }) {
  const brands = getBrandLogos(label);

  return (
    <span>
      {brands.map((brand) => (
        <img src={brand.src} alt={brand.alt} key={brand.alt} loading="lazy" />
      ))}
      {label}
    </span>
  );
}

function SurfArchitectureChips({ items }: { items: string[] }) {
  return (
    <div className="deal-architecture-chips surf-chip-row">
      {items.map((item) => (
        <SurfChip key={item} label={item} />
      ))}
    </div>
  );
}

export function ClaudeSurfStory() {
  return (
    <article className="surf-story">
      <section className="deal-problem-band glass">
        <div>
          <p className="eyebrow">Project Writeup</p>
          <h3>Claude Surf: orchestration layer for Claude Code.</h3>
        </div>
        <p>
          Claude Surf is an opinionated orchestrator we built around Claude Code, Linear
          MCP, and Git worktrees. The goal was not to replace engineering judgment; it was
          to make agentic software work easier to route, isolate, review, and hand off.
        </p>
      </section>

      <section className="surf-mode-split">
        <div className="surf-mode-intro">
          <p className="eyebrow">Core Design Decision</p>
          <h3>Separate the work by how much supervision it needs.</h3>
          <p>
            The system is organized around two workflows: one for ambiguous work where a
            human should stay close, and one for tickets that are clear enough to delegate
            into an autonomous loop.
          </p>
        </div>
        <div className="surf-mode-grid">
          {surfModes.map((mode) => (
            <article className="surf-mode-card glass" key={mode.label}>
              <span>{mode.label}</span>
              <h4>{mode.title}</h4>
              <p>{mode.body}</p>
              <SurfArchitectureChips items={mode.architecture} />
            </article>
          ))}
        </div>
      </section>

      <section className="surf-flow-panel glass">
        <div className="surf-flow-head">
          <div>
            <p className="eyebrow">Robot-Surf Loop</p>
            <h3>Ticket to reviewed PR.</h3>
          </div>
          <Route size={22} aria-hidden="true" />
        </div>
        <div className="surf-flow-rail">
          {robotLoop.map((step, index) => (
            <div className="surf-flow-node" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="surf-writeup-grid">
        <div className="surf-notes">
          {designNotes.map((note, index) => (
            <article className="surf-note" key={note.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h4>{note.title}</h4>
                <p>{note.body}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="surf-architecture glass">
          <div>
            <p className="eyebrow">Architecture</p>
            <h3>Small commands, explicit handoffs.</h3>
          </div>
          <SurfArchitectureChips items={architecture} />
          <div className="surf-architecture-icons" aria-hidden="true">
            <TerminalSquare />
            <ListChecks />
            <GitBranch />
            <Github />
            <ShieldCheck />
          </div>
        </aside>
      </section>

      <section className="deal-impact surf-impact">
        <div>
          <p className="eyebrow">Impact</p>
          <h3>Less one-thread chaos, more managed agent work.</h3>
        </div>
        <div className="deal-impact-grid">
          {impactStats.map((stat) => (
            <div className="deal-impact-stat glass" key={stat.value}>
              <CheckCircle2 size={18} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="deal-query-band">
          <MonitorCog size={18} />
          <p>
            The point was to keep exploratory work collaborative, send well-scoped work
            into background agents, and preserve reviewable handoffs.
          </p>
        </div>
      </section>
    </article>
  );
}
