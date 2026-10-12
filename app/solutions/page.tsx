import { ArrowRight, BatteryCharging, Factory, Flame, Sun, Wind } from 'lucide-react'
import { FeatureGrid, SectionTitle, SubpageShell } from '@/components/subpage-shell'

const solutionCards = [
  { title: 'Solar PV solutions', text: 'High-efficiency rooftop and ground-mount systems designed to deliver dependable generation across residential, commercial and industrial environments.', icon: <Sun /> },
  { title: 'Hybrid energy systems', text: 'Combined solar, storage and backup infrastructure for resilient power that works even during grid instability or peak-load conditions.', icon: <BatteryCharging /> },
  { title: 'Distributed wind', text: 'Compact, site-appropriate wind energy systems that complement solar and improve renewable performance in the right conditions.', icon: <Wind /> },
  { title: 'EV charging ecosystems', text: 'Smart chargers for homes, public spaces, commercial facilities and fleet operations with scalable infrastructure planning.', icon: <BatteryCharging /> },
  { title: 'Green hydrogen potential', text: 'Future-focused innovations for industrial decarbonization and emerging clean-fuel applications.', icon: <Flame /> },
  { title: 'Industrial infrastructure', text: 'Robust renewable engineering for factories, warehouses and large operational environments that need dependable power.', icon: <Factory /> },
]

export default function SolutionsPage() {
  return (
    <SubpageShell
      eyebrow="Solutions"
      title="Integrated clean-energy systems for modern operations"
      description="From generation to storage and charging, we build complete energy ecosystems that serve homes, businesses and communities with confidence."
      heroImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section">
        <SectionTitle eyebrow="What we build" title="Technology choices shaped around your goals" description="Every system is selected with a clear view of load profile, rooftop suitability, downtime risk and long-term performance requirements." />
        <FeatureGrid items={solutionCards} />
      </section>

      <section className="page-section tinted-panel">
        <div className="process-grid">
          <div>
            <SectionTitle eyebrow="Our process" title="From feasibility to performance" />
          </div>
          <div className="process-list">
            <div>
              <span>01</span>
              <h3>Site assessment</h3>
              <p>We evaluate demand, climate, roof conditions and energy opportunities before proposing a system.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Engineering design</h3>
              <p>Our solutions balance efficiency, safety, reliability and long-term ROI for your specific setting.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Execution & support</h3>
              <p>We manage delivery, commissioning and technical follow-through to keep operations strong after install.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="cta-banner">
          <div>
            <p className="eyebrow">Need a tailored roadmap?</p>
            <h3>Build your next clean-energy project with experts who understand your operating environment.</h3>
          </div>
          <a href="/contact" className="button button-green">
            Schedule a consultation <ArrowRight />
          </a>
        </div>
      </section>
    </SubpageShell>
  )
}
