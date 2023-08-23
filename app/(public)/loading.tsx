import React from 'react'
import { Spin } from 'antd';

export default function loading() {
    return (
        <div className=' w-full  p-10 flex justify-center items-center' >
            <Spin size='large' />
            <div className='ml-4 text-lg'>Loading...</div>
        </div>
    )
}
