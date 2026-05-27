import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  careerMilestones,
  journeyScene,
  seatGeekGraphPoints,
  type CareerMilestone,
  type CareerProgress,
  type SeatGeekGraphPoint,
} from '../data/careerData';
import { ExperienceMilestoneCard } from './ExperienceMilestoneCard';
import './CareerTimeline.css';

type MilestoneState = {
  opacity: number;
  isActive: boolean;
  isPassed: boolean;
};

type SectionProgressOptions = {
  startOffset?: number;
  distanceViewportFactor?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useSectionProgress(
  sectionRef: React.RefObject<HTMLElement>,
  { startOffset = 0.16, distanceViewportFactor = 0.6 }: SectionProgressOptions = {},
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const start = window.scrollY + rect.top - window.innerHeight * startOffset;
      const distance = Math.max(
        section.offsetHeight - window.innerHeight * distanceViewportFactor,
        1,
      );
      const nextProgress = (window.scrollY - start) / distance;
      setProgress(clamp(nextProgress, 0, 1));
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [distanceViewportFactor, sectionRef, startOffset]);

  return progress;
}

function buildPartialPath(pathElement: SVGPathElement | null, progress: number, steps = 96) {
  if (!pathElement) return '';

  const totalLength = pathElement.getTotalLength();
  const safeProgress = clamp(progress, 0, 1);

  if (safeProgress <= 0 || totalLength <= 0) return '';

  const targetLength = totalLength * safeProgress;
  const segmentCount = Math.max(2, Math.ceil(steps * safeProgress));
  const points: string[] = [];

  for (let index = 0; index <= segmentCount; index += 1) {
    const distance = (targetLength * index) / segmentCount;
    const point = pathElement.getPointAtLength(distance);
    points.push(`${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`);
  }

  return points.join(' ');
}

function usePartialPath(pathRef: React.RefObject<SVGPathElement>, progress: number, steps = 96) {
  const [segmentPath, setSegmentPath] = useState('');

  useEffect(() => {
    const update = () => {
      setSegmentPath(buildPartialPath(pathRef.current, progress, steps));
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, [pathRef, progress, steps]);

  return segmentPath;
}

function getMilestoneState(progress: number, milestone: { progress: CareerProgress }): MilestoneState {
  const { enter, active, exit } = milestone.progress;
  const beforeActive = Math.min(0.052, Math.max(active - enter, 0.001) * 0.82);
  const afterActive = Math.min(0.052, Math.max(exit - active, 0.001) * 0.82);
  const visibleStart = active - beforeActive;
  const visibleEnd = active + afterActive;
  const fadeWindow = Math.min(0.018, Math.max((visibleEnd - visibleStart) / 4, 0.001));
  const fullStart = visibleStart + fadeWindow;
  const fullEnd = visibleEnd - fadeWindow;

  if (progress <= visibleStart) return { opacity: 0, isActive: false, isPassed: progress >= active };

  if (progress < fullStart) {
    return {
      opacity: clamp((progress - visibleStart) / fadeWindow, 0, 1),
      isActive: false,
      isPassed: false,
    };
  }

  if (progress <= fullEnd) {
    return {
      opacity: 1,
      isActive: true,
      isPassed: true,
    };
  }

  if (progress <= visibleEnd) {
    return {
      opacity: clamp((visibleEnd - progress) / fadeWindow, 0, 1),
      isActive: false,
      isPassed: true,
    };
  }

  return { opacity: 0, isActive: false, isPassed: true };
}

function buildMonotoneTangents(points: Array<{ x: number; y: number }>) {
  const slopes = points.slice(0, -1).map((point, index) => {
    const next = points[index + 1];
    return (next.y - point.y) / Math.max(next.x - point.x, 0.001);
  });

  return points.map((point, index) => {
    if (index === 0) return slopes[0] ?? 0;
    if (index === points.length - 1) return slopes[slopes.length - 1] ?? 0;

    const previousSlope = slopes[index - 1];
    const nextSlope = slopes[index];

    if (previousSlope * nextSlope <= 0) return 0;

    const previousWidth = point.x - points[index - 1].x;
    const nextWidth = points[index + 1].x - point.x;
    const previousWeight = 2 * nextWidth + previousWidth;
    const nextWeight = nextWidth + 2 * previousWidth;

    return (
      (previousWeight + nextWeight) /
      (previousWeight / previousSlope + nextWeight / nextSlope)
    );
  });
}

function getSmoothJCurvePath(
  points: Array<{ x: number; y: number; seatGeekY?: number; enterpriseY?: number }>,
  intensity: 'primary' | 'secondary' = 'primary',
) {
  const getY = (point: { y: number; seatGeekY?: number; enterpriseY?: number }) =>
    intensity === 'primary' ? point.seatGeekY ?? point.y : point.enterpriseY ?? point.y;

  const curvePoints = points.map((point) => ({
    x: point.x,
    y: getY(point),
  }));
  const tangents = buildMonotoneTangents(curvePoints);

  return curvePoints.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;

    const previousPoint = curvePoints[index - 1];
    const dx = point.x - previousPoint.x;
    const controlOneX = previousPoint.x + dx / 3;
    const controlTwoX = point.x - dx / 3;
    const controlOneY = previousPoint.y + (tangents[index - 1] * dx) / 3;
    const controlTwoY = point.y - (tangents[index] * dx) / 3;

    return `${path}
      C ${controlOneX} ${controlOneY}, ${controlTwoX} ${controlTwoY}, ${point.x} ${point.y}`;
  }, '');
}

