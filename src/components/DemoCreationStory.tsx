import { CheckCircle2 } from 'lucide-react';

type DemoStep = {
  number: string;
  actor: 'User' | 'Agent';
  title: string;
  body: string;
  integrations: string[];
};

const demoSteps: DemoStep[] = [
  {
    number: '01',
    actor: 'User',
    title: 'Merchant inputs',
    body:
      "User provides merchant name, website/social, and existing catalog link. That's all the agent needs to find brand assets & pull the existing item catalog.",
    integrations: ['Merchant name', 'Website', 'Instagram', 'Existing menu / catalog'],
  },
  {
    number: '02',
    actor: 'Agent',
    title: 'Catalog scrape + POS upsert',
    body:
      'Agent scrapes the merchant catalog into a normalized JSON shape, then upserts it into the demo POS account so downstream demo creation does not depend on the source menu format.',
    integrations: ['Square/Clover', 'JSON schema / format', 'Demo POS account'],
  },
  {
    number: '03',
    actor: 'Agent',
    title: 'Brand extraction + skin selection',
    body:
      'Agent pulls brand assets from website and social pages, then chooses from a library of 4-5 demo skins as the base. It applies further branding customizations after selecting the closest fit and can generate replacement product imagery.',
    integrations: ['Instagram', 'Website', 'Design skin library', 'GPT Image 2.0'],
  },
  {
    number: '04',
    actor: 'Agent',
    title: 'Functional staging demo',
    body:
      'Agent creates the staging/demo record in the backend, connects the demo POS account, selects catalog items to show for that merchant, and wires the tenant into DORI-Service.',
    integrations: ['Supabase upsert', 'Square POS', 'DORI-Service'],
  },
];

const demoImpact = [
  {
    value: '<12-14 min',
    label: 'End-to-end demo created with a prospect merchant catalog and phone-ready flow.',
  },
  {
    value: '90%+',
    label: 'Leads now receive a personalized demo in person or delivered online.',
  },
];

const brandLogos = [
  {
    match: ['Instagram'],
    alt: 'Instagram logo',
    src: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=64',
  },
  {
    match: ['Website'],
    alt: 'Website icon',
    src: 'https://www.google.com/s2/favicons?domain=google.com&sz=64',
  },
  {
    match: ['Square'],
    alt: 'Square logo',
    src: 'https://www.google.com/s2/favicons?domain=squareup.com&sz=64',
  },
  {
    match: ['Clover'],
    alt: 'Clover logo',
    src: 'https://www.google.com/s2/favicons?domain=clover.com&sz=64',
  },
  {
    match: ['Supabase'],
    alt: 'Supabase logo',
    src: 'https://www.google.com/s2/favicons?domain=supabase.com&sz=64',
  },
  {
    match: ['GPT Image', 'GPT'],
    alt: 'OpenAI logo',
    src: 'https://www.google.com/s2/favicons?domain=openai.com&sz=64',
  },
];

function getBrandLogos(label: string) {
  return brandLogos.filter((brand) => brand.match.some((match) => label.includes(match)));
}

