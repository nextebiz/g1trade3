'use client'
import React, { useEffect, useState } from 'react'
import { CheckCircleFilled, CheckCircleOutlined, IdcardOutlined, MessageOutlined, ExclamationCircleOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { get_user_from_session } from '@/utils/getUserData'
import { Spin } from 'antd'
import dayjs from 'dayjs';


export default function SellerDashboard() {

    const [user, setUser] = useState({} as User)
    const [ads_count, setAdsCount] = useState(0)
    const [page_loaded, setPageLoaded] = useState(false)

    const checkExpiryDays = (product_user: User) => {
        let days = 0;
        days = dayjs().diff(dayjs(product_user.expiryDate), "days");
        return days;
    }

    useEffect(() => {

        const getSellerInfo = async (user_id: string) => {
            const form_data = new FormData()
            form_data.set("user_id", user_id)
            const get_seller_info = await fetch("/api/seller/dashboard/basic_info", {
                method: "POST",
                body: form_data,
                next: { revalidate: 300 }
            })
            const response_seller_info = await get_seller_info.json()
            if (response_seller_info) {
                setAdsCount(response_seller_info.data.product_count)
            }
            setPageLoaded(true)
        }
        const getUser = async () => {
            const get_user: User = await get_user_from_session()
            if (get_user) {
                setUser(get_user)
                getSellerInfo(get_user.id)
            }
        }
        getUser();
    }, [])

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
                        <div className='text-2xl p-5'>
                            <div>
                                <span>SELLER DASHBOARD</span>
                                {page_loaded ? "" :
                                    <span className='ml-2'>
                                        <Spin />
                                        <span className='text-sm ml-2'>Loading...</span>
                                    </span>
                                }
                            </div>

                            {user?.id ?
                                <div className='text-sm'>
                                    <span>
                                        Welcome {user?.name}
                                    </span>
                                    <span className='px-2'>|</span>
                                    <span>

                                        {checkExpiryDays(user) > 0 ?
                                            <span>
                                                <span className='mr-2 text-red-500 text-lg'>
                                                    <ExclamationCircleOutlined />
                                                </span>
                                                <span className='text-red-500'>
                                                    Account expired {checkExpiryDays(user)} days ago. Account expiry date:
                                                    <span className='font-bold ml-1 text-red-500'>
                                                        {dayjs(user.expiryDate.toString()).format("DD MMM YYYY")}
                                                    </span>

                                                </span>
                                            </span>


                                            :
                                            <span>
                                                <span className='mr-2 text-green-500 text-lg'>
                                                    <CheckCircleOutlined />
                                                </span>
                                                <span>
                                                    Account is Active. Account renewal date:
                                                    <span className='font-bold ml-1 text-green-500'>
                                                        {dayjs(user.expiryDate.toString()).format("DD MMM YYYY")}
                                                    </span>

                                                </span>
                                            </span>
                                        }
                                    </span>

                                </div>
                                : ""}
                        </div>

                        <div className="grid w-full grid-cols-1 gap-2 mx-auto md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <AppstoreAddOutlined className='text-2xl' />
                                </div>
                                <div className='mb-8'>
                                    <h1 className="mx-auto  text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                        Upload New Product
                                    </h1>

                                    {user?.id ?
                                        <div>You are allowed to upload {user?.numberOfAllowedAds} Ads </div>
                                        : ""
                                    }

                                    {page_loaded ?
                                        <div>
                                            {checkExpiryDays(user) > 0 ?
                                                <span className='text-red-500'>
                                                    <span>
                                                        Your account expired {checkExpiryDays(user)} days ago. Please
                                                    </span>
                                                    <Link target='_blank' href={'/contact'}><span className='mx-1 text-blue-500'>Contact Support</span></Link>
                                                    to renew your account!
                                                </span>
                                                :
                                                <div>

                                                    {ads_count >= user?.numberOfAllowedAds ?
                                                        <div>
                                                            <div className='text-green-500'>
                                                                {ads_count}
                                                                <span className='mx-1'>of</span>{user?.numberOfAllowedAds} ads are Live
                                                            </div>
                                                            <div className='border p-2 px-4'>
                                                                <div className='text-red-500'>
                                                                    <span className='mr-2'>
                                                                        <ExclamationCircleOutlined />
                                                                    </span>
                                                                    <span>
                                                                        Your ads quota is full
                                                                    </span>
                                                                </div>
                                                                <Link target='_blank' href={'/contact'}>
                                                                    <span className='text-blue-500'>Contact us </span>
                                                                    <span>to increase ads limit</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='text-green-500'>
                                                            <span className='mr-2'><CheckCircleOutlined /></span>
                                                            <span>
                                                                {ads_count} of {user?.numberOfAllowedAds} ads are live
                                                            </span>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>

                                        : <div className="mt-4">
                                            <div className='flex items-center'>
                                                <div>
                                                    <Spin />
                                                </div>
                                                <div className='text-sm ml-2'>Loading. Please wait...</div>
                                            </div>
                                        </div>
                                    }


                                </div>
                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Upload product with images, description, price, available stock and further details
                                </p>
                                {page_loaded ?

                                    <div className="mt-4">
                                        <Link href="/seller/add_product" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                            Upload Product Page »
                                        </Link>
                                    </div>

                                    : <div className="mt-4">
                                        <div className='flex items-center'>
                                            <div>
                                                <Spin />
                                            </div>
                                            <div className='text-sm ml-2'>Loading. Please wait...</div>
                                        </div>
                                    </div>
                                }
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
                                    View Orders
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
