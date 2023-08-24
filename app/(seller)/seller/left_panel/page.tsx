'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FundProjectionScreenOutlined, IdcardOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { get_user_from_session } from '@/utils/getUserData'

interface Props {
  params: {
    showLeftPanel: boolean,
    openLeftPanel: any,
    onClose: any
  }
}

export default function LeftPanel({ params: { showLeftPanel, openLeftPanel, onClose } }: Props) {
  const [showText, setShowText] = useState(true)
  const [show_order_count, setShowOrderCount] = useState(true)
  const [order_count, setOrderCount] = useState(0)



  const getOrderCount = async () => {

    const getSessionUser = await get_user_from_session();
    if (getSessionUser?.id !== undefined) {

      const form_data = new FormData();
      form_data.set("user_id", getSessionUser?.id);
      const fetch_count = await fetch("/api/seller/orders/count", {
        method: "POST",
        body: form_data,
        next: { revalidate: 300 }
      })
      const response_count = await fetch_count.json();
      setOrderCount(response_count.data.count)
    }
  }

  useEffect(() => {

    getOrderCount()
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
        className='hidden sm:flex left-panel-heeader w-full   align-middle justify-center items-center text-lg transition-all'
        style={{ backgroundColor: "#141414", height: "60px", opacity: `${showText ? 1 : 0}` }}
      >
        <div>{"Seller's Panel"}</div>
      </div>
      <Link onClick={() => { onClose() }} className='pl-3 pt-3 pb-3 flex w-full items-center ' href={"/seller/"}>
        <div className='flex items-center hover:text-green-300'>
          <FundProjectionScreenOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Seller's Dashboard" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

      <Link onClick={() => { onClose() }} className='pl-3 pt-3 pb-3 flex w-full items-center ' href={"/seller/add_product"}>
        <div className='flex items-center hover:text-green-300'>
          <AppstoreAddOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Upload New Product" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link onClick={() => { onClose() }} className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/seller/manage_products"}>
        <div className='flex items-center hover:text-green-300'>
          <AppstoreOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Manage Products" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link onClick={() => { onClose() }} className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/seller/orders"}>
        <div className='flex items-center hover:text-green-300'>
          <ShoppingCartOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div onClick={() => { setShowOrderCount(false) }} className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? <div className='flex'>
              <span>Orders</span>
              {show_order_count ?
                order_count > 0 ? <div className='bg-green-700 flex items-center justify-center rounded-full text-xs ml-2'
                  style={{ width: "20px", height: "20px" }}>{order_count}</div> : ""
                : ""}
            </div> : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      {/* <Link onClick={() => { onClose() }} className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/seller/messages"}>
        <div className='flex items-center hover:text-green-300'>

          <MessageOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Messages" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link> */}
      <Link onClick={() => { onClose() }}
        className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/seller/profile"}>
        <div className='flex items-center hover:text-green-300'>
          <IdcardOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Seller's Profile" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

    </div>
  )
}