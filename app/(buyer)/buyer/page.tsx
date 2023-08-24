'use client'
import React from 'react'
import { IdcardOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import Link from 'next/link'


export default function BuyerDashboard() {
  return (
    <div className='' style={{ width: "100%" }}>
      <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

        <div style={{ paddingLeft: "45px" }}>
          {"Buyers Dashboard"}
        </div>
      </div>
      <div className='text-black  p-1'>
        <section>
          <div className="relative items-center w-full px-1 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
            <div className="grid w-full grid-cols-1 gap-2 mx-auto md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">


              <div className="p-6 border rounded-lg shadow shaodw-xl">
                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                  <ShoppingCartOutlined className='text-2xl' />
                </div>
                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                  My Orders
                </h1>

                <p className="mx-auto text-base leading-relaxed text-gray-500">
                  View the status of all your orders. Once order is approved or accepted, you can leave comments and rate your seller.
                </p>
                <div className="mt-4">
                  <Link href="/buyer/orders" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                    View Your Orders »
                  </Link>
                </div>
              </div>

              <div className="p-6 border rounded-lg shadow shaodw-xl">
                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                  <IdcardOutlined className='text-2xl' />
                </div>
                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                  My Contact Info
                </h1>

                <p className="mx-auto text-base leading-relaxed text-gray-500">
                  Let sellers contact you via Phone or WhatsApp. Keep your contact information up-to-date for better communication
                </p>
                <div className="mt-4">
                  <Link href="/buyer/profile" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                    Edit My Contact Info »
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

    </div>
  )
}
