import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PublicHeader from '../(public)/header/page'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import PublicFooter from '../(public)/footer/page'
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
export default async function PublicLayout({ children }: Props) {
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
            {/* <BuyerSessionManager session={session} /> */}
            <PublicHeader session={session} />

            {session && (session.user.role === "BUYER" || session && session.user.role === "SELLER" ? children :
                <div>You are not authorised</div>) ?
                children :
                <div>You are not authorised</div>}

            <PublicFooter />

        </>
    )
}
