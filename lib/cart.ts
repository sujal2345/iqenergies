export type CartProduct = {
  category: string
  name: string
  spec: string
  price: string
  image: string
  accent: string
  badge?: string
  description: string
  action: 'cart' | 'contact'
}

export type CartLine = {
  id: number
  product: CartProduct
  quantity: number
}

export const CART_STORAGE_KEY = 'iq-energies-cart'

export function getProductAmount(price: string) {
  const amount = price.match(/₹\s*([\d,]+)/)?.[1]
  return amount ? Number(amount.replace(/,/g, '')) : 0
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function isCartProduct(value: unknown): value is CartProduct {
  if (!value || typeof value !== 'object') return false
  const product = value as Record<string, unknown>
  return ['category', 'name', 'spec', 'price', 'image', 'accent', 'description'].every(
    (key) => typeof product[key] === 'string',
  ) && (product.action === 'cart' || product.action === 'contact')
}

export function readCart(): CartLine[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return []
    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) throw new Error('Stored cart is not a list.')
    return parsed.filter((line: unknown): line is CartLine => {
      if (!line || typeof line !== 'object') return false
      const candidate = line as Record<string, unknown>
      return Number.isInteger(candidate.id)
        && Number(candidate.id) >= 0
        && Number.isInteger(candidate.quantity)
        && Number(candidate.quantity) > 0
        && isCartProduct(candidate.product)
    })
  } catch (error) {
    console.error('Unable to read the saved IQ Energies cart.', error)
    return []
  }
}

export function writeCart(cart: CartLine[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Unable to save the IQ Energies cart.', error)
  }
}
