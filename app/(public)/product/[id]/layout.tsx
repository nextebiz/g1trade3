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

// console.log(headersList)

export async function generateMetadata({ params: { id } }: Props2) {
    // console.log(id)
    // const headersList = headers()
    // const referer = headersList.get('referer')
    // console.log("referer")
    // console.log(referer)

    // const pathname = headersList.get("x-invoke-path");
    // console.log("pathname")
    // console.log(pathname)

    // const product_id = pathname?.split("/product/").pop() as string;
    // console.log("product_id")
    // console.log(product_id)

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

        // console.log(product)
        if (product?.id !== undefined) {
            return {
                title: product.title,
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
            <div>I am product layoutx</div>
            {children}
        </>
    )
}

