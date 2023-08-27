import React from 'react'
import { headers } from 'next/headers'
import { getSingleProduct } from '@/utils/getProductData'


interface Props {
    children: React.ReactNode
}


// console.log(headersList)

export async function generateMetadata() {
    const headersList = headers()
    const referer = headersList.get('x-invoke-path')
    const product_id = referer?.split("/product/").pop() as string;

    const form_data = new FormData();
    form_data.set("product_id", product_id);
    console.log(product_id)

    const api_path = `${process.env.SERVER_PATH}/api/seller/products/find_product`;
    console.log(api_path)
    const fetch_product = await fetch(api_path, {
        method: "POST",
        body: form_data,
    });
    const response_product = await fetch_product.json();
    const product: Product = response_product.data;

    console.log(product)
    if (product !== undefined) {
        return {
            title: product.title,
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

