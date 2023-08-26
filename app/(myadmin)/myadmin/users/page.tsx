'use client'
import React, { useEffect, useState } from 'react'
import { InfoCircleOutlined, FormOutlined } from "@ant-design/icons"
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Spin, Select, Space } from 'antd';
import dayjs from 'dayjs';


export default function Admin_Users() {

    const searchParams = useSearchParams()

    const router = useRouter();
    const [users, setUsers] = useState<AdminUser[]>([])
    const [total, setTotal] = useState(0)
    const [take, setTake] = useState(20)
    const [skip, setSkip] = useState(0)
    const [user_loaded, setUserLoaded] = useState(false)
    const [page_loaded, setPageLoaded] = useState(false)
    const [search_filter, setSearchFilter] = useState("ALL")


    const getAsyncData = async () => {
        setUserLoaded(false)

        const form_data = new FormData();
        form_data.set("take", take.toString())
        form_data.set("skip", skip.toString())
        form_data.set("search_filter", search_filter)

        const fetch_users = await fetch("/api/myadmin/users", {
            method: "post",
            body: form_data,
            next: { revalidate: 300 }
        })
        const response_users = await fetch_users.json()
        setUsers(response_users.data.users)
        setTotal(response_users.data.stats.total)
        setUserLoaded(true)
        setPageLoaded(true)

    }

    useEffect(() => {
        getAsyncData();
    }, [skip, search_filter])

    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

                <div style={{ paddingLeft: "45px" }}>
                    Users
                </div>
            </div>
            <div className='text-black  p-5 '>
                <section>
                    {/* {updated_user ?
                        <TopMessage params={{ msg: "User Updates Successfully!", msg_type: "success" }} />
                        : ""} */}
                    <div className='text-black  p-5 '>
                        {page_loaded ?
                            <section>
                                {users.length == 0 ?

                                    <div className='flex'>
                                        <div className='mr-3'>
                                            <InfoCircleOutlined className='text-2xl' />
                                        </div>
                                        <div>
                                            No users found. Try changing search query or add new user.
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className='mb-3'>
                                            Filter:  <Space wrap>
                                                <Select
                                                    defaultValue="ALL"
                                                    style={{ width: 120 }}
                                                    onChange={(e) => {
                                                        setSearchFilter(e)
                                                    }}
                                                    options={[
                                                        { value: 'ALL', label: 'Display All' },
                                                        { value: 'ADMIN', label: 'ADMIN' },
                                                        { value: 'BUYER', label: 'BUYER' },
                                                        { value: 'SELLER', label: 'SELLER' },
                                                    ]}
                                                />
                                            </Space>

                                        </div>

                                        {user_loaded ?
                                            <div className='mb-3'>
                                                Displaying total {users.length} users
                                            </div>
                                            :
                                            <div className='flex'>
                                                <div><Spin /></div>
                                                <div className='ml-2'>Loading...</div>
                                            </div>
                                        }


                                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-2">
                                            {users.map(user => {
                                                return (
                                                    <div key={user.id} className='bg-slate-100  border rounded-lg relative '>
                                                        <div className='flex p-1  pb-4 pt-4 '>
                                                            <div className=' mr-2 ' style={{ width: "70px", height: "70px" }}>
                                                                <img src={user.image} className='object-contain rounded-full border' />
                                                            </div>
                                                            <div className='w-full p-1'>
                                                                <div className='flex mb-3'>

                                                                    <div className=' mr-2'>{user.name}</div>

                                                                    <div className={`
                                                                    ${user.role === "ADMIN" ? "bg-red-500" : ""}
                                                                    ${user.role === "SELLER" ? "bg-green-500" : ""}
                                                                    ${user.role === "BUYER" ? "bg-slate-500" : ""}
                                                                     px-3 text-white`}>
                                                                        {user.role}
                                                                    </div>
                                                                </div>
                                                                <p className='text-xs'>
                                                                    <span className='font-bold'>ID: </span>
                                                                    {user.id}</p>
                                                                <p className='text-sm'>
                                                                    <span className='font-bold'>Email: </span>
                                                                    {user.email}</p>
                                                                <p className='text-sm'>
                                                                    <span className='font-bold'>Phone: </span>
                                                                    {user.phone1}
                                                                </p>
                                                                <p className='text-sm'>
                                                                    <span className='font-bold'>WhatsApp: </span>
                                                                    {user.phone2}
                                                                </p>
                                                                <p className='text-sm'>
                                                                    <span className='font-bold'>Allowed Ads: </span>
                                                                    {user.numberOfAllowedAds}
                                                                </p>

                                                                <p className='text-sm'>
                                                                    <span className='font-bold'>Allowed Cities: </span>
                                                                    {user.numberOfAllowedCities}
                                                                </p>
                                                                {user?.role === "SELLER" ?
                                                                    <p className='text-sm'>
                                                                        <span className={`font-bold`}>Expiry Date:</span>
                                                                        <span>
                                                                            {
                                                                                user.expiryDate ?
                                                                                    dayjs(user.expiryDate?.toString()).diff(dayjs(), "days") > -1 ?
                                                                                        <span>
                                                                                            <span>{dayjs(user.expiryDate?.toString()).format("DD MMM YYYY")}</span>
                                                                                            <span className='bg-green-500 text-white p-1 ml-2'>Active {dayjs(user.expiryDate?.toString()).diff(dayjs(), "days")} days remaining</span>
                                                                                        </span>
                                                                                        :
                                                                                        <span>
                                                                                            <span>{dayjs(user.expiryDate?.toString()).format("DD MMM YYYY")}</span>
                                                                                            <span className='bg-red-500 text-white p-1 ml-2'>Expired {dayjs(user.expiryDate?.toString()).diff(dayjs(), "days")} days ago</span>
                                                                                        </span>
                                                                                    :
                                                                                    "-"
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    : ""}
                                                                <div className='absolute top-0 right-0 mr-2 mt-2'>
                                                                    <Button onClick={() => {
                                                                        router.push(`/myadmin/users/edit/${user.id}`)
                                                                    }}>
                                                                        <div className='text-white'>
                                                                            <span className=''>Edit</span>
                                                                        </div>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div>

                                                        </div>

                                                        {/* <div className='container m-auto grid grid-cols-2 text-center mt-2'>
                                                            <p className={`text-sm  p-2 border-r border-r-slate-400 ${user.role === "ADMIN" ? "bg-red-300" : user.role === "SELLER" ? "bg-blue-400" : "bg-slate-200"}`}>
                                                                {user.role}x
                                                            </p>
                                                            <p className='text-sm p-2 bg-slate-200'>
                                                                AD
                                                            </p>

                                                        </div>
                                                        <div style={{ height: "80px" }}>
                                                            <div className='border-t border-t-slate-300 flex items-center justify-around text-center absolute bottom-0 bg-slate-100 w-full'
                                                                style={{ height: "80px" }}
                                                            >
                                                                <div >
                                                                    <div className='text-2xl'>{user._count.products}</div>
                                                                    <div className=''>Products</div>
                                                                </div>
                                                                <div>
                                                                    <div className='text-2xl'>{user.numberOfAllowedAds}</div>
                                                                    <div className=''>Allowed</div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                    </div>
                                                )
                                            })}

                                        </div>
                                        <hr className='mt-4 mb-4' />
                                        <div className='flex justify-center mb-3' >
                                            {user_loaded ?
                                                <h1>

                                                    Displaying  {(take + skip) > total ? total :

                                                        <span>
                                                            {(skip + 1)} to {take + skip}
                                                        </span>
                                                    } of {total}
                                                </h1>
                                                :
                                                <div className='flex'>
                                                    <div><Spin /></div>
                                                    <div className='ml-2'>Loading...</div>
                                                </div>
                                            }
                                        </div>
                                        <div className='flex justify-center'>


                                            <div className={`${skip === 0 ? "opacity-50" : ""}`}>
                                                <Button
                                                    disabled={skip === 0}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setSkip(skip => {
                                                            return skip - take
                                                        })
                                                    }}
                                                >Previous Page
                                                </Button>
                                            </div>


                                            <div className={`${(skip + take) >= total ? "opacity-50" : ""}`}>

                                                <Button
                                                    disabled={(skip + take) >= total}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setSkip(skip => {
                                                            return skip + take
                                                        })
                                                    }}
                                                >Next Page</Button>
                                            </div>

                                        </div>
                                    </div>

                                }
                            </section>
                            : <div>
                                <Spin /> {" Loading ..."}
                            </div>
                        }
                    </div>
                </section>

            </div>

        </div>
    )
}
