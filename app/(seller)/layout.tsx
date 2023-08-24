import React from 'react'
import PublicHeader from '../(public)/header/page'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PublicFooter from '../(public)/footer/page'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
interface Props {
    children: React.ReactNode
}


export const metadata: Metadata = {
    title: 'G1 Garlic Mandi | G1 Garlic Trading Online | Sell G1 Garlic',
    description: 'Buy and Sell G1 Garlic online',
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
    icons: {
        icon: '/icon.png',
    },
}

export default async function SellerLayout({ children }: Props) {
    const session = await getServerSession(authOptions)
    const headerslist = headers();
    const getSigninPath = headerslist.get("x-invoke-path")
    if (!session) {
        if (getSigninPath !== "/signin") {
            redirect("/signin")
        }
    }

    return (
        <>
            {/* <SellerSessionManager session={session} /> */}
            <PublicHeader session={session} />
            {
                session && session.user.role === "SELLER" ? children : <div>You are not authorised</div>
            }
            <PublicFooter />
        </>
    )
}
