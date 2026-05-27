import { useState } from 'react';
import { Bot, CheckCircle2, ChevronRight, Code2, LineChart, Workflow } from 'lucide-react';
import { agentSystems, type AgentSystem } from '../data/agentSystems';
import { ClaudeSurfStory } from './ClaudeSurfStory';
import { DealDeskStory } from './DealDeskStory';
import { DesignEngineerStory } from './DesignEngineerStory';
import { DemoCreationStory } from './DemoCreationStory';

const mockupIcons = {
  pipeline: LineChart,
  demo: Workflow,
  design: Bot,
  orchestrator: Code2,
};

function AgentMockup({ system }: { system: AgentSystem }) {
  const Icon = mockupIcons[system.mockup];

  return (
    <div className={`agent-mockup is-${system.mockup}`} aria-hidden="true">
      <div className="mockup-header">
        <Icon size={18} />
        <span>{system.eyebrow}</span>
      </div>
      <div className="mockup-body">
        <div className="mockup-left">
          {system.inputs.slice(0, 4).map((input, index) => (
            <div className="mockup-row" key={input} style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}>
              <span />
              <em>{input}</em>
            </div>
          ))}
        </div>
        <div className="mockup-flow">
          <span />
          <span />
          <span />
        </div>
        <div className="mockup-right">
          {system.outputs.slice(0, 4).map((output) => (
            <strong key={output}>{output}</strong>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AgentPortfolio() {
  const [activeId, setActiveId] = useState(agentSystems[0].id);
  const activeSystem = agentSystems.find((system) => system.id === activeId) ?? agentSystems[0];

  return (
    <section className="tab-panel agents-panel" id="agents">
      <div className="section-head compact-head">
        <p className="eyebrow">Agent / Harness / Skill Portfolio</p>
        <h2 className="section-title">50x'ing engineering, design & GTM with agents</h2>
        <p className="section-copy">
          My cofounder & I became obsessed with automating every process possible - demo creation, GTM research, pipeline notes - via workflows to serve small businesses with higher quality software, faster.
        </p>
      </div>

      <div className="agent-layout">
        <div className="agent-selector" role="list" aria-label="Agent systems">
          {agentSystems.map((system) => (
            <button
              key={system.id}
              type="button"
              role="listitem"
              className={`agent-card-button ${activeId === system.id ? 'is-active' : ''}`}
              onClick={() => setActiveId(system.id)}
            >
              <span className="agent-card-kicker">{system.eyebrow}</span>
              <strong>{system.title}</strong>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>

        {activeSystem.id === 'deal-desk' ? (
          <DealDeskStory />
        ) : activeSystem.id === 'demo-engine' ? (
          <DemoCreationStory />
        ) : activeSystem.id === 'design-engineer' ? (
          <DesignEngineerStory />
        ) : activeSystem.id === 'claude-surf' ? (
          <ClaudeSurfStory />
        ) : (
          <article className="agent-detail glass">
            <div className="agent-detail-top">
              <div>
                <p className="eyebrow">{activeSystem.eyebrow}</p>
                <h3>{activeSystem.title}</h3>
              </div>
              <div className="agent-tag-row">
                {activeSystem.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <AgentMockup system={activeSystem} />

            <div className="agent-detail-grid">
              <div>
                <h4>Business case</h4>
                <p>{activeSystem.businessCase}</p>
              </div>
              <div>
                <h4>Architecture shape</h4>
                <p>{activeSystem.architecture}</p>
              </div>
            </div>

            <div className="agent-loop">
              {activeSystem.loop.map((step, index) => (
                <div className="agent-loop-step" key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>

            <div className="agent-impact">
              <CheckCircle2 size={18} />
              <p>{activeSystem.impact}</p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
