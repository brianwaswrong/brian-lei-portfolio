export type SectionId = 'welcome' | 'agents' | 'artifacts';

export const navItems: Array<{ id: SectionId; label: string }> = [
  { id: 'welcome', label: 'Background' },
  { id: 'agents', label: 'AI Agents & Skills' },
  { id: 'artifacts', label: 'Commercial Artifacts' },
];
