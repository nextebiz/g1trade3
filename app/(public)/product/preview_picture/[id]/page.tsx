
'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Spin } from 'antd';

export default function PreviewPicture() {

    const params = useParams()
    const { id } = params;

    const [picture_id, setPictureId] = useState("")
    const [picture_url, setPictureUrl] = useState("")
    const [page_loaded, setPageLoaded] = useState(false)

    useEffect(() => {
        if (id) {
            setPictureId(id as string)
            const get_image = async () => {
                const form_data = new FormData();
                form_data.set("picture_id", id as string)
                const fetch_image = await fetch("/api/public/products/product/image", {
                    method: "POST",
                    body: form_data,
                    next: { revalidate: 300 }

                })
                const response_image = await fetch_image.json();
                if (response_image.status === 200) {
                    const image_url = response_image.data.url;
                    setPictureUrl(image_url)
                }
                setPageLoaded(true)
            }
            get_image()
        }
    })

    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
                <div className='flex pl-5 items-center'>

                    <div className='ml-5'>
                        Picture Preview
                    </div>
                </div>
            </div>
            <div className='text-black bg-white p-0 sm:p-5 pb-5' style={{ minHeight: "400px" }}>
                <section>
                    {page_loaded ?
                        picture_url === "" ?
                            <div>
                                Picture not found!
                            </div>
                            :
                            <img src={picture_url} />
                        : <div>
                            <Spin /> <span className='ml-2'>Loading...</span>
                        </div>
                    }
                </section>
            </div >
        </div >
    )
}



