
import { getSingleProduct } from '@/utils/getProductData'
import React from 'react'


interface Props {
  params: {
    product_id: string
  }
}
export default async function GetMyProduct({ params: { product_id } }: Props) {

  const product: Product = await getSingleProduct(product_id)
  console.log("product")
  console.log(product)

  return (
    <div>get product {product.id}</div>
  )
}
