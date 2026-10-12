import { ArrowRight, Check, Leaf, ShieldCheck, SunMedium, Zap } from 'lucide-react'
import { FeatureGrid, SectionTitle, StatRow, SubpageShell } from '@/components/subpage-shell'

const benefits = [
  { title: 'Lower power bills', text: 'Generate a large share of your daytime electricity demand and reduce dependence on rising grid tariffs.', icon: <Leaf /> },
  { title: 'Reliable performance', text: 'Engineered with premium components and proper design checks for consistent output over the long term.', icon: <ShieldCheck /> },
  { title: 'Smart energy control', text: 'Combine generation with storage or net metering strategies for more resilient power management.', icon: <Zap /> },
]

const stats = [
  { value: '3kW', label: 'starter residential design' },
  { value: '25 yrs', label: 'panel life expectation' },
  { value: '₹1.5L', label: 'starting package range' },
  { value: '90%', label: 'daytime offset potential' },
]

export default function SolarPage() {
  return (
    <SubpageShell
      eyebrow="Solar"
      title="Solar systems designed for homes, rooftops and modern businesses"
      description="From compact residential rooftops to larger commercial arrays, our systems are built to maximize clean generation without compromising reliability."
      heroImage="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section">
        <div className="two-column-panel">
          <div>
            <SectionTitle eyebrow="Why solar" title="A dependable path to lower energy costs" description="Solar works best when it is designed around how you actually consume power. We focus on performance, resilience and practical return." />
          </div>
          <div className="panel-copy">
            <p>Our team evaluates your roof, shadowing, energy use, and grid setup before recommending the right system size and component mix. That gives you a more predictable operating profile and more value over the life of the installation.</p>
            <p>Whether the goal is bill reduction, backup resilience, or sustainability commitments, solar becomes far more effective when it is planned intelligently.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle eyebrow="Benefits" title="What a well-sized solar system delivers" />
        <FeatureGrid items={benefits} />
      </section>

      <section className="page-section tinted-panel">
        <SectionTitle eyebrow="Typical system profile" title="Common packages for residential and business projects" />
        <StatRow items={stats} />
      </section>

      <section className="page-section">
        <div className="split-visual-card">
          <div className="visual-stack">
            <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=90" alt="Residential solar installation" />
          </div>
          <div>
            <SectionTitle eyebrow="Installation scope" title="Designed for long-term value, not just short-term savings" />
            <ul className="check-list">
              <li><Check /> Site visit and energy assessment</li>
              <li><Check /> Panel selection based on load and available space</li>
              <li><Check /> Structural and electrical planning</li>
              <li><Check /> Commissioning, monitoring and performance review</li>
            </ul>
            <a href="/contact" className="button button-green">
              Request a solar quote <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </SubpageShell>
  )
}
