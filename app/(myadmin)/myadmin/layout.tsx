'use client'
import Link from 'next/link'
import React, { createContext, useEffect, useState } from 'react'
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons"
import LeftPanel from './left_panel/page'
interface Props {
    children: React.ReactNode
}
export default function AdminDashboard({ children }: Props) {
    const openLeftPanelWidth = "230px"
    const closeLeftPanelWidth = "55px"
    const [leftPanelWidth, setLeftPanelWidth] = useState(openLeftPanelWidth)
    const [showLeftPanel, setShowLeftPanel] = useState(true)

    const openLeftPanel = () => {
        setShowLeftPanel(true)
    }
    useEffect(() => {
        showLeftPanel ? setLeftPanelWidth(openLeftPanelWidth) : setLeftPanelWidth(closeLeftPanelWidth)

    }, [
        showLeftPanel
    ])
    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowLeftPanel(false)
    //     }, 3000)
    // }, [])
    return (
        <div className='  bg-white'>
            <div className='flex w-full clear-both'>
                <div
                    className='bg-slate-800 transition-all relative' 
                    style={{ width: leftPanelWidth , minHeight: "500px" }}>
                    <LeftPanel params={{ showLeftPanel, openLeftPanel }} />
                    <Link
                        className='pl-4 pr-4 absolute top-0'
                        style={{ right: "-50px", marginTop: "17px" }}
                        onClick={() => {
                            setShowLeftPanel(!showLeftPanel)
                        }}
                        href={"#"}
                    >
                        {showLeftPanel ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
                    </Link>
                </div>
                <div className='flex-1' style={{ minHeight: "400px" }}>
                    {children}
                </div>
            </div>
        </div>
    )
}
