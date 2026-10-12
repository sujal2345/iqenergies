import { ArrowRight, BatteryCharging, Check, Leaf, Zap } from 'lucide-react'
import { FeatureGrid, SectionTitle, StatRow, SubpageShell } from '@/components/subpage-shell'

const features = [
  { title: 'Solar + storage', text: 'Blend generation and storage to make your power profile more resilient across changing demand cycles.', icon: <BatteryCharging /> },
  { title: 'Backup-ready design', text: 'Keep key loads running with a system that balances grid, battery and solar generation intelligently.', icon: <Zap /> },
  { title: 'Lower peak stress', text: 'Reduce dependency on expensive grid usage during peak-demand windows and improve operational efficiency.', icon: <Leaf /> },
]

const stats = [
  { value: '5kW', label: 'common hybrid package' },
  { value: '24/7', label: 'energy resilience support' },
  { value: '₹68.9k', label: 'starting inverter price' },
  { value: '1.2x', label: 'average load flexibility' },
]

export default function HybridEnergyPage() {
  return (
    <SubpageShell
      eyebrow="Hybrid energy"
      title="Battery-ready systems built around resilience and performance"
      description="Hybrid systems intelligently connect solar, battery and grid power so you can plan smarter and operate with greater continuity."
      heroImage="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section">
        <div className="two-column-panel">
          <div>
            <SectionTitle eyebrow="Energy resilience" title="A more stable way to run your property" description="Hybrid energy systems are ideal when you want more than simple generation. They bring flexibility, backup readiness and smarter power flow." />
          </div>
          <div className="panel-copy">
            <p>Hybrid systems let you store excess power, use it when needed and reduce pressure on the grid. That is especially useful when consumption spikes during the day or when outages are a recurring concern.</p>
            <p>Our design process balances generation size, battery capacity and living or operating patterns so the solution matches how you actually use energy.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle eyebrow="Hybrid advantages" title="System benefits designed for everyday stability" />
        <FeatureGrid items={features} />
      </section>

      <section className="page-section tinted-panel">
        <SectionTitle eyebrow="System fit" title="Common hybrid profiles and planning ranges" />
        <StatRow items={stats} />
      </section>

      <section className="page-section">
        <div className="split-visual-card">
          <div className="visual-stack">
            <img src="https://images.unsplash.com/photo-1558449033-5cf0ef6e5c2f?auto=format&fit=crop&w=1200&q=90" alt="Hybrid solar energy system" />
          </div>
          <div>
            <SectionTitle eyebrow="Consultation" title="Let’s design a system around your actual load profile" />
            <ul className="check-list">
              <li><Check /> Load analysis and outage considerations</li>
              <li><Check /> Solar and battery sizing strategy</li>
              <li><Check /> Smart system controls for reliability</li>
              <li><Check /> Ongoing optimization and support</li>
            </ul>
            <a href="/contact" className="button button-green">
              Get hybrid guidance <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </SubpageShell>
  )
}
