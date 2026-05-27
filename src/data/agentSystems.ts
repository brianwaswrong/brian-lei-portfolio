export type AgentSystem = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  businessCase: string;
  architecture: string;
  loop: string[];
  inputs: string[];
  outputs: string[];
  impact: string;
  tags: string[];
  mockup: 'pipeline' | 'demo' | 'design' | 'orchestrator';
};

export const agentSystems: AgentSystem[] = [
  {
    id: 'deal-desk',
    title: 'Deal Desk Agent',
    eyebrow: 'GTM / CRM',
    summary:
      'A CRM and sales agent that turns meeting notes, voice memos, enrichment, and stage changes into a live operating system for pipeline.',
    businessCase:
      'DORI needed founder-led sales discipline without hiring RevOps. The system tracks accounts, next actions, lead scores, qualification logic, and channel effectiveness so the team can keep selling while the operating layer stays clean.',
    architecture:
      'CRM data model, Slack intake, note ingestion, account enrichment, deterministic pipeline rules, structured outputs, and human review before external commitments.',
    loop: [
      'Founder logs voice memo or meeting summary',
      'Agent extracts account facts, objections, and next steps',
      'CRM record updates with due dates and lead score changes',
      'Pipeline stats refresh by channel, client size, and owner',
    ],
    inputs: ['Voice notes', 'Slack messages', 'CRM rows', 'Places enrichment'],
    outputs: ['Next actions', 'Lead scores', 'Pipeline summaries', 'Founder alerts'],
    impact:
      'The enrichment and sales workflow sourced roughly 90% of qualified leads and gave a tiny team a real GTM command center.',
    tags: ['Slack', 'CRM automation', 'Structured outputs', 'Lead scoring'],
    mockup: 'pipeline',
  },
  {
    id: 'demo-engine',
    title: 'Demo Creation Agent',
    eyebrow: 'Solution Consulting / Design',
    summary:
      'An agentic demo flow that turns merchant name, web/social assets, and menu/POS data into a branded, populated, phone-ready demo.',
    businessCase:
      'DORI sells custom SMB software to buyers who care about taste and specificity. Walking in with their menu, brand, locations, and app experience already live changes the sales conversation.',
    architecture:
      'Menu scraper, Square/POS demo account creation, brand asset extraction, skin selection, staging tenant setup, menu photography generation, and app population.',
    loop: [
      'Feed client name, Square/POS source, website, and menu',
      'Scrape menu and normalize catalog JSON',
      'Create staging account and choose a compatible skin',
      'Populate the app with branding, menu, locations, and imagery',
    ],
    inputs: ['Client website', 'Square menu', 'Brand assets', 'Demo API keys'],
    outputs: ['Staging tenant', 'Custom app skin', 'Menu catalog', 'Sales demo URL'],
    impact:
      'Fully customized demos become available in under 10-14 minutes for every serious pipeline account.',
    tags: ['Scraping', 'Tenant setup', 'Design skins', 'POS data'],
    mockup: 'demo',
  },
  {
    id: 'design-engineer',
    title: 'DORI Design Engineer',
    eyebrow: 'Design Engineering',
    summary:
      'A design-engineering skill that turns Figma mockups into Linear issues, Swift / iOS implementation loops, visual diff review, and reusable skill improvements.',
    businessCase:
      'DORI needed to deliver fully customized branded iOS designs without a full-time designer or design engineer, while generic coding agents struggled to follow Figma frames and Swift design-system details.',
    architecture:
      'Brief Creator, skin-surf orchestrator, skin-imp-surf implementation loop, visual-diff reviewer, Xcode compile, automated code review, and postmortem-surf skill rewrites.',
    loop: [
      'Analyze 20-40 Figma frames and produce brief.md',
      'Decompose the skin into atomic Linear child issues',
      'Run explorer, Staff SWE, Xcode visual diff, and code review loops',
      'Feed recurring misses back into postmortem-log.md and skill rewrites',
    ],
    inputs: ['Figma frames', 'Client mockups', 'Feature library', 'Design system'],
    outputs: ['brief.md', 'Linear issue tree', 'Functional Swift screens', 'Skill updates'],
    impact:
      '85-90% of custom designs can be executed and wired in roughly 24-36 hours instead of weeks.',
    tags: ['Figma', 'Swift / iOS', 'Visual diff', 'Postmortems'],
    mockup: 'design',
  },
  {
    id: 'claude-surf',
    title: 'Claude Surf Orchestrator',
    eyebrow: 'Engineering / SWE',
    summary:
      'A Claude Code harness that routes engineering work into human-supervised foreground sessions or background ticket-to-PR loops.',
    businessCase:
      'DORI needed a way to use coding agents without turning everything into one long terminal thread. Claude Surf adds routing, worktree isolation, Linear context, PR handoff, and review checkpoints.',
    architecture:
      'Claude Code, Linear MCP, Git worktrees, /solo-surf and /robot-surf commands, specialized agents, GitHub PRs, CI checks, and a review loop.',
    loop: [
      'Route ambiguous work into a supervised Solo-Surf session',
      'Route clear Linear tickets into Robot-Surf',
      'Build in an isolated worktree and open a PR',
      'Wait on checks, review the diff, and hand work back',
    ],
    inputs: ['Linear tickets', 'Repo context', 'Acceptance criteria', 'Human review'],
    outputs: ['Worktrees', 'PRs', 'CI status', 'Reviewed handoffs'],
    impact:
      'Turns agentic engineering from one long context-heavy session into a managed, inspectable workflow.',
    tags: ['Linear MCP', 'Parallel agents', 'Code review', 'Git handoff'],
    mockup: 'orchestrator',
  },
];
