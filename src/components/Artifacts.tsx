import { ArrowUpRight, FileText } from 'lucide-react';
import { artifactCards } from '../data/artifactCards';

export function Artifacts() {
  return (
    <section className="tab-panel artifacts-panel" id="artifacts">
      <div className="section-head compact-head">
        <p className="eyebrow">Commercial Operator Artifacts</p>
        <h2 className="section-title">Where the next round of proof will live.</h2>
        <p className="section-copy">
          Concise artifacts for the model, tooling, and infrastructure companies where
          commercial strategy has to understand usage, cost, risk, and buyer behavior.
        </p>
      </div>

      <div className="artifact-grid">
        {artifactCards.map((artifact) => (
          <article className="artifact-card glass" key={artifact.id}>
            <div className="artifact-icon">
              <FileText size={20} />
            </div>
            <p className="eyebrow">{artifact.eyebrow}</p>
            <h3>{artifact.title}</h3>
            <p>{artifact.thesis}</p>
            <div className="artifact-signals">
              {artifact.signals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
            <div className="artifact-status">
              <span>{artifact.status}</span>
              <ArrowUpRight size={16} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
