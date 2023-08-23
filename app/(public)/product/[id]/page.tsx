'use client'
import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ExclamationCircleOutlined, LoadingOutlined, HeartOutlined, HeartFilled, FieldTimeOutlined, DollarOutlined, CheckCircleOutlined, LoginOutlined, StarFilled, StarOutlined, LeftOutlined, ShoppingCartOutlined, WhatsAppOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Spin, Input, Form, Select, ConfigProvider } from 'antd';
import Link from 'next/link';
import { get_user_from_session } from '@/utils/getUserData';
import { signIn } from 'next-auth/react';
import TextArea from 'antd/es/input/TextArea';
import { Order } from '@prisma/client';
import datjs from 'dayjs';

type FieldType = {
  product_title?: string;
};

export default function ProductDisplay() {

  const params = useParams();
  const pathName = usePathname();
  const { id } = params;
  const router = useRouter();

  const [product, setProduct] = useState<Product>({} as Product)
  const [page_loaded, setPageLoaded] = useState(false)
  const [selected_image_url, setSelectedImageUrl] = useState("")
  const [user, setUser] = useState<User>({} as User);
  const [weight_units, setWeightUnits] = useState([
    "KILOGRAM",
    "MAUND",
    "TONNE",
  ])
  const [order_weight, setOrderWeight] = useState<number>(0)
  const [order_weight_units, setOrderWeightUnits] = useState<string>("")
  const [note, setNote] = useState<string>('')
  const [is_saved, setIsSaved] = useState<boolean>(false)
  const [is_saving, setIsSaving] = useState<boolean>(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [total_orders, setTotalOrders] = useState(0)
  const [like, setLike] = useState(false)
  const [like_clicked, setLikeClicked] = useState(false);
  const [total_likes, setTotalLikes] = useState(0)


  const getCitiesString = (productCities: ProductCity[]) => {
    const total = productCities.length;
    const city_html = productCities.map((my_city: any, i: number) => {
      if (i < total) {
        let comma = ",";
        if ((i + 1) === total) {
          comma = ""
        }
        if ((i + 1) === total) {
          comma = ""
        }
        return <div key={i} className='mr-1 flex flex-wrap'>
          <div>{my_city.City.name}{comma}</div>
        </div>
      }
    })
    return <div className='flex flex-wrap'>{city_html}</div>
  }

  const onFinish = (values: any) => {
    submitOrder()
  };

  const onFinishFailed = (errorInfo: any) => {
  };

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

  async function likeProduct() {
    if (like_clicked) {
      const form_data = new FormData();
      form_data.set("product_id", product?.id)
      form_data.set("user_id", user?.id)

      const fetch_save = await fetch("/api/public/products/product/like", { method: "POST", body: form_data })

      const response_save = await fetch_save.json();
      if (response_save.status === 200) {
        setTotalLikes(response_save.data.likes)
        if (response_save.data.liked === "yes") {
          setLike(true)
        }
        setIsSaved(true)
      } else {
        setIsSaved(false)
      }
      setLikeClicked(false)
    }
  }

  async function submitOrder() {

    //note: string, order_weight: number, order_weight_units: string
    setIsSaved(false)
    setIsSaving(true)
    const form_data = new FormData();
    form_data.set("product_id", product?.id)
    form_data.set("note", note)
    form_data.set('weight', order_weight.toString())
    form_data.set("weight_units", order_weight_units.toString())
    form_data.set("user_id", user?.id.toString())


    const fetch_save = await fetch("/api/buyer/orders/place_order", { method: "POST", body: form_data })
    const response_save = await fetch_save.json();

    setIsSaving(false)


    if (response_save.status === 200) {
      // saved
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  }

  const findOrders = async () => {

    const form_data = new FormData();
    form_data.set("buyer_id", user?.id)
    form_data.set("product_id", product?.id)

    const fetch_orders = await fetch("/api/buyer/orders/find_orders_by_product_id", { method: "POST", body: form_data })
    const response_orders = await fetch_orders.json();
    if (response_orders.status === 200) {
      setOrders(response_orders.data)
    }
  }


  useEffect(() => {

    const getProduct = async () => {
      const get_user = await get_user_from_session();
      if (get_user?.phone1 === null || get_user?.phone2 === null) {
        router.push("/signin/verify_info")
        return;
      }
      setUser(get_user)

      const form_data = new FormData()
      form_data.set("product_id", id as string)
      form_data.set("buyer_id", get_user?.id as string)

      const fetch_product = await fetch("/api/public/products/product",
        { method: "POST", body: form_data });
      const response_product = await fetch_product.json()
      if (response_product.like === "yes") {
        setLike(true)
      }
      if (response_product.status === 200) {

        setProduct(response_product.data)
        setTotalOrders(response_product.data._count.Order)
        setTotalLikes(response_product.data._count.ProductLikes)
        const found_product: Product = response_product.data;

        if (found_product.images.length > 0) {
          setSelectedImageUrl(get_cover_image(response_product.data)?.url as string)
        } else {
          if (found_product.Category.name == "G1 Garlic Dry") {
            setSelectedImageUrl("/images/g1garlic-dry-no-image.jpg")
          }
          if (found_product.Category.name == "G1 Garlic Fresh (Wet)") {
            setSelectedImageUrl("/images/g1garlic-wet-no-image.jpg")
          }
        }
        setPageLoaded(true)
        router.prefetch("/?page=1")

      }

    }
    getProduct()
  }, [])

  useEffect(() => {
    if (product?.id !== undefined) {

      findOrders()

    }
  }, [product])

  useEffect(() => {
    if (product?.id !== undefined) {
      if (is_saved) {
        findOrders()
      }
    }
  }, [is_saved])

  useEffect(() => {
    likeProduct()
  }, [like_clicked])


  return (
    <div className='' style={{ width: "100%" }}>
      <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
        <div className='flex pl-2 md:pl-5 items-center'>
          <Link href={'/?page=1'}>
            <div className='text-2xl bg-slate-800 px-2 py-1 rounded-lg scale-100 hover:scale-110'>
              <LeftOutlined />
            </div>
          </Link>
          <div className='ml-3'>
            Product Details
          </div>
        </div>
      </div>
      <div className='text-black bg-white p-0 md:p-5 pb-5 body-content' >
        <section>
          {page_loaded ?

            <div className='flex flex-wrap md:flex-nowrap'>
              <div className='md:flex-1'>

                <div className='flex w-full bg-slate-300 mb-3 md:mb-0'>
                  <div className='bg-slate-300 flex-1  border-r border-r-slate-400'>
                    <img src={selected_image_url} alt='img' className='p-2 w-full' />
                  </div>

                  {product.images.length > 1 ?
                    <div className='flex flex-col justify-center w-24 h-full bg-slate-300 p-2'>
                      {product?.images?.map((my_image: any) => {
                        return <div key={my_image.id}
                          onClick={() => {
                            setSelectedImageUrl(my_image?.url)

                          }}
                          className='mb-2 cursor-pointer'>
                          <img src={my_image?.url} alt='img' className=' rounded-lg' />
                        </div>
                      })}

                    </div>
                    : ""}
                </div>

              </div>
              <div className='px-0 flex-1'>
                <div className='px-3'>
                  {/* <Link href={`/product/${product.id}`}> */}
                  <h2 className='text-xl md:text-2xl lg:text-3xl mb-2 capitalize'>{product.title}</h2>
                  {/* </Link> */}
                  <div className='flex items-center align-middle  mb-3'>
                    <p className='text-md md:text-xl'><span className='mr-2 '>Price:</span><span className=''>Rs {product.price} </span></p>
                    <div className='ml-0 md:ml-2 capitalize text-sm'><span className='mr-1'>/</span><span>{product.priceUnit.toLowerCase()}</span></div>
                    <span className='mx-4'>|</span>

                    <div onClick={() => {
                      if (user?.id === undefined) {
                        router.push("/signin")
                      } else {
                        setLike(!like)
                        setLikeClicked(true)
                      }
                    }} className='scale-100 hover:scale-110 transition-all hover:cursor-pointer select-none'>
                      <span className='text-red-500'>
                        {like_clicked ? <LoadingOutlined /> :
                          like ? <HeartFilled /> : <HeartOutlined />
                        }
                      </span>
                      <span className='ml-2 text-sm'><span className='mr-1'>{total_likes}</span>{total_likes === 1 ? 'Like' : "Likes"}</span>
                    </div>

                  </div>
                  <div className='flex items-center align-middle'>
                    <p className=''>Stock Available for Sale:</p>
                    <span className='ml-0 md:ml-2 '>{product.weight}<span className='ml-1 capitalize'>{product.weightUnit.toLowerCase()}</span></span>
                  </div>

                  {product?.receiveOffers ?
                    <div>
                      <div className='py-0'>
                        <hr />
                      </div>
                      <div className=''>
                        <Form
                          name="basic"
                          style={{ maxWidth: "100%" }}
                          initialValues={{ remember: true }}
                          onFinish={() => { }}
                          onFinishFailed={() => { }}
                          autoComplete="off"
                        >
                          <div className='mt-4'>
                            <div className='flex items-center'>
                              <div className='text-lg mr-2'>Place an Offer</div>
                              <div className='text-xs'>(22 Offers Received)</div>
                            </div>
                            <div className='flex flex-col justify-start mt-2'>

                              <div style={{ width: "150px" }} >
                                <Form.Item<FieldType>
                                  name="amount_offer"
                                  rules={[{ required: true, message: 'Amount is required' }]}
                                >
                                  <Input
                                    style={{ width: "100%" }}
                                    placeholder='Offer Amount'
                                    type='number'
                                    min={0}
                                    value={""}
                                    onChange={(e) => { }}
                                  />
                                </Form.Item>
                              </div>
                              <div className=''>
                                <Form.Item
                                  name="offer_weightUnits"
                                  rules={[{ required: true, message: 'Select Weight Units' }]}
                                >
                                  <Select
                                    placeholder='Measure Unit'

                                    style={{ width: "150px" }}
                                    onChange={e => {
                                      // setSelectedWeightUnit(e)
                                    }}
                                  >
                                    {weight_units.map(unit_str => {
                                      return (
                                        <Select.Option key={unit_str} value={`${unit_str}`}>{unit_str}</Select.Option>
                                      )
                                    })}
                                  </Select>
                                </Form.Item>
                              </div>

                            </div>
                            <Button size='large' htmlType="submit">
                              <div className='text-white flex items-center'>
                                <div className='mr-2 text-xl'><DollarOutlined /></div>
                                <div>Place Offer</div>

                              </div>

                            </Button>
                          </div>

                        </Form>
                      </div>
                      <div className='pt-6 pb-6'>
                        <hr />
                      </div>
                    </div>
                    :

                    <div className='pt-6 pb-6'>
                      <hr />
                    </div>
                  }

                  <div className=''>
                    {product?.description}
                  </div>
                  <div className='pt-6 pb-6'>
                    <hr />
                  </div>
                </div>






                {user?.id === undefined ?
                  <div className='px-3'>
                    <div className=''>
                      <div className='flex items-center'>
                        <div className='text-lg mr-2'>Place Order</div>
                        <div className='text-xs'>({total_orders} Orders Placed)</div>
                      </div>
                      <Button size='large' onClick={() => {
                        sessionStorage.setItem("signin_url", pathName)
                        signIn()
                      }}>
                        <div className='text-white flex items-center'>
                          <div className='text-xl'>
                            <LoginOutlined />
                          </div>
                          <span className='ml-2'>
                            Login to Place Order
                          </span>
                        </div>
                      </Button>
                    </div>
                  </div>
                  :
                  <div>

                    <div className=''>
                      {orders?.length > 0 ? <div>

                        <h2 className='text-lg mb-2 px-3'>Previous Orders</h2>

                        <div className="w-screen md:w-full px-3 relative overflow-x-auto  bg-white " style={{
                          // width: "350px", minWidth: "350px"

                        }}>
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-5"
                          // style={{ width: "60%"}}
                          >
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Order Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  View Details
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map(my_order => {
                                return (
                                  <tr key={my_order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {
                                        datjs(
                                          Date.parse(my_order.createdAt.toString())
                                        ).format("DD-MMM-YYYY")
                                      }
                                    </th>
                                    <td className="px-6 py-4">
                                      {my_order.weight}<span className='ml-2 capitalize'>{my_order.weightUnit.toLowerCase()}</span>
                                    </td>
                                    <td className="px-6 py-4">

                                      <div className='whitespace-nowrap'>
                                        {my_order.orderAction === "PENDING" ?
                                          <span className='text-lg'><FieldTimeOutlined />
                                          </span> : ""}

                                        <span className='ml-2'>{my_order.orderAction}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      Details
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className='pt-6 pb-6'>
                          <hr />
                        </div>

                      </div> : ""}
                    </div>
                    <div className='px-3'>

                      <Form
                        name="basic"

                        style={{ maxWidth: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >

                        <div className=''>
                          <div className='flex items-center'>
                            <div className='text-lg mr-2'>Place Order</div>
                            <div className='text-sm '>({total_orders} Orders Placed)</div>
                          </div>

                          <div>


                          </div>
                          <div className='mt-3'>

                            <div className='flex flex-row mt-2 justify-start'>

                              <div style={{ width: "150px" }} className='mr-2'>
                                <div>Quantity</div>
                                <Form.Item<FieldType>
                                  name="amount_order"

                                  rules={[{ required: true, message: 'Order Quantity is Required' }]}
                                >
                                  <Input
                                    disabled={is_saved}
                                    style={{ width: "100%" }}
                                    placeholder='Order Quantity'
                                    type='number'
                                    min={0}
                                    value={""}
                                    onChange={(e) => {
                                      setOrderWeight(parseInt(e.target.value as string))
                                    }}
                                  />
                                </Form.Item>
                              </div>
                              <div className='mr-2'>
                                <div>Units</div>

                                <Form.Item
                                  name="order_weightUnits"
                                  rules={[{ required: true, message: 'Select Weight Units' }]}
                                >
                                  <Select
                                    disabled={is_saved}

                                    placeholder='Measure Unit'

                                    style={{ width: "150px" }}
                                    onChange={e => {
                                      // setSelectedWeightUnit(e)
                                      setOrderWeightUnits(e)
                                    }}
                                  >
                                    {weight_units.map(unit_str => {
                                      return (
                                        <Select.Option key={unit_str} value={`${unit_str}`}>{unit_str}</Select.Option>
                                      )
                                    })}
                                  </Select>
                                </Form.Item>
                              </div>
                            </div>
                            <div>
                              <div>Write note for the seller</div>

                              <Form.Item<FieldType>
                                name="buyernote"
                                rules={[{ required: true, message: 'Write a note for the seller' }]}
                              >
                                <TextArea
                                  disabled={is_saved}

                                  showCount
                                  maxLength={500}

                                  style={{ height: 120, marginBottom: 24 }}
                                  onChange={(e) => {
                                    setNote(e.target.value)
                                  }}
                                  placeholder="Write note for the seller"
                                />
                              </Form.Item>
                            </div>
                            {product.User.id === user.id ?
                              <div className='flex items-center'>
                                <Button disabled size='large' className='opacity-40'>
                                  <div className='text-white flex items-center'>
                                    <div className='mr-2 text-xl'><ShoppingCartOutlined /></div>
                                    <div>Place Order</div>
                                  </div>
                                </Button>
                                <div className='ml-2 flex items-center'>
                                  <div className='text-lg text-red-500'>
                                    <ExclamationCircleOutlined />
                                  </div>
                                  <div className='ml-2'>
                                    You cannot place order on your own product!
                                  </div>

                                </div>
                              </div>
                              :

                              <div className='flex items-center'>

                                <Button
                                  size='large'
                                  htmlType="submit"
                                  disabled={is_saved}
                                  className={`${is_saved ? "opacity-40" : ""}`}
                                >
                                  <div className='text-white flex items-center'>
                                    <div className='mr-2 text-xl'><ShoppingCartOutlined /></div>
                                    <div>Place Order</div>
                                  </div>
                                </Button>

                                <div className='ml-5'>
                                  {is_saving ?
                                    <div className='flex'>
                                      <Spin />
                                      <span className='text-sm ml-2'>Please wait...</span>
                                    </div>
                                    : ""}
                                  {is_saved ? <div className='flex items-center'>
                                    <div className='text-xl text-green-500'>
                                      <CheckCircleOutlined />
                                    </div>
                                    <div className='ml-2'>Your order is sent to seller!</div>
                                  </div> : ""}
                                </div>
                              </div>

                            }

                          </div>
                        </div>

                      </Form>
                    </div>
                  </div>
                }



                <div className='border mt-6 pb-6'>

                  <div
                    className='text-lg mb-5 text-center bg-slate-100 p-2'
                  >Contact {product?.User?.name}</div>

                  {user?.id === undefined ?
                    <div className='flex justify-center flex-wrap'>
                      <div className='ml-4 mb-4 md:mb-0'>
                        <div className='ml-3 text-sm'>Phone Call</div>
                        <div className='relative ml-0 ' style={{ width: "180px" }}>

                          <div className='text-white text-2xl cursor-pointer rounded-full bg-yellow-500 flex justify-center items-center absolute'
                            style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                            <PhoneOutlined />
                          </div>
                          <Link href={`/signin`}>
                            <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                              <div className='py-1 w-full text-center text-xs'>Login to Call</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className='ml-4'>
                        <div className='ml-3 text-sm'>WhatsApp</div>
                        <div className='relative ml-0 ' style={{ width: "180px" }}>

                          <div className='text-white text-2xl cursor-pointer rounded-full bg-green-500 flex justify-center items-center absolute'
                            style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                            <WhatsAppOutlined />
                          </div>
                          <Link href={`/signin`}>
                            <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                              <div className='py-1 w-full text-center text-xs'>Login to WhatsApp</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    :
                    <div className='flex justify-center flex-wrap '>
                      <div className='ml-4 mb-4 md:mb-0'>
                        <div className='ml-3 text-sm'>Phone Call</div>
                        <div className='relative ml-0 ' style={{ width: "180px" }}>

                          <div className='text-white text-2xl cursor-pointer rounded-full bg-yellow-500 flex justify-center items-center absolute'
                            style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                            <PhoneOutlined />
                          </div>
                          {/* <Link href={`tel:${product?.User?.phone1}`}> */}
                          <a href={`tel:${product?.User?.phone1}`}>
                            <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                              <div className='py-1 w-full text-center'>{product?.User?.phone1}</div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className='ml-4 px-3'>
                        <div className='ml-3 text-sm'>WhatsApp</div>
                        <div className='relative ml-0 ' style={{ width: "180px" }}>

                          <div className='text-white text-2xl cursor-pointer rounded-full bg-green-500 flex justify-center items-center absolute'
                            style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                            <WhatsAppOutlined />
                          </div>
                          <Link target='_blank' href={`//api.whatsapp.com/send?phone=${product?.User?.phone2}&text=${'hi there'}`}>
                            <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                              <div className='py-1 w-full text-center'>{product?.User?.phone2}</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  }


                </div>

                <div className='flex flex-wrap items-center align-middle mt-6 mb-3 px-3'>
                  <p className=' mr-2'>Sold by:</p>

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
                <div className='flex flex-wrap text-sm px-3'>
                  <div>
                    {product.Category.name}
                  </div>
                  <div className=''>
                    &nbsp;is available for sale in&nbsp;
                  </div>

                  {getCitiesString(product.productCity)}

                </div>
              </div>
            </div>

            :
            <div className='flex p-3 md:p-0'>
              <div className=''>
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



