import { BriefcaseBusiness } from 'lucide-react';
import heroPrism from '../assets/hero.png';

export function Welcome() {
  return (
    <section className="tab-panel welcome-panel" id="welcome">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Commercial Strategy & AI Systems</p>
          <h1>Welcome! I'm Brian.</h1>
          <p className="hero-subtitle">
            I worked in live events &
            music for eight years. I got to build SeatGeek's BizOps/Strategy team and deal desk, work with the DOJ, serve as temp Chief-of-Staff, & attend a few Eras Tour shows!
            <br />
            <br />
            In 2025, I cofounded DORI, building tools for small
            businesses end-end with AI.
            <br />
            <br />
            Now I'm looking to combine my commercial & AI-systems experience at the new intersection exciting me most: AI infra & tooling.
          </p>

        </div>

        <div className="hero-visual" aria-label="Commercial AI systems overview">
          {/* <div className="hero-visual-top">
            <img src={heroPrism} alt="Layered dark interface prism" />
          </div> */}
          <div className="operator-grid">
            <article>
              <BriefcaseBusiness size={18} />
              <span>Founding BizOps / Strategic Finance at SeatGeek</span>
              <strong>{'Scaled <$100M to $1B+ ARR'}</strong>
            </article>
            <article>
              <span className="dot-visual" />
              <span>Built Enterprise Deal Desk at SeatGeek</span>
              <strong>7-8 figure ACV Deals: Pricing, deal models, approvals</strong>
            </article>
            <article>
              <span className="line-visual" />
              <span>AI-native Founder DORI</span>
              <strong>Scaled to 6-figure ARR with 3 employees & fleet of agents/workflows</strong>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
