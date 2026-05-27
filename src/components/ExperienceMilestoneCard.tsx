import type { CareerMilestone } from '../data/careerData';

type ExperienceMilestoneCardProps = {
  item: CareerMilestone;
  index: number;
  isActive: boolean;
  isPassed: boolean;
  className?: string;
  showYear?: boolean;
};

export function ExperienceMilestoneCard({
  item,
  index,
  isActive,
  isPassed,
  className = '',
  showYear = false,
}: ExperienceMilestoneCardProps) {
  return (
    <article
      className={`journey-step-card glass ${className} ${
        isActive ? 'is-active' : ''
      } ${isPassed ? 'is-passed' : ''}`}
    >
      <div className="journey-step-topline">
        <span className="journey-step-index">{String(index + 1).padStart(2, '0')}</span>
        {showYear ? <span className="journey-step-year">{item.year}</span> : null}
        <span className="journey-step-phase">{item.phaseLabel}</span>
      </div>

      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {item.takeaway ? <p className="journey-step-takeaway">{item.takeaway}</p> : null}

      {(item.arr || item.enterprise) ? (
        <div className="journey-metric-grid">
          {item.arr ? (
            <div className="journey-metric-card">
              <span>SeatGeek ARR</span>
              <strong>{item.arr}</strong>
            </div>
          ) : null}
          {item.enterprise ? (
            <div className="journey-metric-card">
              <span>Enterprise ARR</span>
              <strong>{item.enterprise}</strong>
            </div>
          ) : null}
        </div>
      ) : null}

      {item.pills ? (
        <div className="journey-pill-grid">
          {item.pills.map((pill) => (
            <span className="journey-info-pill" key={pill}>
              {pill}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
