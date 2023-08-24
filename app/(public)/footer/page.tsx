'use client'
import Link from 'next/link'
import React from 'react'
import { MessageOutlined, PhoneOutlined } from "@ant-design/icons"

export default function PublicFooter() {

    return (
        <div>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

            <footer className="body-font ">
                <div className="container  px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64  flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <Link className="text-3xl flex justify-center sm:justify-start  font-bold font-heading " href="/">
                            {/* eslint-disable */}
                            <img className='' src='/images/logo/g1trade-logo-g1-garlic-sale-pakistan.svg?v-1' style={{ width: "150px" }} alt="" />
                        </Link>
                        <p className="mt-2 text-sm text-gray-100">G1 Garlic Trading Platform. Buy & Sell Fresh and Dry G1 Garlic from All Major Cities of Pakistan.</p>

                        <div className='mt-3'>
                            <a href='tel:03361633321' className="hover:text-green-500">
                                <span className='text-xl'>
                                    <PhoneOutlined />
                                </span>
                                <span className='ml-2'>
                                    0336-1633321
                                </span>
                            </a>
                        </div>
                        <div className='mt-3'>
                            <Link href='/contact' className="hover:text-green-500">
                                <span className='text-xl'>
                                    <MessageOutlined />
                                </span>
                                <span className='ml-2'>
                                    Contact Us
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-green-500 tracking-widest text-sm mb-3">TOP CITIES</h2>
                            <nav className="list-none mb-10">
                                <li className='mb-2'>
                                    <Link href={"/?page=1&pid=cllowzuxr0009rlhkzpy0ns4d&cid=cllowzwux0032rlhki6gttzlf"} className="hover:text-green-500">Islamabad</Link>
                                </li>
                                <li className='mb-2'>
                                    <Link href={"/?page=1&pid=cllowzubo0005rlhkihgfftuo&cid=cllowzv42000erlhkco8hh2a2"} className="hover:text-green-500">Rawalpindi</Link>
                                </li>
                                <li className='mb-2'>
                                    <Link href={"/?page=1&pid=cllowzubo0005rlhkihgfftuo&cid=cllowzv42000crlhkq68qq7oy"} className="hover:text-green-500">Lahore</Link>
                                </li>
                                <li className='mb-2'>
                                    <Link href={"/?page=1&pid=cllowzuxn0006rlhk4jzn7y9i&cid=cllowzwuy005erlhk8jrb6zke"} className="hover:text-green-500">Swabi</Link>
                                </li>
                                <li className='mb-2'>
                                    <Link href={"/?page=1&pid=cllowzuxn0006rlhk4jzn7y9i&cid=cllowzwuy005crlhkdxoilzgw"} className="hover:text-green-500">Abbottabad</Link>
                                </li>

                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-green-500 tracking-widest text-sm mb-3">BEST SELLERS</h2>
                            <nav className="list-none mb-10">
                                <li className='mb-2'>
                                    <Link href={'/profile/cllnf4gbg0000rlxgyras3ql9'} className="hover:text-green-500">Imran malik</Link>
                                </li>

                            </nav>
                        </div>

                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-green-500 tracking-widest text-sm mb-3">HOW TO BUY</h2>
                            <nav className="list-none mb-10">
                                <li className='mb-2'>
                                    <a className="hover:text-green-500">How to place order</a>
                                </li>
                            </nav>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-green-500 tracking-widest text-sm mb-3">HOW TO SELL</h2>
                            <nav className="list-none mb-10">
                                <li className='mb-2'>
                                    <a className="hover:text-green-500">How to sign up as a seller</a>
                                </li>
                                <li className='mb-2'>
                                    <a className="hover:text-green-500">How to list your products for sale</a>
                                </li>

                            </nav>

                        </div>
                    </div>
                </div>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-500 text-sm text-center sm:text-left">© {new Date().getFullYear()} G1 Trade — Online G1 Garlic Trading Platform
                        </p>
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            <a className="text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx={4} cy={4} r={2} stroke="none" />
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </footer>


        </div>
    )
}
