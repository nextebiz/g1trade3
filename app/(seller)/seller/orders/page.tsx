'use client'
import React, { useEffect, useState } from 'react'
import { WhatsAppOutlined, PhoneOutlined, FieldTimeOutlined, ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import {
  Card, Spin, Button, Input, Select, Form, Modal
} from 'antd';


import { get_user_from_session } from '@/utils/getUserData';
import dayjs from 'dayjs'
import Link from 'next/link';

const { TextArea } = Input;

export default function SellerOrders() {

  const [user, setUser] = useState<User>({} as User)
  const [orders, setOrders] = useState<Order[]>([])
  const [page_loaded, setPageLoaded] = useState(false)
  const [order_action, setOrderAction] = useState<string>("PENDING")
  const [total, setTotal] = useState(0)
  // const [refresh_orders, setRefreshOrders] = useState(false)
  const [skip, setSkip] = useState(0)
  const [add_to_skip, setAddToSkip] = useState(20)
  const [counter, setCounter] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected_order, setSelectedOrder] = useState<Order>({} as Order)

  const [totals, setTotals] = useState({
    count: 0,
    PENDING: 0,
    ACCEPTED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
  })


  const orderActions = [
    "PENDING",
    "ACCEPTED",
    "DELIVERED",
    "CANCELLED"
  ]
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


  // const update_order = async (order: Order, o_action: string) => {
  //   const form_data = new FormData()
  //   form_data.set("order_id", order.id)
  //   form_data.set("user_id", user?.id)
  //   form_data.set("order_action", o_action)
  //   const fetch_order_update = await fetch("/api/seller/orders/update", { method: "POST", body: form_data })
  //   const response_update = await fetch_order_update.json()
  //   // setRefreshOrders(true)
  //   console.log("response_update")
  //   console.log(response_update)
  //   setCounter(counter => counter + 1)
  // }

  const onFinish = async (values: any) => {

    const form_data = new FormData();
    form_data.set("user_id", user?.id)
    form_data.set("order_id", selected_order.id)
    form_data.set("order_action", selected_order.orderAction)
    form_data.set("seller_comments", selected_order.sellerComments)

    const fetch_order_update = await fetch("/api/seller/orders/update", {
      method: "POST",
      body: form_data,
      next: { revalidate: 60 }
    })
    const response_update = await fetch_order_update.json()
    setCounter(counter => counter + 1)
    setIsModalOpen(false);
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const getUser = async () => {
      const getUserFromSession = await get_user_from_session()
      if (getUserFromSession) {
        setUser(getUserFromSession)
      }
    }
    getUser()
  }, [])

  const getOrders = async () => {
    if (user?.id !== undefined) {

      const form_data = new FormData()
      const user_id = user?.id
      form_data.set("user_id", user_id)
      form_data.set("order_action", "PENDING")
      form_data.set("skip", skip.toString())

      if (order_action !== "") {
        form_data.set("order_action", order_action)
      }
      const get_orders = await fetch("/api/seller/orders/find_orders", {
        method: "POST",
        body: form_data,
        next: { revalidate: 60 }
      })
      const response_orders = await get_orders.json()
      setOrders(response_orders.data.orders)
      // setOrders(orders=>{
      //   return [...orders, response_orders.data.orders]
      // })
      setTotal(response_orders.data.total)
      setPageLoaded(true)
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

  useEffect(() => {
    getOrders()
  }, [user, order_action, counter]);

  useEffect(() => {
    if (orders.length > 0) {
    }
  }, [orders])

  const capitalizeWord = (str: string) => {
    let first_letter = str[0];
    first_letter = first_letter.toUpperCase();
    str = str.slice(1)
    return first_letter + str;

  }

  return (
    <div className='' style={{ width: "100%" }}>
      <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
        <div style={{ paddingLeft: "45px" }}>
          Orders

        </div>
      </div>
      <div className='text-black  p-3 md:p-5 '>
        <section>
          {page_loaded ?
            <div>
              <div className='flex'>
                <div className='mr-3 mt-1'>Search Orders:</div>
                <div>
                  <Form.Item
                    className='w-52'
                  >
                    <Select
                      placeholder="Select Order Status"
                      className='w-44'
                      value={order_action}
                      onChange={(e) => {
                        setOrderAction(e)
                      }}
                    // value={order.orderAction}
                    >
                      {orderActions.map(action => {
                        return <Select.Option key={action} value={action}>
                          {action}<span className='ml-2'></span>
                          {action === "PENDING" ? totals.PENDING : ""}
                          {action === "ACCEPTED" ? totals.ACCEPTED : ""}
                          {action === "DELIVERED" ? totals.DELIVERED : ""}
                          {action === "CANCELLED" ? totals.CANCELLED : ""}
                        </Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {orders.length > 0 ?
                <div>
                  <div className='mb-5 text-xl'>
                    {`${total} ${order_action === "" ? "Pending" : capitalizeWord(order_action.toLowerCase())} Orders`}
                  </div>
                  {orders.map(order => {
                    return <div key={order.id}>
                      <Card
                        style={{ marginTop: 0 }}
                        type="inner"
                        title={`Required Quantity: ${order.weight} ${order.weightUnit.toLowerCase()}`}
                      // extra={<a href="#">More</a>}
                      >
                        <div className='flex items-center '>
                          <div className='bg-slate-200 p-1 w-40 mb-1'>Order Date:</div>
                          <div className='ml-2'>
                            {dayjs(Date.parse(order.createdAt.toString())).format("DD MMM YYYY")}
                          </div>
                        </div>
                        <div className='flex items-center '>
                          <div className='bg-slate-200 p-1 w-40 mb-1'>Product Post:</div>
                          <div className='ml-2'>
                            <Link target='_blank' href={`/product/${order.product.id}`}> {order.product.title}</Link>
                          </div>
                        </div>

                        <div className='flex items-center '>
                          <div className='bg-slate-200 p-1 w-40 mb-1'>{"Buyer's Name:"}</div>
                          <div className='ml-2'>
                            {order.user.name}
                          </div>
                        </div>
                        <div className='flex items-center '>
                          <div className='bg-slate-200 p-1 w-40 mb-1'>{"Buyer's Phone:"}</div>
                          <span className='ml-2'><PhoneOutlined /></span>

                          <a href={`tel:${order.user.phone1}`}>
                            <div className='ml-2'>
                              {order.user.phone1}
                            </div>
                          </a>
                        </div>
                        <div className='flex items-center '>

                          <div className='bg-slate-200 p-1 w-40 mb-1'>{"Buyer's WhatsApp:"}</div>
                          <span className='ml-2'><WhatsAppOutlined /></span>
                          <Link target='_blank' href={`//api.whatsapp.com/send?phone=${order.user.phone2}&text=${'hi there'}`}>
                            <div className='ml-2'>
                              {order.user.phone2}
                            </div>
                          </Link>
                        </div>

                        <div className='flex items-center '>
                          <div className='bg-slate-200 p-1 w-40 mb-1'>Note from Buyer:</div>
                          <div className='ml-2'>
                            {order.note}
                          </div>
                        </div>
                        <div className='flex items-center '>
                          <div className='bg-slate-200 p-1 w-40 mb-1'>Status:</div>
                          <div className='ml-2 order-status'>
                            {order.orderAction}


                            {/* <Form.Item id='order_select' className='w-32'
                              >
                                <Select
                                  onChange={(e) => {
                                    update_order(order, e)
                                  }}
                                  value={order.orderAction} >
                                  {orderActions.map(action => {
                                    return <Select.Option key={action} value={action}>{action}</Select.Option>
                                  })}
                                </Select>
                              </Form.Item> */}
                          </div>
                        </div>
                        <div className='flex items-center '>
                          <div className='bg-slate-200 p-1 w-40 mb-1'>Sellers Comment:</div>
                          <div className='ml-2'>
                            {order.sellerComments}
                          </div>
                        </div>
                        <div className='flex items-center '>
                          <div className='bg-slate-200 p-1 w-40 mb-1'>Update:</div>
                          <div className='ml-2'>
                            <Button type="primary" onClick={
                              () => {
                                console.log(order)
                                setSelectedOrder(order)
                                showModal()
                              }
                            }>
                              Update Status
                            </Button>
                          </div>
                        </div>

                      </Card>

                    </div>
                  })}


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
        </section>


        {(skip + add_to_skip) >= total ? "" :
          <Button onClick={() => {
            setSkip(skip => skip + add_to_skip)
            setCounter(counter => counter + 1)

          }}>Load more...</Button>
        }
      </div>
      <Modal title="Update Order"
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
          <div className='hidden'>
            <Form.Item
              // name="id"
              initialValue={selected_order.id}
              rules={[{ required: true, message: 'WhatsApp is required' }]}
            >
              <Input
                type='hidden'
                value={selected_order.id}
              />
            </Form.Item>
          </div>

          <Form.Item
            // name="orderAction"
            initialValue={selected_order.orderAction}
            className='w-32'
          >
            <Select
              onChange={(e) => {
                // update_order(order, e)
                setSelectedOrder(selected_order => {
                  return { ...selected_order, orderAction: e }
                })
              }}
              value={selected_order.orderAction} >
              {orderActions.map(action => {
                return <Select.Option key={action} value={action}>{action}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <div>Sellers Comments:</div>
          <Form.Item
            // name="sellerComments"
            initialValue={selected_order.sellerComments}
            rules={[{ required: true, message: 'Message is require' }]}
          >
            <TextArea showCount maxLength={250} rows={4}
              value={selected_order.sellerComments}
              onChange={(e) => {
                // setMessageText(e.target.value)
                setSelectedOrder(selected_order => {
                  return { ...selected_order, sellerComments: e.target.value }
                })
              }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
