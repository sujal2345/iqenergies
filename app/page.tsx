'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowRight, BatteryCharging, Building2, Check, ChevronRight, CirclePlay, Download, Factory, Flame, Mail, Menu, Minus, Phone, Play, Plus, Quote, ShoppingCart, Sun, Trash2, Truck, Users, Wind, X, Zap } from 'lucide-react'
import { TiltCard } from '@/components/tilt-card'
import { CART_STORAGE_KEY, CartLine, CartProduct, formatINR, getProductAmount, readCart, writeCart } from '@/lib/cart'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-V9KjfFouEAh27THt9YPGv0M2fLrlPT.png'
const photos = {
  hero: 'https://images.unsplash.com/photo-1558449033-5cf0ef6e5c2f?auto=format&fit=crop&w=2000&q=90',
  about: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=90',
  panels: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=90',
  rooftop: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=90',
  wind: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=90',
  ev: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1000&q=90',
  design: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=90',
  hydrogen: 'https://images.unsplash.com/photo-1534791547706-8b7f6c9cbe2f?auto=format&fit=crop&w=1200&q=90',
  charging: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=90',
  solarTree: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=90',
  news: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=90',
}

type Product = CartProduct
const products: Product[] = [
  { category:'Solar', name:'Rooftop Solar Kit (Residential)', spec:'3kW · Grid-tied · Mono PERC panels · 25-year warranty', price:'Starting from ₹1,54,999', image:photos.rooftop, accent:'orange', badge:'Most Popular', description:'A dependable grid-tied solar package designed for everyday residential energy needs.', action:'cart' },
  { category:'Solar', name:'Rooftop Solar Kit (Residential)', spec:'5kW · Grid-tied · Ideal for larger homes', price:'Starting from ₹2,49,999', image:photos.panels, accent:'orange', description:'A higher-capacity rooftop system for larger homes and growing energy demand.', action:'cart' },
  { category:'Solar', name:'Commercial Solar Array', spec:'25kW · High-efficiency panels · Commercial rooftops', price:'Starting from ₹9,89,999', image:photos.about, accent:'orange', badge:'For Business', description:'A scalable commercial array engineered for performance, monitoring and long-term savings.', action:'contact' },
  { category:'Solar', name:'Balcony Solar Panel', spec:'1kW · Plug-and-play · No rooftop required', price:'Starting from ₹42,999', image:photos.rooftop, accent:'orange', badge:'New Launch', description:'Compact apartment-friendly solar generation without a traditional rooftop installation.', action:'cart' },
  { category:'EV', name:'AC Home Charger', spec:'7kW · Smart-connected · App scheduling', price:'₹42,500', image:photos.ev, accent:'blue', description:'Smart home charging with connected scheduling and simple everyday control.', action:'cart' },
  { category:'EV', name:'Commercial Fast Charger', spec:'30kW · Dual-connector · Retail locations', price:'₹2,25,000', image:photos.ev, accent:'blue', badge:'For Business', description:'A dual-connector fast charger for retail, workplace and commercial destinations.', action:'contact' },
  { category:'EV', name:'EV Charging Station (Public)', spec:'60kW DC fast-charging · Dual-port · Installation included', price:'₹5,80,000', image:photos.ev, accent:'blue', description:'Public-ready DC charging with dual ports and professional installation included.', action:'contact' },
  { category:'Inverter', name:'Hybrid Solar Inverter', spec:'5kW · Battery-compatible · Grid or off-grid', price:'₹68,900', image:photos.design, accent:'gray', badge:'Best Seller', description:'Flexible energy management for systems that need solar, batteries and grid resilience.', action:'cart' },
  { category:'Inverter', name:'On-Grid String Inverter', spec:'10kW · High-efficiency · Commercial installations', price:'₹1,15,000', image:photos.panels, accent:'gray', description:'High-efficiency conversion for reliable commercial solar installations.', action:'cart' },
  { category:'Inverter', name:'Micro-Inverter (Single Panel)', spec:'400W per unit · Ideal for shaded rooftops', price:'₹9,500 per unit', image:photos.rooftop, accent:'gray', description:'Panel-level optimization for complex, shaded or multi-orientation rooftops.', action:'cart' },
  { category:'Wind', name:'Micro Wind Turbine', spec:'1kW · Hybrid-ready · Continuous power support', price:'Starting from ₹1,24,999', image:photos.wind, accent:'gray', badge:'New Arrival', description:'Pair compact wind generation with solar for more consistent renewable power.', action:'cart' },
  { category:'Wind', name:'Rooftop Wind Turbine (Compact)', spec:'500W · Silent operation · Urban design', price:'₹64,999', image:photos.wind, accent:'gray', description:'A quiet, compact rooftop wind solution designed for urban and residential settings.', action:'cart' },
]
const tabs = ['Solar','EV','Inverter','Wind']
const capabilityCards = [['Solar PV Solutions', Sun, photos.panels, 'High-efficiency generation shaped around your site.', ['Rooftop and ground-mount design','High-efficiency modules','Monitoring and maintenance']], ['Hybrid Energy Systems', BatteryCharging, photos.rooftop, 'Generation, storage and backup in one system.', ['Solar plus battery storage','Intelligent load management','Backup power resilience']], ['Specialized Technologies', Factory, photos.ev, 'Future-ready infrastructure for complex challenges.', ['EV charging ecosystems','Solar tree installations','Emerging clean-energy systems']]] as const
const homepageSolutions = [
  { title: 'Solar Energy', Icon: Sun, copy: 'Rooftop and distributed solar generation designed around real-world site conditions.', image: photos.panels },
  { title: 'Wind Energy', Icon: Wind, copy: 'Distributed wind systems engineered for Indian conditions.', image: photos.wind },
  { title: 'Hybrid Energy', Icon: Zap, copy: 'Solar, storage and backup working together as one system.', image: photos.rooftop },
  { title: 'EV Charging', Icon: BatteryCharging, copy: 'Smart charging infrastructure for homes, workplaces and fleets.', image: photos.charging },
  { title: 'Energy Infrastructure', Icon: Building2, copy: 'Project infrastructure that connects generation to dependable use.', image: photos.about },
  { title: 'Advanced Technologies', Icon: Flame, copy: 'Emerging clean-energy technologies for changing energy needs.', image: photos.design },
] as const
const ecosystemStages = [
  { title: 'Solar', eyebrow: '01', copy: 'Renewable generation shaped around the site and its energy needs.', image: photos.panels },
  { title: 'Storage', eyebrow: '02', copy: 'Energy storage adds flexibility to generation and consumption.', image: photos.rooftop },
  { title: 'Hybrid', eyebrow: '03', copy: 'Integrated systems bring generation, storage and backup together.', image: photos.about },
  { title: 'EV', eyebrow: '04', copy: 'Charging infrastructure connects clean power to everyday mobility.', image: photos.ev },
  { title: 'Engineering', eyebrow: '05', copy: 'Project engineering coordinates design, delivery and performance.', image: photos.design },
  { title: 'Support', eyebrow: '06', copy: 'Ongoing support helps energy systems keep working as intended.', image: photos.wind },
] as const
const testimonials = ['IQ Energies made our transition to solar straightforward and genuinely worthwhile.','From survey to installation, the team was transparent, responsive and technically excellent.','We wanted a partner, not just panels. IQ delivered a complete energy roadmap.']
const heroFrameCount = 250
const heroFrames = Array.from({ length: heroFrameCount }, (_, index) => `/images/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`)
const heroStages = [
  { start: 1, end: 50, eyebrow: 'THE ENERGY TRANSITION', headline: 'A Cleaner Future Begins Above Us.', highlight: 'Cleaner Future', copy: 'IQ Energies is building solutions that move businesses, communities and industries toward a smarter energy future.' },
  { start: 51, end: 100, eyebrow: 'ENGINEERED FOR SCALE', headline: 'Turning Sunlight Into Possibility.', highlight: 'Possibility.', copy: 'From solar systems to integrated energy infrastructure, we engineer solutions designed for real-world performance.' },
  { start: 101, end: 150, eyebrow: 'RENEWABLE ENERGY, REIMAGINED', headline: 'More Than Solar. An Entire Energy Ecosystem.', highlight: 'Energy Ecosystem.', copy: 'Solar, wind, hybrid systems, EV charging and advanced energy technologies brought together through one integrated approach.' },
  { start: 151, end: 200, eyebrow: "POWERING WHAT'S NEXT", headline: 'Built for Businesses. Built for Tomorrow.', highlight: 'Tomorrow.', copy: 'Technology, engineering and execution working together to deliver dependable clean-energy solutions.' },
  { start: 201, end: 250, eyebrow: 'IQ ENERGIES', headline: 'Engineering a Cleaner, Smarter Energy Future.', highlight: 'Smarter Energy Future.', copy: 'Discover renewable-energy solutions designed for a more sustainable tomorrow.' },
]

