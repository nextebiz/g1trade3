'use client'
import Link from 'next/link'
import React, { createContext, useEffect, useState } from 'react'
import { MenuOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons"
import LeftPanel from './left_panel/page'
import { Button, ConfigProvider, Drawer } from 'antd'

interface Props {
    children: React.ReactNode
}
export default function SellerDashboard({ children }: Props) {
    const openLeftPanelWidth = "230px"
    const closeLeftPanelWidth = "55px"
    const [leftPanelWidth, setLeftPanelWidth] = useState(openLeftPanelWidth)
    const [showLeftPanel, setShowLeftPanel] = useState(true)
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };



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
        <div className='bg-white'>
            <div className='flex w-full clear-both'>
                <div
                    className='bg-slate-800 transition-all relative hidden sm:block'
                    style={{ width: leftPanelWidth}}>
                    <LeftPanel params={{ showLeftPanel, openLeftPanel, onClose }} />
                    <Link
                        className='pl-4 pr-4 absolute top-0 hover:text-green-500 transition-all '
                        style={{ right: "-50px", marginTop: "17px" }}
                        onClick={() => { setShowLeftPanel(!showLeftPanel) }}
                        href={"#"}
                    >
                        {showLeftPanel ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
                    </Link>
                </div>
                <div className='text-black absolute block sm:hidden'>
                    <div onClick={() => {
                        setShowLeftPanel(true)
                        showDrawer()
                    }} className=' flex items-center justify-center text-white' style={{ height: "60px", width: "40px" }}>
                        <MenuOutlined />
                    </div>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBgBase: "#1e293b",
                                colorText: "#ffffff",
                                colorLink: "#ffffff",
                                colorIcon: "FF00FF",
                            },
                        }}
                    >
                        <Drawer
                            title="Close Menu"
                            placement="left"
                            width={300}

                            onClose={onClose}
                            open={open}>

                            <LeftPanel params={{ showLeftPanel, openLeftPanel, onClose }} />


                        </Drawer>
                    </ConfigProvider>

                </div>
                <div className='flex-1 body-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}