function DemoChip({ label }: { label: string }) {
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

function DemoFlowVisual() {
  const inputNodes = [
    { label: 'Merchant', x: 80, y: 58 },
    { label: 'Brand / Site', x: 80, y: 132 },
    { label: 'Live Catalog', x: 80, y: 206 },
  ];
  const hiddenNodes = [
    { x: 322, y: 38 },
    { x: 322, y: 98 },
    { x: 322, y: 158 },
    { x: 322, y: 218 },
  ];
  const outputNode = { x: 522, y: 132 };
  const inputLines = inputNodes.flatMap((input) =>
    hiddenNodes.map((hidden) => ({
      x1: input.x + 18,
      y1: input.y,
      x2: hidden.x - 18,
      y2: hidden.y,
    })),
  );
  const outputLines = hiddenNodes.map((hidden) => ({
    x1: hidden.x + 18,
    y1: hidden.y,
    x2: outputNode.x - 32,
    y2: outputNode.y,
  }));
  const lines = [...inputLines, ...outputLines];

  return (
    <div className="demo-neural-diagram" aria-hidden="true">
      <svg className="demo-neural-svg" viewBox="0 0 620 270" focusable="false">
        <defs>
          <clipPath id="demo-neural-wave-clip">
            <rect className="demo-neural-wave-window" x="-90" y="0" width="90" height="270" />
          </clipPath>
        </defs>
        <g className="demo-input-card">
          <text x="81" y="18">User Inputs</text>
          <rect x="16" y="26" width="130" height="224" rx="14" />
        </g>
        <text className="demo-agent-label" x="322" y="17">Demo Agent</text>
        <g className="demo-neural-base">
          {lines.map((line, index) => (
            <line key={`base-${index}`} {...line} />
          ))}
        </g>
        <g className="demo-neural-pulse" clipPath="url(#demo-neural-wave-clip)">
          {lines.map((line, index) => (
            <line key={`pulse-${index}`} {...line} />
          ))}
        </g>
        <g className="demo-neural-nodes">
          {inputNodes.map((node) => (
            <g className="demo-neural-node is-input" key={node.label}>
              <circle cx={node.x} cy={node.y} r="15" />
              <text x={node.x} y={node.y + 39}>{node.label}</text>
            </g>
          ))}
          {hiddenNodes.map((node, index) => (
            <circle className="demo-neural-node is-hidden" cx={node.x} cy={node.y} r="13" key={index} />
          ))}
          <g className="demo-neural-phone" transform={`translate(${outputNode.x - 25} ${outputNode.y - 39})`}>
            <rect x="0" y="0" width="50" height="78" rx="13" />
            <line x1="18" y1="9" x2="32" y2="9" />
            <circle cx="25" cy="64" r="2.5" />
          </g>
          <text className="demo-neural-output-label" x={outputNode.x - 47} y={outputNode.y + 68}>Done Demo</text>
        </g>
      </svg>
    </div>
  );
}

export function DemoCreationStory() {
  return (
    <article className="deal-story demo-story">
      <section className="deal-problem-band glass">
        <div>
          <p className="eyebrow">Business Problem</p>
          <h3>Automate demos end-end to drive qualification & win rates</h3>
        </div>
        <p>
          Early on, we found that walking into a merchant with a fully branded,
          customized demo dramatically increased qualification and win rates. To make
          that advantage scalable, we created a library of "skins" and a demo-creation
          agent that could ingest merchant name, website/social assets, and an existing
          POS or menu page, then produce a working demo.
        </p>
      </section>

      <section className="demo-overview">
        <div>
          <p className="eyebrow">System Design Flow</p>
          <h3>Three user inputs, one automated demo in &lt;14 minutes</h3>
        </div>
        <DemoFlowVisual />
      </section>

      <section className="demo-process-panel glass" aria-label="Demo Creation Agent flow">
        <div className="demo-process-header" aria-hidden="true">
          <span />
          <h4>Design Decisions / Technical Implementation</h4>
          <h4>Architecture</h4>
        </div>
        {demoSteps.map((step) => (
          <article className={`demo-process-row ${step.actor === 'Agent' ? 'is-agent' : ''}`} key={step.number}>
            <div className="demo-step-index">
              <span>{step.number}</span>
              <strong>{step.actor}</strong>
            </div>
            <div className="demo-step-copy">
              <h3>{step.title}</h3>
              <div className="demo-step-notes">
                <section>
                  <p>{step.body}</p>
                </section>
              </div>
            </div>
            <div className="demo-integration-row">
              <div className="deal-architecture-chips">
                {step.integrations.map((item) => (
                  <DemoChip key={item} label={item} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="deal-impact demo-impact">
        <div>
          <p className="eyebrow">Impact</p>
          <h3>Custom demos became a repeatable sales motion.</h3>
        </div>
        <div className="deal-impact-grid demo-impact-grid">
          {demoImpact.map((stat) => (
            <div className="deal-impact-stat glass" key={stat.value}>
              <CheckCircle2 size={18} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
