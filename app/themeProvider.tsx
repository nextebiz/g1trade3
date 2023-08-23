'use client'
import React from 'react'
import { useState } from "react";
import { ConfigProvider, theme, Button, Card } from "antd";
interface Props {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <>

            <ConfigProvider
                theme={{
                    // algorithm: darkAlgorithm,
                    token: {
                        // colorPrimary: '#00b96b',
                        // colorBgBase: "#334d01",
                        // colorLink: "#f3ff0a",
                        // colorText: "#333333",
                    }
                }}>
                {children}

            </ConfigProvider>
        </>
    )
}
