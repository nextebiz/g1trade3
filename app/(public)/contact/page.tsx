'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { MailOutlined, CheckCircleOutlined, UploadOutlined, LoginOutlined } from "@ant-design/icons"
import {
    Button,
    Form,
    Input,
    Select,
    Spin,
    message
} from 'antd';
import { get_user_from_session } from '@/utils/getUserData';

const { TextArea } = Input;

export default function Contact() {

    const router = useRouter();

    const [page_loaded, setPageLoaded] = useState(false)
    const [user, setUser] = useState<User>({} as User)
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [is_saving, setIsSaving] = useState(false)
    const [is_saved, setIsSaved] = useState(false)
    const [department, setDepartment] = useState("SALES")
    const [message_text, setMessageText] = useState("")


    const onFinish = async (values: any) => {
        setIsSaving(true)
        const form_data = new FormData();
        form_data.set("user_id", user?.id)
        form_data.set("department", department)
        form_data.set("message", message_text)

        const fetch_send_message = await fetch("/api/public/contact", { 
            method: "POST", 
            body: form_data,
            next: { revalidate: 60 } 
        })
        const response_message = await fetch_send_message.json();
        console.log(response_message)
        setIsSaving(false)
        setIsSaved(true)


    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        // error()
        // window.scrollTo(0, 0);
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Please Fill All Required Fields!',
        });
    };

    useEffect(() => {

        const getData = async () => {
            const get_user = await get_user_from_session();
            if (get_user?.phone1 === null || get_user?.phone2 === null) {
                router.push("/signin/verify_info")
                return;
            }
            setUser(get_user)
            // console.log(get_user)
            setPageLoaded(true)
        }
        getData()
    }, [])

    return (

        <div className='text-black bg-white p-3 sm:p-5 pb-5 body-content ' >
            {contextHolder}

            <div className='flex flex-wrap bg-green-200'>
                <div className='bg-slate-200 md:flex-1 md:p-5' >
                    <img src='/images/g1-garlic-for-sale.jpg' />
                </div>
                <div className='bg-slate-100 flex-1 md:flex-1 pt-5 md:pt-5 md:p-5'>

                    <div className='text-xl mb-8'>
                        Contact Sales & Support
                    </div>
                    <div className='mb-3'>
                        Sales: <a className='text-blue-500' href='tel:03361633321'>0336-1633321</a>
                    </div>
                    <div className='flex mb-3'>
                        <div>
                            WhatsApp Support:
                        </div>
                        <div>
                            <Link
                                target='_blank'
                                href={`//api.whatsapp.com/send?phone=+923361633321&text=${'I have a question from G1Trade.com'}`}
                            >
                                <div className='cursor-pointer  text-blue-500 text-left transition-all' >
                                    <div className='text-center'>+92-336-1633321</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div >
                        Email: g1trade.com[@]gmail.com
                    </div>
                    <div className='py-5'>
                        <hr />
                    </div>
                    <div className='text-xl mb-4'>
                        Contact Sales & Support
                    </div>
                    <div className='mb-5'>
                        Fill in the form. Our team will contact you shortly.
                    </div>

                    {page_loaded ?
                        <div>
                            <div>
                                <Form
                                    name="basic"
                                    disabled={user?.id === undefined}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"

                                >

                                    <div>Your Full Name</div>
                                    <Form.Item
                                        rules={[{ required: true, message: 'Name is required' }]}
                                    >
                                        <Input
                                            disabled={user?.id === undefined ? true : user?.name !== undefined ? true : false}
                                            placeholder='Your name is required'
                                            type='text'
                                            value={user?.name}
                                        />
                                    </Form.Item>
                                    <div>Your Phone Number</div>
                                    <Form.Item
                                        rules={[{ required: true, message: 'Phone is required' }]}
                                    >
                                        <Input
                                            disabled={user?.id === undefined ? true : user?.phone1 !== undefined ? true : false}

                                            placeholder='Your phone is required'
                                            type='text'
                                            value={user?.phone1}
                                        />
                                    </Form.Item>
                                    <div>Your WhatsApp Number</div>
                                    <Form.Item
                                        rules={[{ required: true, message: 'WhatsApp is required' }]}
                                    >
                                        <Input
                                            disabled={user?.id === undefined ? true : user?.phone2 !== undefined ? true : false}
                                            placeholder='Your WhatsApp is required'
                                            type='text'
                                            value={user?.phone2}
                                        />
                                    </Form.Item>
                                    <div>Department</div>
                                    <Form.Item
                                        name="department"
                                        rules={[{ required: true, message: 'Select a department' }]}
                                    >
                                        <Select placeholder="Select a department" onChange={(e) => {
                                            setDepartment(e)
                                        }}>
                                            <Select.Option value="Sales">Sales</Select.Option>
                                            <Select.Option value="Support">Support</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <div>Your Message</div>
                                    <Form.Item
                                        name="message"
                                        rules={[{ required: true, message: 'Message is require' }]}
                                    >
                                        <TextArea showCount maxLength={250} rows={4} onChange={(e) => {
                                            setMessageText(e.target.value)
                                        }} />
                                    </Form.Item>

                                    <div className='flex'>
                                        <div className='flex'>
                                            <Form.Item >
                                                <Button
                                                    type="primary"
                                                    size='large'
                                                    htmlType="submit"
                                                    disabled={user?.id === undefined ? true : is_saved ? true : false}

                                                // disabled={is_saving}
                                                >
                                                    <div
                                                        className={`flex items-center justify-center ${user?.id === undefined || is_saving || is_saved ? "opacity-40" : ""}`}>
                                                        <div className=''>
                                                            <span className='mr-2'>Send Message to G1 Trade Team</span>
                                                            <MailOutlined className='text-lg' />
                                                        </div>
                                                    </div>
                                                </Button>

                                            </Form.Item>
                                            {is_saving ?
                                                <div className='ml-5 mt-2'>
                                                    <Spin />
                                                    <span className='ml-2'>Sending...</span>
                                                </div>
                                                : ""}
                                            {is_saved ?
                                                <div className='ml-5 flex items-center mb-6'>
                                                    <div className='text-lg text-green-600'>
                                                        <CheckCircleOutlined />
                                                    </div>
                                                    <span className='ml-2'>Message Sent</span>
                                                </div>
                                                : ""}
                                        </div>

                                        {/* {is_saving === true ? <div className='mt-1 ml-3'>
                                            <Spin /> <span className='text-xs ml-2'> Please wait...</span>
                                        </div>
                                            : ""
                                        } */}
                                    </div>
                                </Form>
                            </div>

                            {user?.id === undefined ?
                                <div>
                                    <div className='pb-5'>
                                        <hr />
                                    </div>
                                    <Link href={'/signin'}>
                                        <div className='text-blue-500 flex items-center'>
                                            <div className='text-lg'>
                                                <LoginOutlined />
                                            </div>
                                            <span className='ml-2'>Sign in to Send Message</span>
                                        </div>
                                    </Link>
                                </div>
                                : ""}
                        </div>
                        :
                        <div className='flex'>
                            <div>
                                <Spin />
                            </div>
                            <div className='ml-2'>loading contact form...</div>
                        </div>
                    }


                </div>
            </div>


        </div >
    )
}



