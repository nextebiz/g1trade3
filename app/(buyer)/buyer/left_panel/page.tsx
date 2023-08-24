'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FundProjectionScreenOutlined, SettingOutlined, DesktopOutlined, IdcardOutlined, LoginOutlined, ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { get_user_from_session } from '@/utils/getUserData'

interface Props {
  params: {
    showLeftPanel: boolean,
    openLeftPanel: any,
    onClose: any
  }
}

export default function BuyerLeftPanel({ params: { showLeftPanel, openLeftPanel, onClose } }: Props) {
  const [showText, setShowText] = useState(true)
  const [user, setUser] = useState({} as User)
  useEffect(() => {

    const get_session = async () => {
      const get_user = await get_user_from_session();
      setUser(get_user)
    }
    get_session()

    let myinterval: any = null;
    if (!showLeftPanel) {
      clearInterval(myinterval)
      setShowText(showLeftPanel)
    }
    if (showLeftPanel) {
      myinterval = setTimeout(() => {
        setShowText(true)
        clearInterval(myinterval)
      }, 50)
    }
  }, [showLeftPanel])
  return (
    <div onClick={() => {
      openLeftPanel()
    }}
      className='text-md left-panel overflow-hidden'>
      <div
        className='hidden sm:flex left-panel-heeader w-full   align-middle justify-center items-center text-lg transition-all'
        style={{ backgroundColor: "#141414", height: "60px", opacity: `${showText ? 1 : 0}` }}
      >
        <div>Buyers Panel</div>
      </div>
      <Link
        onClick={() => { onClose() }}
        className='pl-3 pt-0 md:pt-5 pb-3 flex w-full items-center '
        href={"/buyer/"}>
        <div className='flex items-center hover:text-green-300'>
          <FundProjectionScreenOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Buyer Dashboard" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link
        onClick={() => { onClose() }}
        className='pl-3 pt-3 pb-3 flex w-full items-center'
        href={"/buyer/orders"}
      >
        <div className='flex items-center hover:text-green-300'>
          <ShoppingCartOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "My Orders" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

      <Link
        onClick={() => { onClose() }}
        className='pl-3 pt-3 pb-3 flex w-full items-center'
        href={"/buyer/profile"}
      >
        <div className='flex items-center hover:text-green-300'>
          <IdcardOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "My Contact Info" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

      {/* {user?.role === "SELLER" ?
        <Link className='pl-3 pt-3 pb-3 flex w-full items-center ' href={"/seller/"}>
          <div className='flex items-center hover:text-green-300'>
            <LoginOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
            <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
              {showText ? "Seller's Dashboard" : <span className='opacity-0'>_</span>}
            </div>
          </div>
        </Link>
        : ""} */}
      {/* <Link className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/buyer/messages"}>
        <div className='flex items-center hover:text-green-300'>

          <MessageOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Messages" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link> */}
    </div>
  )
}