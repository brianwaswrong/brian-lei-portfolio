import {
  CheckCircle2,
  PenTool,
} from 'lucide-react';

type DesignSkill = {
  number: string;
  title: string;
  body: string;
  architecture: string[];
  visual?: 'atomic' | 'diff';
};

const designSkills: DesignSkill[] = [
  {
    number: '01',
    title: 'Brief Creator',
    body:
      'Looks at the 20-40 mockups / frames provided, analyzes key patterns, resolves components to our existing feature library, then prepares brief.md with top-down visual observations and implementation notes.',
    architecture: ['Figma mockups', 'Pattern analysis', 'Feature library', 'brief.md'],
  },
  {
    number: '02',
    title: 'Skin-surf',
    body:
      'The master orchestrator. It converts brief.md into a Linear parent issue, then 17-20 child issues mirroring Atomic Design: Foundation / Token Layer, Components, Wireframe, Polish, and Animation.',
    architecture: ['brief.md', 'Linear MCP', 'Atomic design'],
    visual: 'atomic',
  },
  {
    number: '03',
    title: 'Skin-imp-surf',
    body:
      'For each child ticket, an explorer & staff SWE agent implement the design, a visual-diff reviewer compiles in Xcode and compares the screen against the mockup, then recalls the staff SWE agent to iterate up to 4x before an automated code review.',
    architecture: ['Explorer agent', 'Staff SWE agent', 'Xcode compile', 'Visual diff reviewer', 'Code reviewer'],
    visual: 'diff',
  },
  {
    number: '04',
    title: 'Postmortem-surf',
    body:
      'During each iteration and design stage, the visual-diff reviewer logs what design choices it gets wrong into postmortem-log.md. After 2-3 recurrences, the system internalizes the learning by rewriting parts of skin-surf or skin-imp-surf so it misses less often on future designs.',
    architecture: ['postmortem-log.md', 'Recurring misses', 'Skill rewrite', 'Future design memory'],
  },
];

const impactStats = [
  {
    value: '85-90%',
    label: 'Client or internal designs executable through the design-engineering loop.',
  },
  {
    value: '24-36 hrs',
    label: 'Functional, wired implementation instead of multi-week design engineering cycles.',
  },
  {
    value: '20+',
    label: 'Screens and states handled without losing the mockup or design-system intent.',
  },
];

const brandLogos = [
  {
    match: ['Figma'],
    alt: 'Figma logo',
    src: 'https://www.google.com/s2/favicons?domain=figma.com&sz=64',
  },
  {
    match: ['Linear'],
    alt: 'Linear logo',
    src: 'https://www.google.com/s2/favicons?domain=linear.app&sz=64',
  },
  {
    match: ['Xcode', 'Swift', 'iOS'],
    alt: 'Apple Developer logo',
    src: 'https://www.google.com/s2/favicons?domain=developer.apple.com&sz=64',
  },
  {
    match: ['Git', 'PR', 'Code reviewer'],
    alt: 'GitHub logo',
    src: 'https://www.google.com/s2/favicons?domain=github.com&sz=64',
  },
];

function getBrandLogos(label: string) {
  return brandLogos.filter((brand) => brand.match.some((match) => label.includes(match)));
}

