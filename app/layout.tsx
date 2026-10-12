import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { NavigationEffects } from '@/components/navigation-effects'
import './globals.css'

export const metadata: Metadata = {
  title: 'IQ Energies Ltd. | Energy that works for life',
  description: 'Smarter solar, water and wind energy solutions for homes, farms and businesses across India.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f8f3',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <NavigationEffects />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
