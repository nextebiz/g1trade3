'use client'
import React, { useEffect, useState } from 'react'
// import { ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { ExclamationCircleOutlined, CheckOutlined, CloseCircleOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, SelectProps, Spin, Switch, message, Space } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function UploadNewProduct() {

  const router = useRouter();
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();


  const [user, setUser] = useState<User>({} as User)
  const [ads_count, setAdsCount] = useState(0)

  const [product_title, setProductTitle] = useState("-")
  const [page_loaded, setPageLoaded] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selected_category, setSelectedCategory] = useState("")
  const [provinces, setProvinces] = useState<Province[]>([])
  const [selected_province, setSelectedProvince] = useState<Province>()
  const [cities, setCities] = useState<Province>()
  const [city, setCity] = useState<City>()
  const [allowedCityCount, setAllowedCityCount] = useState(2)
  const [cityOptions, setCityOptions] = useState<SelectProps[]>([])
  const [selected_city_options, setSelectedCityOptions] = useState<City[]>([]);
  const [weight_of_item, setWeightOfItem] = useState(0)
  const [selected_weight_unit, setSelectedWeightUnit] = useState("")

  const [price_of_item, setPriceOfItem] = useState(0)
  const [selected_price_unit, setSelectedPriceUnit] = useState("")
  const [description, setDescription] = useState("")
  const [receive_offers, setReceiveOffers] = useState(false)
  const [is_saving, setIsSaving] = useState(false)
  const [weight_units, setWeightUnits] = useState([
    "KILOGRAM",
    "MAUND",
    "TONNE",
  ])


  const onFinish = async (values: any) => {
    setIsSaving(true)
    const formData = new FormData();
    formData.set("title", product_title)
    formData.set("categoryId", selected_category)
    formData.set("weight", weight_of_item.toString())
    formData.set("weightUnit", selected_weight_unit)

    formData.set("price", price_of_item.toString())
    formData.set("priceUnit", selected_price_unit)
    formData.set("receiveOffers", receive_offers.toString())
    formData.set("description", description)

    formData.set("cities[]", JSON.stringify(selected_city_options))

    const create_product = await fetch("/api/seller/products/create", {
      method: "post",
      body: formData,
      next: { revalidate: 300 }
    })
    const result = await create_product.json()

    if (result.status == 200) {
      const product_id = result.data.id;
      const redurect_url = `/seller/add_product/upload_images/${product_id}`
      router.replace(redurect_url)

    }

  };
  const handleChange = (e: any) => { }
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  };
  const onOfferChange = (checked: boolean) => {
    setReceiveOffers(checked)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    error()
    window.scrollTo(0, 0);
  };

  const onSubmit = () => {

  }


  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Please Fill All Required Fields!',
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };

  useEffect(() => {
    let tmp_user_id = ""

    const getSellerInfo = async (user_id: string) => {
      const form_data = new FormData()
      form_data.set("user_id", user_id)
      const get_seller_info = await fetch("/api/seller/dashboard/basic_info", {
        method: "POST",
        body: form_data,
        next: { revalidate: 300 } 
        
      })
      const response_seller_info = await get_seller_info.json()
      if (response_seller_info) {
        setAdsCount(response_seller_info.data.product_count)
      }
      console.log(response_seller_info)
      setPageLoaded(true)
    }

    const get_session = async () => {
      const fetch_session = await fetch("/api/auth/session")
      const my_session = await fetch_session.json()
      if (my_session?.user) {
        const form_data = new FormData();
        form_data.set("id", my_session?.user.id);
        const fetch_user = await fetch("/api/myadmin/users/find_user", {
          method: "POST",
          body: form_data,
          next: { revalidate: 300 }

        })
        const user_response = await fetch_user.json();
        if (user_response) {
          setUser(user_response.data)
          tmp_user_id = user_response.data.id
          get_cats()
          get_provinces()
        }
      }
    }

    const get_cats = async () => {
      const fetch_cats = await fetch("/api/public/categories")
      const cats = await fetch_cats.json()
      setCategories(cats.data)
    }
    const get_provinces = async () => {
      const fetch_provinces = await fetch("/api/public/provinces", {
        method: "POST",
        next: { revalidate: 300 }
      });
      const my_provinces = await fetch_provinces.json()
      setProvinces(my_provinces.data)

      getSellerInfo(tmp_user_id)



    }
    get_session()

  }, [])

  return (
    <div className='' style={{ width: "100%" }}>
      {contextHolder}
      <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

        <div style={{ paddingLeft: "45px" }}>
          Upload New Product
        </div>

      </div>
      <div className='text-black py-6 pl-3 pr-3 sm:pl-8  '>
        <section className='mb-10 '>
          <h1 className='text-2xl'>Upload New Product</h1>

          {page_loaded ?
            ads_count>= user?.numberOfAllowedAds  ?

              <div className='mt-5'>
                <div className='text-red-500'>
                  <span className='mr-2'>
                    <ExclamationCircleOutlined />
                  </span>
                  <span>
                    Your ads quota is full
                  </span>
                </div>
                <div>{user?.numberOfAllowedAds} of {ads_count} allowed ads are live</div>
                <div className='mt-5'>
                  <Link target='_blank' href={"/contact"}>
                    <span className='text-blue-500'>Contact Us</span>
                  </Link> to upgrade your account
                </div>
              </div>

              :
              <div className='mt-8  ' style={{ width: "100%" }} >
                <Form
                  name="basic"
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: "100%" }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >

                  <div>Product Title</div>
                  <Form.Item
                    name="product_title"
                    rules={[{ required: true, message: 'Product Title is required' }]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      placeholder='Type Title of Your Product'
                      type='text'
                      value={product_title}
                      onChange={(e) => { setProductTitle(e.target.value) }}
                    />
                  </Form.Item>

                  <div>
                    Select Product Category
                  </div>
                  <Form.Item
                    name="categories"
                    rules={[{ required: true, message: 'Select a Category' }]}
                  >
                    <Select
                      placeholder='Product Category'
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setSelectedCategory(e as string)
                      }}
                    >
                      {categories.map(cat => {
                        return (
                          <Select.Option key={cat.id} value={`${cat.id}`}>{cat.name}</Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>

                  <div>Province</div>
                  <Form.Item
                    name="provinces"
                    rules={[{ required: true, message: 'Select a Province' }]}
                  >
                    <Select
                      placeholder='Select Provice When You Want To Sell'

                      onChange={e => {
                        const find_province = provinces.find(province => {
                          return e === province.id
                        })
                        if (find_province) {
                          let city_options: SelectProps[] = []
                          find_province.city.map(mycity => {
                            const city_option = {
                              label: mycity?.name,
                              value: mycity?.id
                            }
                            city_options.push(city_option)
                          })
                          setCityOptions(city_options)
                        }
                        setSelectedProvince(find_province)
                      }}
                    >

                      {provinces.map(province => {
                        return (
                          <Select.Option key={province.id} value={`${province.id}`}>{province.name}</Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>


                  {selected_province ?
                    <div>
                      <div>City</div>
                      <Form.Item
                        name="cities"
                        rules={[{ required: true, message: 'Select a Cities' }]}
                      >
                        <Select
                          allowClear
                          disabled={
                            user.cityLimits === "UNLIMITED" ? false :
                              selected_city_options.length >= user.numberOfAllowedCities
                          }

                          style={{ width: '100%' }}
                          placeholder="Select City Where You Want to Sell"
                          onChange={(e) => {
                            const find_city = selected_province?.city.find(city => city.id == e)
                            setSelectedCityOptions(cities => ([...cities, find_city as City]))
                          }}
                          onDeselect={(e) => {
                          }}
                        >

                          {selected_province?.city.map(mycity => {
                            return (
                              <Select.Option
                                key={mycity.id}
                                value={mycity.id} >
                                {mycity.name}
                              </Select.Option>
                            )
                          })}

                        </Select>
                      </Form.Item>

                      <div>
                        <div className='mt-2 mb-2 text-lg'>
                          You have selected: {selected_city_options.length}/{user.numberOfAllowedCities} cities
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1'>
                          {selected_city_options.map(city => {
                            return (
                              <div key={city.id} className='border border-green-500 mb-2 p-2 pl-4 pr-4 rounded-full mr-2 flex justify-around items-center '>
                                <CheckOutlined />
                                <span className='ml-2 mr-2'>{city.name}</span>
                                <span onClick={() => {
                                  const selected_cities = selected_city_options.filter(selected_city => (selected_city.id != city.id));
                                  setSelectedCityOptions(selected_cities)
                                }} className='text-xl text-green-500 hover:text-red-500 transition-all  '>
                                  <CloseCircleOutlined />
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                    </div>
                    : ""}

                  <h2>Price per unit</h2>
                  <div className='flex justify-between flex-col md:flex-row  border px-5 py-2 mb-6' style={{ maxWidth: "350px" }}>

                    <div className='flex-1 mr-3'>
                      <div>Price</div>
                      <Form.Item

                        name="price_of_item"
                        rules={[{ required: true, message: 'Total Price of items' }]}
                      >
                        <Input
                          placeholder='Price of Items'
                          style={{ width: "150px" }}
                          type='number'
                          value={price_of_item}
                          min={0}
                          onChange={(e) => { setPriceOfItem(parseInt(e.target.value as string)) }}
                        />
                      </Form.Item>
                    </div>
                    <div className='flex-1'>

                      <div>Price Units</div>
                      <Form.Item
                        name="priceUnits"
                        rules={[{ required: true, message: 'Select Price Units' }]}
                      >
                        <Select
                          placeholder='Price Unit'

                          style={{ width: "150px" }}
                          onChange={e => {
                            setSelectedPriceUnit(e)
                          }}
                        >
                          {weight_units.map(unit_str => {
                            return (
                              <Select.Option key={unit_str} value={`${unit_str}`}>{unit_str}</Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  <h2>Available Stock Weight</h2>
                  <div className='flex justify-between flex-col md:flex-row border px-5 py-2 mb-3' style={{ maxWidth: "350px" }}>
                    <div className='flex-1 mr-3'>
                      <div></div>
                      <div>Weight</div>
                      <Form.Item

                        name="weight_of_item"
                        rules={[{ required: true, message: 'Total Wegith of available items' }]}
                      >
                        <Input
                          placeholder='Total Stock'
                          style={{ width: "150px" }}
                          type='number'
                          value={weight_of_item}
                          min={0}
                          onChange={(e) => { setWeightOfItem(parseInt(e.target.value as string)) }}
                        />
                      </Form.Item>
                    </div>
                    <div className='flex-1'>

                      <div>Weight Units</div>
                      <Form.Item
                        name="weightUnits"
                        rules={[{ required: true, message: 'Select Weight Units' }]}
                      >
                        <Select
                          placeholder='Measure Unit'

                          style={{ width: "150px" }}
                          onChange={e => {
                            setSelectedWeightUnit(e)
                          }}
                        >
                          {weight_units.map(unit_str => {
                            return (
                              <Select.Option key={unit_str} value={`${unit_str}`}>{unit_str}</Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  {/* <Form.Item
              name="description"
            // rules={[{ required: true, message: 'Type product description' }]}
            >
              <div className='flex'>
                <Switch defaultChecked={false} onChange={onOfferChange} ></Switch>
                <span className='ml-2'>Receive Offers from Buyers</span>
              </div>
            </Form.Item> */}


                  <div>Product Description</div>
                  <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Product Description is required' }]}
                  >
                    <TextArea
                      showCount
                      maxLength={500}

                      style={{ height: 120, marginBottom: 24 }}
                      onChange={onDescriptionChange}
                      placeholder="Type description here"
                    />
                    {/* <Input
                style={{ width: "100%" }}
                placeholder='Type Title of Your Product'
                type='text'
                value={product_title}
                onChange={(e) => { setProductTitle(e.target.value) }}
              /> */}
                  </Form.Item>
                  <div className='flex'>
                    <Form.Item >
                      <Button type="primary" htmlType="submit" disabled={is_saving}>
                        <div className='flex items-center justify-center'>
                          <div className=''>
                            <span className='mr-2'>Save & Upload Pictures</span>
                            <UploadOutlined className='text-lg' />
                          </div>
                        </div>
                      </Button>
                    </Form.Item>
                    {is_saving === true ? <div className='mt-1 ml-3'>
                      <Spin /> <span className='text-xs ml-2'> Please wait...</span>
                    </div>
                      : ""
                    }
                  </div>
                </Form>
              </div>

            :
            <div className='flex  mt-5'>
              <Spin /> <span className='ml-2'>Loading</span>
            </div>
          }
        </section>
      </div>
    </div>
  )
}
