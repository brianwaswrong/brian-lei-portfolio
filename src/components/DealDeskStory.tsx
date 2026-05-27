import {
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import enrichmentVideo from '../assets/dori-enrichment-flow.optimized.mp4';
import listBuilderVideo from '../assets/dori-list-builder.optimized.mp4';
import salesAgentVideo from '../assets/dori-sales-agent.optimized.mp4';

type DealDeskStage = {
  number: string;
  title: string;
  heading: string;
  userNeed: string;
  implementation: string;
  technical: string[];
  visual: 'list' | 'enrichment' | 'slack';
};

const dealDeskStages: DealDeskStage[] = [
  {
    number: '01',
    title: 'List Building',
    heading: 'Skill 1: Build a canonical, qualified list for a new city.',
    userNeed:
      'We were prospecting all new territories and needed canonical lead lists, so I made an "Add City" tab where a user can enter a region, assigns an owner, run the job, and get back a canonical list based upon Google Places API.',
    implementation:
      'Our backend queries the API, filters out chains, duplicates, and incorrect categories, performs preliminary enrichment, and then upserts the list into our CRM (Supabase).',
    technical: [
      'Places API search',
      'Full-grid CRM table',
      'Record de-duping',
      'Supabase CRM upserts',
    ],
    visual: 'list',
  },
  {
    number: '02',
    title: 'ENRICHMENT',
    heading: 'Skill 2: Research and prioritize hundreds of merchant leads.',
    userNeed:
      'Next, reps/founders needed a way to prioritize leads, so we built technographic & firmographic enrichments (POS system, social following, location count, catalog, etc) to create a lead score.',
    implementation:
      'User hits a "play" on available columns. A Python worker scrapes App Store, merchant sites, & socials, updates each cell, then writes all scrape results & an enrichment-run summary into Supabase.',
    technical: [
      'Clay-esque UI',
      'Python worker',
      'Firmographic scrape',
      'Technographics',
      'Stored enrichment runs',
    ],
    visual: 'enrichment',
  },
  {
    number: '03',
    title: 'Sales Pipeline Tracker',
    heading: 'Skill 3: Capture pipeline activity from Slack into CRM & prep next action.',
    userNeed:
      'We created a Slack hook & equipped it with GPT-5.4-mini reasoning to capture 100% pipeline activity where it already lived. Now, we just send voice/written notes or followups in Slack, and @dori-sales-agent listens to it all.',
    implementation:
      'The agent routes the note or instruction, calls GPT Responses API to check deterministic pipeline rules & recommend an action, logs all meetings to our CRM and even begins triaging the next action (i.e. email draft, one-click demo creation).',
    technical: [
      'Slack hook',
      'GPT-5.4-mini / Responses API',
      'Update Supabase CRM',
      'Recommends/drafts next action',
    ],
    visual: 'slack',
  },
];

const overviewSteps = [
  'List Building',
  'Research / Prioritization',
  'Sales Pipeline Tracker',
  'Queryable Pipeline',
];

const impactStats = [
  {
    value: '90%',
    label: 'Leads sourced from list builder',
  },
  {
    value: '100%',
    label: 'Enriched via the research / prioritization skill',
  },
  {
    value: '100%',
    label: 'Meetings, notes, and next actions tracked through dori-sales-agent',
  },
];

const brandLogos = [
  {
    match: ['App Store'],
    alt: 'App Store logo',
    src: 'https://www.google.com/s2/favicons?domain=apps.apple.com&sz=64',
  },
  {
    match: ['App Store'],
    alt: 'Google Play logo',
    src: 'https://www.google.com/s2/favicons?domain=play.google.com&sz=64',
  },
  {
    match: ['Google Places API', 'Google Places', 'Places API'],
    alt: 'Google logo',
    src: 'https://www.google.com/s2/favicons?domain=google.com&sz=64',
  },
  {
    match: ['Supabase'],
    alt: 'Supabase logo',
    src: 'https://www.google.com/s2/favicons?domain=supabase.com&sz=64',
  },
  {
    match: ['Slack'],
    alt: 'Slack logo',
    src: 'https://www.google.com/s2/favicons?domain=slack.com&sz=64',
  },
  {
    match: ['GPT', 'Responses API'],
    alt: 'OpenAI logo',
    src: 'https://www.google.com/s2/favicons?domain=openai.com&sz=64',
  },
  {
    match: ['Clay'],
    alt: 'Clay logo',
    src: 'https://www.google.com/s2/favicons?domain=clay.com&sz=64',
  },
  {
    match: ['Salesforce'],
    alt: 'Salesforce logo',
    src: 'https://www.google.com/s2/favicons?domain=salesforce.com&sz=64',
  },
  {
    match: ['HubSpot'],
    alt: 'HubSpot logo',
    src: 'https://www.google.com/s2/favicons?domain=hubspot.com&sz=64',
  },
  {
    match: ['Technographics'],
    alt: 'Square logo',
    src: 'https://www.google.com/s2/favicons?domain=squareup.com&sz=64',
  },
];

function getBrandLogos(label: string) {
  const matches = brandLogos.filter((brand) => brand.match.some((match) => label.includes(match)));
  return matches.length ? matches : [];
}

function BrandChip({ label }: { label: string }) {
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
        <BrandChip key={item} label={item} />
      ))}
    </div>
  );
}

