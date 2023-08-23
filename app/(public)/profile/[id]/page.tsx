'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Spin } from 'antd';
import Link from 'next/link';
import { WhatsAppOutlined, PhoneOutlined } from "@ant-design/icons"
import { get_user_from_session } from '@/utils/getUserData';

export default function Profile() {

    const router = useRouter();
    const params = useParams()
    const { id } = params;

    const [userFromSession, setUserFromSession] = useState<User>()
    const [user, setUser] = useState<User>({} as User)
    const [content, setContent] = useState('');
    const [page_loaded, setPageLoaded] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [take, setTake] = useState(8)
    const [skip, setSkip] = useState(0)
    const [refresh_data, setRefreshData] = useState(false)





    const get_cover_image = (my_product: Product) => {

        if (my_product?.images[0] === undefined) {
            return undefined
        }

        if (my_product?.image_cover_id === null) {
            return my_product?.images[0];
        }

        const find_image = my_product?.images?.find((my_image: ImageProduct) => {
            return my_image.id === my_product.image_cover_id
        })
        if (find_image !== null) {
            return find_image
        }

        return my_product?.images[0];
    }



    useEffect(() => {


        const checkPhone = async () => {
            const get_user = await get_user_from_session();
            if (get_user?.phone1 === null || get_user?.phone2 === null) {
                router.push("/signin/verify_info")
                return;
            }
            setUser(get_user)
        }
        checkPhone();
        const getUserFromSession = async () => {
            const findUserFromSession = await get_user_from_session();
            if (findUserFromSession !== null) {
                setUserFromSession(findUserFromSession)
            }
        }
        getUserFromSession()

        const getUser = async () => {
            const form_data = new FormData();
            form_data.set("id", id as string);
            const fetch_user = await fetch("/api/myadmin/users/find_user", {
                method: "POST",
                body: form_data,
            });
            const user_response = await fetch_user.json();
            if (user_response) {
                setUser(user_response.data)
                // return user_response.data;
                getProfile(user_response.data.id as string)

            }
        }
        const getProfile = async (user_id: string) => {
            const form_data = new FormData();
            form_data.set("user_id", user_id)

            const fetch_profile = await fetch("/api/seller/profile", { method: "POST", body: form_data })
            const response_profile = await fetch_profile.json();

            if (response_profile.status === 200) {
                setContent(response_profile.data.description1)
            }
            // form_data.set("take", take.toString())
            // form_data.set("skip", skip.toString())

            // const fetch_products = await fetch("/api/seller/products/find_products", { method: "POST", body: form_data })
            // const response_products = await fetch_products.json();
            // setProducts(response_products.data.products)

            setPageLoaded(true)
            setRefreshData(!refresh_data)

        }
        getUser()
    }, [])


    useEffect(() => {
        const getProducts = async () => {
            const form_data = new FormData();
            form_data.set("user_id", id as string)
            form_data.set("take", take.toString())
            form_data.set("skip", skip.toString())

            const fetch_products = await fetch("/api/seller/products/find_products", { method: "POST", body: form_data })
            const response_products = await fetch_products.json();
            setProducts(response_products.data.products)
        }

        if (page_loaded) {
            getProducts()
        }

    }, [refresh_data])

    return (
        <div className='bg-white text-black h-full p-10' style={{ minHeight: "400px" }}>
            {page_loaded ? <div>

                <div className='text-sm'>Seller: </div>
                <h1 className='text-2xl'>{user.name}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }}>
                </div>

                <div className='my-8'>
                    <hr />
                </div>
                {userFromSession?.id === undefined ?
                    <div className='flex justify-center flex-wrap '>
                        <div className='ml-4 mb-4 md:mb-0'>
                            <div className='ml-3 text-sm'>Phone Call</div>
                            <div className='relative ml-0 ' style={{ width: "180px" }}>

                                <div className='text-white text-2xl cursor-pointer rounded-full bg-yellow-500 flex justify-center items-center absolute'
                                    style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                                    <PhoneOutlined />
                                </div>
                                <Link href={`/signin`}>
                                    <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                                        <div className='py-1 w-full text-center text-xs'>Login to Call</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='ml-4'>
                            <div className='ml-3 text-sm'>WhatsApp</div>
                            <div className='relative ml-0 ' style={{ width: "180px" }}>

                                <div className='text-white text-2xl cursor-pointer rounded-full bg-green-500 flex justify-center items-center absolute'
                                    style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                                    <WhatsAppOutlined />
                                </div>
                                <Link href={`/signin`}>
                                    <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                                        <div className='py-1 w-full text-center text-xs'>Login to WhatsApp</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex justify-center flex-wrap '>
                        <div className='ml-4 mb-4 md:mb-0'>
                            <div className='ml-3 text-sm'>Phone Call</div>
                            <div className='relative ml-0 ' style={{ width: "180px" }}>

                                <div className='text-white text-2xl cursor-pointer rounded-full bg-yellow-500 flex justify-center items-center absolute'
                                    style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                                    <PhoneOutlined />
                                </div>
                                <a href={`tel:${user?.phone1}`}>
                                    <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                                        <div className='py-1 w-full text-center'>{user?.phone1}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='ml-4'>
                            <div className='ml-3 text-sm'>WhatsApp</div>
                            <div className='relative ml-0 ' style={{ width: "180px" }}>

                                <div className='text-white text-2xl cursor-pointer rounded-full bg-green-500 flex justify-center items-center absolute'
                                    style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                                    <WhatsAppOutlined />
                                </div>
                                <Link target='_blank' href={`//api.whatsapp.com/send?phone=${user?.phone2}&text=${'hi there'}`}>
                                    <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                                        <div className='py-1 w-full text-center'>{user?.phone2}</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
                <div className='my-8'>
                    <hr />
                </div>

                <div className='flex flex-wrap justify-center'>

                    {products.map(product => {
                        if (product.image_cover_id != null) {
                            const image_id = product.image_cover_id;
                        }

                        const image_url = product.images[0]?.url

                        return <div key={product.id} className='m-2 w-80 mb-4 md:mb-2' >
                            <Link href={`/product/${product.id}`}>
                                <div className='bg-slate-100 p-0 relative rounded-b-lg overflow-hidden scale-100 hover:scale-105 transition-all'>

                                    <div className='h-80 w-full border border-slate-300' style={{ backgroundColor: "#e8e8e8" }}>
                                        <img src={
                                            get_cover_image(product)?.url !== undefined ? get_cover_image(product)?.url :

                                                product.Category.name === "G1 Garlic Dry" ?
                                                    "/images/g1garlic-dry-no-image.jpg"
                                                    :
                                                    "/images/g1garlic-wet-no-image.jpg"

                                        } className='object-cover w-full h-80 m-auto' alt={product.Category.name} />

                                    </div>
                                    <div className='bg-white absolute top-1 right-1 p-1 bg-opacity-80 rounded-lg px-3'>
                                        <sup className='text-xs'>Rs</sup>   <span className='text-lg'>{product.price}</span><span className='text-xs ml-1 capitalize'>/{product.priceUnit.toLowerCase()}</span>
                                    </div>
                                    <div className='text-center bg-slate-600 py-4 text-white border-t border-t-slate-400 '> {product.title}</div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>

                <div className='my-8'>
                    <hr />
                </div>
                <div className='flex justify-center'>
                    <Button>Load More...</Button>
                </div>

            </div> : <div>
                <Spin /> <span className='ml-2'>Loading...</span>
            </div>}
        </div>
    )
}
