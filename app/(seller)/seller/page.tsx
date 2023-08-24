'use client'
import React from 'react'
import { IdcardOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import Link from 'next/link'


export default function SellerDashboard() {
    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

                <div style={{ paddingLeft: "45px" }}>
                    {"Seller's Dashboard"}
                </div>
            </div>
            <div className='text-black  p-1'>
                <section>
                    <div className="relative items-center w-full px-1 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
                        <div className="grid w-full grid-cols-1 gap-2 mx-auto md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <AppstoreAddOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    Upload New Product
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Easily upload product with images, description, price and available quantity
                                </p>
                                <div className="mt-4">
                                    <Link href="/seller/add_product" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        Upload Product Page »
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <AppstoreOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    Manage Products
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Update/Delete product tile, description, picture, prices, quantities and more...
                                </p>
                                <div className="mt-4">
                                    <Link href="/seller/manage_products" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        Manage Your Products »
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <ShoppingCartOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    My Orders
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    View all orders from your buyers and take action
                                </p>
                                <div className="mt-4">
                                    <Link href="/seller/orders" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        View Your Orders »
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <IdcardOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    Seller Profile
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Your profile represent you or your products or services you offer. Creating a detailed profile will help you in more sales.
                                </p>
                                <div className="mt-4">
                                    <Link href="/seller/profile" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        Go To Seller Profile »
                                    </Link>
                                </div>
                            </div>

                            {/* <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <MessageOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    Messages
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Read and reply messages from your buyers. Keep al track of all the conversation.
                                </p>
                                <div className="mt-4">
                                    <Link href="/seller/messages" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        Go To Buyers Messages » </Link>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </section>

            </div>

        </div>
    )
}