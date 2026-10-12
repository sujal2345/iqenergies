import { ArrowRight, Check, Download, PlayCircle, TrendingUp } from 'lucide-react'
import { FeatureGrid, SectionTitle, StatRow, SubpageShell } from '@/components/subpage-shell'

const franchiseBenefits = [
  { title: 'Proven business model', text: 'Build a renewable business backed by technical support, product access and project guidance.', icon: <TrendingUp /> },
  { title: 'Growth opportunity', text: 'A clean-energy market with strong relevance across residential, commercial and industrial clients.', icon: <PlayCircle /> },
  { title: 'Operational support', text: 'We help franchise partners with the knowledge, systems and customer handling they need to scale responsibly.', icon: <Download /> },
]

const stats = [
  { value: '500+', label: 'franchise network' },
  { value: '₹5 Lakhs', label: 'minimum investment' },
  { value: '20–30%', label: 'expected ROI' },
  { value: '12–18 Months', label: 'break-even period' },
]

export default function FranchisePage() {
  return (
    <SubpageShell
      eyebrow="Franchise"
      title="Start your renewable energy business with a trusted brand"
      description="Build a forward-looking business with access to solar, EV, and clean-energy solutions that are increasingly relevant across India."
      heroImage="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section">
        <div className="two-column-panel">
          <div>
            <SectionTitle eyebrow="Why partner with us" title="A scalable franchise opportunity in a growing sector" description="We support franchise partners with a clear operating model, product knowledge and the opportunity to serve a market with rising demand." />
          </div>
          <div className="panel-copy">
            <p>Clean-energy adoption is accelerating across homes, businesses and public infrastructure. A franchise partnership gives you access to an ecosystem that is already positioned around this momentum.</p>
            <p>Our approach is practical, supportive and structured so you can grow with visibility and clarity.</p>
          </div>
        </div>
      </section>

      <section className="page-section franchise-investment">
        <div className="franchise-investment__lead">
          <p className="eyebrow">The opportunity</p>
          <h2>Build the next energy business in your city.</h2>
          <p>Become part of IQ Energies&apos; renewable-energy network with a defined investment, practical training and ongoing partner support.</p>
        </div>
        <div className="franchise-investment__figure">
          <span>Minimum investment</span>
          <strong>₹5 Lakhs</strong>
          <span className="franchise-investment__offer">₹0 franchise fee · limited-time offer</span>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle eyebrow="Partner advantages" title="What franchise support includes" />
        <FeatureGrid items={franchiseBenefits} />
      </section>

      <section className="page-section franchise-stats">
        <SectionTitle eyebrow="Opportunity snapshot" title="The investment at a glance" />
        <StatRow items={stats} />
      </section>

      <section className="page-section">
        <div className="split-visual-card">
          <div className="visual-stack">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90" alt="Franchise business planning" />
          </div>
          <div>
            <SectionTitle eyebrow="What you can expect" title="Guidance that turns opportunity into momentum" />
            <ul className="check-list">
              <li><Check /> Sales and customer handling support</li>
              <li><Check /> Product and solution training</li>
              <li><Check /> Community-building and market entry guidance</li>
              <li><Check /> Long-term partnership approach</li>
            </ul>
            <a href="/contact" className="button button-green">
              Explore franchise options <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      <section className="page-section franchise-faq">
        <SectionTitle eyebrow="Common questions" title="A clearer view of the opportunity" />
        <details>
          <summary>What is the minimum investment?</summary>
          <p>The stated minimum investment is ₹5 Lakhs.</p>
        </details>
        <details>
          <summary>What support does IQ Energies provide?</summary>
          <p>Franchise partners receive training, marketing and technical support, territory rights and access to the product portfolio.</p>
        </details>
        <details>
          <summary>Is there a franchise fee?</summary>
          <p>A ₹0 franchise fee is available as a limited-time offer.</p>
        </details>
      </section>

      <section className="page-section franchise-final-cta">
        <div>
          <p className="eyebrow eyebrow-light">Partner with IQ Energies</p>
          <h2>Ready to build the future of energy?</h2>
        </div>
        <a href="/franchise-registration" className="button button-orange">Explore franchise opportunity <ArrowRight /></a>
      </section>
    </SubpageShell>
  )
}
