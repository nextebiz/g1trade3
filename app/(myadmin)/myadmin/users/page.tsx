'use client'
import React, { useEffect, useState } from 'react'
import { InfoCircleOutlined, FormOutlined } from "@ant-design/icons"
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Spin } from 'antd';
import TopMessage from '@/app/components/alerts/top_message/page';



export default function Admin_Users() {

    const searchParams = useSearchParams()

    const router = useRouter();
    const [users, setUsers] = useState<AdminUser[]>([])
    const [total, setTotal] = useState(0)
    const [take, setTake] = useState(0)
    const [skip, setSkip] = useState(0)
    const [page_loaded, setPageLoaded] = useState(false)
    const [counter, setCounter] = useState(0)
    const [updated_user, setUpdatedUser] = useState(false)



    function pagination_calc() {
        let result = total - (total - (take)) + skip
        if (result > total) { return total }
        return result
    }

    function getNextLink() {
        let next_skip = skip + take;
        if (next_skip > total) {
            next_skip = total
        }
        let next_link = `/myadmin/users?take=${take}&skip=${next_skip}`
        return next_link
    }
    function getPreviousLink() {
        let next_skip = skip - take;
        if (next_skip > total) {
            next_skip = total
        }
        let next_link = `/myadmin/users?take=${take}&skip=${next_skip}`
        return next_link
    }

    const getAsyncData = async () => {

        let take_param = searchParams.get('take') as string
        let skip_param = searchParams.get('skip') as string

        take_param = take_param == null ? "3" : take_param;
        skip_param = skip_param == null ? "0" : skip_param;

        if (page_loaded) {
            take_param = take.toString();
            skip_param = skip.toString();
        }

        const data = new FormData();
        data.set("take", take_param)
        data.set("skip", skip_param)

        const users_fetch = await fetch("/api/myadmin/users", {
            method: "post",
            body: data
        })
        const users_data = await users_fetch.json()
        setUsers(users_data.data.users)
        setTotal(users_data.data.total)
        setTake(users_data.data.take)
        setSkip(users_data.data.skip)
    }

    function goToUrl(take_number: number, skip_number: number) {
        // router.push(`/myadmin/users?take=${page_number}&skip=0`)
        setTake(take_number)
        setSkip(skip_number)
        setCounter(counter => { return counter + 1 })
    }

    useEffect(() => {
        let msg = searchParams.get('msg') as string
        if (msg === "updated_user") {
            setUpdatedUser(true)
        }


        setPageLoaded(false)
        const waitfunction = async () => {
            await getAsyncData();
            setPageLoaded(true)

        }
        waitfunction();
    }, [counter])

    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

                <div style={{ paddingLeft: "45px" }}>
                    All Products
                </div>
            </div>
            <div className='text-black  p-5 '>
                <section>
                    {updated_user ?
                        <TopMessage params={{ msg: "User Updates Successfully!", msg_type: "success" }} />
                        : ""}
                    <div>

                        <Link onClick={() => {
                            goToUrl(2, 0)
                        }}
                            href="/myadmin/users?take=2&skip=0">Go to 2</Link>
                        <hr />
                        <Link onClick={() => {
                            goToUrl(4, 0)
                        }}
                            href="/myadmin/users?take=4&skip=0">Go to 4</Link>

                    </div>

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

                                        <h1>
                                            Displaying total {users.length} users
                                        </h1>

                                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-2">
                                            {users.map(user => {
                                                return (
                                                    <div key={user.id} className='bg-slate-100  border rounded-lg relative '>
                                                        <div className='flex p-1  pb-4 pt-4 '>
                                                            <div className=' mr-2 ' style={{ width: "70px", height: "70px" }}>
                                                                <img src={user.image} className='object-contain rounded-full border' />
                                                            </div>
                                                            <div className='w-full p-1'>
                                                                <h2 className='text-md'>{user.name}</h2>
                                                                <p className='text-xs'><span>ID: </span>{user.id}</p>
                                                                <p className='text-sm'>{user.email}</p>
                                                                <p className='text-sm'>{user.phone1}</p>
                                                                <Button onClick={() => {
                                                                    router.push(`/myadmin/users/edit/${user.id}`)
                                                                }}>
                                                                    <div className='text-white'>
                                                                        <span className='mr-2'>Edit</span> <FormOutlined />
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className='container m-auto grid grid-cols-2 text-center mt-2'>
                                                            <p className={`text-sm  p-2 border-r border-r-slate-400 ${user.role === "ADMIN" ? "bg-red-300" : user.role === "SELLER" ? "bg-blue-400" : "bg-slate-200"}`}>
                                                                {user.role}
                                                            </p>
                                                            <p className='text-sm p-2 bg-slate-200'>
                                                                {user.status}</p>
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
                                                                    <div className='text-2xl'>{user._count.accounts}</div>
                                                                    <div className=''>Accounts</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })}

                                        </div>
                                        <hr className='mt-4 mb-4' />
                                        <div className='flex justify-center items-center'>
                                            {pagination_calc() <= take ? "" :
                                                <Link className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={() => {

                                                    goToUrl((take), (skip - take))
                                                }}
                                                    href={getPreviousLink()}>Previous Page</Link>
                                            }
                                            <div className='ml-3'>
                                                Displaying {
                                                    pagination_calc()
                                                } of {total}
                                            </div>
                                            {pagination_calc() == total ? "" :
                                                <Link className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={() => {
                                                    goToUrl((take), (skip + take))
                                                }}
                                                    href={getNextLink()}>Next Page</Link>
                                            }


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
