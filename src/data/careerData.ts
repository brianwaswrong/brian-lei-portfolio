import liveNationNytImage from '../assets/livenation_nyt.png';
import liveNationApImage from '../assets/livenation_ap_news.svg';

export type CareerProgress = {
  enter: number;
  active: number;
  exit: number;
};

export type CareerMilestone = {
  id: string;
  year: string;
  title: string;
  body: string;
  takeaway?: string;
  arr?: string;
  enterprise?: string;
  arrValue?: number;
  enterpriseValue?: number;
  phase: 'foundations' | 'seatgeek' | 'independent';
  phaseLabel: string;
  progress: CareerProgress;
  track: { x: number; y: number };
  graph?: {
    axis: { x: number; y: number };
    card: { x: string; y: string; align: string };
    mediaCards?: GraphMediaCard[];
  };
  pills?: string[];
};

export type GraphMediaCard = {
  x: string;
  y: string;
  imageSrc: string;
  alt: string;
  className?: string;
};

export type SeatGeekGraphPoint = {
  milestoneId: string;
  year: string;
  label: string;
  body: string;
  arrLabel?: string;
  enterpriseLabel?: string;
  axis: { x: number; y: number };
  seatGeek: { x: number; y: number };
  enterprise: { x: number; y: number };
  card: { x: string; y: string; align: string };
  mediaCards?: GraphMediaCard[];
  progress: CareerProgress;
};

export const careerMilestones: CareerMilestone[] = [
  {
    id: 'foundations',
    year: '2018-19',
    title: 'Live Nation & Expedia: Data Science roles',
    body:
      'Built data scientist toolkit - R, SQL, Python, Tableau/Looker, experimentation - but was set on Finance/Strategy roles.',
    takeaway: 'Declined full-time return offers',
    phase: 'foundations',
    phaseLabel: 'Foundations',
    progress: { enter: 0.02, active: 0.08, exit: 0.18 },
    track: { x: 13, y: 12 },
  },
  {
    id: 'seatgeek-join',
    year: '2019',
    title: 'Started at SeatGeek',
    body: 'Joined to support newly launched Enterprise SaaS business.',
    arr: '<$100M ARR',
    enterprise: '$3M',
    arrValue: 72,
    enterpriseValue: 3,
    phase: 'seatgeek',
    phaseLabel: 'SeatGeek Tenure',
    progress: { enter: 0.18, active: 0.26, exit: 0.36 },
    track: { x: 21, y: 79 },
    graph: {
      axis: { x: 21, y: 79 },
      card: { x: '20%', y: '68%', align: 'lower-left' },
    },
  },
  {
    id: 'stratfin',
    year: '2020',
    title: 'Founded Enterprise Strategy & Deal Ops team',
    body:
      'Built 10-person team and deal desk owning pricing, DCF models, & approvals for 7-8 figure ACV SaaS deals (incl. two 9-figure ARR).',
    arr: '$186M ARR',
    enterprise: '$24M',
    arrValue: 186,
    enterpriseValue: 24,
    phase: 'seatgeek',
    phaseLabel: 'SeatGeek Tenure',
    progress: { enter: 0.3, active: 0.38, exit: 0.48 },
    track: { x: 38, y: 79 },
    graph: {
      axis: { x: 38, y: 79 },
      card: { x: '36%', y: '53%', align: 'upper-left' },
    },
  },
  {
    id: 'league-deals',
    year: '2022',
    title: 'Team becomes Strategic Finance & Biz Ops',
    body:
      'Elevated to StratFin team, where I led Growth & Special Projects: new product launches, international expansion, Exec offsites, DOJ antitrust work.',
    arr: '$399M ARR',
    enterprise: '$51M',
    arrValue: 399,
    enterpriseValue: 51,
    phase: 'seatgeek',
    phaseLabel: 'SeatGeek Tenure',
    progress: { enter: 0.42, active: 0.5, exit: 0.6 },
    track: { x: 53, y: 79 },
    graph: {
      axis: { x: 53, y: 79 },
      card: { x: '52%', y: '34%', align: 'upper-center' },
    },
  },
  {
    id: 'doj',
    year: '2023',
    title: 'Special Projects: Department of Justice Antitrust Lead',
    body:
      'Led 20+ data scientists, C-Suite, & legal counsel in 6-month+ antitrust project with DOJ. Result: DOJ lawsuit and jury verdict to break up our largest competitor.',
    arr: '$649M ARR',
    enterprise: '$216M',
    arrValue: 649,
    enterpriseValue: 216,
    phase: 'seatgeek',
    phaseLabel: 'SeatGeek Tenure',
    progress: { enter: 0.54, active: 0.62, exit: 0.72 },
    track: { x: 67, y: 79 },
    graph: {
      axis: { x: 67, y: 79 },
      card: { x: '66%', y: '20%', align: 'upper-right' },
      mediaCards: [
        {
          x: '39%',
          y: '27%',
          imageSrc: liveNationNytImage,
          alt: 'New York Times coverage of the Department of Justice lawsuit against Live Nation',
          className: 'is-doj-photo',
        },
        {
          x: '39%',
          y: '45%',
          imageSrc: liveNationApImage,
          alt: 'AP News card about Ticketmaster and Live Nation losing an antitrust trial in New York',
          className: 'is-doj-photo is-ap-news',
        },
      ],
    },
  },
  {
    id: 'interim-cos',
    year: '2024-25',
    title: 'Interim Chief of Staff',
    body:
      'Co-led #1 company initiative ($196M rev impact) with President focused on Search & AI/RAG discoverability.',
    arr: '$900M+ ARR',
    enterprise: '$330M+',
    arrValue: 897,
    enterpriseValue: 330,
    phase: 'seatgeek',
    phaseLabel: 'SeatGeek Tenure',
    progress: { enter: 0.66, active: 0.74, exit: 0.84 },
    track: { x: 80, y: 79 },
    graph: {
      axis: { x: 80, y: 79 },
      card: { x: '80%', y: '12%', align: 'upper-right' },
    },
  },
  {
    id: 'consulting-start',
    year: '2025',
    title: 'Built strategy & ops consulting practice',
    body:
      'Advised 35+ financial firms, Series A consumer startup & OpenAI-backed AI startup in 8 months.',
    takeaway: 'Declined full-time offer at latter.',
    phase: 'independent',
    phaseLabel: 'Independent consultant',
    progress: { enter: 0.84, active: 0.9, exit: 0.96 },
    track: { x: 86, y: 22 },
  },
  {
    id: 'dori-present',
    year: 'July 2025 - Present',
    title: 'Building DORI',
    body:
      'Co-founded AI-native startup building loyalty, marketing & commerce tools for small businesses.',
    takeaway: '6-figure ARR run-rate in 5-mo with 2 FTEs and fleet of agents/skills.',
    phase: 'independent',
    phaseLabel: 'AI-Native Commercial Systems',
    progress: { enter: 0.93, active: 0.98, exit: 1.04 },
    track: { x: 86, y: 72 },
  },
];

