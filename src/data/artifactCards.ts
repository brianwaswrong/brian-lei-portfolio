export type ArtifactCard = {
  id: string;
  title: string;
  eyebrow: string;
  thesis: string;
  status: string;
  signals: string[];
};

export const artifactCards: ArtifactCard[] = [
  {
    id: 'usage-pricing',
    title: 'Usage-Based Pricing',
    eyebrow: 'Packaging / Monetization',
    thesis:
      'How AI products can map value, cost, and buyer trust into packaging that does not punish adoption or hide margin risk.',
    status: 'Artifact in progress',
    signals: ['Meter design', 'Commit logic', 'Customer guardrails'],
  },
  {
    id: 'consumption-forecasting',
    title: 'Consumption Forecasting',
    eyebrow: 'Finance / RevOps',
    thesis:
      'A practical forecasting model for products where usage, expansion, and infrastructure cost all move faster than annual planning cycles.',
    status: 'Artifact in progress',
    signals: ['Usage cohorts', 'Expansion curves', 'Capacity scenarios'],
  },
  {
    id: 'deal-desk-rules',
    title: 'Enterprise Deal Desk / Approval Rules',
    eyebrow: 'Commercial Operations',
    thesis:
      'A rules layer for enterprise deals that keeps sellers moving while protecting discounting, margin, legal, and delivery constraints.',
    status: 'Artifact in progress',
    signals: ['Approval thresholds', 'Exception paths', 'Risk flags'],
  },
];
