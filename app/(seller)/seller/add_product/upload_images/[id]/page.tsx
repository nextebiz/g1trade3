'use client'
import React, { useEffect, useState } from 'react'
import { ShoppingCartOutlined } from "@ant-design/icons"
import { get_user_from_session } from '@/utils/getUserData'
import { useParams } from 'next/navigation'
import { getSingleProduct } from "@/utils/getProductData"

import UploadComponent from '../upload_component/page'
import { Spin } from 'antd'
import Link from 'next/link'

export default function UploadImages() {

    const params = useParams()
    const { id } = params;

    const [user, setUser] = useState({} as User)
    const [product, setProduct] = useState<Product>({} as Product)
    const [page_loaded, setPageLoaded] = useState(false)
    const [images, setImages] = useState<any[]>([])
    const [refresh_data, setRefreshData] = useState(false)
    // const [default_image_id, setDefaultImageId] = useState("")

    const save_default_image = async (image_id: string) => {
        const form_data = new FormData()
        form_data.set("product_id", product.id)
        form_data.set("image_id", image_id)


        const fetch_save_default_image = await fetch("/api/seller/products/set_default_image", {
            method: "POST",
            body: form_data,
            next: { revalidate: 300 } 

        })

        const response_save_default_image = await fetch_save_default_image.json();
        setRefreshData(!refresh_data)
        return response_save_default_image;
    }


    useEffect(() => {
        // const get_user_async = async () => {
        //     const get_user = await get_user_from_session();
        //     setUser(get_user)
        // }
        const create_images_array = async (product: Product) => {

            const get_user = await get_user_from_session();
            setUser(get_user)
            const images_array = [];
            const total_images_allowed = 5;
            for (let i = 0; i < total_images_allowed; i++) {
                let find_image = product.images[i];
                if (find_image == undefined) {
                    images_array.push({
                        id: "",
                        productId: product.id,
                        url: "",
                        user_id: get_user.id,
                        public_id: ""
                    })
                } else {
                    find_image.user_id = get_user.id
                    images_array.push(find_image)
                }
            }
            setImages(images_array)
        }
        const get_product_async = async () => {
            const get_product = await getSingleProduct(id as string)
            if (get_product?.data) {
                setProduct(get_product.data)
                create_images_array(get_product.data)
                setPageLoaded(true)
            }
        }
        // get_user_async()
        get_product_async()
    }, [refresh_data])
    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
                <div style={{ paddingLeft: "45px" }}>
                    Upload Product Images
                </div>
            </div>
            <div className='text-black  p-5 '>
                <section>
                    <div className='mb-3 flex items-center'>
                        <h1 className='text-2xl '>
                            Upload Images
                        </h1>
                        <span className='mx-3 text-slate-500'>|</span>
                        <div className='text-sm text-blue-500 hover:underline'>
                            <Link href={`/seller/manage_products/update_product/${id}`}>Edit Post</Link>
                        </div>
                        <span className='mx-3 text-slate-500'>|</span>
                        <div className='text-sm text-blue-500 hover:underline'>
                            <Link href={`/product/${id}`} target='_blank'>Preview Post</Link>
                        </div>
                    </div>
                    {page_loaded ?
                        <div>
                            <div className='mb-3 mt-5'>
                                <div className='text-2xl'>{product?.title}</div>
                                {product?.images?.length > 0 ?
                                    <p>Found {product?.images?.length} Images</p> :
                                    <p>Click & upload product pictures</p>}
                            </div>
                            <div>
                                {images.length > 0 ?
                                    <div className=' flex flex-wrap'>
                                        {images.map((img_obj, i) => {
                                            return <div key={i} className='m-2'>
                                                <UploadComponent params={{ imageProduct: img_obj, save_default_image: save_default_image, product: product }} />
                                            </div>
                                        })}
                                    </div>
                                    : ""
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <div className='flex'>
                                <Spin />
                                <div className='ml-2'>
                                    Loading ....
                                </div>
                            </div>
                        </div>
                    }
                </section>
            </div>
        </div>
    )
}
