import Link from 'next/link';
import { HeroCarousel } from '@/components/HeroCarousel';
import { SiteFooter } from '@/components/SiteFooter';
import { PARTNERS, SERVICES, STATS, TESTIMONIALS } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Connected solutions for modern learning and automation</p>
          <h1>Professional IoT, STEM, Firmware and Workshop Services</h1>
          <p>
            Build smart systems, empower learners, and deploy reliable embedded solutions with a
            polished partner.
          </p>
          <div className="hero-cta">
            <Link className="button primary" href="/contact">
              Book a Consultation
            </Link>
            <a className="button secondary" href="#services">
              View Services
            </a>
          </div>
        </div>
        <div className="hero-media">
          <HeroCarousel />
        </div>
      </section>

      <section className="figures-strip" aria-label="Company highlights">
        {STATS.map((stat) => (
          <div key={stat.label} className="figure-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="overview grid-two">
        <article>
          <h2>About Our Company</h2>
          <p>
            Grihanirman is a technology services company specializing in IoT development, STEM
            teaching, firmware engineering, and immersive workshops. We deliver professional digital
            solutions with real-world impact.
          </p>
        </article>
        <div className="overview-cards">
          <article className="card accent-card">
            <h3>Our Mission</h3>
            <p>
              To empower communities through reliable IoT systems, experiential STEM learning, and
              efficient firmware innovation.
            </p>
          </article>
          <article className="card accent-card">
            <h3>Our Vision</h3>
            <p>
              To become a trusted technology partner for education and automation, driving positive
              change across industries.
            </p>
          </article>
          <article className="card accent-card">
            <h3>Core Statement</h3>
            <p>
              We blend creativity, precision, and professionalism to bring every project to life
              with clarity and confidence.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-header">
          <p className="eyebrow">Services</p>
          <h2>What We Deliver</h2>
        </div>
        <div className="service-grid">
          {SERVICES.map((service) => (
            <article key={service.title} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section testimonials">
        <div className="section-header">
          <p className="eyebrow">Client Voices</p>
          <h2>Testimonials</h2>
        </div>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <article key={t.author} className="testimonial-card">
              <p>&ldquo;{t.quote}&rdquo;</p>
              <span>– {t.author}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section partners">
        <div className="section-header">
          <p className="eyebrow">Partners</p>
          <h2>Trusted By</h2>
        </div>
        <div className="partner-grid">
          {PARTNERS.map((name) => (
            <div key={name} className="partner-logo">
              {name}
            </div>
          ))}
        </div>
      </section>

      <SiteFooter
        title="Ready to build something smart?"
        description="Reach out for a consultation, project roadmap, or workshop plan."
        cta={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
