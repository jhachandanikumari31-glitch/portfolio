import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { SiteFooter } from '@/components/SiteFooter';
import { MAP_EMBED_URL, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Grihanirman for IoT projects, STEM programs, and firmware consulting.',
};

export default function ContactPage() {
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-copy">
          <p className="eyebrow">Contact</p>
          <h1>Get in touch with our team.</h1>
          <p>Reach us by email, phone, or visit our office location in person.</p>
        </div>
      </section>

      <section className="section contact-grid">
        <div className="contact-card">
          <h3>Email</h3>
          <p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
        <div className="contact-card">
          <h3>Phone</h3>
          <p>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
          </p>
        </div>
        <div className="contact-card">
          <h3>Location</h3>
          <p>{SITE.address}</p>
        </div>
      </section>

      <section className="section contact-form-section">
        <div className="section-header">
          <p className="eyebrow">Message us</p>
          <h2>Send an inquiry</h2>
        </div>
        <ContactForm />
      </section>

      <section className="section map-section">
        <div className="section-header">
          <p className="eyebrow">Visit Us</p>
          <h2>Office Location</h2>
        </div>
        <div className="map-frame">
          <iframe
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Grihanirman office location map"
          />
        </div>
      </section>

      <SiteFooter
        small
        title="Questions or project ideas?"
        description="Contact us today and we'll help you plan the right path forward."
        cta={{ href: `mailto:${SITE.email}`, label: 'Email Now' }}
      />
    </>
  );
}
