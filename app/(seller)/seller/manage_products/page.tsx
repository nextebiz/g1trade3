'use client'
import React, { useEffect, useState } from 'react'
import { PlusCircleOutlined, CheckOutlined, FormOutlined, DeleteOutlined, EyeOutlined, PictureOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { Spin, Popconfirm, Button } from 'antd'
import Link from 'next/link'




export default function ManageProducts() {
  const [user, setUser] = useState<User>({} as User)
  const [products, setProducts] = useState<Product[]>([])
  const [page_loaded, setPageLoaded] = useState(false)
  const [refresh_db, setRefreshDB] = useState(false)
  const [is_deleting, setIsDeleting] = useState(false)

  const delete_product = async (product_id: string) => {
    setIsDeleting(true)
    const form_data = new FormData();
    form_data.set("product_id", product_id)

    console.log(product_id)

    const fetch_delete_product = await fetch("/api/seller/products/delete_product",
      {
        method: "POST", body: form_data,
        next: { revalidate: 300 }
      });

    const response_delete = await fetch_delete_product.json()
    console.log(response_delete)

    setRefreshDB(refresh_db => (!refresh_db))
    setIsDeleting(false)


  }

  // const delete_product_images = async (product_id: string) => {
  //   const form_data = new FormData();
  //   form_data.set("product_id", product_id)

  //   const fetch_delete_all = await fetch("/api/seller/products/delete_all_images",
  //     { method: "POST", body: form_data })


  // }
  useEffect(() => {

    const get_products = async (user_id: string) => {
      const form_data = new FormData()
      form_data.set("take", "10")
      form_data.set("skip", "0")
      form_data.set("user_id", user_id)
      const get_products = await fetch("/api/seller/products/find_products", {
        method: "post",
        body: form_data,
        next: { revalidate: 300 }

      })
      const products = await get_products.json()
      if (products.status === 200) {
        if (products?.data) {
          setProducts(products.data.products)
        }
      } else {

      }
      setPageLoaded(true)
    }
    const get_session = async () => {
      const fetch_session = await fetch("/api/auth/session")
      const my_session = await fetch_session.json()
      if (my_session?.user) {
        const form_data = new FormData();
        form_data.set("id", my_session?.user.id);
        const fetch_user = await fetch("/api/myadmin/users/find_user", {
          method: "POST",
          body: form_data,
          next: { revalidate: 300 }

        })
        const user_response = await fetch_user.json();
        if (user_response) {
          setUser(user_response.data)
          get_products(user_response.data.id)

        }
      }
    }

    get_session()

  }, [refresh_db])
  return (
    <div className='' style={{ width: "100%" }}>
      <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

        <div style={{ paddingLeft: "45px" }}>
          Manage Your Products
        </div>
      </div>
      <div className='text-black  p-5 '>
        <section>
          <h1 className='text-2xl mb-5'>
            Manage Products
          </h1>
          {page_loaded ?


            <div className='relative'>
              {products.length > 0 ?

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2'>

                  {products.map((product) => {
                    return <div key={product.id} className='border rounded-lg shadow shaodw-xl relative'>
                      <div>
                        <div className='bg-slate-100 py-2 px-3'>
                          <h2 className='text-lg pr-14'>{product.title}</h2>
                        </div>


                        <div className='px-3'>
                          <div className='flex relative items-center justify-between'>
                            <p className='text-xs mb-3 mt-3'>Category: {product.Category?.name}</p>
                            <div className='flex align-middle text-center'>
                              <div className=' bg-white bg-opacity-25'>
                                <Link className='text-blue-500 text-xs' href={`/seller/manage_products/update_product/${product.id}`}>
                                  <FormOutlined />
                                  <span className='ml-1 '>Edit</span>
                                </Link>
                              </div>
                              <span className='mx-2 text-slate-400'>|</span>
                              <div className=' bg-white bg-opacity-25'>
                                <Link target='_blank' className='text-blue-500 text-xs'
                                  href={`/product/${product.id}`}>
                                  <EyeOutlined />
                                  <span className='ml-1'>Preview</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <p className='mb-3 text-md'>Price: {product.price}<span className='capitalize text-sm'>{" / "}{product.priceUnit.toLowerCase()}</span> </p>
                          <p className='mb-3 text-sm'>Stock Avaialbe: {product.weight}<span className='capitalize text-sm'>{" "}{product.weightUnit.toLowerCase()}</span> </p>
                          <div className='flex items-center mb-3'>
                            <div className='mr-2 text-sm'>Cities: </div>
                            <div className='flex flex-wrap'>
                              {
                                product.productCity.map((my_city: any, i: number) => {
                                  return <div key={i} className='border rounded-lg pr-1 mr-1'>
                                    <div className='px-1 py-1 text-sm'><span className='text-sm text-green-500'>
                                      <CheckOutlined /></span>
                                      {my_city.City.name}
                                    </div>
                                  </div>
                                })
                              }
                            </div>
                          </div>
                          <div className='text-sm flex justify-between'>
                            <div className='flex'>
                              <div>
                                Views: 0
                              </div>
                              <span className='mx-2'>|</span>
                              <div>
                                Orders: 0
                              </div>
                              <span className='mx-2'>|</span>
                              <div>
                                Likes: 0
                              </div>
                            </div>
                            <div>
                              <div className=' bg-white bg-opacity-25'>


                                <Popconfirm
                                  title="Delete the post?"
                                  description="Are you sure to delete this product post?"
                                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                  onConfirm={() => {
                                    // alert("delete")
                                    delete_product(product.id)
                                  }}
                                >
                                  {is_deleting ? <div><Spin /><span className='ml-2'>please wait</span></div> : <Link
                                    //  onClick={() => { delete_product(product.id) }} 
                                    className='text-red-500 text-xs' href={"#"}>
                                    <DeleteOutlined />
                                    <span className='ml-1'>Delete</span>
                                  </Link>
                                  }
                                  {/* <Button danger>Delete</Button> */}
                                </Popconfirm>
                              </div>
                            </div>
                          </div>
                          <div className=' my-3 p-2'>
                            <hr />
                            <div className='flex justify-center my-3 text-blue-500 text-sm'>
                              <Link href={`/seller/add_product/upload_images/${product.id}`}>
                                <PictureOutlined /> <span className='ml-1'>Manage Pictures</span> </Link>
                            </div>
                            <div className='text-md text-center'>
                              {product.images.length == 0 ? "No pictures found." :
                                <div className='flex justify-center'>
                                  {product.images.map((image: any, i: any) => {
                                    return <div key={i} className='mr-1'>
                                      <img className='border rounded-lg' style={{ width: "50px" }} src={image.url} alt="product image" />
                                    </div>
                                  })}
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  })}
                </div>
                :
                <div>
                  <div>
                    No product found
                  </div>
                  <div className='text-blue-500 mt-2'>
                    <Link href={'/seller/add_product'}>
                      <span><PlusCircleOutlined /></span>
                      <span className='ml-2'>Add New Product</span>
                    </Link>
                  </div>
                </div>
              }
            </div>
            :
            <div className='flex'>
              <Spin /><div className='ml-2'>Loading...</div>
            </div>
          }
        </section>

      </div>

    </div>
  )
}
