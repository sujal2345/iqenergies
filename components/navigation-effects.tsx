'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-V9KjfFouEAh27THt9YPGv0M2fLrlPT.png'

export function NavigationEffects() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const loadingTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const clearLoading = () => {
      if (loadingTimerRef.current !== null) {
        window.clearTimeout(loadingTimerRef.current)
        loadingTimerRef.current = null
      }
      setIsLoading(false)
    }

    clearLoading()
  }, [pathname])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target && anchor.target !== '_self' || anchor.hasAttribute('download')) return

      const destination = new URL(anchor.href, window.location.href)
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return

      if (loadingTimerRef.current !== null) window.clearTimeout(loadingTimerRef.current)
      loadingTimerRef.current = window.setTimeout(() => setIsLoading(true), 160)
    }

    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
      if (loadingTimerRef.current !== null) window.clearTimeout(loadingTimerRef.current)
    }
  }, [])

  useEffect(() => {
    let previousScrollY = window.scrollY
    const updateNavigationVisibility = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - previousScrollY
      if (currentScrollY <= window.innerHeight * 0.1 || scrollDelta < -4) {
        document.querySelectorAll<HTMLElement>('.navbar.is-hidden-nav').forEach((navbar) => navbar.classList.remove('is-hidden-nav'))
      } else if (scrollDelta > 4) {
        document.querySelectorAll<HTMLElement>('.navbar:not(.is-hidden-nav)').forEach((navbar) => navbar.classList.add('is-hidden-nav'))
      }
      previousScrollY = currentScrollY
    }

    window.addEventListener('scroll', updateNavigationVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateNavigationVisibility)
  }, [])

  return isLoading ? (
    <div className="route-loader" role="status" aria-live="polite">
      <img src={logoUrl} alt="IQ Energies" />
      <div className="route-loader__line"><span /></div>
      <p>LOADING PAGE</p>
    </div>
  ) : null
}