function renderGraphCard(point: SeatGeekGraphPoint, progress: number) {
  const state = getMilestoneState(progress, { progress: point.progress });
  const isVisible = state.opacity > 0.05;

  return (
    <Fragment key={point.milestoneId}>
      <article
        className={`journey-graph-card ${point.card.align} ${isVisible ? 'is-visible' : ''}`}
        style={{
          left: point.card.x,
          top: point.card.y,
          opacity: state.opacity,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <strong>{point.label}</strong>
        <p>{point.body}</p>
        <div className="journey-graph-metrics">
          {point.arrLabel ? <em className="is-arr">{point.arrLabel}</em> : null}
          {point.enterpriseLabel ? (
            <em className="is-enterprise">{point.enterpriseLabel}</em>
          ) : null}
        </div>
      </article>

      {point.mediaCards?.map((mediaCard) => (
        <div
          className={`journey-graph-photo-card ${mediaCard.className ?? ''} ${
            isVisible ? 'is-visible' : ''
          }`}
          key={`${point.milestoneId}-${mediaCard.imageSrc}`}
          style={{
            left: mediaCard.x,
            top: mediaCard.y,
            opacity: state.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img src={mediaCard.imageSrc} alt={mediaCard.alt} />
        </div>
      ))}
    </Fragment>
  );
}

function YearPill({
  year,
  className = '',
  style,
}: {
  year: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`journey-year-pill ${className}`} style={style}>
      {year}
    </div>
  );
}

const topMilestones = careerMilestones.filter((item) => item.phase !== 'independent');
const consultingMilestones = careerMilestones.filter((item) => item.phase === 'independent');
const railLeadPath = 'M 13 2 L 13 71 A 8 8 0 0 0 21 79';
const railAxisPath = 'M 21 79 L 80 79';
const railExitPath = 'M 80 79 A 6 6 0 0 1 86 85 L 86 100';

export function CareerTimeline() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const railLeadRef = useRef<SVGPathElement>(null);
  const railExitRef = useRef<SVGPathElement>(null);
  const bottomPathRef = useRef<SVGPathElement>(null);
  const consultingCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [consultingStates, setConsultingStates] = useState<MilestoneState[]>(
    () => consultingMilestones.map(() => ({ opacity: 0, isActive: false, isPassed: false })),
  );
  const topProgress = useSectionProgress(topRef);
  const bottomProgress = useSectionProgress(bottomRef, {
    startOffset: 0.9,
    distanceViewportFactor: 0,
  });
  const graphOpacity =
    clamp((topProgress - 0.22) / 0.08, 0, 1) *
    (1 - clamp((topProgress - 0.82) / 0.08, 0, 1));
  const graphProgress = clamp((topProgress - 0.26) / 0.54, 0, 1);
  const graphRevealX = 21 + (80 - 21) * graphProgress;
  const leadRailProgress = clamp(topProgress / 0.26, 0, 1);
  const exitRailProgress = clamp((topProgress - 0.74) / 0.18, 0, 1);
  const leadRailProgressPath = usePartialPath(railLeadRef, leadRailProgress, 220);
  const exitRailProgressPath = usePartialPath(railExitRef, exitRailProgress, 180);
  const bottomProgressPath = usePartialPath(bottomPathRef, bottomProgress, 24);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;

      const nextStates = consultingMilestones.map((_, index) => {
        const element = consultingCardRefs.current[index];
        if (!element) return { opacity: 0, isActive: false, isPassed: false };

        const rect = element.getBoundingClientRect();
        const fadeIn = clamp((viewportHeight - rect.top) / (viewportHeight * 0.28), 0, 1);
        const fadeOut = clamp(rect.bottom / (viewportHeight * 0.34), 0, 1);
        const opacity = Math.min(fadeIn, fadeOut);

        return {
          opacity,
          isActive: opacity > 0.86,
          isPassed: rect.top < viewportHeight * 0.72,
        };
      });

      setConsultingStates(nextStates);
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const seatGeekSeriesPoints = useMemo(
    () =>
      seatGeekGraphPoints.map((point) => ({
        x: point.axis.x,
        y: point.axis.y,
        seatGeekY: point.seatGeek.y,
        enterpriseY: point.enterprise.y,
      })),
    [],
  );

  const seatGeekCurvePath = useMemo(
    () => getSmoothJCurvePath(seatGeekSeriesPoints, 'primary'),
    [seatGeekSeriesPoints],
  );
  const enterpriseCurvePath = useMemo(
    () => getSmoothJCurvePath(seatGeekSeriesPoints, 'secondary'),
    [seatGeekSeriesPoints],
  );

  return (
    <section id="career" className="tab-panel career-panel experience-journey-section">
      <div className="container" id="career-intro">
        <div className="section-head journey-section-head">
          <div className="eyebrow">Resume / Career</div>
          <h2 className="section-title">From strategic finance to Chief of Staff to Founder</h2>
        </div>
      </div>

      <div ref={topRef} className="journey-top">
        <div className="journey-stage-layer" aria-hidden="true">
          <div className="journey-stage-sticky">
            <div className="journey-stage-bleed">
              <div className="journey-graph-surface" style={{ opacity: graphOpacity * 0.94 }} />

              <div className="journey-graph-header" style={{ opacity: graphOpacity }}>
                <div className="mini-kicker">SeatGeek tenure</div>
                <div className="journey-graph-title">High Trust, High Growth</div>
                <div className="journey-graph-legend">
                  <span>
                    <i className="journey-legend-line is-green" />
                    SeatGeek ARR
                  </span>
                  <span>
                    <i className="journey-legend-line is-blue" />
                    Enterprise ARR
                  </span>
                </div>
              </div>

              <div className="journey-graph-axis-label journey-graph-axis-y" style={{ opacity: graphOpacity }}>
                {[
                  { label: '$900M', y: journeyScene.graphFrame.top },
                  { label: '$600M', y: journeyScene.graphFrame.gridY[0] },
                  { label: '$300M', y: journeyScene.graphFrame.gridY[1] },
                  { label: '$0', y: journeyScene.graphFrame.baseY },
                ].map((tick) => (
                  <span key={tick.label} style={{ top: `${tick.y}%` }}>
                    {tick.label}
                  </span>
                ))}
              </div>

              <svg className="journey-stage-svg" viewBox={journeyScene.viewBox} preserveAspectRatio="none">
                <defs>
                  <clipPath id="journey-graph-reveal" clipPathUnits="userSpaceOnUse">
                    <rect x="0" y="0" width={graphRevealX} height="100" />
                  </clipPath>
                </defs>

                <g className="journey-grid" style={{ opacity: graphOpacity }}>
                  <line
                    x1={journeyScene.graphFrame.yAxisX}
                    y1={journeyScene.graphFrame.top}
                    x2={journeyScene.graphFrame.yAxisX}
                    y2={journeyScene.graphFrame.baseY}
                  />
                  <line
                    x1={journeyScene.graphFrame.left}
                    y1={journeyScene.graphFrame.top}
                    x2={journeyScene.graphFrame.right}
                    y2={journeyScene.graphFrame.top}
                  />
                  {journeyScene.graphFrame.gridY.map((gridY) => (
                    <line
                      key={gridY}
                      x1={journeyScene.graphFrame.left}
                      y1={gridY}
                      x2={journeyScene.graphFrame.right}
                      y2={gridY}
                    />
                  ))}
                </g>

                <path d={journeyScene.masterPath} className="journey-master-path is-base" />
                <path d={railLeadPath} ref={railLeadRef} className="journey-ref-path" />
                <path d={railExitPath} ref={railExitRef} className="journey-ref-path" />
                {leadRailProgressPath ? (
                  <path d={leadRailProgressPath} className="journey-master-path is-progress" />
                ) : null}
                <path
                  d={railAxisPath}
                  className="journey-master-path is-progress"
                  clipPath="url(#journey-graph-reveal)"
                />
                {exitRailProgressPath ? (
                  <path d={exitRailProgressPath} className="journey-master-path is-progress" />
                ) : null}

                <path
                  d={seatGeekCurvePath}
                  className="journey-series is-green is-shadow"
                  style={{ opacity: graphOpacity * 0.14 }}
                />
                <path
                  d={seatGeekCurvePath}
                  className="journey-series is-green"
                  clipPath="url(#journey-graph-reveal)"
                  style={{ opacity: graphOpacity }}
                />
                <path
                  d={enterpriseCurvePath}
                  className="journey-series is-blue is-shadow"
                  style={{ opacity: graphOpacity * 0.12 }}
                />
                <path
                  d={enterpriseCurvePath}
                  className="journey-series is-blue"
                  clipPath="url(#journey-graph-reveal)"
                  style={{ opacity: graphOpacity }}
                />
              </svg>

              <div className="journey-node-layer">
                <YearPill
                  year={topMilestones[0].year}
                  className="is-track-anchor is-track-anchor-left"
                  style={{
                    left: `${topMilestones[0].track.x}%`,
                    top: `${topMilestones[0].track.y}%`,
                  }}
                />
                {topMilestones.map((milestone) => {
                  const state = getMilestoneState(topProgress, milestone);
                  return (
                    <span
                      key={milestone.id}
                      className={`journey-node-dot ${state.isPassed ? 'is-reached' : ''}`}
                      style={{
                        left: `${milestone.track.x}%`,
                        top: `${milestone.track.y}%`,
                      }}
                    />
                  );
                })}
              </div>

              <div className="journey-series-dot-layer">
                {seatGeekGraphPoints.map((point) => {
                  const state = getMilestoneState(topProgress, { progress: point.progress });
                  return (
                    <div key={point.milestoneId}>
                      <span
                        className={`journey-series-dot is-green ${state.isPassed ? 'is-active' : ''}`}
                        style={{
                          left: `${point.seatGeek.x}%`,
                          top: `${point.seatGeek.y}%`,
                          opacity: graphOpacity,
                        }}
                      />
                      <span
                        className={`journey-series-dot is-blue ${state.isPassed ? 'is-active' : ''}`}
                        style={{
                          left: `${point.enterprise.x}%`,
                          top: `${point.enterprise.y}%`,
                          opacity: graphOpacity,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="journey-graph-card-layer">
                {seatGeekGraphPoints.map((point) => renderGraphCard(point, topProgress))}
              </div>

              <div className="journey-axis-pill-row" style={{ opacity: graphOpacity }}>
                {seatGeekGraphPoints.map((point) => {
                  const state = getMilestoneState(topProgress, { progress: point.progress });
                  return (
                    <YearPill
                      key={point.milestoneId}
                      year={point.year}
                      className={`${state.isActive ? 'is-active' : ''} ${
                        state.opacity > 0.04 ? 'is-visible' : ''
                      }`}
                      style={{
                        left: `${point.axis.x}%`,
                        top: `calc(${journeyScene.graphFrame.baseY}% + var(--journey-pill-track-gap))`,
                        opacity: state.opacity,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="journey-top-story">
            <section className="journey-panel journey-panel-foundations">
              <div className="journey-opposed-layout is-left">
                <YearPill year={topMilestones[0].year} className="is-side" />
                <div
                  className="journey-panel-card-wrap"
                  style={{
                    opacity: getMilestoneState(topProgress, topMilestones[0]).opacity || 0.12,
                    transform: `translateY(${
                      (1 - getMilestoneState(topProgress, topMilestones[0]).opacity) * 28
                    }px)`,
                  }}
                >
                  <ExperienceMilestoneCard
                    item={topMilestones[0]}
                    index={0}
                    isActive={getMilestoneState(topProgress, topMilestones[0]).isActive}
                    isPassed={getMilestoneState(topProgress, topMilestones[0]).isPassed}
                  />
                </div>
              </div>
            </section>

            <div className="journey-mobile-graph-header">
              <div className="mini-kicker">SeatGeek tenure</div>
              <div className="journey-graph-title">High Trust, High Growth</div>
              <div className="journey-graph-legend">
                <span>
                  <i className="journey-legend-line is-green" />
                  SeatGeek ARR
                </span>
                <span>
                  <i className="journey-legend-line is-blue" />
                  Enterprise ARR
                </span>
              </div>
            </div>

            {seatGeekGraphPoints.map((point, seatGeekIndex) => {
              const milestone = topMilestones[seatGeekIndex + 1] as CareerMilestone;
              return (
                <section key={point.milestoneId} className="journey-panel journey-panel-seatgeek">
                  <div className="journey-panel-spacer" />
                  <div className="journey-mobile-card">
                    <YearPill year={point.year} className="is-mobile-axis" />
                    <ExperienceMilestoneCard
                      item={milestone}
                      index={seatGeekIndex + 1}
                      isActive={getMilestoneState(topProgress, milestone).isActive}
                      isPassed={getMilestoneState(topProgress, milestone).isPassed}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={bottomRef} className="journey-bottom">
        <div className="journey-bottom-rail-layer" aria-hidden="true">
          <div className="journey-bottom-rail">
            <svg className="journey-bottom-rail-svg" viewBox={journeyScene.viewBox} preserveAspectRatio="none">
              <path d="M 86 0 L 86 100" className="journey-master-path is-base" />
              <path d="M 86 0 L 86 100" className="journey-ref-path" ref={bottomPathRef} />
              {bottomProgressPath ? (
                <path d={bottomProgressPath} className="journey-master-path is-progress" />
              ) : null}
            </svg>
            {consultingMilestones.map((item) => (
              <YearPill
                key={`${item.id}-track-pill`}
                year={item.year}
                className="is-track-anchor is-track-anchor-right"
                style={{
                  left: '86%',
                  top: `${item.id === 'consulting-start' ? 22 : 72}%`,
                }}
              />
            ))}
            {consultingMilestones.map((item, index) => {
              const state = consultingStates[index] ?? { opacity: 0, isActive: false, isPassed: false };
              return (
                <span
                  key={item.id}
                  className={`journey-node-dot is-right-rail ${state.isPassed ? 'is-reached' : ''}`}
                  style={{ top: `${item.id === 'consulting-start' ? 22 : 72}%` }}
                />
              );
            })}
          </div>
        </div>

        <div className="container">
          <div className="journey-bottom-story">
            {consultingMilestones.map((item, index) => {
              const state = consultingStates[index] ?? { opacity: 0, isActive: false, isPassed: false };
              return (
                <section key={item.id} className="journey-panel journey-panel-consulting">
                  <div className="journey-opposed-layout is-right">
                    <div
                      ref={(element) => {
                        consultingCardRefs.current[index] = element;
                      }}
                      className="journey-panel-card-wrap"
                      style={{
                        opacity: state.opacity || 0.12,
                        transform: `translateY(${(1 - state.opacity) * 28}px)`,
                      }}
                    >
                      <ExperienceMilestoneCard
                        item={item}
                        index={index + topMilestones.length}
                        isActive={state.isActive}
                        isPassed={state.isPassed}
                      />
                    </div>
                    <YearPill year={item.year} className="is-side is-right" />
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container">
        <section className="timeline-next-cta glass">
          <div>
            <p className="eyebrow timeline-next-eyebrow">Next</p>
            <h2>See portfolio of AI agents / skills and other commercial artifacts</h2>
          </div>
          <div className="timeline-next-actions">
            <a className="button primary-button" href="#agents">
              AI Agents & Skills
            </a>
            <a className="button secondary-button" href="#artifacts">
              Commercial Artifacts
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
