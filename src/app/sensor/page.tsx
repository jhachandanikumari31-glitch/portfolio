import type { Metadata } from 'next';
import { SensorDashboard } from '@/components/SensorDashboard';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Sensor Data',
  description: 'Live IoT sensor dashboard with charts, gauges, and sparklines.',
};

export default function SensorPage() {
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-copy">
          <p className="eyebrow">Sensor Data</p>
          <h1>Real-time insights with charts and live readings.</h1>
          <p>
            Monitor ten sensor streams with gauges, sparklines, and an overview bar chart. Connect
            your hardware API later to replace demo data.
          </p>
        </div>
      </section>

      <SensorDashboard />

      <SiteFooter
        small
        title="Sensor management made simple"
        description="Replace demo values with your MQTT or REST endpoint when ready."
        cta={{ href: '/contact', label: 'Integrate your devices' }}
      />
    </>
  );
}