function Heading({ eyebrow, first, accent, copy }: { eyebrow: string; first: string; accent: string; copy?: string }) { return <div className="heading"><p className="eyebrow">{eyebrow}</p><h2>{first} <em>{accent}</em></h2>{copy && <p className="section-copy">{copy}</p>}</div> }

function AnimatedStat({ value, target, prefix = '', suffix = '' }: { value: string; target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const valueRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const node = valueRef.current
    if (!node) return
    let animationFrame = 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finish = () => setCount(target)
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      finish()
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const startedAt = performance.now()
      const animate = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / 1100)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(target * eased)
        if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
      }
      animationFrame = window.requestAnimationFrame(animate)
    }, { threshold: 0.55 })
    observer.observe(node)
    return () => {
      observer.disconnect()
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [target])

  const formatted = target % 1 === 0 ? Math.round(count).toLocaleString('en-IN') : count.toFixed(1)
  return <span ref={valueRef} aria-label={value}>{prefix}{formatted}{suffix}</span>
}


function WhatsAppIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .2 5.32.2 11.87c0 2.09.55 4.13 1.6 5.93L.1 24l6.34-1.66a11.85 11.85 0 0 0 5.63 1.43h.01c6.54 0 11.86-5.32 11.86-11.87 0-3.17-1.23-6.14-3.42-8.42ZM12.08 21.7h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.76.99 1-3.67-.23-.38a9.83 9.83 0 0 1-1.5-5.19C2.2 6.44 6.63 2 12.08 2a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.45-4.44 9.87-9.92 9.87Zm5.41-7.39c-.3-.15-1.77-.87-2.05-.97-.28-.1-.49-.15-.7.15-.2.3-.8.97-.98 1.17-.18.2-.36.23-.66.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.53.08-.8.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.27 5.18 4.58.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35Z"/></svg> }

