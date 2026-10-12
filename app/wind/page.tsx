import { ArrowRight, Check, Leaf, ShieldCheck, Wind } from 'lucide-react'
import { FeatureGrid, SectionTitle, StatRow, SubpageShell } from '@/components/subpage-shell'

const features = [
  { title: 'Complementary generation', text: 'Use wind where it suits the site profile to improve renewable coverage beyond solar-only systems.', icon: <Wind /> },
  { title: 'Site-smart design', text: 'We evaluate exposure, operating conditions and installation constraints before recommending wind technology.', icon: <ShieldCheck /> },
  { title: 'Hybrid-friendly setup', text: 'Wind integrates naturally with solar and battery systems for a more balanced energy portfolio.', icon: <Leaf /> },
]

const stats = [
  { value: '500W', label: 'compact rooftop profile' },
  { value: '1kW', label: 'micro wind capacity' },
  { value: '₹64.9k', label: 'compact turbine range' },
  { value: 'Hybrid-ready', label: 'system compatibility' },
]

export default function WindPage() {
  return (
    <SubpageShell
      eyebrow="Wind"
      title="Distributed wind solutions for a more balanced renewable profile"
      description="When the site conditions are right, wind can complement solar systems and enhance long-term clean-energy performance."
      heroImage="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section">
        <div className="two-column-panel">
          <div>
            <SectionTitle eyebrow="Wind energy" title="A smart complement to solar generation" description="Wind works best where wind exposure, site conditions and operating goals align with a hybrid energy strategy." />
          </div>
          <div className="panel-copy">
            <p>For suitable locations, wind generation can help stabilize energy output across the day and improve the value of a renewable system. It is particularly useful when paired with solar and battery infrastructure.</p>
            <p>We assess local conditions carefully to ensure the system adds meaningful value rather than adding complexity.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle eyebrow="Why wind" title="When wind makes strategic sense" />
        <FeatureGrid items={features} />
      </section>

      <section className="page-section tinted-panel">
        <SectionTitle eyebrow="Performance profile" title="Compact options for broader renewable planning" />
        <StatRow items={stats} />
      </section>

      <section className="page-section">
        <div className="split-visual-card">
          <div className="visual-stack">
            <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=90" alt="Wind turbines installed near a facility" />
          </div>
          <div>
            <SectionTitle eyebrow="Planning" title="Evaluate whether wind fits your site and energy goals" />
            <ul className="check-list">
              <li><Check /> Site wind availability review</li>
              <li><Check /> Hybrid system planning with solar and storage</li>
              <li><Check /> Design coordination and operational feasibility</li>
              <li><Check /> Execution support and performance review</li>
            </ul>
            <a href="/contact" className="button button-green">
              Discuss wind feasibility <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </SubpageShell>
  )
}
