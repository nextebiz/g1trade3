import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PublicHeader from './header/page'
import PublicFooter from './footer/page'
import { NextAuthProvider } from "./Provider";
import { Metadata } from 'next'
// import { useRouter } from 'next/navigation'


export const metadata: Metadata = {
    title: 'G1 Garlic Mandi | G1 Garlic Trading Online | Buy & Sell G1 Garlic',
    description: 'Buy and Sell G1 Garlic online',
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