export default function Page() {
  const [loaded, setLoaded] = useState(false), [loadingProgress, setLoadingProgress] = useState(0), [loadingError, setLoadingError] = useState(false), [loadAttempt, setLoadAttempt] = useState(0), [reducedMotion, setReducedMotion] = useState(false), [navScrolled, setNavScrolled] = useState(false), [menu, setMenu] = useState(false), [tab, setTab] = useState('Solar'), [activeSolution, setActiveSolution] = useState(0), [ecosystemStage, setEcosystemStage] = useState(0), [cart, setCart] = useState<CartLine[]>([]), [cartReady, setCartReady] = useState(false), [cartOpen, setCartOpen] = useState(false), [submitted, setSubmitted] = useState(false), [videoOpen, setVideoOpen] = useState(false), [showAll, setShowAll] = useState(false), [details, setDetails] = useState<Product | null>(null), [toast, setToast] = useState<Product | null>(null), [bill, setBill] = useState(5000), [propertyType, setPropertyType] = useState('Home')
  const heroRef = useRef<HTMLElement | null>(null)
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const heroStageElementsRef = useRef<Array<HTMLDivElement | null>>([])
  const heroHintRef = useRef<HTMLDivElement | null>(null)
  const heroDiscoverRef = useRef<HTMLAnchorElement | null>(null)
  const ecosystemRef = useRef<HTMLElement | null>(null)
  const ecosystemTrackRef = useRef<HTMLDivElement | null>(null)
  const ecosystemProgressRef = useRef<HTMLSpanElement | null>(null)
  const heroBlobsRef = useRef<Blob[]>([])
  const heroBitmapsRef = useRef(new Map<number, ImageBitmap>())
  const heroBitmapPromisesRef = useRef(new Map<number, Promise<ImageBitmap | null>>())
  const heroProgressRef = useRef(0)
  const heroTargetProgressRef = useRef(0)
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
  useEffect(() => {
    const updateNavigation = () => setNavScrolled(window.scrollY > 80)
    updateNavigation()
    window.addEventListener('scroll', updateNavigation, { passive: true })
    return () => window.removeEventListener('scroll', updateNavigation)
  }, [])
  useEffect(() => {
    const savedCart = readCart()
    setCart(savedCart)
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
  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false
    setLoaded(false)
    setLoadingError(false)
    setLoadingProgress(0)
    heroBitmapsRef.current.forEach((bitmap) => bitmap.close())
    heroBitmapsRef.current.clear()
    heroBitmapPromisesRef.current.clear()

    const loadFrames = async () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setReducedMotion(prefersReducedMotion)
      const sourceFrames = prefersReducedMotion ? heroFrames.slice(0, 1) : heroFrames
      const blobs = new Array<Blob>(sourceFrames.length)
      let completed = 0

      try {
        const firstResponse = await fetch(sourceFrames[0], { signal: controller.signal, cache: 'force-cache' })
        if (!firstResponse.ok) throw new Error(`Unable to load hero frame 1: ${firstResponse.status}`)
        blobs[0] = await firstResponse.blob()
        if (cancelled) return
        const firstFrame = await createImageBitmap(blobs[0])
        if (cancelled) {
          firstFrame.close()
          return
        }
        heroBitmapsRef.current.set(0, firstFrame)
        completed = 1
        setLoadingProgress(Math.round((completed / sourceFrames.length) * 100))

        for (let start = 1; start < sourceFrames.length; start += 12) {
          const batch = sourceFrames.slice(start, start + 12)
          await Promise.all(batch.map(async (source, offset) => {
            const response = await fetch(source, { signal: controller.signal, cache: 'force-cache' })
            const frameIndex = start + offset
            if (!response.ok) throw new Error(`Unable to load hero frame ${frameIndex + 1}: ${response.status}`)
            blobs[frameIndex] = await response.blob()
            completed += 1
          }))
          if (cancelled) return
          setLoadingProgress(Math.round((completed / sourceFrames.length) * 100))
        }
        if (cancelled) return
        heroBlobsRef.current = blobs
        setLoaded(true)
      } catch (error) {
        if (controller.signal.aborted || cancelled) return
        console.error('Unable to preload the complete IQ Energies hero frame sequence.', error)
        setLoadingError(true)
      }
    }

    void loadFrames()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [loadAttempt])
  useEffect(() => {
    if (loaded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [loaded])
  useEffect(() => {
    if (!loaded) return
    let animationFrame = 0
    let lastFrameTime = 0

    const getBitmap = (frameIndex: number) => {
      const cached = heroBitmapsRef.current.get(frameIndex)
      if (cached) {
        heroBitmapsRef.current.delete(frameIndex)
        heroBitmapsRef.current.set(frameIndex, cached)
        return Promise.resolve(cached)
      }

      const pending = heroBitmapPromisesRef.current.get(frameIndex)
      if (pending) return pending

      const frameBlob = heroBlobsRef.current[frameIndex]
      if (!frameBlob) return Promise.resolve(null)

      const request = createImageBitmap(frameBlob).then((bitmap) => {
        heroBitmapPromisesRef.current.delete(frameIndex)
        heroBitmapsRef.current.set(frameIndex, bitmap)
        while (heroBitmapsRef.current.size > 8) {
          const oldestIndex = heroBitmapsRef.current.keys().next().value
          if (oldestIndex === undefined) break
          const oldest = heroBitmapsRef.current.get(oldestIndex)
          heroBitmapsRef.current.delete(oldestIndex)
          oldest?.close()
        }
        return bitmap
      }).catch((error: unknown) => {
        heroBitmapPromisesRef.current.delete(frameIndex)
        console.error(`Unable to decode IQ Energies hero frame ${frameIndex + 1}.`, error)
        return null
      })
      heroBitmapPromisesRef.current.set(frameIndex, request)
      return request
    }

    const drawCover = (context: CanvasRenderingContext2D, image: ImageBitmap, width: number, height: number) => {
      const scale = Math.max(width / image.width, height / image.height)
      const drawWidth = image.width * scale
      const drawHeight = image.height * scale
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
    }

    const drawFrame = (progress: number) => {
      const canvas = heroCanvasRef.current
      const context = canvas?.getContext('2d', { alpha: false })
      if (!canvas || !context) return

      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      const pixelWidth = Math.round(width * pixelRatio)
      const pixelHeight = Math.round(height * pixelRatio)
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth
        canvas.height = pixelHeight
      }

      const framePosition = progress * (heroBlobsRef.current.length - 1)
      const currentIndex = Math.floor(framePosition)
      const nextIndex = Math.min(currentIndex + 1, heroBlobsRef.current.length - 1)
      const blend = framePosition - currentIndex
      const current = heroBitmapsRef.current.get(currentIndex)
      const next = heroBitmapsRef.current.get(nextIndex)
      const available = current ?? next
      if (!available) return

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.fillStyle = '#dfe4dc'
      context.fillRect(0, 0, width, height)
      if (current) drawCover(context, current, width, height)
      else drawCover(context, available, width, height)
      if (current && next && currentIndex !== nextIndex && blend > 0) {
        context.globalAlpha = blend
        drawCover(context, next, width, height)
        context.globalAlpha = 1
      }
    }

    const renderCurrentPosition = () => {
      const progress = heroProgressRef.current
      const position = progress * (heroBlobsRef.current.length - 1)
      const currentIndex = Math.floor(position)
      const nextIndex = Math.min(currentIndex + 1, heroBlobsRef.current.length - 1)
      const frameNumber = Math.round(progress * (heroFrameCount - 1)) + 1
      const activeStageIndex = heroStages.findIndex((stage) => frameNumber >= stage.start && frameNumber <= stage.end)
      heroStageElementsRef.current.forEach((stage, index) => {
        if (!stage || stage.classList.contains('is-active') === (index === activeStageIndex)) return
        stage.classList.toggle('is-active', index === activeStageIndex)
        stage.setAttribute('aria-hidden', String(index !== activeStageIndex))
        stage.inert = index !== activeStageIndex
      })
      heroHintRef.current?.classList.toggle('is-hidden', progress > 0.06)
      heroDiscoverRef.current?.classList.toggle('is-hidden', progress < 0.94)
      drawFrame(progress)
      void getBitmap(currentIndex).then(() => drawFrame(heroProgressRef.current))
      if (nextIndex !== currentIndex) {
        void getBitmap(nextIndex).then(() => drawFrame(heroProgressRef.current))
      }
    }

    const animateScrollProgress = (timestamp: number) => {
      animationFrame = 0
      const heroNode = heroRef.current
      if (!heroNode) return
      const scrollDistance = Math.max(0, -heroNode.getBoundingClientRect().top)
      const scrollableDistance = Math.max(1, heroNode.offsetHeight - window.innerHeight)
      heroTargetProgressRef.current = reducedMotion
        ? 0
        : clamp(scrollDistance / scrollableDistance, 0, 1)
      const elapsed = lastFrameTime ? Math.min(timestamp - lastFrameTime, 50) : 16
      lastFrameTime = timestamp
      const current = heroProgressRef.current
      const target = heroTargetProgressRef.current
      const difference = target - current
      const progress = Math.abs(difference) < 0.001
        ? target
        : current + difference * (1 - Math.exp(-elapsed / 70))
      heroProgressRef.current = progress
      renderCurrentPosition()

      if (progress !== target) animationFrame = window.requestAnimationFrame(animateScrollProgress)
      else lastFrameTime = 0
    }

    const updateScrollProgress = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(animateScrollProgress)
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
      heroBitmapsRef.current.forEach((bitmap) => bitmap.close())
      heroBitmapsRef.current.clear()
      heroBitmapPromisesRef.current.clear()
    }
  }, [loaded, reducedMotion])
  useEffect(() => {
    let animationFrame = 0
    const updateEcosystemProgress = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0
        const section = ecosystemRef.current
        const track = ecosystemTrackRef.current
        const viewport = track?.parentElement
        if (!section || !track || !viewport) return
        const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight)
        const progress = reducedMotion ? 0 : clamp(Math.max(0, -section.getBoundingClientRect().top) / scrollableDistance, 0, 1)
        const trackDistance = Math.max(0, track.scrollWidth - viewport.clientWidth)
        track.style.transform = `translate3d(-${Math.round(trackDistance * progress)}px, 0, 0)`
        if (ecosystemProgressRef.current) ecosystemProgressRef.current.style.transform = `scaleX(${progress})`
        const activeIndex = Math.min(ecosystemStages.length - 1, Math.floor(progress * ecosystemStages.length))
        setEcosystemStage((current) => current === activeIndex ? current : activeIndex)
      })
    }
    updateEcosystemProgress()
    window.addEventListener('scroll', updateEcosystemProgress, { passive: true })
    window.addEventListener('resize', updateEcosystemProgress)
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateEcosystemProgress)
      window.removeEventListener('resize', updateEcosystemProgress)
    }
  }, [reducedMotion])
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.parallax-section'))
    const updateParallax = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const progress = reducedMotion ? 0 : clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), -1, 1)
        section.style.setProperty('--parallax-shift', `${progress * 100}px`)
      })
    }

    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    window.addEventListener('resize', updateParallax)
    return () => {
      window.removeEventListener('scroll', updateParallax)
      window.removeEventListener('resize', updateParallax)
    }
  }, [reducedMotion])
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true) }
  const visible = products.filter((p) => p.category === tab); const systemSize = Math.max(0.5, Math.round((bill / 900) * 2) / 2); const yearlySavings = bill * 12 * 0.85; const payback = systemSize * 55000 / yearlySavings; const co2 = systemSize * 1.2
  const add = (product: Product) => {
    const id = products.indexOf(product)
    if (id < 0) return
    setCart((items) => {
      const existing = items.find((item) => item.id === id)
      return existing
        ? items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { id, product, quantity: 1 }]
    })
    setToast(product)
    window.setTimeout(() => setToast(null), 3600)
  }
  const updateCartQuantity = (id: number, quantity: number) => setCart((items) => quantity > 0
    ? items.map((item) => item.id === id ? { ...item, quantity } : item)
    : items.filter((item) => item.id !== id))
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartSubtotal = cart.reduce((total, item) => total + getProductAmount(item.product.price) * item.quantity, 0)
  return <main className="site-shell">{toast && <div className="cart-toast" role="status"><img src={toast.image} alt="" /><div><strong>{toast.name}</strong><span>Qty: 1 · Added to cart</span></div><button onClick={() => setToast(null)} aria-label="Dismiss cart notification"><X /></button></div>}
    {!loaded && <div className="loader" role="status" aria-live="polite"><img src={logoUrl} alt="IQ Energies" />{loadingError ? <><p>We could not load the complete cinematic sequence.</p><button className="button button-green" type="button" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>Retry loading</button></> : <><div className="loader-line"><span style={{ width: `${loadingProgress}%` }} /></div><p>PREPARING ALL 250 FRAMES · {loadingProgress}%</p></>}</div>}
    <div className="utility-bar"><div className="container utility-inner"><span>Powering a cleaner tomorrow across India</span><span>sales@iqenergies.co.in <i /> +91 82768 63844</span></div></div>
    <header className={`navbar${navScrolled ? ' is-scrolled' : ''}`}><div className="container nav-inner"><a href="/" className="brand"><img src={logoUrl} alt="IQ Energies Ltd." /></a><nav className="nav-links"><a href="/about">About</a><a href="/solutions">Solutions</a><a href="/products">Products</a><a href="/franchise">Franchise</a><a href="/services">Services</a><a href="/contact">Contact</a></nav><div className="nav-actions"><button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}><ShoppingCart />{cartCount > 0 && <b>{cartCount}</b>}</button><a className="button button-orange" href="/contact">Enquire now</a><button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X /> : <Menu />}</button></div></div>{menu && <nav className="mobile-nav"><a href="/about">About</a><a href="/solutions">Solutions</a><a href="/products">Products</a><a href="/franchise">Franchise</a><a href="/contact">Contact</a></nav>}</header>
    <section id="home" className={`cinematic-hero${reducedMotion ? ' is-static' : ''}`} ref={heroRef}>
      <div className="cinematic-hero__sticky">
        <canvas className="cinematic-hero__canvas" ref={heroCanvasRef} aria-hidden="true" />
        <div className="cinematic-hero__overlay" />
        <div className="container cinematic-hero__inner">
          <div className="cinematic-hero__copy">
            {heroStages.map((stage, index) => {
              const isActive = index === 0
              return <div key={stage.eyebrow} ref={(element) => { heroStageElementsRef.current[index] = element }} className={`cinematic-hero__stage ${isActive ? 'is-active' : ''}`} aria-hidden={!isActive} inert={!isActive}>
                <p className="eyebrow eyebrow-light">{stage.eyebrow}</p>
                <h1>{stage.headline.slice(0, stage.headline.indexOf(stage.highlight))}<span className="cinematic-hero__highlight">{stage.highlight}</span></h1>
                <p>{stage.copy}</p>
                <div className="cta-row">
                  <a className="button button-navy" href="/solutions">Explore Solutions <ArrowRight /></a>
                  <a className="button button-outline-light" href="/contact">Talk to IQ Energies</a>
                </div>
              </div>
            })}
          </div>
          <aside className="quote-card cinematic-hero__quote">
            {submitted ? <div className="success-state"><Check /><h3>Thank you for reaching out.</h3><p>Our energy expert will be in touch shortly.</p></div> : <form onSubmit={submit}><p className="eyebrow">Get started</p><h2>Book your <em>free solar survey</em></h2><div className="form-grid"><input required placeholder="Full name" aria-label="Full name" /><input required placeholder="Phone number" aria-label="Phone number" /><input type="email" required placeholder="Email address" aria-label="Email address" /><input placeholder="City" aria-label="City" /><textarea required placeholder="Message / requirements" aria-label="Message / requirements" rows={2} /></div><button className="button button-green" type="submit">Submit request <ArrowRight /></button></form>}
          </aside>
          <div className="cinematic-hero__hint" ref={heroHintRef}>Scroll to explore <span aria-hidden="true">↓</span></div>
          <div className="cinematic-hero__caption">IQ ENERGIES <i /> SOLAR <i /> HYBRID <i /> EV</div>
          <a className="cinematic-hero__discover is-hidden" ref={heroDiscoverRef} href="#about">Discover IQ Energies <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
    <section className="trust-band" aria-labelledby="trust-heading">
      <div className="container trust-band__inner">
        <div className="trust-band__intro">
          <p className="eyebrow">Scale with purpose</p>
          <h2 id="trust-heading">Powering a new energy economy.</h2>
        </div>
        <div className="trust-band__stats">
          <div><strong><AnimatedStat value="500+" target={500} suffix="+" /></strong><span>Franchise network</span></div>
          <div><strong><AnimatedStat value="₹2.5Cr+" target={2.5} prefix="₹" suffix="Cr+" /></strong><span>Average annual revenue</span></div>
          <div><strong><AnimatedStat value="85%" target={85} suffix="%" /></strong><span>Success rate</span></div>
          <div><strong><AnimatedStat value="15+" target={15} suffix="+" /></strong><span>Industry awards</span></div>
        </div>
      </div>
    </section>
    <section id="about" className="section parallax-section about-bg">
      <div className="container two-col">
        <div>
          <Heading eyebrow="01 — Who we are" first="Engineering" accent="the energy transition" copy="IQ Energies brings together renewable technologies and engineering expertise to support energy needs at every scale." />
          <p className="body-copy">Our integrated approach spans solar, wind, hybrid systems, EV charging and advanced energy technologies for residential, commercial, industrial and utility-scale requirements.</p>
          <div className="about-highlights">
            {['Innovation driven', 'Sustainability first', 'Global presence', 'Trusted expertise'].map((item) => <span key={item}><Check aria-hidden="true" />{item}</span>)}
          </div>
          <div className="about-calculator"><div><p className="eyebrow">Quick savings estimate</p><strong>₹{Math.round(yearlySavings / 12).toLocaleString('en-IN')}</strong><span>estimated monthly savings</span></div><input type="range" min="500" max="20000" step="100" value={bill} onChange={(event) => setBill(Number(event.target.value))} aria-label="Monthly electricity bill" /><small>Based on a ₹{bill.toLocaleString('en-IN')} monthly bill</small><div className="about-calculator-fields"><div><span>Recommended system</span><strong>{systemSize} kW</strong></div><div><span>Yearly savings</span><strong>₹{Math.round(yearlySavings).toLocaleString('en-IN')}</strong></div><div><span>Payback period</span><strong>{payback.toFixed(1)} years</strong></div><div><span>CO₂ offset / year</span><strong>{co2.toFixed(1)} tons</strong></div></div></div>
          <a className="text-link" href="#contact">Discover our approach <ArrowRight /></a>
        </div>
        <div className="about-composition">
          <div className="about-collage" aria-label="IQ Energies clean energy capabilities">
            <div className="collage-tile collage-main"><img src={photos.about} alt="Solar panels in a field" /></div>
            <div className="collage-tile collage-top"><img src={photos.design} alt="Energy planning and project design" /></div>
            <div className="collage-tile collage-side"><img src={photos.wind} alt="Wind turbines at sunset" /></div>
            <div className="collage-accent" aria-hidden="true" />
          </div>
          <div className="stat-card"><strong>12+</strong><span>years of clean energy expertise</span><small>ENERGY · ENGINEERING · EXECUTION</small></div>
        </div>
      </div>
    </section>
    <section id="solutions" className="section solutions-bg">
      <div className="container">
        <Heading eyebrow="02 — Our solutions" first="Clean energy" accent="designed for the future" copy="Integrated technologies for a more resilient, lower-carbon energy system." />
        <div className="solution-feature">
          <div className="solution-list">
            {homepageSolutions.map((solution, index) => {
              const Icon = solution.Icon
              return <button type="button" key={solution.title} className={`solution-list__item${activeSolution === index ? ' is-active' : ''}`} onMouseEnter={() => setActiveSolution(index)} onFocus={() => setActiveSolution(index)} onClick={() => setActiveSolution(index)} aria-pressed={activeSolution === index}>
                <span>0{index + 1}</span><Icon /><strong>{solution.title}</strong><ArrowRight />
              </button>
            })}
          </div>
          <div className="solution-feature__visual" style={{ backgroundImage: `linear-gradient(0deg,rgba(13,27,35,.7),transparent 58%),url(${homepageSolutions[activeSolution].image})` }}>
            <div>
              <p className="eyebrow eyebrow-light">{String(activeSolution + 1).padStart(2, '0')} / 06</p>
              <h3>{homepageSolutions[activeSolution].title}</h3>
              <p>{homepageSolutions[activeSolution].copy}</p>
              <a href="/solutions">Explore this solution <ArrowRight /></a>
            </div>
          </div>
        </div>
        <a className="button button-green section-cta" href="/solutions">Explore all solutions <ArrowRight /></a>
      </div>
    </section>
    <section className="section intelligence-section"><div className="container"><Heading eyebrow="Our solutions" first="Intelligent energy" accent="built for tomorrow" copy="Integrated clean-energy systems designed to make every unit of energy work harder, smarter and longer." /><div className="flip-grid">{capabilityCards.map(([title,Icon,image,text,bullets]) => <div className="flip-card" key={title}><div className="flip-inner"><article className="flip-face flip-front" style={{ backgroundImage: `linear-gradient(135deg,rgba(26,26,26,.28),rgba(124,179,66,.82)),url(${photos.panels})` }}><Icon /><h3>{title}</h3><p>{text}</p></article><article className="flip-face flip-back"><Icon /><h3>{title}</h3><ul>{bullets.map((b) => <li key={b}><Check />{b}</li>)}</ul></article></div></div>)}</div></div></section>
    <section id="products" className="section product-section"><div className="container"><Heading eyebrow="Sustainable energy products" first="Built for" accent="the future" copy="Explore dependable equipment selected for homes, businesses and public infrastructure." /><div className="tabs">{tabs.map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div><div className="product-grid">{visible.map((product, index) => <TiltCard key={`${product.category}-${product.name}-${index}`}><article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} /><span className={`badge ${product.accent}`}>{product.badge || product.category}</span></div><div className="product-body"><small className="product-category">{product.category}</small><h3>{product.name}</h3><p>{product.spec}</p><strong>{product.price}</strong><button className="button button-green" onClick={() => add(product)}>Add to Cart <ArrowRight /></button><button className="details-link" onClick={() => setDetails(product)}>View Details <ArrowRight /></button></div></article></TiltCard>)}</div><button className="view-all" onClick={() => setShowAll(!showAll)}>{showAll ? 'Hide all products' : 'View all products'} <ChevronRight /></button>{showAll && <div className="all-products">{products.map((product, index) => <article className="all-product" key={`${product.category}-${product.name}-${index}`}><img src={product.image} alt={product.name} /><div><span className={`badge ${product.accent}`}>{product.category}</span><h3>{product.name}</h3><p>{product.spec}</p></div><strong>{product.price}</strong><div className="all-product__actions"><button className="small-cart" onClick={() => add(product)}>Add to Cart</button><button className="details-link" onClick={() => setDetails(product)}>View Details</button></div></article>)}</div>}</div></section>
