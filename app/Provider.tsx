import { getServerSession } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
interface Props {
    children: React.ReactNode
}

export default async function Provider({ children }: Props) {
    const session = await getServerSession()
    return (
        <>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </>
    )
}
