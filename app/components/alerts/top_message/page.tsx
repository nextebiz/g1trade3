'use client'
import React, { useEffect } from 'react'
import { Button, message, Space } from 'antd';
import { NoticeType } from 'antd/es/message/interface';

interface Props {
    params: {
        msg_type: string,
        msg: string
    }
}
export default function TopMessage({ params: { msg_type, msg } }: Props) {
    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = (type: string, msg: string) => {
        // types : success, error, warning
        let mytype = type! as NoticeType;
        messageApi.open({
            type: mytype,
            content: msg,
        });
        return "x"
    };


    useEffect(() => {
        showMessage(msg_type, msg)
    }, [])
    return (
        <>
            {contextHolder}
        </>
    )
}
