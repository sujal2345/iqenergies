'use client'

import { ArrowRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SectionTitle, SubpageShell } from '@/components/subpage-shell'
import { CartLine, CartProduct, readCart, writeCart } from '@/lib/cart'

const photos = {
  about: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=90',
  panels: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=90',
  rooftop: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=90',
  wind: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=90',
  ev: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1000&q=90',
  design: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=90',
}

type Product = CartProduct

const products: Product[] = [
  { category: 'Solar', name: 'Rooftop Solar Kit (Residential)', spec: '3kW · Grid-tied · Mono PERC panels · 25-year warranty', price: 'Starting from ₹1,54,999', image: photos.rooftop, accent: 'orange', badge: 'Most Popular', description: 'A dependable grid-tied solar package designed for everyday residential energy needs.', action: 'cart' },
  { category: 'Solar', name: 'Rooftop Solar Kit (Residential)', spec: '5kW · Grid-tied · Ideal for larger homes', price: 'Starting from ₹2,49,999', image: photos.panels, accent: 'orange', description: 'A higher-capacity rooftop system for larger homes and growing energy demand.', action: 'cart' },
  { category: 'Solar', name: 'Commercial Solar Array', spec: '25kW · High-efficiency panels · Commercial rooftops', price: 'Starting from ₹9,89,999', image: photos.about, accent: 'orange', badge: 'For Business', description: 'A scalable commercial array engineered for performance, monitoring and long-term savings.', action: 'contact' },
  { category: 'Solar', name: 'Balcony Solar Panel', spec: '1kW · Plug-and-play · No rooftop required', price: 'Starting from ₹42,999', image: photos.rooftop, accent: 'orange', badge: 'New Launch', description: 'Compact apartment-friendly solar generation without a traditional rooftop installation.', action: 'cart' },
  { category: 'EV', name: 'AC Home Charger', spec: '7kW · Smart-connected · App scheduling', price: '₹42,500', image: photos.ev, accent: 'blue', description: 'Smart home charging with connected scheduling and simple everyday control.', action: 'cart' },
  { category: 'EV', name: 'Commercial Fast Charger', spec: '30kW · Dual-connector · Retail locations', price: '₹2,25,000', image: photos.ev, accent: 'blue', badge: 'For Business', description: 'A dual-connector fast charger for retail, workplace and commercial destinations.', action: 'contact' },
  { category: 'EV', name: 'EV Charging Station (Public)', spec: '60kW DC fast-charging · Dual-port · Installation included', price: '₹5,80,000', image: photos.ev, accent: 'blue', description: 'Public-ready DC charging with dual ports and professional installation included.', action: 'contact' },
  { category: 'Inverter', name: 'Hybrid Solar Inverter', spec: '5kW · Battery-compatible · Grid or off-grid', price: '₹68,900', image: photos.design, accent: 'gray', badge: 'Best Seller', description: 'Flexible energy management for systems that need solar, batteries and grid resilience.', action: 'cart' },
  { category: 'Inverter', name: 'On-Grid String Inverter', spec: '10kW · High-efficiency · Commercial installations', price: '₹1,15,000', image: photos.panels, accent: 'gray', description: 'High-efficiency conversion for reliable commercial solar installations.', action: 'cart' },
  { category: 'Inverter', name: 'Micro-Inverter (Single Panel)', spec: '400W per unit · Ideal for shaded rooftops', price: '₹9,500 per unit', image: photos.rooftop, accent: 'gray', description: 'Panel-level optimization for complex, shaded or multi-orientation rooftops.', action: 'cart' },
  { category: 'Wind', name: 'Micro Wind Turbine', spec: '1kW · Hybrid-ready · Continuous power support', price: 'Starting from ₹1,24,999', image: photos.wind, accent: 'gray', badge: 'New Arrival', description: 'Pair compact wind generation with solar for more consistent renewable power.', action: 'cart' },
  { category: 'Wind', name: 'Rooftop Wind Turbine (Compact)', spec: '500W · Silent operation · Urban design', price: '₹64,999', image: photos.wind, accent: 'gray', description: 'A quiet, compact rooftop wind solution designed for urban and residential settings.', action: 'cart' },
]

const tabs = ['Solar', 'EV', 'Inverter', 'Wind']

