'use client'

import React, { useEffect } from 'react'
import { ShoppingOutlined, ShoppingFilled, HeartOutlined, HeartFilled, StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
interface Props {
    params: {
        product: Product
    }
}

export default function RightPanelProduct({ params: { product } }: Props) {

    const router = useRouter();

    const getCitiesString = (productCities: ProductCity[]) => {
        const total = productCities.length;
        const show_total_cities = 2;
        const city_html = productCities.map((my_city: any, i: number) => {
            if (i < show_total_cities) {
                let comma = ",";
                if ((i + 1) === total) {
                    comma = ""
                }
                if ((i + 1) === show_total_cities) {
                    comma = ""
                }
                return <div key={i} className='mr-1 flex flex-wrap'>
                    <div>{my_city.City.name}{comma}</div>
                </div>
            }
        })
        let extra_string = "";
        if (total > show_total_cities) {
            const remaining_cities_count = total - show_total_cities;
            extra_string = ` & ${remaining_cities_count} more cities`
        }
        return <div className='flex flex-wrap'>{city_html}{extra_string}</div>
    }

    const get_cover_image = () => {

        const selected_cover_id = product.image_cover_id;

        if (product?.images[0] === undefined) {
            return undefined
        }

        if (selected_cover_id === null) {
            return product?.images[0];
        }

        const find_image = product?.images?.find((my_image: ImageProduct) => {
            return my_image.id === selected_cover_id
        })

        if (find_image !== null) {
            return find_image
        }

        return product?.images[0];
    }

    useEffect(() => {
        get_cover_image();
        router.prefetch(`/product/${product.id}`)
    }, [])
    return (
        <div className='flex flex-wrap sm:flex-nowrap  border-b border-b-slate-200 py-3 w-full bg-white'>
            <div className=' sm:flex-initial w-full sm:w-56 lg:w-80 bg-slate-100 p-2 sm:p-2 ml-0 mb-2 sm:mb-0 md:ml-2 scale-100 hover:scale-105 transition-all relative  '
            // style={{ width: "200px", minWidth: "200px" }}
            >
                <Link href={`/product/${product.id}`}>
                    {get_cover_image() !== undefined ?
                        <img src={get_cover_image().url} alt={product.Category?.name} /> :
                        product.Category?.name === "G1 Garlic Dry" ?
                            <img src="/images/g1garlic-dry-no-image.jpg" alt={product.Category?.name} />
                            :
                            <img src="/images/g1garlic-wet-no-image.jpg" alt={product.Category?.name} />
                    }
                </Link>
                <div className='absolute top-0 right-0 m-4 p-1 bg-opacity-50 rounded-full text-xs px-2 bg-white'>{product._count.images}</div>
            </div>
            <div className='px-3 sm:flex-1 '>
                <Link href={`/product/${product.id}`}>
                    <div className='flex'>
                        <h2 className='text-xl  text-blue-500 hover:underline hover:text-green-600 capitalize'>{product.title}

                        </h2>

                    </div>
                </Link>
                <div className='mb-5'>
                    <div className='flex items-center'>
                        <div className=' text-sm'>
                            <span >
                                {product._count.ProductLikes > 0 ?
                                    <span className='text-red-500 '> <HeartFilled /></span>
                                    : <span><HeartOutlined /></span>}
                            </span>
                            <span className='ml-1'>{product._count.ProductLikes} Likes</span>
                        </div>
                        <div className='text-xs mx-3 text-slate-300'>|</div>
                        <div className='text-sm'>
                            <span className='text-md' >
                                {product._count.Order > 0 ?
                                    <span className='text-red-500'> <ShoppingFilled /></span>
                                    : <span><ShoppingOutlined /></span>}
                            </span>
                            <span className='ml-1'>
                                {product._count.Order} Orders
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-wrap text-sm mb-2 '>
                    <div >
                        {product.Category?.name}
                    </div>
                    <div className=''>
                        &nbsp;is available for sale in&nbsp;
                    </div>
                    <div>
                        {getCitiesString(product.productCity)}
                    </div>
                </div>
                <div className='flex items-center align-middle  mb-3'>
                    <p className='text-md md:text-xl'><span className='mr-2 text-sm'>Price:</span><span className='text-base'>Rs {product.price} </span></p>
                    <span className='ml-0 md:ml-2 capitalize text-sm'><span className='mr-1'>/</span>{product.priceUnit.toLowerCase()}</span>
                </div>
                <div className='flex items-center align-middle  mb-3'>
                    <p className='text-sm'>Stock for Sale:</p>
                    <span className='ml-0 md:ml-2 text-sm'>{product.weight}<span className='ml-1 capitalize'>{product.weightUnit.toLowerCase()}</span></span>
                </div>

                <div className='text-sm mb-3'>
                    {product?.description?.replace(/^(.{75}[^\s]*).*/, "$1")}{product?.description?.length > 75 ? "..." : ""}
                </div>
                <div className='flex flex-wrap items-center align-middle'>
                    <p className='text-sm md:text-sm mr-2'>Sold by:</p>
                    <Link href={`/profile/${product?.User.id}`}>
                        <span className='ml-0 md:ml-0 text-blue-500 mr-2'>{product?.User.name}</span>
                    </Link>
                    <div className='flex sm:flex-wrap items-center align-middle'>
                        <div className='text-yellow-500'>
                            <StarFilled />
                        </div>
                        <div className='text-yellow-500'>
                            <StarFilled />
                        </div>
                        <div className='text-yellow-500'>
                            <StarFilled />
                        </div>
                        <div className='text-yellow-500'>
                            <StarOutlined />
                        </div>
                        <div className='text-yellow-500'>
                            <StarOutlined />
                        </div>
                        <div className='flex ml-2 text-sm'><div className='text-blue-500'>2 Reviews</div></div>
                    </div>
                </div>

            </div>
        </div>
    )
}
