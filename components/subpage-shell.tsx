'use client'

import Link from 'next/link'
import { ArrowRight, Building2, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { ReactNode, useState } from 'react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-V9KjfFouEAh27THt9YPGv0M2fLrlPT.png'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/products', label: 'Products' },
  { href: '/franchise', label: 'Franchise' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="subpage-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  )
}

export function FeatureGrid({ items }: { items: { title: string; text: string; icon?: ReactNode }[] }) {
  return (
    <div className="feature-grid">
      {items.map((item) => (
        <article key={item.title} className="feature-card">
          {item.icon ? <div className="feature-icon">{item.icon}</div> : null}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

export function StatRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="stat-row">
      {items.map((item) => (
        <div key={item.label} className="stat-box">
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export function SubpageShell({
  eyebrow,
  title,
  description,
  heroImage,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  heroImage: string
  children: ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="subpage-shell">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Powering a cleaner tomorrow across India</span>
          <span>sales@iqenergies.co.in <i /> +91 82768 63844</span>
        </div>
      </div>

      <header className="navbar">
        <div className="container nav-inner">
          <Link href="/" className="brand" aria-label="IQ Energies home">
            <img src={logoUrl} alt="IQ Energies Ltd." />
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <a className="button button-orange" href="/contact">
              Enquire now
            </a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main>
        <section className="subpage-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(22,31,20,0.8), rgba(22,31,20,0.45)), url(${heroImage})` }}>
          <div className="container subpage-hero-inner">
            <p className="eyebrow eyebrow-light">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="cta-row">
              <Link className="button button-orange" href="/contact">
                Book a consultation <ArrowRight />
              </Link>
              <Link className="button button-outline-light" href="/products">
                Explore products
              </Link>
            </div>
          </div>
        </section>

        <div className="subpage-body">
          <div className="container">{children}</div>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logoUrl} alt="IQ Energies Ltd. full logo" />
            <p>Energy that works for life.</p>
          </div>

          <div>
            <h4>Quick links</h4>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </div>

          <div>
            <h4>Our solutions</h4>
            <Link href="/solar">Solar</Link>
            <Link href="/wind">Wind</Link>
            <Link href="/hybrid-energy">Hybrid energy</Link>
            <Link href="/ev-charging">EV charging</Link>
            <Link href="/solutions">Smart infrastructure</Link>
          </div>

          <div>
            <h4>Get in touch</h4>
            <p><Building2 /> India-wide clean energy support</p>
            <a href="tel:+918276863844"><Phone /> +91 82768 63844</a>
            <a href="mailto:sales@iqenergies.co.in"><Mail /> sales@iqenergies.co.in</a>
            <p><MapPin /> Serving homes, farms and businesses across India</p>
            <Link href="/franchise-registration">Franchise registration</Link>
            <Link href="/vendor-registration">Vendor registration</Link>
            <Link href="/career">Career application</Link>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 IQ Energies Ltd. All rights reserved.</span>
          <span>Clean energy made reliable.</span>
        </div>
      </footer>
    </div>
  )
}
