'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react'
import { CART_STORAGE_KEY, CartLine, formatINR, getProductAmount, readCart, writeCart } from '@/lib/cart'

type CustomerDetails = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
  notes: string
}

const emptyDetails: CustomerDetails = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  notes: '',
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartReady, setCartReady] = useState(false)
  const [details, setDetails] = useState(emptyDetails)
  const [emailReady, setEmailReady] = useState(false)

  useEffect(() => {
    setCart(readCart())
    setCartReady(true)
    const syncCart = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) setCart(readCart())
    }
    window.addEventListener('storage', syncCart)
    return () => window.removeEventListener('storage', syncCart)
  }, [])

  useEffect(() => {
    if (cartReady) writeCart(cart)
  }, [cart, cartReady])

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + getProductAmount(item.product.price) * item.quantity, 0),
    [cart],
  )
  const mailto = useMemo(() => {
    const order = cart.map(({ product, quantity }) =>
      `- ${product.name} (${product.spec}) x ${quantity}: ${formatINR(getProductAmount(product.price) * quantity)}${product.price.startsWith('Starting from') ? ' (starting price)' : ''}`,
    ).join('\n')
    const body = [
      'Hello IQ Energies,',
      '',
      'Please help me with the following product order request:',
      order,
      '',
      `Estimated product subtotal: ${formatINR(subtotal)}`,
      'I understand that final pricing, delivery, installation and payment details need confirmation.',
      '',
      'Customer details:',
      `Name: ${details.name}`,
      `Email: ${details.email}`,
      `Phone: ${details.phone}`,
      `Address: ${details.address}`,
      `City: ${details.city}`,
      `PIN code: ${details.pincode}`,
      `Additional notes: ${details.notes || 'None'}`,
    ].join('\n')
    return `mailto:sales@iqenergies.co.in?${new URLSearchParams({ subject: 'IQ Energies product order request', body })}`
  }, [cart, details, subtotal])

  const updateQuantity = (id: number, quantity: number) => {
    setEmailReady(false)
    setCart((items) => quantity > 0
      ? items.map((item) => item.id === id ? { ...item, quantity } : item)
      : items.filter((item) => item.id !== id))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailReady(true)
  }

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <a className="checkout-brand" href="/" aria-label="IQ Energies home">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-V9KjfFouEAh27THt9YPGv0M2fLrlPT.png" alt="IQ Energies" />
        </a>
        <a href="/#products" className="checkout-back"><ArrowLeft /> Continue shopping</a>
        <div className="checkout-secure"><ShieldCheck /> Secure enquiry</div>
      </header>

      <div className="checkout-container">
        <div className="checkout-heading">
          <p className="eyebrow">Your energy setup</p>
          <h1>Checkout</h1>
          <p>Share your details and our team will confirm final pricing, delivery and installation options.</p>
        </div>

        {!cart.length ? (
          <section className="checkout-empty">
            <ShoppingBag />
            <h2>Your cart is empty</h2>
            <p>Choose the products you are interested in, then return here to send your order request.</p>
            <a className="button button-green" href="/#products">Browse products <ArrowRight /></a>
          </section>
        ) : (
          <div className="checkout-layout">
            <section className="checkout-form-panel">
              <div className="checkout-step"><span>01</span><div><h2>Contact information</h2><p>So we can prepare the right recommendation for you.</p></div></div>
              {emailReady ? (
                <div className="checkout-email-ready" role="status">
                  <span><Check /></span>
                  <h3>Your order request is ready</h3>
                  <p>Nothing has been charged or submitted yet. Open your email app to send these details to our team.</p>
                  <a className="button button-green" href={mailto}>Email order request <ArrowRight /></a>
                  <button className="checkout-edit" onClick={() => setEmailReady(false)}>Edit details</button>
                </div>
              ) : (
                <form className="checkout-form" onSubmit={submit}>
                  <label>Full name<input autoComplete="name" required value={details.name} onChange={(event) => setDetails({ ...details, name: event.target.value })} placeholder="Your name" /></label>
                  <label>Email address<input autoComplete="email" type="email" required value={details.email} onChange={(event) => setDetails({ ...details, email: event.target.value })} placeholder="you@example.com" /></label>
                  <label>Phone number<input autoComplete="tel" type="tel" required value={details.phone} onChange={(event) => setDetails({ ...details, phone: event.target.value })} placeholder="+91" /></label>
                  <label>Installation / delivery address<input autoComplete="street-address" required value={details.address} onChange={(event) => setDetails({ ...details, address: event.target.value })} placeholder="Street address" /></label>
                  <div className="checkout-form__row">
                    <label>City<input autoComplete="address-level2" required value={details.city} onChange={(event) => setDetails({ ...details, city: event.target.value })} placeholder="City" /></label>
                    <label>PIN code<input autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" required value={details.pincode} onChange={(event) => setDetails({ ...details, pincode: event.target.value })} placeholder="6-digit PIN" /></label>
                  </div>
                  <label>Additional notes <span>(optional)</span><textarea rows={3} value={details.notes} onChange={(event) => setDetails({ ...details, notes: event.target.value })} placeholder="Tell us about your site or energy requirements" /></label>
                  <button className="button button-green checkout-submit" type="submit">Continue to order request <ArrowRight /></button>
                  <p className="checkout-form__note">This is a request for confirmation, not a payment. Our team will contact you before any order is finalized.</p>
                </form>
              )}
            </section>

            <aside className="checkout-summary">
              <div className="checkout-summary__heading"><h2>Order summary</h2><span>{cart.reduce((count, item) => count + item.quantity, 0)} items</span></div>
              <div className="checkout-summary__items">
                {cart.map(({ id, product, quantity }) => (
                  <article className="checkout-product" key={id}>
                    <div className="checkout-product__image"><img src={product.image} alt={product.name} /><span>{quantity}</span></div>
                    <div className="checkout-product__details">
                      <small>{product.category}</small>
                      <h3>{product.name}</h3>
                      <p>{product.spec}</p>
                      <strong>{product.price}</strong>
                      <div className="checkout-product__controls">
                        <div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button type="button" onClick={() => updateQuantity(id, quantity - 1)} aria-label="Decrease quantity"><Minus /></button><span>{quantity}</span><button type="button" onClick={() => updateQuantity(id, quantity + 1)} aria-label="Increase quantity"><Plus /></button></div>
                        <button className="checkout-remove" type="button" onClick={() => updateQuantity(id, 0)} aria-label={`Remove ${product.name}`}><Trash2 /> Remove</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="checkout-totals">
                <div><span>Estimated subtotal</span><strong>{formatINR(subtotal)}</strong></div>
                <div><span>Delivery &amp; installation</span><strong>Confirmed later</strong></div>
                <div className="checkout-totals__total"><span>Estimated total</span><strong>{formatINR(subtotal)}</strong></div>
                <p>Items listed as “Starting from” use an indicative starting price. Taxes, delivery and installation are confirmed after consultation.</p>
              </div>
              <div className="checkout-assurance"><ShieldCheck /><span><strong>Personalised support</strong>Our energy team will help confirm specifications and next steps.</span></div>
            </aside>
          </div>
        )}
      </div>
      <footer className="checkout-footer">Need help? <a href="tel:+918276863844">Call +91 82768 63844</a><span>·</span><a href="mailto:sales@iqenergies.co.in">sales@iqenergies.co.in</a></footer>
    </main>
  )
}
