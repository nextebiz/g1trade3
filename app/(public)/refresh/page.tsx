'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spin } from 'antd';

export default function RefreshPage() {
    const router = useRouter();
    useEffect(() => {
        router.push("/")
    }, [])
    return (
        <div className='body-content bg-white text-black' >

            <div className='p-2'>
                <Spin />
                <span className='ml-2'>Loading...</span>
            </div>
        </div>
    )
}
