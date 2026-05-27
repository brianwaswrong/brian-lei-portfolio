import { Github, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section className="tab-panel contact-panel" id="contact">
      <div className="contact-card glass">
        <p className="eyebrow">Contact</p>
        <h2>Let’s talk about commercial systems, AI operators, and useful software.</h2>
        <p>
          I’m especially interested in teams where pricing, GTM systems, agentic workflows,
          and technical product taste all matter at the same time.
        </p>
        <div className="contact-actions">
          <a className="button primary-button" href="mailto:brianlei22@gmail.com">
            <Mail size={18} />
            Email
          </a>
          <a
            className="button secondary-button"
            href="https://www.linkedin.com/in/brian-lei"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a
            className="button secondary-button"
            href="https://github.com/brianwaswrong"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