function DesignChip({ label }: { label: string }) {
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

function ArchitectureChips({ items }: { items: string[] }) {
  return (
    <div className="deal-architecture-chips">
      {items.map((item) => (
        <DesignChip key={item} label={item} />
      ))}
    </div>
  );
}

function AtomicDesignVisual() {
  const stages = [
    { label: 'Tokens', detail: 'color / type / spacing', className: 'is-token' },
    { label: 'Components', detail: 'buttons / cards / nav', className: 'is-component' },
    { label: 'Wireframe', detail: 'screen structure', className: 'is-wireframe' },
    { label: 'Polish', detail: 'shapes / shadows', className: 'is-polish' },
    { label: 'Animation', detail: 'states / motion', className: 'is-motion' },
  ];

  return (
    <div className="design-atomic-visual" aria-hidden="true">
      {stages.map((stage, index) => (
        <div className={`design-atomic-stage ${stage.className}`} key={stage.label}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <AtomicStageArt stage={stage.className} />
          <strong>{stage.label}</strong>
          <em>{stage.detail}</em>
        </div>
      ))}
    </div>
  );
}

function AtomicStageArt({ stage }: { stage: string }) {
  if (stage === 'is-token') {
    return (
      <div className="design-stage-art design-token-art">
        <div className="design-token-swatches">
          <i />
          <i />
          <i />
        </div>
        <div className="design-token-type">
          <b />
          <b />
        </div>
        <div className="design-token-spacing">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (stage === 'is-component') {
    return (
      <div className="design-stage-art design-component-art">
        <b className="design-component-button">Button</b>
        <div className="design-component-card">
          <i />
          <span />
          <span />
        </div>
        <div className="design-component-nav">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }

  if (stage === 'is-wireframe') {
    return (
      <div className="design-stage-art design-wireframe-art">
        <span className="design-wire-top" />
        <span className="design-wire-hero" />
        <span className="design-wire-card one" />
        <span className="design-wire-card two" />
        <span className="design-wire-line one" />
        <span className="design-wire-line two" />
      </div>
    );
  }

  if (stage === 'is-polish') {
    return (
      <div className="design-stage-art design-polish-art">
        <div className="design-mini-phone">
          <i />
          <b className="design-phone-hero" />
          <span />
          <span />
          <b className="design-phone-cta" />
        </div>
      </div>
    );
  }

  return (
    <div className="design-stage-art design-motion-art">
      <div className="design-motion-phone is-before">
        <i />
        <span />
        <span />
      </div>
      <div className="design-motion-arrow" />
      <div className="design-motion-phone is-after">
        <i />
        <span />
        <span />
      </div>
    </div>
  );
}

function VisualDiffMockup() {
  return (
    <div className="design-diff-mockup" aria-hidden="true">
      <div className="design-diff-head">
        <span>visual-diff-reviewer</span>
        <strong>Iteration 03 / 04</strong>
      </div>
      <div className="design-diff-panels">
        <div>
          <span>Figma target</span>
          <div className="design-phone-frame is-target">
            <i />
            <strong />
            <p />
            <p />
            <b />
          </div>
        </div>
        <div>
          <span>Xcode build</span>
          <div className="design-phone-frame is-build">
            <i />
            <strong />
            <p />
            <p />
            <b />
          </div>
        </div>
      </div>
      <div className="design-diff-notes">
        <p>Button radius off by 4px</p>
        <p>Card shadow too heavy</p>
        <p>Nav spacing misses frame</p>
      </div>
    </div>
  );
}

function SkillVisual({ visual }: { visual?: DesignSkill['visual'] }) {
  if (visual === 'atomic') return <AtomicDesignVisual />;
  if (visual === 'diff') return <VisualDiffMockup />;
  return null;
}

export function DesignEngineerStory() {
  return (
    <article className="deal-story design-story">
      <section className="deal-problem-band glass">
        <div>
          <p className="eyebrow">Business Problem</p>
          <h3>Custom iOS design execution without a full-time design engineer</h3>
        </div>
        <p>
          At DORI, we had a pipeline of small businesses highly interested in using our mobile app software but with
          fully customized and branded designs. Without a design engineer, and Codex / Claude notoriously
          unreliable adhering to design systems, we created a design-eng skill that could take any frontend mockups, resolve features
          to our existing component library, then build a fully functional app with minimal design drift.
        </p>
      </section>

      <section className="design-overview">
        <div>
          <p className="eyebrow">System Shape</p>
          <h3>Four legs, borrowed from Atomic Design and a designer's process.</h3>
        </div>
        <div className="design-overview-flow">
          {designSkills.map((skill) => (
            <div className="design-flow-node" key={skill.title}>
              <span>{skill.number}</span>
              <strong>{skill.title}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="design-process-panel glass" aria-label="DORI Design Engineer flow">
        {designSkills.map((skill) => (
          <article className={`design-process-row ${skill.visual ? 'has-visual' : ''}`} key={skill.title}>
            <div className="design-process-index">
              <span>{skill.number}</span>
            </div>
            <div className="design-process-copy">
              <h3>{skill.title}</h3>
              <p>{skill.body}</p>
              <div className="design-architecture-row">
                <h4>Architecture</h4>
                <ArchitectureChips items={skill.architecture} />
              </div>
            </div>
            <SkillVisual visual={skill.visual} />
          </article>
        ))}
      </section>

      <section className="deal-impact design-impact">
        <div>
          <p className="eyebrow">Impact</p>
          <h3>Design execution became a repeatable implementation system.</h3>
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
          <PenTool size={18} />
          <p>
            The loop let us focus more on UX and polish instead of re-solving backend
            wiring, component mapping, and implementation mechanics for every custom skin.
          </p>
        </div>
      </section>

      <section className="deal-vendor-strip" aria-label="Design Engineer architecture components">
        {[
          'Figma',
          'Swift / iOS',
          'Xcode',
          'Linear',
          'Git PRs',
          'Visual diff reviewer',
          'postmortem-log.md',
        ].map((item) => (
          <DesignChip key={item} label={item} />
        ))}
      </section>
    </article>
  );
}
