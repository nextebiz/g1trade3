'use client'
import React, { useEffect, useState } from 'react'
import { FieldTimeOutlined, ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined, WhatsAppOutlined, PhoneOutlined } from "@ant-design/icons"
import {
  Card, Spin, Button, Input, Select, Form,
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

export default function BuyerOrders() {

  const [user, setUser] = useState<User>({} as User)
  const [orders, setOrders] = useState<Order[]>([])
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



  const getOrders = async () => {
    if (user?.id !== undefined) {

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
        next: { revalidate: 60 } 
       })
      const response_orders = await get_orders.json()
      setOrders(response_orders.data.orders)
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
              {/* <div className='flex'>
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
              </div> */}

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
                              {order.product.User.name}
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
                              {/* {order.orderAction} */}
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
        </section>


        {(skip + add_to_skip) >= total ? "" :
          <Button onClick={() => {
            setSkip(skip => skip + add_to_skip)
            setCounter(counter => counter + 1)

          }}>Load more...</Button>
        }
      </div>

    </div>
  )
}
