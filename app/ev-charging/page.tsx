import { ArrowRight, BatteryCharging, Check, CircleGauge, ShieldCheck, Zap } from 'lucide-react'
import { FeatureGrid, SectionTitle, StatRow, SubpageShell } from '@/components/subpage-shell'

const benefits = [
  { title: 'Smart home charging', text: 'Schedule charging sessions, monitor usage and support everyday EV adoption without adding complexity.', icon: <BatteryCharging /> },
  { title: 'Commercial readiness', text: 'Create a reliable EV experience for employees, visitors and fleet users across mixed-use spaces.', icon: <CircleGauge /> },
  { title: 'Fast, scalable rollout', text: 'Deploy chargers that match your current requirement while leaving room for future expansion.', icon: <Zap /> },
]

const stats = [
  { value: '7kW', label: 'home charger capacity' },
  { value: '30kW', label: 'fast commercial power' },
  { value: '₹42.5k', label: 'home charger starting price' },
  { value: '24/7', label: 'support planning' },
]

export default function EVChargingPage() {
  return (
    <SubpageShell
      eyebrow="EV charging"
      title="Charging infrastructure for cleaner mobility"
      description="From residential convenience to commercial fleet readiness, we support EV charging systems that are efficient, connectable and built for daily use."
      heroImage="https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section">
        <div className="two-column-panel">
          <div>
            <SectionTitle eyebrow="EV solutions" title="The right charging setup for your property" description="We help clients align charger capacity, operating profile and installation constraints so the system feels seamless from day one." />
          </div>
          <div className="panel-copy">
            <p>Whether you are powering a private residence, workplace, retail property or mobility hub, EV infrastructure works best when it is planned for real traffic patterns, peak use and future growth.</p>
            <p>Our approach makes charging reliable, scale-aware and easy to manage without adding operational friction.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle eyebrow="What we offer" title="Charging systems built for practical use" />
        <FeatureGrid items={benefits} />
      </section>

      <section className="page-section tinted-panel">
        <SectionTitle eyebrow="System fit" title="Portable, scalable and ready for real-world usage" />
        <StatRow items={stats} />
      </section>

      <section className="page-section">
        <div className="split-visual-card">
          <div className="visual-stack">
            <img src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=90" alt="EV charging station" />
          </div>
          <div>
            <SectionTitle eyebrow="Support" title="Safe installation and future-proof planning" />
            <ul className="check-list">
              <li><Check /> Site evaluation and power assumptions</li>
              <li><Check /> Charger matching to user needs and property type</li>
              <li><Check /> Protection, load and safety checks</li>
              <li><Check /> Ongoing support for scaling and upgrades</li>
            </ul>
            <a href="/contact" className="button button-green">
              Plan your EV setup <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </SubpageShell>
  )
}