export const journeyScene = {
  viewBox: '0 0 100 100',
  masterPath:
    'M 13 2 L 13 71 A 8 8 0 0 0 21 79 L 80 79 A 6 6 0 0 1 86 85 L 86 100',
  graphFrame: {
    left: 18,
    top: 24,
    right: 88,
    baseY: 79,
    yAxisX: 18,
    gridY: [42, 60],
  },
};

const graphMaxValue = 900;

const graphValueToY = (value: number | undefined) => {
  const clampedValue = Math.max(0, Math.min(value ?? 0, graphMaxValue));
  const span = journeyScene.graphFrame.baseY - journeyScene.graphFrame.top;

  return journeyScene.graphFrame.baseY - (clampedValue / graphMaxValue) * span;
};

export const seatGeekGraphPoints: SeatGeekGraphPoint[] = careerMilestones
  .filter((milestone) => milestone.phase === 'seatgeek' && milestone.graph)
  .map((milestone) => ({
    milestoneId: milestone.id,
    year: milestone.year,
    label: milestone.title,
    body: milestone.body,
    arrLabel: milestone.arr,
    enterpriseLabel: milestone.enterprise,
    axis: milestone.graph!.axis,
    seatGeek: {
      x: milestone.graph!.axis.x,
      y: graphValueToY(milestone.arrValue),
    },
    enterprise: {
      x: milestone.graph!.axis.x,
      y: graphValueToY(milestone.enterpriseValue),
    },
    card: milestone.graph!.card,
    mediaCards: milestone.graph!.mediaCards,
    progress: milestone.progress,
  }));
