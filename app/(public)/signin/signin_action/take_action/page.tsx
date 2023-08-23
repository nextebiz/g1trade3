'use client'
import { Session } from 'next-auth'
import React from 'react'
import SellerAction from './seller_action/page'
import BuyerAction from './buyer_action/page'

interface Props {
    params: {
        session: Session | null
    }
}
export default function TakeAction({ params: { session } }: Props) {
    return (
        <div>
            {
                session && (session.user.role === "BUYER") ?
                    <BuyerAction params={{ session }} />
                    : ""
            }
            {
                session && (session.user.role === "SELLER") ?
                    <SellerAction params={{ session }} />
                    : "No Session Found"
            }

        </div>
    )
}
