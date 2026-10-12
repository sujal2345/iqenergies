import { ArrowRight, Check, ClipboardList, Factory, ShieldCheck, Wrench } from 'lucide-react'
import { FeatureGrid, SectionTitle, SubpageShell } from '@/components/subpage-shell'

const services = [
  { title: 'Turnkey EPC', text: 'End-to-end solar and renewable project execution with engineering, procurement and construction handled under one program.', icon: <Factory /> },
  { title: 'Custom design', text: 'Tailored project planning, site assessment and system optimization to suit your operational and financial goals.', icon: <ClipboardList /> },
  { title: 'Installation & commissioning', text: 'Expert execution and final commissioning support that helps your system start strong and perform consistently.', icon: <Wrench /> },
  { title: 'After-sales support', text: 'Ongoing service, technical guidance and lifecycle support to keep systems performing as expected.', icon: <ShieldCheck /> },
]

export default function ServicesPage() {
  return (
    <SubpageShell
      eyebrow="Services"
      title="End-to-end renewable support from concept to commissioning"
      description="We work with clients at every stage of the energy journey, helping them plan, deliver and optimize clean-energy systems with confidence."
      heroImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section">
        <SectionTitle eyebrow="What we do" title="Practical service covering the full project lifecycle" description="Every project is guided by clear planning and a focus on quality, performance and long-term value." />
        <FeatureGrid items={services} />
      </section>

      <section className="page-section tinted-panel">
        <div className="process-grid">
          <div>
            <SectionTitle eyebrow="Project flow" title="From the first sketch to final switch-on" />
          </div>
          <div className="process-list">
            <div>
              <span>01</span>
              <h3>Discovery</h3>
              <p>We review your energy requirement, site condition and operating goals to define the right direction.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Design</h3>
              <p>Our team prepares technical layouts and solution architecture that reflect efficiency and maintainability.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Delivery</h3>
              <p>We coordinate execution, quality checks and commissioning to ensure the system is ready for use.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="cta-banner">
          <div>
            <p className="eyebrow">Need project help?</p>
            <h3>Work with a partner who understands energy design, delivery and operational continuity.</h3>
          </div>
          <a href="/contact" className="button button-green">
            Talk to an expert <ArrowRight />
          </a>
        </div>
      </section>
    </SubpageShell>
  )
}
