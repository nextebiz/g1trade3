import './globals.css'
import './styles.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { RootStyleRegistry } from '@/components/root-style-registry'
import ThemeProvider from './themeProvider'
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation"
const inter = Inter({ subsets: ['latin'] })
import { headers } from "next/headers"
import { authOptions } from './api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'G1 Garlic Mandi | G1 Garlic Trading Online | Sell G1 Garlic',
  description: 'Buy and Sell G1 Garlic online',
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
}

// async function checkSession() {
//   const session = await getServerSession()
//   return session;
// }
 
export default async function RootLayout({

  
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootStyleRegistry>
          <ThemeProvider>
            <div >
              {children}
            </div>
          </ThemeProvider>
        </RootStyleRegistry>
      </body>
    </html>
  )
}
