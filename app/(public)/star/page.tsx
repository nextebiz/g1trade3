'use client'
import React, { useState } from 'react'

export default function RStar() {


    return (
        <div
            className='h-96 bg-white text-black p-8'
        >
            <div>
                RStar
            </div>

            <hr />
            <button onClick={async () => {
                console.log('sending email')
            }}>Send Email</button>
            <br />

        </div>
    )
}
