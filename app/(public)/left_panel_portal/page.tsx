'use client'
import React, { useEffect, useState } from 'react'
import { Slider, Spin } from "antd"
import { useRouter } from 'next/navigation'
import { CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons'


interface Props {
    params: {
        getCategoryClicked: (category: Category) => void,
        getProvinceClicked: (province: Province) => void,
        getCityClicked: (city: City) => void,
        setSelectedCategory: (category: Category) => void,
        selected_category: Category,
        setSelectedProvince: (province: Province) => void,
        selected_province: Province,
        setSelectedCity: (city: City) => void,
        selected_city: City,
        setReloadData: (reload_data: boolean) => void,
        reload_data: boolean,
        province_id: string,
        city_id: string,
        setCities: (cities: City[]) => void,
        cities: City[],
        page_loaded: boolean,
        onClose: () => void
    }
}

export default function LeftPanelPortal({ params: {
    getCategoryClicked,
    getProvinceClicked,
    getCityClicked,
    setSelectedCategory,
    selected_category,
    setSelectedProvince,
    selected_province,
    setSelectedCity,
    selected_city,
    setReloadData,
    reload_data,
    province_id,
    city_id,
    setCities,
    cities,
    page_loaded,
    onClose
} }: Props) {

    const router = useRouter();
    const [menu_loaded, setMenuLoaded] = useState(false)
    const [check_on_load, setCheckOnLoad] = useState(true)
    const [categories, setCategories] = useState<Category[]>([])
    const [provinces, setProvinces] = useState<Province[]>([])

    const findProvince = () => {
        if (province_id !== "") {
            const find_province = provinces?.find((province: Province) => {
                return province.id === province_id
            })
            if (find_province) {
                setSelectedProvince(find_province)
                setCities(find_province.city)
                if (city_id === "") {
                    setReloadData(!reload_data)
                }
            }
        }
    }

    const findCity = () => {
        if (city_id !== "") {
            const find_city = cities?.find((city: City) => {
                return city.id === city_id
            })
            if (find_city) {
                setSelectedCity(find_city)
                setReloadData(!reload_data)
                setCheckOnLoad(false)
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            const fetch_cats = await fetch("/api/public/categories", {
                method: "POST", 
                next: { revalidate: 300 }
            });
            const response_cats = await fetch_cats.json();
            setCategories(response_cats.data)
            const fetch_province = await fetch("/api/public/provinces", {
                method: "POST",
                next: { revalidate: 300 }
            });
            const response_province = await fetch_province.json();
            setProvinces(response_province.data)
            setMenuLoaded(true)
        }
        getData()
    }, [])

    useEffect(() => {
        findProvince()
    }, [menu_loaded])

    useEffect(() => {
        if (check_on_load === true) {
            findCity()
        }
    }, [selected_province])

    return (
        <div className='h-full text-white py-0 md:py-1' style={{ minWidth: "250px" }}>


            {selected_category?.id !== undefined || selected_city?.id !== undefined || selected_province?.id !== undefined ?
                <div className='p-0 md:p-3 mb-3'>
                    <div className='w-full  mb-0 border border-slate-400 '>
                        <div className='bg-slate-900 border-b border-b-slate-400 py-2 pl-3'> Selected Options</div>

                        <div className='pl-3 py-2'>

                            {selected_category?.id !== undefined ?
                                <div className='text-sm my-2 flex items-center justify-start'>
                                    <div onClick={() => {
                                        setSelectedCategory({} as Category)
                                        getCategoryClicked({} as Category)
                                        setReloadData(!reload_data)
                                        onClose()

                                    }}
                                        className='cursor-pointer hover:text-green-500 transition-all'>
                                        <CloseCircleOutlined className='text-lg' />
                                    </div>
                                    <span className='ml-2'>
                                        {selected_category?.name}
                                    </span>
                                </div>
                                : ""
                            }

                            {selected_province?.id !== undefined ?
                                <div className='text-sm my-2 flex items-center justify-start'>
                                    <div
                                        onClick={() => {
                                            setSelectedProvince({} as Province)
                                            setCities([])
                                            setSelectedCity({} as City)
                                            getProvinceClicked({} as Province)
                                            getCityClicked({} as City)
                                            setReloadData(!reload_data)
                                            onClose()

                                        }}
                                        className='hover:text-green-500 cursor-pointer'>
                                        <CloseCircleOutlined className='text-lg' />
                                    </div>
                                    <span className='ml-2'>{selected_province.name}</span>
                                </div>
                                : ""
                            }

                            {selected_city?.id !== undefined ?
                                <div className='text-sm my-2 flex items-center justify-start'>
                                    <div
                                        onClick={() => {
                                            setSelectedCity({} as City)
                                            getCityClicked({} as City)
                                            setReloadData(!reload_data)
                                            onClose()


                                        }}
                                        className='cursor-pointer hover:text-green-500'>
                                        <CloseCircleOutlined className='text-lg' />
                                    </div>
                                    <span className='ml-2'>{selected_city?.name}</span>
                                </div>
                                : ""
                            }
                        </div>
                        <div className='text-xs flex items-center justify-start pl-3 py-2 bg-slate-900 border-t border-t-slate-400'>
                            <div onClick={() => {
                                setSelectedProvince({} as Province)
                                setCities([])
                                setSelectedCity({} as City)
                                setSelectedCategory({} as Category)
                                getCategoryClicked({} as Category)
                                getProvinceClicked({} as Province)
                                getCityClicked({} as City)
                                setReloadData(!reload_data)
                                onClose()


                            }} className='cursor-pointer hover:text-green-500'>
                                <ReloadOutlined className='text-md' /> <span className='ml-2'>Reset Search</span>
                            </div>

                        </div>
                    </div>
                </div>
                : ""}

            <div className='ml-0 md:ml-3 mr-3 mt-0 md:mt-2'>
                {selected_category?.id === undefined ?
                    <div className='w-full  mb-5 '>
                        <div className='text-xl pb-2 mb-2 border-b border-dashed border-b-slate-400'>
                            Categories
                        </div>
                        {page_loaded ?
                            <div>
                                {categories?.length > 0 ?
                                    <div>
                                        {categories?.map((cat) => {
                                            return <div key={cat.id} className='pb-1 text-sm'>
                                                <div className=' cursor-pointer hover:bg-slate-900' onClick={() => {
                                                    setSelectedCategory(cat)
                                                    getCategoryClicked(cat)
                                                    setReloadData(!reload_data)
                                                    onClose()

                                                }}>{cat.name}</div>
                                            </div>
                                        })}
                                    </div>
                                    :
                                    <div>
                                        <span className='ml-2 text-sm'>No Categories found</span>
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <Spin />
                                <span className='ml-2 text-sm'>Loading</span>
                            </div>
                        }
                    </div>
                    : ""}
                {selected_province?.id === undefined ?

                    <div className='w-full mb-5'>
                        <div className='text-xl pb-2 mb-2 border-b border-dashed border-b-slate-400'>

                            Provinces
                        </div>
                        {menu_loaded ? <div>
                            {provinces?.length > 0 ?
                                <div>
                                    {provinces?.map((province) => {
                                        return <div
                                            key={province.id}
                                            className='pb-1 text-sm cursor-pointer hover:bg-slate-900'
                                            onClick={() => {
                                                getProvinceClicked(province)
                                                setSelectedProvince(province)
                                                setCities(province.city)
                                                setReloadData(!reload_data)
                                            onClose()

                                            }}
                                        >
                                            <div className={`${province._count.product == 0 ? "opacity-40" : "opacity-100"}`}>{province.name}<span className={`ml-2 text-xs`}>({province._count.product})</span></div>
                                        </div>
                                    })}
                                </div>
                                : <div>
                                    <span className='ml-2 text-sm'>No provinces found</span>
                                </div>
                            }
                        </div>
                            :
                            <div>
                                <Spin />
                                <span className='ml-2 text-sm'>Loading</span>
                            </div>
                        }
                    </div>
                    : ""}

                {selected_city?.id === undefined ?
                    cities.length !== 0 ?
                        <div className='w-full mb-5'>
                            <div className='text-xl pb-2 mb-2 border-b border-dashed border-b-slate-400'>
                                Cities
                            </div>
                            {cities?.map((city) => {
                                return <div
                                    key={city.id}
                                    className='pb-1 text-sm cursor-pointer hover:bg-slate-900'
                                    onClick={() => {
                                        setSelectedCity(city)
                                        getCityClicked(city)
                                        setReloadData(!reload_data)
                                        onClose()

                                    }}
                                >
                                    <div className={`${city._count.product == 0 ? "opacity-40" : "opacity-100"}`}>{city.name}
                                        <span className={`ml-2 text-xs`}>({city._count.product})</span>
                                    </div>
                                </div>
                            })}
                        </div>
                        : ""
                    : ""}
            </div>
        </div>
    )
}
