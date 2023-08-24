import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PublicHeader from '../(public)/header/page'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import PublicFooter from '../(public)/footer/page'


export const metadata: Metadata = {
    title: 'Admin - G1 Garlic Mandi | G1 Garlic Trading Online | Buy and Sell G1 Garlic',
    description: 'Buy and Sell G1 Garlic online',
}
interface Props {
    children: React.ReactNode
}

export default async function AdminLayout({ children }: Props) {
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
            {/* <AdminSessionManager session={session} /> */}
            <PublicHeader session={session} />
            {
                session && session.user.role === "ADMIN" ? children : <div>You are not authorised</div>
            }
            <PublicFooter />

        </>
    )
}
