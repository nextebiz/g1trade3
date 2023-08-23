import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'

interface Props {
    params: {
        session: Session | null
    }
}

export default function SellerAction({ params: { session } }: Props) {
    return (
        <div>
            <section className=" body-font">
                <div className="container px-5 py-12 mx-auto">
                    <div className="flex flex-col text-center w-full mb-10">
                        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">{`${session?.user.role === "SELLER" ? "BUY & SELL ON OUR TRADING PLATFORM" : ""}`}</h2>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">{`Welcome back ${session?.user.name}`}</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Trade your agro commodities with thousands of buyers and sellers online on our platform.
                        </p>
                    </div>
                    <section className="body-font">
                        <div className="container px-5 mx-auto">
                            <div className="flex flex-wrap -m-4">

                                <Link href={"/buyer"} className="p-4 md:w-1/2 scale-100 hover:scale-105 transition-all">
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="blog" />

                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">BROWSE SELLERS MARKET</h2>
                                            <h1 className="title-font text-lg font-medium  mb-3">START <span className='text-green-500'>BUYING</span></h1>
                                            <p className=" mb-3">Buy from thousands of trusted sellers on digital market. Communicate with the sellers before placing your first order. </p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={"/seller"} className="p-4 md:w-1/2 scale-100 hover:scale-105 transition-all">
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="blog" />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">SELL YOUR STOCK</h2>
                                            <h1 className="title-font text-lg font-medium  mb-3">START <span className='text-green-500'>SELLING</span></h1>
                                            <p className=" mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}
