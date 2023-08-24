import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PublicHeader from './header/page'
import PublicFooter from './footer/page'
import { NextAuthProvider } from "./Provider";
import { Metadata } from 'next'
// import { useRouter } from 'next/navigation'


export const metadata: Metadata = {
    title: 'G1 Garlic Mandi | G1 Garlic Trading Online | Sell G1 Garlic',
    description: 'Buy and Sell G1 Garlic online',
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon/favicon-16x16.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            url: '/favicon/apple-touch-icon.png',
        },
    ]
}

interface Props {
    children: React.ReactNode
}
export default async function PublicLayout({ children }: Props) {
    const session = await getServerSession(authOptions)
    return (
        <>
            <NextAuthProvider>
                <PublicHeader session={session} />
                {children}
                <PublicFooter />
            </NextAuthProvider>
        </>
    )
}
