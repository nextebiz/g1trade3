'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Spin } from 'antd'
import { InfoCircleOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"

export default function Admin_Usersx() {
    const searchParams = useSearchParams()

    const router = useRouter();
    const [users, setUsers] = useState<User[]>([])
    const [total, setTotal] = useState(0)
    const [take, setTake] = useState(0)
    const [skip, setSkip] = useState(0)
    const [page_loaded, setPageLoaded] = useState(false)
    const [counter, setCounter] = useState(0)

    function pagination_calc() {
        let result = total - (total - (take)) + skip
        if (result > total) { return total }
        return result
    }

    const getAsyncData = async () => {
        let take_param = searchParams.get('take') as string
        let skip_param = searchParams.get('skip') as string
        take_param = take_param == null ? "2" : take_param;
        skip_param = skip_param == null ? "0" : skip_param;

        const data = new FormData();
        data.set("take", take_param)
        data.set("skip", skip_param)

        const users_fetch = await fetch("/api/myadmin/users", {
            method: "post",
            body: data,
            next: { revalidate: 300 } 
        })
        const users_data = await users_fetch.json()
        setUsers(users_data.data.users)
        setTotal(users_data.data.total)
        setTake(users_data.data.take)
        setSkip(users_data.data.skip)
    }

    useEffect(() => {
        getAsyncData();
        setPageLoaded(true)
    }, [counter])

    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center justify-between'>

                <div style={{ paddingLeft: "45px" }}>
                    View All Users
                </div>
                <div className=' mr-5'>
                    <span className='mr-2'>Display:</span>

                    <button
                        onClick={async () => {
                            const params = new URLSearchParams()
                            params.set("take", "2")
                            params.set("skip", "0")
                            router.push(`/myadmin/users?${params}`)
                            setCounter(counter => (counter + 1))
                        }}
                        className='bg-red-400 rounded-full mr-2' style={{ width: "30px", height: "30px" }}>
                        2
                    </button>

                    <button
                         onClick={async () => {
                            const params = new URLSearchParams()
                            params.set("take", "4")
                            params.set("skip", "0")
                            router.push(`/myadmin/users?${params}`)
                            setCounter(counter => (counter + 1))
                        }}
                        className='bg-red-400 rounded-full mr-2' style={{ width: "30px", height: "30px" }}>
                        4
                    </button>
                    <button
                        onClick={async () => {
                            router.push("/myadmin/users?take=6&skip=0")
                            setCounter(counter => (counter + 1))

                        }}
                        className='bg-red-400 rounded-full mr-2' style={{ width: "30px", height: "30px" }}>
                        6
                    </button>
                </div>
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
                                            <div key={user.id} className='bg-white border rounded-lg relative '>
                                                <div className='flex p-1  pb-4 pt-4 '>
                                                    <div className=' mr-2 ' style={{ width: "70px", height: "70px" }}>
                                                        <img src={user.image} className='object-contain rounded-full border' />
                                                    </div>
                                                    <div className='bg-slate-200 w-full p-4'>
                                                        <h2 className='text-md'>{user.name}</h2>
                                                        <p className='text-xs'><span>ID: </span>{user.id}</p>
                                                        <p className='text-sm'>{user.email}</p>
                                                        <p className='text-sm'>{user.phone1}</p>
                                                        <div className='container m-auto grid grid-cols-2 text-center mt-2'>
                                                            <p className='text-sm bg-slate-100 p-2 border-r border-r-slate-400'>{user.role}</p>
                                                            <p className='text-sm p-2 bg-slate-100'>{user.status}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ height: "80px" }}>
                                                    <div className='border-t border-t-slate-300 flex items-center justify-around text-center absolute bottom-0 bg-slate-100 w-full'
                                                        style={{ height: "80px" }}
                                                    >
                                                        <div >
                                                            <div className='text-2xl'>0</div>
                                                            <div className=''>Products</div>
                                                        </div>
                                                        <div>
                                                            <div className='text-2xl'>0</div>
                                                            <div className=''>Accounts</div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}

                                </div>
                                <hr className='mt-4 mb-4' />
                                <div className='flex justify-center'>
                                    <div>
                                        <div>
                                            Displaying {
                                                pagination_calc()
                                            } of {total}
                                        </div>
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

        </div>
    )
}
