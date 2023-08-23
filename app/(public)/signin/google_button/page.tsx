'use client'
import { Button } from 'antd'
import { signIn } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { GoogleOutlined } from '@ant-design/icons';

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

export default function GoogleSigninButton({ params: { provider} }: Props) {
  const [path_name, setPathName] = useState("/signin/signin_action")

  useEffect(() => {
    // sessionStorage.setItem("signin_url", pathName)
    const signin_url = sessionStorage.getItem("signin_url") as string
    if (signin_url !== undefined) {
      setPathName(signin_url)
    }

  }, [])


  return (
    <div>
      <Button className='google_btn'
        onClick={() => {
          signIn(provider.id, { callbackUrl: "/signin/signin_action" })
          // signIn(provider.id, { callbackUrl: path_name })
        }}
        type='primary'
        style={{ height: "50px" }}
      >
        <div className='flex flex-row align-middle justify-center items-center text-xl'>

          <GoogleOutlined className='mr-2' />
          <span> Sign in with Google</span>
        </div>
      </Button>
    </div>
  )
}