export default function ProductsPage() {
  const [tab, setTab] = useState('Solar')
  const [details, setDetails] = useState<Product | null>(null)
  const [addedProduct, setAddedProduct] = useState<Product | null>(null)
  const visibleProducts = products.filter((product) => product.category === tab)

  useEffect(() => {
    if (!addedProduct) return
    const timeout = window.setTimeout(() => setAddedProduct(null), 3600)
    return () => window.clearTimeout(timeout)
  }, [addedProduct])

  const addToCart = (product: Product) => {
    const id = products.indexOf(product)
    const cart: CartLine[] = readCart()
    const existing = cart.find((item) => item.id === id)
    writeCart(existing
      ? cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { id, product, quantity: 1 }])
    setAddedProduct(product)
  }

  return (
    <SubpageShell
      eyebrow="Products"
      title="Premium renewable products selected for performance and reliability"
      description="Explore equipment and solution packages tailored for homes, businesses, public facilities and industrial energy strategies."
      heroImage="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1800&q=90"
    >
      {addedProduct ? (
        <div className="cart-toast" role="status">
          <img src={addedProduct.image} alt="" />
          <div><strong>{addedProduct.name}</strong><span>Qty: 1 · Added to cart</span></div>
          <a href="/checkout" aria-label="Go to checkout">Checkout <ArrowRight /></a>
          <button onClick={() => setAddedProduct(null)} aria-label="Dismiss cart notification"><X /></button>
        </div>
      ) : null}
      <section className="page-section">
        <SectionTitle
          eyebrow="Catalog"
          title="The full IQ Energies product range"
          description="This catalog reflects the same products showcased on the homepage, with the same categories, specs and pricing that customers can compare in one place."
        />

        <div className="tabs" style={{ marginTop: '28px' }}>
          {tabs.map((item) => (
            <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid" style={{ marginTop: '30px' }}>
          {visibleProducts.map((product, index) => (
            <article className="product-card" key={`${product.category}-${product.name}-${index}`}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className={`badge ${product.accent}`}>{product.badge || product.category}</span>
              </div>
              <div className="product-body">
                <small className="product-category">{product.category}</small>
                <h3>{product.name}</h3>
                <p>{product.spec}</p>
                <strong>{product.price}</strong>
                <button className="button button-green" onClick={() => addToCart(product)}>
                  Add to Cart <ArrowRight />
                </button>
                <button className="details-link" onClick={() => setDetails(product)}>View Details <ArrowRight /></button>
                <p className="product-description">{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {details ? (
        <div className="modal-backdrop" onClick={() => setDetails(null)}>
          <div className="details-modal" role="dialog" aria-modal="true" aria-labelledby="catalog-product-details-heading" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setDetails(null)} aria-label="Close product details"><X /></button>
            <img src={details.image} alt={details.name} />
            <div>
              <span className={`badge ${details.accent}`}>{details.category}</span>
              <p className="eyebrow">Product details</p>
              <h2 id="catalog-product-details-heading">{details.name}</h2>
              <p className="modal-description">{details.description}</p>
              <dl>
                <div><dt>Specification</dt><dd>{details.spec}</dd></div>
                <div><dt>Price</dt><dd>{details.price}</dd></div>
                <div><dt>Availability</dt><dd>India-wide delivery and installation support</dd></div>
              </dl>
              <button className="button button-green" onClick={() => { addToCart(details); setDetails(null) }}>Add to Cart <ArrowRight /></button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="page-section tinted-panel">
        <SectionTitle eyebrow="Why this range works" title="Products matched to the real way people use energy" />
        <div className="comparison-grid">
          <article>
            <p className="eyebrow">Residential</p>
            <h3>Home-ready energy packages</h3>
            <ul>
              <li>Rooftop solar kits</li>
              <li>Hybrid inverter setups</li>
              <li>Battery-ready configurations</li>
            </ul>
          </article>
          <article>
            <p className="eyebrow">Commercial</p>
            <h3>Business-grade power systems</h3>
            <ul>
              <li>Large-scale solar arrays</li>
              <li>EV charging deployment</li>
              <li>Monitoring and optimization support</li>
            </ul>
          </article>
          <article>
            <p className="eyebrow">Industrial</p>
            <h3>Heavy-duty clean energy planning</h3>
            <ul>
              <li>High-capacity design</li>
              <li>Grid resilience features</li>
              <li>Long-term performance support</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="cta-banner">
          <div>
            <p className="eyebrow">Need help choosing?</p>
            <h3>Tell us your load profile and we will recommend the right product mix for your energy goals.</h3>
          </div>
          <a href="/contact" className="button button-green">
            Request product guidance <ArrowRight />
          </a>
        </div>
      </section>
    </SubpageShell>
  )
}
