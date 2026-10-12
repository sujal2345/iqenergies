import { ArrowRight, Building2, Check, Mail, MapPin, Phone } from 'lucide-react'
import { SectionTitle, SubpageShell } from '@/components/subpage-shell'

export default function ContactPage() {
  return (
    <SubpageShell
      eyebrow="Contact"
      title="Let’s plan the right clean-energy solution for your property"
      description="Tell us what you need and our team will help you identify the best path forward across solar, hybrid, EV and broader renewable infrastructure."
      heroImage="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1800&q=90"
    >
      <section className="page-section contact-page-section">
        <div className="contact-layout">
          <div>
            <SectionTitle eyebrow="Get in touch" title="Book a consultation or request a site discussion" description="We are ready to help with residential, commercial and industrial energy planning." />
            <div className="contact-list-box">
              <a href="tel:+918276863844"><Phone /> +91 82768 63844</a>
              <a href="mailto:sales@iqenergies.co.in"><Mail /> sales@iqenergies.co.in</a>
              <p><Building2 /> Serving homes, farms and businesses across India</p>
              <p><MapPin /> India-wide clean energy support</p>
            </div>
          </div>

          <form className="contact-form-box">
            <h3>Request a free consultation</h3>
            <div className="form-grid-subpage">
              <input required placeholder="Full name" />
              <input required placeholder="Phone number" />
              <input type="email" required placeholder="Email address" />
              <input placeholder="City" />
              <textarea rows={5} required placeholder="Tell us about your requirement" />
            </div>
            <button type="submit" className="button button-green">
              Submit request <ArrowRight />
            </button>
            <div className="inline-success"><Check /> No spam. We will contact you within 24 hours.</div>
          </form>
        </div>
      </section>
    </SubpageShell>
  )
}
