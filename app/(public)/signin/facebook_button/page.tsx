'use client'
import { Button } from 'antd'
import React from 'react'
import "antd/lib/style/index"
import { FacebookFilled } from '@ant-design/icons';
import { signIn } from 'next-auth/react';

type ProviderType = {
  id: string,
  name: string,
  type: string,
  signinUrl: string,
  callbackUrl: string
}

interface Props {
  params: {
    provider: ProviderType
  }
}
export default function FacebookSigninButton({ params: { provider } }: Props) {
  return (
    <div >
      <Button
        onClick={() => {
          signIn(provider.id, { callbackUrl: "/signin/signin_action" })
        }}
        type='primary'
        className='facebook_btn'
        style={{ height: "50px" }}
      >
        <div className='flex flex-row align-middle justify-center items-center text-xl'>
          <FacebookFilled className='mr-2 text-2xl' />
          <span>
            Sign in with Facebook
          </span>
        </div>
      </Button>
    </div>
  )
}
