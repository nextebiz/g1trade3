'use client'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import React from 'react'
import { CheckCircleOutlined } from "@ant-design/icons"

export default function SellerPackages() {
  const router = useRouter();
  const { data: session } = useSession()
  return (
    <div>
      <section className=" body-font overflow-hidden">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 ">Pricing</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base ">
              {"Pakistan's First Online Trading Platform For G1 Garlic"}
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 xl:w-1/2 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">BUYERS START</h2>

                <h1 className="text-5xl text-green-500 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>FREE</span>
                  <span className="text-lg ml-1 font-normal text-gray-300">/forever for buyers</span>
                </h1>

                <p className="flex items-center text-gray-200 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Browse and select the best G1 Garlic seller
                </p>
                <p className="flex items-center text-gray-200 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Contact sellers via phone or WhatsApp and request more information
                </p>
                <p className="flex items-center text-gray-200 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Talk to clients via phone or WhatsApp before placing your first order
                </p>
                <p className="flex items-center text-gray-200 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Rate your seller with star rating and feedback for public viewing
                </p>
                <p className="flex items-center text-gray-200 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Track the status of your order
                </p>
                <button onClick={() => {
                  if (session?.user) {
                    router.push("/")

                  } else {
                    router.push("/signin")
                  }

                }} className="flex items-center mt-auto text-white bg-green-800 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-700 rounded">

                  {
                    session?.user ?
                      <div className='flex'>
                        <div className='text-lg'>
                          <CheckCircleOutlined />
                        </div>
                        <span className='ml-2'>
                          You are logged in. Start Buying!
                        </span>
                      </div>
                      : "Sign Up as Buyer (FREE)"
                  }
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">{"Terms & Conditions Apply"}</p>
              </div>
            </div>
            <div className="p-4 xl:w-1/2 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">PRO SELLER- BUY AND SELL</h2>
                <h1 className="text-5xl text-gray-200 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>Rs 2,500</span>
                  <span className="text-lg ml-1 font-normal text-gray-300">/month per ad post</span>
                </h1>
                <p className="flex items-center text-gray-200 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>List Your Stock with Pictures, Quantity, Phone & WhatsApp Number
                </p>
                <p className="flex items-center text-gray-200 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Includes One Ad Posts with One City Option. You can upgrade the package to add more cities per ad.
                </p>
                <p className="flex items-center text-gray-200 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Additional City Listing @ Rs 1000 per City
                </p>
                <p className="flex items-center text-gray-200 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Additional Ad Listing @ Rs 2200 per ad
                </p>
                <p className="flex items-center text-gray-200 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>Receive orders from clients with likes & rating
                </p>
                <button onClick={() => {
                  session?.user.role === "SELLER" ?
                    router.push("/seller") :
                    session?.user.role === "BUYER" ?
                      router.push("/contact") :
                      router.push("/signin")
                }} className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                  {session?.user.role === "SELLER"
                    ? "Go To Sellers Panel" :
                    session?.user.role === "BUYER" ? "Upgrade To Sellers Package (Contact Sales)" :
                      "Sign Up As Seller - Contact Sales"
                  }

                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  {"Earn more stars & likes to win buyers confidence"}
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>

    </div>
  )
}
