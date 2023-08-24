'use client'
// import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PublicHeader from './header/page'
import { useEffect, useState } from 'react'
import { Button, ConfigProvider, Drawer, Pagination, Spin } from 'antd'
import MyBody from './mybody/page'
import { Lilita_One } from 'next/font/google'
import LeftPanelPortal from './left_panel_portal/page'
import RightPanelProduct from './right_panel_product/page'
const lilta = Lilita_One({ subsets: ["latin"], weight: "400" })
import { MenuOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useSearchParams, useRouter } from 'next/navigation'
import { getProvinceById } from '@/utils/getProvinceById'
import Link from 'next/link'
import { RightOutlined } from '@ant-design/icons'
// import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

export default function Home() {

  const router = useRouter();

  const [page_loaded, setPageLoaded] = useState(false)
  const [products_loaded, setProductsLoaded] = useState(false)
  const [reload_data, setReloadData] = useState(false)
  const [products, setProducts] = useState<Product[]>([] as Product[])
  const [total_products, setTotalProducts] = useState(0)
  const [current_page, setCurrentPage] = useState(1)
  const [take, setTake] = useState(0)
  const [is_pagination_clicked, setIsPaginationClicked] = useState(false)
  const [selected_category, setSelectedCategory] = useState<Category>({} as Category)
  const [selected_province, setSelectedProvince] = useState<Province>({} as Province)
  const [selected_city, setSelectedCity] = useState<City>({} as City)
  const [cities, setCities] = useState<City[]>([] as City[])


  // const [page, setPage] = useState(0)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [open, setOpen] = useState(false);

  const query_string = useSearchParams();
  const f_page = query_string.get("page");
  const province_id: string = query_string.get("pid") === null ? "" : query_string.get("pid") as string
  const city_id: string = query_string.get("cid") === null ? "" : query_string.get("cid") as string

  // const session = await getServerSession(authOptions);

  const getCategoryClicked = (category: Category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setIsPaginationClicked(true)
  }
  const getProvinceClicked = (province: Province) => {
    setSelectedProvince(province)
    setCurrentPage(1)
    setIsPaginationClicked(true)
  }

  const getCityClicked = (city: City) => {
    setSelectedCity(city)
    setCurrentPage(1)
    setIsPaginationClicked(true)
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const openLeftPanel = () => {
    setShowLeftPanel(true)
  }
  const get_products = async () => {

    setProductsLoaded(false)
    const form_data = new FormData();
    let go_to_page = current_page;

    if (!is_pagination_clicked) {
      if (f_page !== null) {
        const check_is_number = isNumeric(f_page)
        if (check_is_number) {
          go_to_page = parseInt(f_page)
        }
      }
    }


    form_data.set("page", go_to_page.toString())
    if (selected_category?.id !== undefined) {
      form_data.set("category_id", selected_category?.id)
    }
    if (selected_province?.id !== undefined) {
      form_data.set("province_id", selected_province?.id)
    }
    if (selected_city?.id !== undefined) {
      form_data.set("city_id", selected_city?.id)
    }
    setCurrentPage(go_to_page)


    const fetch_products = await fetch("/api/public/products", {
      method: "post",
      body: form_data,
      next: { revalidate: 60 }
    })
    const response_products = await fetch_products.json()
    setProducts(response_products.data)
    setTotalProducts(response_products.stats.count)
    setTake(response_products.stats.take)
    setPageLoaded(true)
    setProductsLoaded(true)
  }

  useEffect(() => {
    get_products()

    // }, [current_page, selected_province, selected_city, selected_category])
  }, [current_page, reload_data])

  return (
    <main>

      <div className=' justify-center align-middle mt-8 mb-8 hidden'>
        <h1 className={`text-4xl sm:text-4xl ${lilta.className}`}>
          BUY & SELL G1 GARLIC
        </h1>
      </div>
      {/* <MyBody /> */}
      <div className='text-black bg-white  md:pr-6 flex body-content'>

        <div className='bg-slate-800'>
          <div className='hidden md:block'>
            <LeftPanelPortal params={{
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
            }} />
          </div>
        </div>
        <div className='pt-2 md:pt-6  md:pl-6 w-full body-content'>
          <div className='flex align-middle  mb-2 mt-2'>

            <div>
              <div>
                <div onClick={() => {
                  setShowLeftPanel(true)
                  showDrawer()
                }}
                  className='block md:hidden text-xl pl-2'>
                  <MenuOutlined />
                </div>

                <ConfigProvider
                  theme={{
                    token: {
                      colorBgBase: "#1e293b",
                      colorText: "#ffffff",
                      colorLink: "#ffffff",
                      colorIcon: "FF00FF",
                    },
                  }}
                >
                  <Drawer
                    title="Close Product Search"
                    placement="left"
                    width={300}

                    onClose={onClose}
                    open={open}>
                    <LeftPanelPortal params={{
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

                    }} />
                    {/* <LeftPanel params={{ showLeftPanel, openLeftPanel, onClose }} /> */}
                  </Drawer>
                </ConfigProvider>

              </div>
            </div>
            {page_loaded ? products.length === 0 ?

              <div className='ml-3'>
                {products_loaded ?
                  <div>
                    <div className='flex items-center ml-2 md:ml-0'>
                      <div className='text-2xl'>
                        <ExclamationCircleOutlined />
                      </div>
                      <div className='ml-2'>
                        No Products Found.
                      </div>
                    </div>
                    <div>
                      <div className='ml-2 text-left'>
                        Select other cities or <span onClick={() => {
                          setSelectedProvince({} as Province)
                          setCities([])
                          setSelectedCity({} as City)
                          setSelectedCategory({} as Category)
                          getCategoryClicked({} as Category)
                          getProvinceClicked({} as Province)
                          getCityClicked({} as City)
                          setReloadData(!reload_data)
                          setProductsLoaded(false)
                        }} className='text-blue-500'>display all products</span>.
                      </div>
                    </div>
                  </div>
                  : ""}

                {products_loaded ? "" :
                  <div className='mt-0'>
                    <Spin />
                    <span className='ml-2'>Loading...</span>
                  </div>
                }
              </div>
              :
              <div className='flex items-center'>

                <div className='ml-3'>
                  {products_loaded === false ?
                    <div className='mr-2'>
                      <div className='flex'>
                        <Spin /> <span className='ml-2'>Searching. Please wait...</span>
                      </div>
                    </div> :

                    <div>
                      Displaying page {current_page} of {Math.ceil(total_products / take)} from {
                        selected_province?.id === undefined ? "Pakistan" : selected_province?.name
                      } {
                        selected_city?.id === undefined ? "" : <span> <span className='text-sm'><RightOutlined /></span> {selected_city.name}</span>
                      }
                    </div>
                  }
                </div>
              </div>
              : ""}
          </div>
          {page_loaded ? <div>

            <div className=''>
              {products.map((product) => {
                return <div key={product.id}>
                  <RightPanelProduct params={{
                    product: product
                  }} />
                </div>
              })}
              {/* <RightPanelProduct /> */}

            </div>

            <div className='bg-white p-5 flex justify-center'>
              {products.length === 0 ? "" : <Pagination
                total={total_products}
                defaultPageSize={take}
                showSizeChanger={false}
                showQuickJumper={false}
                current={current_page}
                onChange={e => {
                  setIsPaginationClicked(true)
                  router.push(`/?page=${e}`)
                  setCurrentPage(e)

                }}
              // showTotal={(total_products) => `Total ${total_products} products for sale`}
              />
              }
            </div>
          </div> : <div className='flex mb-0 ml-3 md:ml-0'>
            <Spin /><span className='ml-2'>Loading...</span>
          </div>}
        </div>

      </div>
    </main>
  )
}
function isNumeric(str: string) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(parseInt(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}