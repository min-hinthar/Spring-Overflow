import React, {createContext} from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter, Space_Grotesk } from 'next/font/google'
import type { Metadata } from 'next'

import './globals.css'
import '../styles/prism.css'
import { ThemeProvider } from '../context/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
})

export const metadata: Metadata = {
  title: 'Spring Overflow',
  description: 'A community-driven platform/web app that combines web development and social justice, allowing users to ask and answer questions about web development, coding and programming, while supporting the Burma Spring Revolution and Civil Disobedience Movement.',
  icons: {
    icon: '/assets/icons/spring.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <ClerkProvider
            appearance={{
              elements: {
                formButtonPrimary: 'primary-gradient',
                footerActionLink: 'primary-text-gradient hover:text-primary-500'
              }
            }}
          >
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </ClerkProvider> 
        </body>
      </html>
  )
}