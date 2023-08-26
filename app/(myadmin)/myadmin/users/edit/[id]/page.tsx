'use client'
import React, { useEffect, useState } from 'react'
import { ShoppingCartOutlined } from "@ant-design/icons"
import { redirect, useParams } from 'next/navigation'
import type { DatePickerProps } from 'antd';
import { Button, Checkbox, Form, Input, Spin, Select, Space, DatePicker } from 'antd';
import dayjs from 'dayjs';
import TopMessage from '@/app/components/alerts/top_message/page';
import { useRouter } from 'next/navigation';


export default function EditPage() {
    const router = useRouter();

    const params = useParams();
    const [page_loaded, setPageLoaded] = useState(false)
    const [user, setUser] = useState<User>({} as User)


    const dateFormat = 'YYYY-MM-DD';
    const post_dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    const onDateChangeExpiryDate: DatePickerProps['onChange'] = (date, dateString) => {

        if (dateString !== "") {
            setUser(usr => {
                return { ...usr, expiryDate: dayjs(dateString).toISOString() as any }
            })
        }

    };

    const onDateChangeCreatedAt: DatePickerProps['onChange'] = (date, dateString) => {
        setUser(usr => {
            return { ...usr, createdAt: dayjs(dateString).toISOString() as any }
        })

    };

    const onFinish = async (values: any) => {
        const form_data = new FormData();
        form_data.set("user", JSON.stringify(user));
        const find_user = await fetch("/api/myadmin/users/find_user/update", {
            method: "POST",
            body: form_data,
            next: { revalidate: 300 }
        })
        const result = await find_user.json();
        if (result.status === 200) {
            router.push("/myadmin/users?msg=updated_user");
            // redirect("/myadmin/users")
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleSelectChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    useEffect(() => {
        const { id } = params;
        if (id) {
            const form_data = new FormData()
            form_data.set("id", id as string)
            const user_function = async () => {
                const find_user = await fetch("/api/myadmin/users/find_user", {
                    method: "post",
                    body: form_data,
                    next: { revalidate: 1 },
                    cache: "no-cache"
                })
                const user_data = await find_user.json();
                if (user_data.status === 200) {
                    setUser(user_data.data as User)
                }
                setPageLoaded(true)
            }
            user_function()
        }
    }, [])
    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

                <div style={{ paddingLeft: "45px" }}>
                    Edit User
                </div>
            </div>
            <div className='text-black  p-5 '>
                <section>

                    {
                        page_loaded
                            ?
                            <div>
                                {user?.id !== undefined ?
                                    <div>
                                        <TopMessage params={{ msg: `Editing user: ${user?.name}`, msg_type: "warning" }} />
                                        <Form
                                            name="basic"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                            style={{ maxWidth: 600 }}
                                            initialValues={{ remember: true }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >

                                            <div>
                                                <button onClick={() => {
                                                    setUser(usr => {
                                                        return { ...usr, createdAt: new Date("2020/3/12") as any }
                                                    })
                                                }}>change date</button>
                                            </div>

                                            <Form.Item
                                                label="Name"
                                                name="name"
                                                initialValue={user?.name}
                                                rules={[{ required: true, message: 'Please type your name!' }]}
                                            >
                                                <Input value={user?.name} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, name: e.target.value }
                                                    })
                                                }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                initialValue={user?.email}
                                                rules={[{ required: true, message: 'Please type your email!' }]}
                                            >
                                                <Input value={user?.email} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, email: e.target.value }
                                                    })
                                                }} />
                                            </Form.Item>
                                            <Form.Item
                                                name="User Role"
                                                label="role"
                                                initialValue={user?.role}
                                                rules={[{ required: true }]}>
                                                <Select
                                                    placeholder="Select User Role"
                                                    onChange={(e) => {
                                                        setUser(usr => {
                                                            return { ...usr, role: e }
                                                        })
                                                    }}
                                                    allowClear
                                                    options={[
                                                        { value: 'BUYER', label: 'BUYER' },
                                                        { value: 'SELLER', label: 'SELLER' },
                                                        { value: 'ADMIN', label: 'ADMIN' },
                                                    ]}
                                                >
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                label="Date Expiry"
                                                name="expiryDate"
                                                initialValue={user?.expiryDate ? dayjs(user?.expiryDate) : ''}

                                            // rules={[{ required: true, message: 'Please type total cities to allow!' }]}
                                            >
                                                <DatePicker onChange={onDateChangeExpiryDate}
                                                    format={dateFormat} />
                                            </Form.Item>


                                            <Form.Item
                                                name="City Selection Limit"
                                                label="cityLimits"
                                                initialValue={user?.cityLimits}
                                                rules={[{ required: true }]}>
                                                <Select
                                                    placeholder="City Selection Limit"
                                                    onChange={(e) => {
                                                        setUser(usr => {
                                                            return { ...usr, cityLimits: e }
                                                        })
                                                    }}
                                                    allowClear
                                                    options={[
                                                        { value: 'LIMITED', label: 'LIMITED' },
                                                        { value: 'UNLIMITED', label: 'UNLIMITED' },

                                                    ]}
                                                >
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Number of Allowed Cities"
                                                name="numberOfAllowedCities"
                                                initialValue={user?.numberOfAllowedCities}
                                                rules={[{ required: true, message: 'Please type total cities to allow!' }]}
                                            >
                                                <Input value={user?.numberOfAllowedCities} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, numberOfAllowedCities: parseInt(e.target.value) }
                                                    })
                                                }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Number of Allowed Ads"
                                                name="numberOfAllowedAds"
                                                initialValue={user?.numberOfAllowedAds}
                                                rules={[{ required: true, message: 'Please type total ads to allow!' }]}
                                            >
                                                <Input value={user?.numberOfAllowedAds} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, numberOfAllowedAds: parseInt(e.target.value) }
                                                    })
                                                }} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                initialValue={user?.password}
                                            // rules={[{ required: true, message: 'Please type your password!' }]}
                                            >
                                                <Input value={user?.password} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, password: e.target.value }
                                                    })
                                                }} />
                                            </Form.Item>




                                            <Form.Item
                                                label="Phone 1"
                                                name="phone1"
                                                initialValue={user?.phone1}
                                            // rules={[{ required: true, message: 'Please type your phone # 1!' }]}
                                            >
                                                <Input value={user?.phone1} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, phone1: e.target.value }
                                                    })
                                                }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Phone 2"
                                                name="phone2"
                                                initialValue={user?.phone2}
                                            // rules={[{ required: true, message: 'Please type your phone # 2!' }]}
                                            >
                                                <Input value={user?.phone2} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, phone2: e.target.value }
                                                    })
                                                }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Phone 3"
                                                name="phone3"
                                                initialValue={user?.phone3}
                                            // rules={[{ required: true, message: 'Please type your phone # 3!' }]}
                                            >
                                                <Input value={user?.phone3} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, phone3: e.target.value }
                                                    })
                                                }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Address"
                                                name="address"
                                                initialValue={user?.address}
                                            // rules={[{ required: true, message: 'Please type your address!' }]}
                                            >
                                                <Input value={user?.address} onChange={(e) => {
                                                    setUser((usr) => {
                                                        return { ...usr, address: e.target.value }
                                                    })
                                                }} />
                                            </Form.Item>
                                            <hr />
                                            <div>
                                                <Form.Item
                                                    label="Picture"
                                                    name="image"
                                                    initialValue={user?.image}
                                                // rules={[{ required: true, message: 'Please type your address!' }]}
                                                >
                                                    <div>
                                                        <Input value={user?.image} onChange={(e) => {
                                                            setUser((usr) => {
                                                                return { ...usr, image: e.target.value }
                                                            })
                                                        }} />
                                                        <img src={`${user?.image}`} />
                                                    </div>
                                                </Form.Item>


                                            </div>
                                            <hr />


                                            <Form.Item
                                                label="Date Created"
                                                name="createdAt"
                                                initialValue={dayjs(user?.createdAt ? user?.createdAt : '')}
                                                rules={[{ required: true, message: 'Please type total cities to allow!' }]}
                                            >
                                                <DatePicker disabled onChange={onDateChangeCreatedAt}
                                                    // defaultValue={dayjs(user?.createdAt)}
                                                    format={dateFormat} />
                                            </Form.Item>

                                            <Form.Item
                                                name="Enabled"
                                                wrapperCol={{ offset: 8, span: 16 }}
                                            >
                                                <Checkbox checked={user?.enabled}>Account Enabled</Checkbox>
                                            </Form.Item>


                                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                <Button type="primary" htmlType="submit">
                                                    Update User
                                                </Button>
                                            </Form.Item>
                                        </Form>

                                    </div>
                                    :
                                    <div>
                                        No User Found
                                        <TopMessage params={{ msg: "User Not Found!", msg_type: "error" }} />
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <Spin /> <span className='ml-2'>Loading</span>
                            </div>
                    }
                </section>
            </div >
        </div >
    )
}
