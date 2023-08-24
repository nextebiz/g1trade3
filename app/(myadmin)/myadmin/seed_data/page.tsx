'use client'
import React, { useEffect, useState } from 'react'
import { ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Button, Select, Spin } from 'antd'


export default function SeedData() {

  const [page_loaded, setPageLoaded] = useState(false)
  const [province_data, setProvinceData] = useState<Province[]>([])
  const [categories_data, setCategoriesData] = useState<Category[]>([])
  const [city_data, setCityData] = useState<City[]>([])
  const [selected_province, setSelectedProvince] = useState<string>()
  const [selected_city, setSelectedCity] = useState<string>()

  const categories = [
    { name: "G1 Garlic Dry" },
    { name: "G1 Garlic Fresh (Wet)" }
  ]

  const punjab_cities = [
    "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala",
    "Sialkot", "Bahawalpur", "Sargodha", "Sheikhupura", "Gujrat",
    "Jhang", "Sahiwal", "Okara", "Wah Cantonment", "Dera Ghazi Khan",
    "Jhelum", "Gujar Khan", "Rahim Yar Khan", "Kasur", "Mianwali",
    "Attock", "Muridke", "Khanewal", "Muzaffargarh", "Gojra",
    "Mandi Bahauddin", "Murree", "Shakargarh", "Hafizabad", "Lodhran",
    "Pakpattan", "Vehari", "Chiniot", "Kamoke", "Sadiqabad",
    "Burewala", "Sambrial", "Toba Tek Singh", "Khushab", "Taxila",
    "Mandi Bahauddin", "Wazirabad", "Rajanpur", "Chakwal", "Kot Addu",
    "Daska", "Chichawatni", "Nankana Sahib", "Qila Sheikhupura",
    "Mian Channu", "Hasan Abdal", "Layyah", "Kamalia", "Kabeerwala"
  ]
  const sindh_cities = [
    "Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas",
    "Nawabshah", "Jacobabad", "Shikarpur", "Khairpur", "Dadu",
    "Tando Allahyar", "Tando Adam", "Ghotki", "Badin", "Sanghar",
    "Umerkot", "Thatta", "Hala", "Naushahro Feroze", "Kandhkot",
    "Ratodero", "Kashmore", "Moro", "Khipro", "Matiari"
  ]

  const kpk_cities = [
    "Peshawar", "Swat", "Mardan", "Bannu", "Nowshehra", "Kohat", "Dera Ismail Khan", "Abbottabad", "Mansehra",
    "Swabi", "Charsadda", "Haripur", "Malakand", "Mingora", "Kabal", "Barikot", "Takht-i-Bahi", "Batkhela",
    "Jamrud", "Bahrain", "Lakki Marwat", "Pabbi"
  ]

  const balochistan_cities = [
    "Quetta", "Turbat", "Hub", "Chaman",
    "Dera Murad Jamali", "Gwadar", "Nasirabad", "Makran", "Zhob"
  ]

  const gb_cities = [
    "gilgit", "astor", "hunza"
  ]
  const kashmir_cities = [
    "Kotli", "Muzaffarabad", "Poonch",
    "Mīrpur", "Bhimber", "Bagh", "Neelam"
  ]


  const islamabad_areas = [
    "Islamabad - The Capital",
    "Blue Area",
    "G-5",
    "G-6",
    "G-7",
    "G-8",
    "G-9",
    "G-10",
    "G-11",
    "G-12",
    "G-13",
    "G-14",
    "G-15",
    "G-16",
    "F-6",
    "F-7",
    "F-8",
    "F-10",
    "F-11",
    "I-8",
    "I-9",
    "I-10",
    "I-11",
    "H-8",
    "H-9",
    "H-11",
    "E-7",
    "E-11",
    "D-12",
    "F-6",
    "F-7",
    "F-10",
    "G-7",
    "G-8",
    "G-9",
    "G-10",
    "G-11",
    "G-12",
    "G-13",
    "G-14",
    "Bahria Town",
    "DHA Islamabad",
    "Gulberg Islamabad",
    "PWD Housing Scheme",
    "Park Enclave",
    "Bani Gala",
    "Chak Shahzad",
    "F-5",
    "F-6",
    "F-7",
    "F-8",
    "F-10",
    "F-11",
    "H-13",
    "H-12",
    "H-11",
    "I-8",
    "I-9",
    "I-10",
    "I-11",
    "I-14",
    "Rawal Town",
    "Satellite Town",
    "Pakistan Town",
    "Kuri Model Village",
    "Korang Town",
    "Soan Garden",
    "PWD Colony",
    "Kahuta",
    "Tarlai",
    "Peshawar Road",
    "DHA Valley",
    "D-17 Islamabad",
    "Zaraj Housing Scheme",
    "Top City-1"
  ]


  const punjab_cities_with_province = punjab_cities.map(area => ({
    name: area,
    provinceId: ''
  }));

  const sindh_cities_with_province = sindh_cities.map(area => ({
    name: area,
    provinceId: ''
  }));
  const kpk_cities_with_province = kpk_cities.map(area => ({
    name: area,
    provinceId: ''
  }));
  const balochistan_cities_with_province = balochistan_cities.map(area => ({
    name: area,
    provinceId: ''
  }));
  const gb_cities_with_province = gb_cities.map(area => ({
    name: area,
    provinceId: ''
  }));

  const kashmir_cities_with_province = kashmir_cities.map(area => ({
    name: area,
    provinceId: ''
  }));
  const islamabad_areas_with_province = islamabad_areas.map(area => ({
    name: area,
    provinceId: ''
  }));

  const total = [
    { "punjab_cities_with_province": punjab_cities_with_province.length },
    { "sindh_cities_with_province": sindh_cities_with_province.length },
    { "kpk_cities_with_province": kpk_cities_with_province.length },
    { "balochistan_cities_with_province": balochistan_cities_with_province.length },
    { "gb_cities_with_province": gb_cities_with_province.length },
    { "kashmir_cities_with_province": kashmir_cities_with_province.length },
    { "islamabad_areas_with_province": islamabad_areas_with_province.length }
  ]
  const province_names = [
    { name: "Punjab", city: punjab_cities_with_province },
    { name: "Sindh", city: sindh_cities_with_province },
    { name: "Khyber Pakhtunkhwa", city: kpk_cities_with_province },
    { name: "Balochistan", city: balochistan_cities_with_province },
    { name: "Gilgit-Baltistan", city: gb_cities_with_province },
    { name: "Azad Jammu and Kashmir", city: kashmir_cities_with_province },
    { name: "Islamabad Capital Territory", city: islamabad_areas_with_province }
  ];


  const handleChange = (e: any) => { }


  const getProvinces = async () => {
    const fetch_request = await fetch("/api/myadmin/seed/provinces");
    const get_provinces = await fetch_request.json()
    setProvinceData(get_provinces.data)

  }
  const getCategories = async () => {
    const fetch_request = await fetch("/api/myadmin/seed/categories");
    const get_categories = await fetch_request.json();
    setCategoriesData(get_categories.data)
  }
  const getCities = async (province_id: string) => {
    const formdata = new FormData();
    formdata.set("province_id", province_id)
    const fetch_request = await fetch("/api/myadmin/seed/cities", {
      method: "post",
      body: formdata
    })
    const get_cities = await fetch_request.json();
    setCityData(get_cities.cities)
  }
  const addProvinces = async (e: any) => {

    const formdata = new FormData()
    formdata.set("provinces", JSON.stringify(province_names))

    const add_provinces = await fetch("/api/myadmin/seed/provinces", {
      method: "post",
      body: formdata
    })
    const response = await add_provinces.json()
    if (response.result.count > 0) {
      getProvinces()
    }
    const p = await getProvinces();

  }
  const onSelectProvince = async (e: string) => {
    const province: Province | undefined = province_data.find(p => p.id === e)
    setSelectedProvince(province?.id)
    if (province?.id) {
      await getCities(province?.id)
    }


  }
  const onSelectCity = () => { }

  const addCategories = async () => {
    const formdata = new FormData()
    formdata.set("categories", JSON.stringify(categories))
    const add_categories = await fetch("/api/myadmin/seed/categories", {
      method: "post",
      body: formdata
    })

    const cats = await getCategories()

  }
  useEffect(() => {
    const getData = async () => {
      const p = await getProvinces();
      const cats = await getCategories()
      setPageLoaded(true)
    }
    getData()

  }, [])

  return (
    <div className='' style={{ width: "100%" }}>
      <div>
      </div>
      <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

        <div style={{ paddingLeft: "45px" }}>
          Seed Database with Initial Data
        </div>
      </div>
      <div className='text-black  p-5 '>
        <section>
          <h1 className='text-2xl'>Add Product Categories</h1>

          {
            !page_loaded ? <div><Spin /> <span className='ml-2'>loading ...</span></div> :
              categories_data.length == 0 ?
                <div>
                  total categories: {categories_data.length}
                  <Button onClick={() => { addCategories() }}>
                    Add Product Categories
                  </Button>
                </div>
                :
                <div>
                  total categories: {categories_data.length}<br />
                  <Select
                    // defaultValue={province_data[0]}
                    style={{ width: 300 }}
                    onChange={() => { }}
                    options={
                      categories_data.map(category => {
                        return { value: category.id, label: category.name }
                      })
                    }
                  />
                </div>
          }



          <hr className='mt-3 mb-3' />
        </section>
        <section>
          <h1 className='text-2xl'>Add Provinces</h1>

          {
            !page_loaded ? <div><Spin /> <span className='ml-2'>loading ...</span></div> :
              province_data.length == 0 ?
                <div>
                  total provinces: {province_data.length}
                  <Button onClick={(e) => { addProvinces(e) }}>Add Provinces</Button>
                </div>
                :
                <div>
                  total provinces: {province_data.length}<br />
                  {
                    !page_loaded ? <div><Spin /> <span className='ml-2'>loading ...</span></div> :
                      province_data.length == 0 ? "" :

                        <Select

                          // defaultValue={province_data[0]}
                          style={{ width: 300 }}
                          onChange={onSelectProvince}
                          options={
                            province_data.map(p => {
                              return { value: p.id, label: p.name + " (Cities: " + p.city.length + ")" }
                            })
                          }
                        />
                  }
                </div>
          }

          <hr className='mt-3 mb-3' />
          {/* <Button onClick={() => { getProvinces() }}>get provinces</Button> */}
        </section>
        <section>

          <div className='flex'>
            <div className='mr-2'>
              {
                !page_loaded ? <div><Spin /> <span className='ml-2'>loading ...</span></div> :
                  (selected_province === undefined) ? "" :
                    <div>
                      <h1 className='text-2xl'>Show Cities</h1>
                      selected province: {typeof selected_province}<br />

                      <Select
                        defaultValue={city_data[0]}
                        style={{ width: 300 }}
                        onChange={onSelectCity}
                        
                        options={
                          city_data.map(p => {
                            return { value: p.id, label: p.name }
                          })
                        }
                      />
                    </div>
              }
            </div>
            <br className='mt-2' />
          </div>
          <hr className='mt-3 mb-3' />
        </section>
      </div>

    </div>
  )
}
