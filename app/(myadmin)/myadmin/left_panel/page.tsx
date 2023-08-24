'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"

interface Props {
  params: {
    showLeftPanel: boolean,
    openLeftPanel: any,
  }
}

export default function LeftAdminPanel({ params: { showLeftPanel, openLeftPanel } }: Props) {
  const [showText, setShowText] = useState(true)
  useEffect(() => {
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
    }} className='text-md left-panel overflow-hidden'>
      <div
        className='left-panel-heeader w-full  flex align-middle justify-center items-center text-lg transition-all'
        style={{ backgroundColor: "#141414", height: "60px", opacity: `${showText ? 1 : 0}` }}
      >
        <div>Admin Panel</div>
      </div>
      <Link className='pl-3 pt-3 pb-3 flex w-full items-center ' href={"/myadmin/"}>
        <div className='flex items-center hover:text-green-300'>
          <ApartmentOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Admin Dashboard" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

      <Link  className='pl-3 pt-3 pb-3 flex w-full items-center ' href={"/myadmin/users"}>
        <div className='flex items-center hover:text-green-300'>
          <AppstoreAddOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Manage Users" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link  className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/myadmin/products"}>
        <div className='flex items-center hover:text-green-300'>
          <AppstoreOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Manage Products" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/myadmin/orders"}>
        <div className='flex items-center hover:text-green-300'>
          <ShoppingCartOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "View All Orders" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link  className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/myadmin/user_messages"}>
        <div className='flex items-center hover:text-green-300'>

          <MessageOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Users Messages" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link
         className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/myadmin/seed_data"}>
        <div className='flex items-center hover:text-green-300'>
          <ProfileOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Seed Database" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

    </div>
  )
}