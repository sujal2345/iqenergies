import { ArrowRight, BatteryCharging, Check, ShieldCheck, SunMedium } from 'lucide-react'
import { FeatureGrid, SectionTitle, StatRow, SubpageShell } from '@/components/subpage-shell'

const values = [
  { title: 'Design-led solutions', text: 'We shape each installation around your usage profile, roof geometry, and target return on investment.', icon: <SunMedium /> },
  { title: 'Trustworthy execution', text: 'From concept to commissioning, our team keeps project quality, timelines and compliance in focus.', icon: <ShieldCheck /> },
  { title: 'Future-ready energy', text: 'We connect solar generation, storage and smart infrastructure to prepare you for growing demand.', icon: <BatteryCharging /> },
]

const stats = [
  { value: '12+', label: 'years of experience' },
  { value: '500+', label: 'installations delivered' },
  { value: '10+', label: 'MW installed' },
  { value: '25+', label: 'cities served' },
]

export default function AboutPage() {
  return (
    <SubpageShell
      eyebrow="About IQ Energies"
      title="Energy that works for life"
      description="We help homes, businesses and communities design smarter, cleaner and more resilient energy systems with practical support from start to finish."
      heroImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section">
        <div className="two-column-panel">
          <div>
            <SectionTitle eyebrow="Who we are" title="A clean-energy partner built for Indian realities" description="IQ Energies blends technical expertise with a simple philosophy: make renewable energy useful, reliable and accessible for everyday life." />
          </div>
          <div className="panel-copy">
            <p>We work across residential rooftops, commercial power systems, EV ecosystem planning and public infrastructure. Every recommendation is shaped around site conditions, operating patterns and real-world savings.</p>
            <p>Our engagement goes beyond installation. We help clients evaluate design choices, choose the right technology stack and maintain momentum long after commissioning.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle eyebrow="Our strengths" title="What makes our approach different" />
        <FeatureGrid items={values} />
      </section>

      <section className="page-section tinted-panel">
        <SectionTitle eyebrow="Impact" title="The numbers behind our clean-energy work" />
        <StatRow items={stats} />
      </section>

      <section className="page-section">
        <div className="split-visual-card">
          <div className="visual-stack">
            <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=90" alt="Solar engineering team" />
            <div className="floating-note">
              <strong>India-specific design</strong>
              <span>We engineer for climate, load, grid patterns and long-term performance.</span>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Our promise" title="Reliable systems, clear guidance, accountable delivery" />
            <ul className="check-list">
              <li><Check /> Site assessment and honest feasibility checks</li>
              <li><Check /> End-to-end design, procurement and installation</li>
              <li><Check /> Ongoing support, monitoring and lifecycle optimization</li>
              <li><Check /> Practical recommendations aligned with your budget and goals</li>
            </ul>
            <a href="/contact" className="button button-green">
              Speak to our team <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </SubpageShell>
  )
}
