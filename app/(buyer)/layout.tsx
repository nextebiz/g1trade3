import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PublicHeader from '../(public)/header/page'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import PublicFooter from '../(public)/footer/page'
interface Props {
    children: React.ReactNode
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
