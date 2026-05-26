import type { Metadata } from 'next';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Grihanirman — IoT, STEM education, and firmware expertise.',
};

export default function AboutPage() {
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-copy">
          <p className="eyebrow">About Us</p>
          <h1>A team focused on technology, education, and practical results.</h1>
          <p>
            We combine technical expertise with professional service to help organizations scale
            their IoT, STEM, and embedded systems efforts.
          </p>
        </div>
      </section>

      <section className="section company-story">
        <div className="section-header">
          <p className="eyebrow">Company Overview</p>
          <h2>Who We Are</h2>
        </div>
        <div className="story-grid">
          <div>
            <p>
              Grihanirman provides design and development services for intelligent systems, technical
              education, and device-level firmware. Our clients value our transparency, structured
              delivery, and commitment to long-term success.
            </p>
            <ul className="feature-list">
              <li>Clear project milestones</li>
              <li>Professional documentation</li>
              <li>Hands-on implementation support</li>
            </ul>
          </div>
          <div className="story-card">
            <h3>Message from the CEO</h3>
            <p>
              &ldquo;At Grihanirman, we believe innovation should be accessible and dependable. Our
              goal is to create systems that make sense, teach the next generation, and deliver
              measurable value.&rdquo;
            </p>
            <span className="signature">— CEO, Grihanirman Technologies</span>
          </div>
        </div>
      </section>

      <section className="section values-grid">
        <article className="value-card">
          <h3>Expertise</h3>
          <p>Deep domain knowledge in IoT connectivity, firmware, and educational technology.</p>
        </article>
        <article className="value-card">
          <h3>Professionalism</h3>
          <p>We deliver polished outcomes with thoughtful communication and strong follow-through.</p>
        </article>
        <article className="value-card">
          <h3>Innovation</h3>
          <p>New ideas meet practical execution in every workshop, product, and learning solution.</p>
        </article>
      </section>

      <SiteFooter
        small
        title="Partner with us for smart growth"
        description="Reach out and discover how our services can accelerate your next project."
        cta={{ href: '/contact', label: 'Connect Today' }}
      />
    </>
  );
}
