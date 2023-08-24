'use client'
import React, { useEffect, useState } from 'react'
// import { ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { EyeOutlined, CheckOutlined, CloseCircleOutlined, RightOutlined, UploadOutlined, PictureOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, SelectProps, Spin, Switch } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Provider from '@/app/Provider';




export default function UpdateProduct() {

    const router = useRouter();
    const { TextArea } = Input;

    const [user, setUser] = useState<User>({} as User)
    const [page_loaded, setPageLoaded] = useState(false)
    const [product, setProduct] = useState<Product>({} as Product)

    // const [product_title, setProductTitle] = useState("-")

    const [categories, setCategories] = useState<Category[]>([])
    const [selected_category, setSelectedCategory] = useState("")
    const [provinces, setProvinces] = useState<Province[]>([])
    const [selected_province, setSelectedProvince] = useState<Province>()

    const [cityOptions, setCityOptions] = useState<SelectProps[]>([])
    const [selected_city_options, setSelectedCityOptions] = useState<City[]>([]);
    const [weight_of_item, setWeightOfItem] = useState(0)
    const [selected_weight_unit, setSelectedWeightUnit] = useState("")

    const [price_of_item, setPriceOfItem] = useState(0)
    const [selected_price_unit, setSelectedPriceUnit] = useState("")

    const [description, setDescription] = useState("")
    const [receive_offers, setReceiveOffers] = useState(false)

    const [ok_to_save, setOkToSave] = useState(false)

    const [weight_units, setWeightUnits] = useState([
        "KILOGRAM",
        "MAUND",
        "TONNE",
    ])
    const params = useParams()
    const { id } = params;

    // const findCities = (city_id: string, provinces: Province[]) => {

    // }

    const onFinish = async (values: any) => {
        const formData = new FormData();

        formData.set("product_id", product.id)
        formData.set("title", product.title)
        formData.set("categoryId", product.categoryId)
        formData.set("weight", product.weight.toString())
        formData.set("weightUnit", product.weightUnit.toString())
        formData.set("price", product.price.toString())
        formData.set("priceUnit", product.priceUnit.toString())
        formData.set("cities[]", JSON.stringify(selected_city_options))

        formData.set("receiveOffers", product.receiveOffers.toString())
        formData.set("description", product.description)

        const update_product = await fetch("/api/seller/products/update", { method: "post", body: formData })
        const result = await update_product.json()
        if (result.status == 200) {
            const product_id = result.data.id;
            const redurect_url = `/seller/manage_products`
            router.replace(redurect_url)
        }
        setOkToSave(true)


    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProduct(oldProduct => {
            return { ...oldProduct, description: e.target.value }
        })
    };
    const onOfferChange = (checked: boolean) => {
        setProduct(oldProduct => {
            return { ...oldProduct, receiveOffers: checked }
        })
    };


    useEffect(() => {
        const get_session = async () => {
            setSelectedCityOptions([])
            const fetch_session = await fetch("/api/auth/session")
            const my_session = await fetch_session.json()
            if (my_session?.user) {
                const form_data = new FormData();
                form_data.set("id", my_session?.user.id);
                const fetch_user = await fetch("/api/myadmin/users/find_user", {
                    method: "POST",
                    body: form_data
                })
                const user_response = await fetch_user.json();
                if (user_response) {
                    const my_user = user_response.data
                    setUser(user_response.data)
                    // get product
                    const form_data_product = new FormData();
                    form_data_product.set("product_id", id as string);
                    // compare user from product and session. if user id matches, its ok, othewise, signout
                    const fetch_product = await fetch("/api/seller/products/find_product", {
                        method: "POST",
                        body: form_data_product
                    })
                    const response_fetch_product = await fetch_product.json();
                    if (response_fetch_product.status === 404) {
                        setProduct({} as Product)
                    }
                    if (response_fetch_product.status === 200) {
                        const my_product: Product = response_fetch_product.data;
                        if (my_user.id === my_product.userId) {
                        } else {
                        }
                        setProduct(my_product)
                        // setSelectedProvince(my_product.productCity[0].provinceId)
                        // if(response_fetch_product.data)


                        const fetch_cats = await fetch("/api/public/categories")
                        const cats = await fetch_cats.json()
                        setCategories(cats.data)

                        const fetch_provinces = await fetch("/api/public/provinces", { 
                            method:"POST",
                            next: { revalidate: 10 } 
                        });
                        const response_provinces = await fetch_provinces.json()
                        const my_provinces: Province[] = response_provinces.data as Province[]
                        setProvinces(my_provinces)

                        if (my_product.productCity.length > 0) {
                            const find_province = my_provinces.find(my_province => {
                                return my_province.id === my_product.productCity[0].provinceId
                            })
                            // my_provinces.data.find(p => { })
                            setSelectedProvince(find_province)
                            // setSelectedCityOptions()
                        }

                        const find_cities = my_product.productCity.map((city) => {
                            const find_city = my_provinces.map(my_province => {
                                return my_province.city.map(city_in_province => {
                                    const cityFound: City = city_in_province as City;
                                    if (city_in_province.id === city.cityId) {
                                        // return (city_in_province)

                                        setSelectedCityOptions(oldCityData => {
                                            return ([...oldCityData, cityFound])
                                        })
                                    }
                                })
                            })
                        })


                        setPageLoaded(true)

                    }
                    // get_products(user_response.data.id)
                    setPageLoaded(true)
                }
            }
        }
        get_session()

    }, [])
    return (

        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
                <div style={{ paddingLeft: "45px" }}>
                    Update Product
                </div>
            </div>
            <div className='text-black  px-5 '>
                <section>
                    <div className='mt-5 flex items-center'>
                        <h1 className='text-2xl'>Edit Product</h1>
                        {product?.id ?
                            <div className='flex justify-center my-3 text-blue-500 text-sm pt-1'>
                                <span className='mx-3 text-slate-400'></span>
                                <Link href={`/seller/add_product/upload_images/${product.id}`}>
                                    <span className='ml-1'>Manage Pictures</span></Link>
                                <span className='mx-3 text-slate-400'>|</span>
                                <Link target='_blank' className='text-blue-500 '
                                    href={`/product/${product.id}`}>
                                    <span className='ml-1'>Preview Post</span>
                                </Link>
                            </div>
                            : ""}
                    </div>
                    {page_loaded ? <div>
                        {product?.id === undefined ? "Product not found!" : <div>

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
                                        initialValue={product.title}
                                        rules={[{ required: true, message: 'Product Title is required' }]}
                                    >
                                        <Input
                                            style={{ width: "100%" }}
                                            placeholder='Type Title of Your Product'
                                            type='text'
                                            // value={product.title}
                                            onChange={(e) => {
                                                setProduct((myproduct) => {
                                                    return { ...myproduct, title: e.target.value }
                                                })
                                            }}
                                        />
                                    </Form.Item>

                                    <div>
                                        Select Product Category
                                    </div>
                                    <Form.Item
                                        name="categories"
                                        initialValue={product.categoryId}
                                        rules={[{ required: true, message: 'Select a Category' }]}

                                    >
                                        <Select
                                            placeholder='Product Category'
                                            style={{ width: "100%" }}
                                            onChange={(e) => {
                                                setProduct(my_product => {
                                                    return { ...my_product, categoryId: e }
                                                })
                                                // setSelectedCategory(e as string)
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
                                        initialValue={selected_province?.id}
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
                                                initialValue={selected_city_options.length > 0 ? selected_city_options[0].id : ""}

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
                                                initialValue={product.price}
                                                name="price_of_item"
                                                rules={[{ required: true, message: 'Total Price of items' }]}
                                            >
                                                <Input
                                                    placeholder='Price of Items'
                                                    style={{ width: "150px" }}
                                                    type='number'
                                                    value={price_of_item}
                                                    min={0}
                                                    onChange={(e) => {

                                                        // setPriceOfItem(parseInt(e.target.value as string)) 
                                                        setProduct(oldProduct => {
                                                            return { ...oldProduct, price: parseInt(e.target.value as string) }
                                                        })
                                                    }}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='flex-1'>

                                            <div>Price Units</div>
                                            <Form.Item
                                                name="priceUnits"
                                                initialValue={product.priceUnit}
                                                rules={[{ required: true, message: 'Select Price Units' }]}
                                            >
                                                <Select
                                                    placeholder='Price Unit'

                                                    style={{ width: "150px" }}
                                                    onChange={e => {
                                                        // setSelectedPriceUnit(e)
                                                        setProduct(oldProduct => {
                                                            return { ...oldProduct, priceUnit: (e as string) }
                                                        })
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
                                                initialValue={product.weight}
                                                rules={[{ required: true, message: 'Total Wegith of available items' }]}
                                            >
                                                <Input
                                                    placeholder='Total Stock'
                                                    style={{ width: "150px" }}
                                                    type='number'
                                                    value={weight_of_item}
                                                    min={0}
                                                    onChange={(e) => {
                                                        // setWeightOfItem(parseInt(e.target.value as string)) 
                                                        setProduct(oldProduct => {
                                                            return { ...oldProduct, weight: parseInt(e.target.value as string) }
                                                        })
                                                    }}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='flex-1'>

                                            <div>Weight Units</div>
                                            <Form.Item
                                                name="weightUnits"
                                                initialValue={product.weightUnit}
                                                rules={[{ required: true, message: 'Select Weight Units' }]}
                                            >
                                                <Select
                                                    placeholder='Measure Unit'

                                                    style={{ width: "150px" }}
                                                    onChange={e => {
                                                        // setSelectedWeightUnit(e)
                                                        setProduct(oldProduct => {
                                                            return { ...oldProduct, weightUnit: (e as string) }
                                                        })
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
                                        name="receive_offers"
                                    // initialValue={product.receiveOffers}

                                    // rules={[{ required: true, message: 'Type product description' }]}
                                    >
                                        <div className='flex'>
                                            <Switch
                                                defaultChecked={product.receiveOffers}
                                                onChange={onOfferChange} ></Switch>
                                            <span className='ml-2'>Receive Offers from Buyers</span>
                                        </div>
                                    </Form.Item> */}
                                    <div>Product Description</div>
                                    <Form.Item
                                        name="description"
                                        initialValue={product.description}
                                        rules={[{ required: true, message: 'Product Description is required' }]}
                                    >
                                        <TextArea
                                            showCount
                                            maxLength={500}
                                            value={product.description}
                                            style={{ height: 120, marginBottom: 24 }}
                                            onChange={onDescriptionChange}
                                            placeholder="can resize"
                                        />
                                    </Form.Item>

                                    <div className='flex '>
                                        <Form.Item>

                                            <Button type="primary" htmlType="submit" disabled={ok_to_save} >
                                                <div className='flex items-center'>
                                                    <div className='mr-2'>
                                                        <UploadOutlined className='text-lg' />
                                                        <span className='ml-2 '>Save & Upload Pictures</span>
                                                    </div>
                                                    <RightOutlined />
                                                </div>
                                            </Button>

                                        </Form.Item>
                                        {ok_to_save ?
                                            <div className='mt-1 ml-2'>
                                                <Spin /> <span className='ml-2'>please wait ...</span>
                                            </div>
                                            : ""
                                        }
                                    </div>
                                </Form>
                            </div>

                        </div>}
                    </div> : <div className='flex mt-5'>

                        <Spin />
                        <div className='ml-2'>
                            loading
                        </div>
                    </div>}
                </section>
            </div>
        </div>
    )
}





