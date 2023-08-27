'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircleOutlined, PhoneOutlined, WhatsAppOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Spin, Input, Form, Select, ConfigProvider } from 'antd';
import Link from 'next/link';
import { get_user_from_session } from '@/utils/getUserData';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
export default function SellerProfile() {
  const router = useRouter();

  const [page_loaded, setPageLoaded] = useState(false)
  const [user, setUser] = useState<User>({} as User);
  const [is_saving, setIsSaving] = useState(false)
  const [is_saved, setIsSaved] = useState(false)

  // const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDraft, setIsDraft] = useState(true);
  const [isPublished, setIsPublished] = useState(false);

  const save_data = async () => {
    setIsSaving(true)
    const form_data = new FormData();
    form_data.set("user_id", user.id)
    form_data.set("name", user.name)
    form_data.set("phone1", user.phone1)
    form_data.set("phone2", user.phone2)
    form_data.set("description", content)

    const fetch_save = await fetch("/api/buyer/verify_info", {
      method: "POST",
      body: form_data,
      next: { revalidate: 300 }

    })
    const response_save = await fetch_save.json();
    if (response_save.status === 200) {
      // router.push("/")
      setIsSaving(false)
      setIsSaved(true)
    }
  }

  const onFinish = async (values: any) => {
    const result: any = await save_data()

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const getUser = async () => {
      const get_user = await get_user_from_session();
      if (get_user === null) {
        router.push("/signin")
        setPageLoaded(true)

      }
      setUser(get_user)

      const getProfile = async () => {
        const form_data = new FormData();
        form_data.set("user_id", get_user.id)

        const fetch_profile = await fetch("/api/seller/profile", {
          method: "POST",
          body: form_data,
          next: { revalidate: 300 }
        })
        const response_profile = await fetch_profile.json();

        if (response_profile.status === 200) {
          setContent(response_profile.data.description1)
        }
      }

      getProfile()

      setPageLoaded(true)
    }
    getUser()

  }, [])

  return (
    <div className='' style={{ width: "100%" }}>
      <div className='' style={{ width: "100%" }}>
        <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
          <div className='w-full  '>
            <div style={{ paddingLeft: "45px" }}>
              Verify Contact Details
            </div>
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

                    <div className='m-3 md:ml-5'>
                      <div className='mb-8 '>
                        <div className='text-2xl '>
                          Welcome {user?.name}
                        </div>
                        <div className='text-sm'>
                          {user?.email} <span className='px-2'>|</span>

                          <Link href={`/profile/${user.id}`} target='_blank'>
                            <span className='text-blue-500'>Preview Profile</span>
                          </Link>
                        </div>
                      </div>
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


                          <div className='mb-8' id="editor1">
                            <div className='text-xl'>Create Your Seller Profile</div>
                            <ReactQuill id='quill_editor' className='' style={{}} modules={modules} value={content} onChange={(e) => {
                              setContent(e)
                            }} />
                          </div>

                          {/* <div>
                            <p dangerouslySetInnerHTML={{ __html: content }}></p>
                          </div> */}

                          <div className='flex'>
                            <Form.Item >
                              <Button type="primary" size='large' htmlType="submit">
                                <div className=''>
                                  <div className=''>
                                    <span className='mr-2'>Save Profile</span>
                                    <CheckCircleOutlined className='text-lg' />
                                  </div>
                                </div>
                              </Button>
                            </Form.Item>
                            {is_saving ?

                              <div className='flex mt-3 ml-4'>
                                <Spin />
                                <div className='ml-2'>
                                  Saving data...
                                </div>
                              </div>
                              :
                              <div className='ml-5 mt-1 text-md'>
                                {is_saved ? <div className='flex items-center'>
                                  <div className='text-xl text-green-500'>
                                    <CheckCircleOutlined />
                                  </div>
                                  <div className='ml-2'>Profile is saved!</div>
                                </div> : ""}
                              </div>}
                          </div>
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
    </div>
  )
}




