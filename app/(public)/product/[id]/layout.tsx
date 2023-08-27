import React from 'react'
import { headers } from 'next/headers'
import { getSingleProduct } from '@/utils/getProductData'


interface Props {
    children: React.ReactNode
}

interface Props2 {
    params: {
        id: string
    }
}


const get_cover_image = (myproduct: Product) => {

    const selected_cover_id = myproduct.image_cover_id;

    if (myproduct?.images[0] === undefined) {
        return undefined
    }

    if (selected_cover_id === null) {
        return myproduct?.images[0];
    }

    const find_image = myproduct?.images?.find((my_image: ImageProduct) => {
        return my_image.id === selected_cover_id
    })

    if (find_image !== null) {
        return find_image
    }

    return myproduct?.images[0];
}

export async function generateMetadata({ params: { id } }: Props2) {

    if (id !== undefined) {

        const form_data = new FormData();
        form_data.set("product_id", id);

        const api_path = `${process.env.NEXT_PUBLIC_SERVER_PATH}/api/seller/products/find_product`;
        const fetch_product = await fetch(api_path, {
            method: "POST",
            body: form_data,
        });
        const response_product = await fetch_product.json();
        const product: Product = response_product.data;

        let image_path = `${process.env.NEXT_PUBLIC_SERVER_PATH}/images/g1garlic-dry-no-image.jpg`

        let find_image = get_cover_image(product)
        if (find_image) {
            image_path = find_image.url;
        }
        const images_to_post = [];
        images_to_post.push({
            url: image_path
        })


        if (find_image !== undefined) {
            if (product?.images?.length > 0) {

                const find_other_images: [] = product?.images?.filter((my_image: ImageProduct) => {
                    if (product.image_cover_id !== null) {
                        return my_image.id !== product.image_cover_id
                    }
                    return my_image.id !== find_image.id
                })
                if (find_other_images.length > 0) {
                    find_other_images.map((my_image:any) => {
                        images_to_post.push({
                            url: my_image.url
                        })
                        return my_image;
                    })
                }
            }
        }

        if (product?.id !== undefined) {
            return {
                title: product.title + " | G1 Garlic Mandi - G1Trade.com",
                description: product.description,
                openGraph: {
                    title: product.title,
                    description: product.description,
                    // url: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
                    siteName: 'G1Trade.com',
                    images: images_to_post,
                    locale: 'en_US',
                    type: 'website',
                    publishedTime: product.createdAt.toString(),
                    authors: [product.User?.name],
                },

            }
        }
    }

    return {
        title: "G1 Garlic Mandi",
    }
}

export default async function ProductLayout({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
}