<section className={`ecosystem-story${reducedMotion ? ' is-static' : ''}`} ref={ecosystemRef} aria-label="IQ Energies integrated energy ecosystem">
  <div className="ecosystem-story__sticky">
    <div className="container ecosystem-story__header">
      <div><p className="eyebrow">03 — The energy ecosystem</p><h2>One connected journey.<br />From generation to support.</h2></div>
      <div className="ecosystem-story__progress"><span ref={ecosystemProgressRef} /></div>
    </div>
    <div className="ecosystem-story__viewport">
      <div className="ecosystem-story__track" ref={ecosystemTrackRef}>
        {ecosystemStages.map((stage, index) => (
          <article className={`ecosystem-story__stage${ecosystemStage === index ? ' is-active' : ''}`} key={stage.title} style={{ backgroundImage: `linear-gradient(0deg,rgba(15,31,40,.8),rgba(15,31,40,.08) 78%),url(${stage.image})` }}>
            <span>{stage.eyebrow} / 06</span>
            <div><p className="eyebrow eyebrow-light">{stage.eyebrow} — THE VALUE CHAIN</p><h3>{stage.title}</h3><p>{stage.copy}</p></div>
          </article>
        ))}
      </div>
    </div>
    <div className="container ecosystem-story__footer"><span>Solar · Storage · Hybrid · EV · Engineering · Support</span><span>Scroll to move through the ecosystem ↓</span></div>
  </div>
