'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { LeftOutlined } from "@ant-design/icons"
import { Spin } from 'antd';


export default function BrowseByCities() {

    const router = useRouter();

    const [page_loaded, setPageLoaded] = useState(false)
    const [provinces, setProvinces] = useState<Province[]>()
    const [cities, setCities] = useState<City[]>([] as City[])

    useEffect(() => {

        const getData = async () => {
            const fetch_province = await fetch("/api/public/provinces", { 
                method:"POST",
                next: { revalidate: 10 } 
            });
            const response_province = await fetch_province.json();
            setProvinces(response_province.data)
            setPageLoaded(true)
        }
        getData()
    }, [])

    return (
        <div className='' style={{ width: "100%" }}>
         
            <div className='text-black bg-white p-3 sm:p-5 pb-5' >
                <section>
                    {page_loaded ?
                        <div className='flex flex-wrap md:flex-nowrap'>
                            <div className='md:flex-1 '>
                                {provinces?.map(province => {
                                    return <div key={province.id}>
                                        {
                                            province.city?.find((city) => {
                                                return city._count.product > 0;
                                            }) === undefined
                                                ?
                                                <div></div>
                                                :
                                                <div>
                                                    <Link href={`/?page=1&pid=${province.id}`}>
                                                        <h2 className='text-2xl text-black hover:text-green-500 transition-all'>{province.name}</h2>
                                                    </Link>
                                                    <div className='py-2'>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        {
                                                            province.city?.find((city) => {
                                                                return city._count.product > 0;
                                                            }) === undefined ? <div>
                                                                No sellers found
                                                            </div>
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className='flex flex-wrap mb-10'>
                                                        {province.city?.map(city => {
                                                            return <div key={city.id} className=''>
                                                                {city._count.product > 0 ?
                                                                    <Link href={`/?page=1&pid=${province.id}&cid=${city.id}`}>
                                                                        <div className='bg-slate-200 py-2 m-1 px-4 rounded-full text-black hover:text-white hover:bg-green-500 transition-all'>
                                                                            {city.name} <span className='text-xs ml-2'>({city._count.product} {parseInt(city._count.products as string) > 1 ? "sellers" : "seller"})</span>
                                                                        </div>
                                                                    </Link>

                                                                    : ""
                                                                }
                                                            </div>
                                                        })}
                                                    </div>

                                                </div>
                                        }
                                    </div>
                                })}
                            </div>
                        </div>
                        :
                        <div className='flex'>
                            <div>
                                <Spin />
                            </div>
                            <div className='ml-2'>loading...</div>
                        </div>
                    }
                </section>
            </div >
        </div >
    )
}



