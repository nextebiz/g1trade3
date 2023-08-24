'use client'
import React, { useEffect, useState } from 'react'
import { StarOutlined, StarFilled, StarTwoTone, ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined, WhatsAppOutlined, PhoneOutlined } from "@ant-design/icons"
import {
  Card, Spin, Button, Input, Select, Form, Rate, Modal
} from 'antd';

import { get_user_from_session } from '@/utils/getUserData';
import dayjs from 'dayjs'
import Link from 'next/link';


const orderActions = [
  "PENDING",
  "ACCEPTED",
  "DELIVERED",
  "CANCELLED"
]

const { TextArea } = Input;

export default function BuyerOrders() {

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [star_value, setStarValue] = useState(3);
  const [star_comment, setStarComment] = useState("")
  const [selected_order, setSelectedOrder] = useState<Order>({} as Order)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useState<User>({} as User)
  const [orders, setOrders] = useState<Order[]>([])
  const [orders_loaded, setOrdersLoaded] = useState(false)


  const [page_loaded, setPageLoaded] = useState(false)
  const [order_action, setOrderAction] = useState<string>("PENDING")
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [add_to_skip, setAddToSkip] = useState(20)
  const [counter, setCounter] = useState(0)
  const [totals, setTotals] = useState({
    count: 0,
    PENDING: 0,
    ACCEPTED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
  })


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {

    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedOrder({} as Order)
    setIsModalOpen(false);
  };


  const onFinish = async (values: any) => {

    const form_data = new FormData();
    form_data.set("user_id", user?.id)
    form_data.set("message", star_comment)
    form_data.set("stars", star_value.toString())
    form_data.set("product_id", selected_order.product?.id)
    form_data.set("order_id", selected_order.id)

    const fetch_rate = await fetch("/api/buyer/orders/rate", {
      method: "POST",
      body: form_data,
    })
    const response_rate = await fetch_rate.json()
    setCounter(counter => counter + 1)
    setIsModalOpen(false);
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const getOrders = async () => {
    if (user?.id !== undefined) {
      setOrdersLoaded(false)
      const form_data = new FormData()
      const user_id = user?.id
      form_data.set("user_id", user_id)

      form_data.set("order_action", "PENDING")
      if (order_action !== "") {
        form_data.set("order_action", order_action)
      }

      form_data.set("skip", skip.toString())

      const get_orders = await fetch("/api/buyer/orders/find_orders", {
        method: "POST",
        body: form_data,
        next: { revalidate: 300 }
      })
      const response_orders = await get_orders.json()
      setOrders(response_orders.data.orders)
      setTotal(response_orders.data.total)
      setPageLoaded(true)
      setOrdersLoaded(true)

      setTotals(totals => {
        return {
          ...totals,
          count: response_orders.data.total,
          PENDING: response_orders.data.pending_count,
          ACCEPTED: response_orders.data.accepted_count,
          DELIVERED: response_orders.data.delivered_count,
          CANCELLED: response_orders.data.cancelled_count
        }
      })

    }
  }

  const capitalizeWord = (str: string) => {
    let first_letter = str[0];
    first_letter = first_letter.toUpperCase();
    str = str.slice(1)
    return first_letter + str;

  }
  useEffect(() => {
    const getUser = async () => {
      const getUserFromSession = await get_user_from_session()
      if (getUserFromSession) {
        setUser(getUserFromSession)
      }
    }
    getUser()
  }, [])


  useEffect(() => {
    getOrders()
  }, [user, order_action, counter]);




  return (
    <div className='' style={{ width: "100%" }}>
      <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
        <div style={{ paddingLeft: "45px" }}>
          Orders
        </div>
      </div>
      <div className='text-black  p-5 '>
        <section>
          {page_loaded ?
            <div>
              <div className='flex items-center flex-wrap'>
                <Link onClick={() => {
                  setOrderAction("PENDING")
                }} href={'#'}>
                  <div className='text-blue-500'>Pending: {totals.PENDING}</div>
                </Link>
                <span className='px-1 md:px-3 text-sm text-slate-300'>|</span>
                <Link onClick={() => {
                  setOrderAction("ACCEPTED")
                }} href={'#'}>
                  <div className='text-blue-500'>Accepted: {totals.ACCEPTED}</div>
                </Link>
                <span className='px-1 md:px-3 text-sm text-slate-300'>|</span>
                <Link onClick={() => {
                  setOrderAction("DELIVERED")
                }} href={'#'}>
                  <div className='text-blue-500'>Delivered: {totals.DELIVERED}</div>
                </Link>
                <span className='px-1 md:px-3 text-sm text-slate-300'>|</span>
                <Link onClick={() => {
                  setOrderAction("CANCELLED")
                }} href={'#'}>
                  <div className='text-blue-500'>Cancelled: {totals.CANCELLED}</div>
                </Link>
              </div>
              <div className='py-5'>
                <hr />
              </div>

              {orders_loaded ?
                <div>
                  {orders.length > 0 ?
                    <div>
                      <div className='mb-5 text-lg'>
                        {
                          `${total} ${order_action === "" ? "Pending" : capitalizeWord(order_action.toLowerCase())} Orders`
                        }
                      </div>
                      <div>
                        {orders.map(order => {
                          return <div key={order.id}>
                            <Card
                              style={{ marginTop: 0 }}
                              type="inner"
                              title={`Required Quantity: ${order.weight} ${order.weightUnit.toLowerCase()}`}
                            // extra={<a href="#">More</a>}
                            >
                              <div className='flex flex-col md:flex-row items-start md:items-center'>
                                <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>Order Date:</div>
                                <div className='ml-2'>
                                  {dayjs(Date.parse(order.createdAt.toString())).format("DD MMM YYYY")}
                                </div>
                              </div>
                              <div className='flex flex-col md:flex-row items-start md:items-center'>
                                <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>Product Post:</div>
                                <div className='ml-2'>
                                  <Link target='_blank' href={`/product/${order.product.id}`}> {order.product.title}</Link>
                                </div>
                              </div>

                              <div className='flex flex-col md:flex-row items-start md:items-center'>
                                <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>Sold By:</div>
                                <div className='ml-2'>
                                  <span>{order.product.User.name}</span>


                                </div>
                              </div>
                              <div className='flex flex-col md:flex-row items-start md:items-center'>
                                <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>{"Seller's Phone:"}</div>
                                <div className='flex flex-row'>
                                  <span className='ml-2'><PhoneOutlined /></span>
                                  <a href={`tel:${order.product.User.phone1}`}>
                                    <div className='ml-2'>
                                      {order.product.User.phone1}
                                    </div>
                                  </a>
                                </div>
                              </div>
                              <div className='flex flex-col md:flex-row items-start md:items-center'>
                                <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>{"Seller's WhatsApp:"}</div>
                                <div className='flex flex-row'>
                                  <span className='ml-2'><WhatsAppOutlined /></span>
                                  <Link target='_blank' href={`//api.whatsapp.com/send?phone=${order.product.User.phone2}&text=${'hi there'}`}>

                                    <div className='ml-2'>
                                      {order.product.User.phone2}
                                    </div>
                                  </Link>
                                </div>

                              </div>


                              <div className='flex flex-col md:flex-row items-start md:items-center'>
                                <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>My Note:</div>
                                <div className='ml-2'>
                                  {order.note}
                                </div>
                              </div>

                              <div className='flex flex-col md:flex-row items-start md:items-center'>
                                <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>Sellers Comments:</div>
                                <div className='ml-2'>
                                  {order.sellerComments}
                                </div>
                              </div>
                              <div className='flex flex-col md:flex-row items-start md:items-center'>
                                <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>Status:</div>
                                <div className={`ml-2 order-status ${order.orderAction === "PENDING"
                                  ?
                                  "text-red-500"
                                  :
                                  order.orderAction === "ACCEPTED" ? "text-green-600" : ""
                                  }`}>
                                  {order.orderAction}

                                </div>

                              </div>

                              {order.product.rating.length > 0 ?
                                <div>
                                  <div className='flex flex-col md:flex-row items-start md:items-center'>
                                    <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>Your Ratings:</div>
                                    <div className='flex items-center'>
                                      <span>
                                        <Rate disabled defaultValue={order.product.rating[0].stars} />
                                      </span>
                                      <span className='ml-3'>
                                        {order.product.rating[0].stars} <span className='ml-1'>Stars</span>
                                      </span>
                                    </div>
                                    {/* {order.product.rating.map(rating => {
                                      return <div key={rating.id} >
                                        <Rate disabled defaultValue={rating.stars} />
                                      </div>
                                    })} */}
                                  </div>
                                </div>
                                :
                                <div>
                                  {order_action === "ACCEPTED" || order_action === "DELIVERED" ?
                                    <div className='flex flex-col md:flex-row items-start md:items-center'>
                                      <div className='bg-slate-200 p-1 w-full md:w-40 mb-1'>Rate the seller:</div>
                                      <div className={`ml-2 order-status ${order.orderAction === "PENDING"
                                        ? "text-red-500" :
                                        order.orderAction === "ACCEPTED" ? "text-green-600" : ""
                                        }`}>
                                        <Link href={""} onClick={
                                          () => {
                                            setSelectedOrder(order)
                                            showModal()
                                          }
                                        }>
                                          <span className='text-yellow-400 mr-2'>
                                            <StarFilled />
                                          </span>
                                          <span className='ml-0'>

                                            Rate The Seller</span>
                                        </Link>
                                      </div>
                                    </div>
                                    : ""}
                                </div>
                              }
                            </Card>
                          </div>
                        })}
                      </div>

                    </div>
                    : <div>
                      No {order_action.toLowerCase()} ordres found
                    </div>
                  }

                </div>
                :

                <div>
                  <Spin /><span className='text-sm ml-2'>Loading...</span>
                </div>

              }
            </div>
            :
            <div>
              <Spin /><span className='text-sm ml-2'>Loading...</span>
            </div>
          }
        </section >


        {(skip + add_to_skip) >= total ? "" :
          <Button onClick={() => {
            setSkip(skip => skip + add_to_skip)
            setCounter(counter => counter + 1)

          }}>Load more...</Button>
        }
      </div >
      <Modal title="Rate the Seller"
        open={isModalOpen}
        onOk={onFinish}
        onCancel={handleCancel}>
        <Form
          name="basic"
          disabled={user?.id === undefined}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className='mb-5 mt-3'>
            <span>
              <Rate tooltips={desc} onChange={setStarValue} value={star_value} />
              {star_value ? <span className="ant-rate-text">{desc[star_value - 1]}</span> : ''}
            </span>
          </div>


          <div>Add Your Comments:</div>
          <Form.Item
            // name="sellerComments"
            initialValue={selected_order.sellerComments}
            rules={[{ required: true, message: 'Message is require' }]}
          >
            <TextArea showCount maxLength={250} rows={4}
              value={star_comment}
              onChange={(e) => {
                // setMessageText(e.target.value)
                setStarComment(e.target.value)
              }} />
          </Form.Item>
        </Form>
      </Modal>
    </div >
  )
}