</section>
    <section id="franchise" className="section franchise-section"><div className="container franchise-grid"><div><Heading eyebrow="Solar franchise" first="Start your solar" accent="franchise business" copy="Build a high-potential renewable energy business with the support of a proven clean-energy partner." /><div className="button-row"><a className="button button-green" href="#contact">Explore franchise <ArrowRight /></a><button className="button button-outline"><Download /> Download brochure</button></div></div><button className="video-card" onClick={() => setVideoOpen(true)}><img src={photos.wind} alt="Wind turbines at sunset" /><span className="play-button"><Play fill="currentColor" /></span><strong>From zero to a renewable business</strong></button></div></section>
    <section id="services" className="section services-section"><div className="container"><Heading eyebrow="End-to-end renewable services" first="From first sketch" accent="to final switch-on" /><div className="service-grid"><article className="service-card"><img src={photos.about} alt="Solar installation" /><div><p className="eyebrow">01 / EPC</p><h3>Turnkey EPC</h3><p>End-to-end Engineering, Procurement, and Construction solutions delivering fully integrated solar and wind power projects with assured quality, timelines, and performance.</p><a href="#contact" className="service-cta">Plan your project <ArrowRight /></a></div></article><article className="service-card"><img src={photos.design} alt="Project management" /><div><p className="eyebrow">02 / Design</p><h3>Customized Design &amp; Project Management</h3><p>Tailor-made solar and wind solutions with expert project planning, site assessment, system design, and execution management to maximize efficiency and ROI.</p><a href="#contact" className="service-cta">Speak with an expert <ArrowRight /></a></div></article></div></div></section>
    <section className="section testimonial-section"><div className="container"><div className="center-heading"><Quote /><Heading eyebrow="Client stories" first="Real stories," accent="real results" /></div><div className="marquee marquee-left">{[...testimonials,...testimonials].map((quote,i)=><article className="testimonial" key={`${quote}-${i}`}><div className="avatar">{['AS','RM','MD'][i%3]}</div><div className="stars">★★★★★</div><p>“{quote}”</p><strong>{['Ankit Saha','Riya Mehta','Mohan Das'][i%3]}</strong></article>)}</div><div className="marquee marquee-right" aria-label="More client testimonials moving in the opposite direction">{[...testimonials,...testimonials].reverse().map((quote,i)=><article className="testimonial" key={`${quote}-${i}`}><div className="avatar">{['PS','AR','NK'][i%3]}</div><div className="stars">★★★★★</div><p>“{quote}”</p><strong>{['Priya Sen','Arjun Rao','Neha Kapoor'][i%3]}</strong></article>)}</div></div></section>
    <section id="contact" className="section contact-section"><div className="container two-col"><div><Heading eyebrow="Get started" first="Let&apos;s talk about your" accent="energy requirements" copy="Tell us what you are building. We will help you find the right next step." /><div className="contact-list"><a href="tel:+918276863844"><Phone /> +91 82768 63844</a><a href="mailto:sales@iqenergies.co.in"><Mail /> sales@iqenergies.co.in</a><p><Building2 /> Serving homes and businesses across India</p></div></div><div className="contact-form">{submitted ? <div className="success-state"><Check /><h3>Thank you for reaching out.</h3><p>Our energy expert will be in touch shortly.</p><button className="text-link" onClick={() => setSubmitted(false)}>Send another enquiry</button></div> : <form onSubmit={submit}><h3>Book your <em>free solar survey</em></h3><div className="form-grid"><input required placeholder="Full name" aria-label="Full name" /><input required placeholder="Phone number" aria-label="Phone number" /><input type="email" required placeholder="Email address" aria-label="Email address" /><input placeholder="City" aria-label="City" /><textarea required placeholder="Message / requirements" aria-label="Message / requirements" rows={4} /></div><button className="button button-green" type="submit">Submit request <ArrowRight /></button></form>}</div></div></section>
    <footer className="footer"><div className="container footer-qr"><a href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XY20cHVmwnrXUtVGSzHCg6MjDX2CkL.png" target="_blank" rel="noreferrer"><div><p className="eyebrow">Resources</p><h3>Download Our Brochure</h3><span>Scan or click to download <ArrowRight /></span></div><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XY20cHVmwnrXUtVGSzHCg6MjDX2CkL.png" alt="QR code for downloading the IQ Energies brochure" /></a><a href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HRqljDB79aVkIWnRkjQAKRbWsabdyZ.png" target="_blank" rel="noreferrer"><div><p className="eyebrow">Verification</p><h3>Check Our Certificate</h3><span>Scan or click to view <ArrowRight /></span></div><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HRqljDB79aVkIWnRkjQAKRbWsabdyZ.png" alt="QR code for viewing the IQ Energies certificate" /></a></div><div className="container footer-grid"><div className="footer-brand"><img src={logoUrl} alt="IQ Energies Ltd. full logo" /><p>Energy that works for life.</p><div className="socials"><a aria-label="LinkedIn">in</a><a aria-label="Instagram">ig</a><a aria-label="Facebook">f</a><a aria-label="X">x</a></div></div><div><h4>Quick links</h4><a href="/">Home</a><a href="/about">About Us</a><a href="/solutions">Solutions</a><a href="/products">Products</a><a href="/franchise">Franchise</a><a href="/contact">Contact</a></div><div><h4>Our solutions</h4><a href="/solar">Solar</a><a href="/wind">Wind</a><a href="/hybrid-energy">Hybrid systems</a><a href="/ev-charging">EV charging</a><a href="/solutions">Smart infrastructure</a></div><div><h4>Get in touch</h4><p>India-wide clean energy partner</p><a href="tel:+918276863844">+91 82768 63844</a><a href="mailto:sales@iqenergies.co.in">sales@iqenergies.co.in</a><p>Mon – Sat · 9:30 AM – 6:30 PM</p></div></div><div className="container footer-bottom"><span>© 2026 IQ Energies Ltd. All rights reserved.</span><span>Privacy Policy · Terms</span><span>Developed for a greener future</span></div></footer>
    <div className="floating-actions"><a href="https://wa.me/918276863844" aria-label="WhatsApp IQ Energies"><WhatsAppIcon /></a><a href="tel:+918276863844" aria-label="Call IQ Energies"><Phone /></a></div>
    {videoOpen && <div className="modal-backdrop" onClick={() => setVideoOpen(false)}><div className="video-modal" onClick={(e) => e.stopPropagation()}><button onClick={() => setVideoOpen(false)} aria-label="Close video"><X /></button><CirclePlay /><h3>Franchise journey video</h3><p>Video placeholder — replace with the final franchise film when available.</p></div></div>}
    {details && <div className="modal-backdrop" onClick={() => setDetails(null)}><div className="details-modal" role="dialog" aria-modal="true" aria-labelledby="product-details-heading" onClick={(e) => e.stopPropagation()}><button onClick={() => setDetails(null)} aria-label="Close product details"><X /></button><img src={details.image} alt={details.name} /><div><span className={`badge ${details.accent}`}>{details.category}</span><p className="eyebrow">Product details</p><h2 id="product-details-heading">{details.name}</h2><p className="modal-description">{details.description}</p><dl><div><dt>Specification</dt><dd>{details.spec}</dd></div><div><dt>Price</dt><dd>{details.price}</dd></div><div><dt>Availability</dt><dd>India-wide delivery and installation support</dd></div></dl><button className="button button-green" onClick={() => { add(details); setDetails(null) }}>Add to Cart <ArrowRight /></button></div></div></div>}
    {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-heading" onClick={(e) => e.stopPropagation()}><div className="cart-drawer__header"><div><p className="eyebrow">IQ Energies store</p><h2 id="cart-heading">Your cart <em>({cartCount})</em></h2><p className="cart-drawer__caption">{cartCount ? `${cartCount} item${cartCount === 1 ? '' : 's'} selected for your energy setup` : 'Your energy setup starts here.'}</p></div><button className="cart-drawer__close" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>
      {cart.length ? <><div className="cart-drawer__items">{cart.map(({ id, product, quantity }) => <article className="cart-line" key={id}><div className="cart-line__image"><img src={product.image} alt={product.name} /><span className={`badge ${product.accent}`}>{product.category}</span></div><div className="cart-line__content"><div className="cart-line__title"><h3>{product.name}</h3><button className="cart-line__remove" onClick={() => updateCartQuantity(id, 0)} aria-label={`Remove ${product.name}`}><Trash2 /></button></div><p>{product.spec}</p><strong>{product.price}</strong><div className="cart-line__bottom"><div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button onClick={() => updateCartQuantity(id, quantity - 1)} aria-label="Decrease quantity"><Minus /></button><span>{quantity}</span><button onClick={() => updateCartQuantity(id, quantity + 1)} aria-label="Increase quantity"><Plus /></button></div><span className="cart-line__total">{formatINR(getProductAmount(product.price) * quantity)}</span></div></div></article>)}</div><div className="cart-drawer__footer"><div className="cart-subtotal"><span>Estimated subtotal</span><strong>{formatINR(cartSubtotal)}</strong></div><p>Final pricing, delivery and installation details will be confirmed by our energy team.</p><a className="button button-green" href="/checkout" onClick={() => setCartOpen(false)}>Continue to checkout <ArrowRight /></a><button className="cart-continue" onClick={() => setCartOpen(false)}>Continue shopping</button></div></> : <div className="cart-empty"><ShoppingCart /><h3>Your cart is waiting</h3><p>Add a product to compare your energy setup and request a tailored quote.</p><button className="button button-green" onClick={() => setCartOpen(false)}>Explore products <ArrowRight /></button></div>}
    </aside></div>}
  </main>
}