function ListBuilderMockup() {
  return (
    <figure className="deal-video-mockup" aria-label="DORI list builder demo">
      <video autoPlay loop muted playsInline preload="metadata" src={listBuilderVideo} />
    </figure>
  );
}

function EnrichmentMockup() {
  return (
    <figure className="deal-video-mockup" aria-label="DORI enrichment flow demo">
      <video autoPlay loop muted playsInline preload="metadata" src={enrichmentVideo} />
    </figure>
  );
}

function SlackAgentMockup() {
  return (
    <figure className="deal-video-mockup" aria-label="DORI Sales Agent workflow demo">
      <video autoPlay loop muted playsInline preload="metadata" src={salesAgentVideo} />
    </figure>
  );
}

function DealStageVisual({ visual }: { visual: DealDeskStage['visual'] }) {
  if (visual === 'list') return <ListBuilderMockup />;
  if (visual === 'enrichment') return <EnrichmentMockup />;
  return <SlackAgentMockup />;
}

export function DealDeskStory() {
  return (
    <article className="deal-story">
      <section className="deal-problem-band glass">
        <div>
          <p className="eyebrow">Business Problem</p>
          <h3>Scaling outbound without RevOps or pricey GTM/CRM tooling</h3>
        </div>
        <p>
          DORI was scaling outbound to hundreds of merchants using spreadsheets. 
          Rather than stitch together wieldy and expensive tools like Salesforce and Clay for 3-reps, I was confident we could build our own tool with Codex, Vercel, Supabase, & Python
          to perfectly match our needs: a CRM source-of-truth, lead list builder, enrichments / lead scores, and full pipeline tracking/automation.
        </p>
      </section>

      <section className="deal-overview" aria-label="Deal Desk system overview">
        <div>
          <p className="eyebrow">System Overview</p>
          <h3>3 skills, one CRM backbone</h3>
        </div>
        <div className="deal-overview-rail">
          {overviewSteps.map((step, index) => (
            <div className="deal-overview-node" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="deal-stage-list">
        {dealDeskStages.map((stage) => (
          <section className="deal-stage" key={stage.title}>
            <div className="deal-stage-index">
              <span>{stage.number}</span>
            </div>
            <div className="deal-stage-content">
              <div className="deal-stage-copy">
                <p className="eyebrow">{stage.title}</p>
                <h3>{stage.heading}</h3>
                <div className="deal-stage-writeup">
                  <section>
                    <h4>User Needs / Design Decisions</h4>
                    <p>{stage.userNeed}</p>
                  </section>
                  <section>
                    <h4>Technical Implementation</h4>
                    <p>{stage.implementation}</p>
                  </section>
                </div>
              </div>
              <DealStageVisual visual={stage.visual} />
              <div className="deal-architecture-row">
                <h4>Architecture</h4>
                <ArchitectureChips items={stage.technical} />
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="deal-impact">
        <div>
          <p className="eyebrow">Impact</p>
          <h3>Fully integrated & queryable GTM motion</h3>
        </div>
        <div className="deal-impact-grid">
          {impactStats.map((stat) => (
            <div className="deal-impact-stat glass" key={stat.label}>
              <CheckCircle2 size={18} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="deal-query-band">
          <BarChart3 size={18} />
          <p>
            With every step from lead-gen to negotiations queryable by our AI tools, we use natural language in Slack/Codex to analyze performance by territory/rep/stage/channel or understand next actions.
          </p>
        </div>
      </section>

      {/* <section className="deal-vendor-strip" aria-label="Named architecture components">
        {[
          'Google Places API',
          'Supabase',
          'Slack',
          'Python worker',
          'Technographics check',
          'GPT-5.4-mini Responses API',
          'Clay',
          'Salesforce/HubSpot',
        ].map((item) => (
          <BrandChip key={item} label={item} />
        ))}
      </section> */}
    </article>
  );
}
