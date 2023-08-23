'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { CheckCircleOutlined, ExclamationCircleOutlined, PhoneOutlined, WhatsAppOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Spin, Input, Form, Select, ConfigProvider, message, Space } from 'antd';
import Link from 'next/link';
import { get_user_from_session } from '@/utils/getUserData';

export default function VerifyInfo() {

  const router = useRouter();
  const pathname = usePathname();
  ///buyer/profile

  const [messageApi, contextHolder] = message.useMessage();

  const [page_loaded, setPageLoaded] = useState(false)
  const [user, setUser] = useState<User>({} as User);
  const [is_saving, setIsSaving] = useState(false)
  const [is_saved, setIsSaved] = useState(false)


  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Please complete the registration with your Phone and WhatsApp numbers',
    });
  };


  const save_data = async () => {

    setIsSaving(true)
    setIsSaved(false);

    const form_data = new FormData();
    form_data.set("user_id", user.id)
    form_data.set("name", user.name)
    form_data.set("phone1", user.phone1)
    form_data.set("phone2", user.phone2)

    const fetch_save = await fetch("/api/buyer/verify_info", {
      method: "POST",
      body: form_data
    })
    const response_save = await fetch_save.json();

    if (response_save.status === 200) {
      if (pathname === "/buyer/profile") {

        setIsSaved(true);
        setIsSaving(false)
      } else {
        router.push("/")
      }
    }
  }

  const onFinish = async (values: any) => {
    const result: any = await save_data()

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    warning()
    const getUser = async () => {
      const get_user = await get_user_from_session();
      if (get_user === null) {
        router.push("/signin")
        setPageLoaded(true)

      }
      setUser(get_user)
      // setUserName(get_user.name)
      // setUser(user)
      setPageLoaded(true)
    }
    getUser()



  }, [])

  return (
    <div className='' style={{ width: "100%" }}>
      {contextHolder}

      <div style={{ height: `${pathname === "/buyer/profile" ? "60px" : "90px"}` }} className='bg-slate-700 flex items-center'>
        <div className={`w-full  ${pathname === "/buyer/profile" ? "" : "pl-5 text-2xl "}`}>
          {pathname === "/buyer/profile" ?
            <div style={{ paddingLeft: "45px" }}>
              Verify Contact Details
            </div>
            : <div className=''>
              Verify Contact Details
            </div>
          }
        </div>
      </div>
      <div className='text-black bg-white p-0 sm:p-5 pb-5' style={{ minHeight: "400px" }}>
        <section>
          {page_loaded ?

            <div >
              <div >
                {user?.id === undefined ? <div>

                  user not found
                </div> : <div className='flex'  >
                  {pathname === "/buyer/profile" ? "" :
                    <div className='w-96 hidden md:block'>
                      <img src='/images/g1-garlic-for-sale.jpg' />
                    </div>
                  }
                  <div className='m-3 md:ml-5'>
                    <div className='mb-5 '>
                      <div className='text-2xl '>
                        Welcome {user?.name}
                      </div>
                      <div className='text-xs'>
                        {user?.email}
                      </div>
                    </div>
                    {(user?.phone1 === null || user?.phone2 === null || user?.phone1 === undefined || user?.phone2 === undefined || user?.phone1 === "" || user?.phone2 === "") ?
                      <div className='mb-5 flex items-center'>
                        <div className='text-3xl pr-3 text-red-500'>
                          <ExclamationCircleOutlined />
                        </div>
                        <div className='text-sm'>
                          Please complete the registration with your <strong className=''>Phone</strong> and <strong className=''>WhatsApp</strong> numbers
                        </div>
                      </div>
                      :
                      ""}
                    <div className=''>
                      <Form
                        name="basic"
                        style={{ maxWidth: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <div className='w-72 sm:w-80 md:w-96  '>
                          <div className=' mb-10'>
                            <div>
                              <div className='text-md lg:text-lg'>Your Name</div>
                            </div>
                            <Form.Item
                              name="name"
                              initialValue={user.name}
                              rules={[{ required: true, message: 'Your full name is required' }]}
                            >
                              <div className=''>
                                <Input size="large"
                                  style={{ width: "100%" }}
                                  placeholder='Your full name'
                                  type='text'
                                  value={user.name}
                                  onChange={(e) => { setUser(user => { return { ...user, name: e.target.value } }) }}
                                  prefix={<UserOutlined />}
                                />
                              </div>
                            </Form.Item>
                          </div>
                          <div className=' mb-10'>
                            <div>
                              <div className='text-md lg:text-lg'>Your phone number for direct calls</div>
                              <div className='text-sm text-green-600'>Example: +923341231234</div>
                            </div>
                            <Form.Item
                              name="phone1"
                              initialValue={user.phone1}
                              rules={[{ required: true, message: 'Phone number is required' }, {
                                pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im,
                                message: 'Type 10 digit phone number',
                              }]}
                            >
                              <div className=''>
                                <Input size="large"
                                  style={{ width: "100%" }}
                                  placeholder='+923341231234'
                                  type='text'
                                  value={user.phone1}
                                  onChange={(e) => { setUser(user => { return { ...user, phone1: e.target.value } }) }}
                                  prefix={<PhoneOutlined />}
                                />
                              </div>
                            </Form.Item>
                          </div>
                          <div className='mb-10'>
                            <div>
                              <div className='text-md lg:text-lg'>Your WhatsApp number for messages</div>
                              <div className='text-sm text-green-600'>Example: +923341231234</div>
                            </div>
                            <Form.Item
                              name="phone2"
                              initialValue={user.phone2}
                              rules={[{ required: true, message: 'WhatsApp number is required' }, {
                                pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im,
                                message: 'Type 10 digit WhatsApp number',
                              }]}
                            >
                              <div className=''>
                                <Input size="large"
                                  style={{ width: "100%" }}
                                  placeholder='+923341231234'
                                  type='text'
                                  value={user.phone2}
                                  onChange={(e) => { setUser(user => { return { ...user, phone2: e.target.value } }) }}
                                  prefix={<WhatsAppOutlined />}

                                />
                              </div>
                            </Form.Item>
                          </div>
                        </div>

                        <Form.Item >
                          <div className='flex'>
                            <Button type="primary" size='large' htmlType="submit" disabled={is_saving}>
                              <div className=''>
                                <div className=''>
                                  <span className='mr-2'>Save Contact Information</span>
                                  <CheckCircleOutlined className='text-lg' />
                                </div>
                              </div>
                            </Button>
                            <div>
                              {is_saving ?
                                <div className='flex items-center ml-3 mt-3'>
                                  <Spin />
                                  <div className='ml-2'>
                                    Please wait...
                                  </div>
                                </div>
                                :
                                is_saved ?
                                  <div className='flex items-center ml-3 mt-2'>
                                    <div className='text-lg text-green-600'>
                                      <CheckCircleOutlined />
                                    </div>
                                    <span className='ml-2'>
                                      Contact information is saved!
                                    </span>
                                  </div> : ""
                              }
                            </div>
                          </div>
                        </Form.Item>
                      </Form>

                    </div>
                  </div>
                </div>
                }
              </div>
            </div>

            :
            <div className='flex'>
              <div>
                <Spin />
              </div>
              <div className='ml-2'>loading...</div>
            </div>
          }
        </section>

      </div >

    </div >
  )
}



