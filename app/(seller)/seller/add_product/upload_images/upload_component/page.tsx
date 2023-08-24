'use client'
import React, { useEffect, useState } from 'react'
import { CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined, PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Spin, message, Popconfirm, Tooltip } from 'antd';
import Link from 'next/link';
// import Image from 'next/image';
// import Image from 'antd';

// id will be null if no image found in db
// interface Props {
//     params: {
//         id: string,
//         productId: string,
//         url: string,
//         user_id: string,
//         public_id: string
//     }
// }

interface Props {
    params: {
        imageProduct: any,
        save_default_image: (image_id: string) => void,
        product: Product
    }
}

// type InitData = {
//     id: string,
//     productId: string,
//     url: string,
//     user_id: string,
//     public_id: string
// }

// export default function UploadComponent({ params: { id, productId, url, user_id, public_id } }: Props) {
export default function UploadComponent({ params: { imageProduct, save_default_image, product } }: Props) {

    // if (imageProduct) {
    const { id, productId, url, user_id, public_id } = imageProduct;
    // }
    const [init_data, setInitData] = useState<ImageProduct>({} as ImageProduct)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to delete this picture?');
    // const [image_to_delete, setImageToDelete] = useState<String>("")
    const [selected_image, setSelectedImage] = useState<File>()
    const [compressed_image, setCompressedImage] = useState<File>()
    const [image_cover_id, setImageCoverId] = useState("")

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setModalText(`Deleting picture. Please wait ...`);
        setConfirmLoading(true);
        const form_data = new FormData();
        // product_id, file_name, File are required

        // let file_name = user.id + "_" + productId + "_" + Math.round(Date.now() / 1000)

        form_data.set("image_id", init_data.id)
        form_data.set("public_id", init_data.public_id)

        const fetch_delete = await fetch("/api/seller/products/delete_image",
            {
                method: "POST",
                body: form_data,
                next: { revalidate: 300 }
            });
        const delete_response = await fetch_delete.json();
        if (delete_response.status === 200) {
            setInitData(init_data => {
                return { ...init_data, public_id: "", url: "" }
            })
        }
        setOpen(false);
        setConfirmLoading(false);


    };


    const confirm = async (image_id: string) => {
        // message.success('Click on Yes');
        const save_result = save_default_image(image_id)
    };


    const handleCancel = () => {
        setOpen(false);
    };

    // const delete_image = async (public_id: string) => {

    //     const form_data = new FormData();
    //     form_data.set("public_id", public_id)
    //     const fetch_delete = await fetch("/api/seller/products/delete_image", { method: "POST", body: form_data });
    //     const delete_response = await fetch_delete.json();
    // }

    useEffect(() => {
        // const try_upload = async () => {
        //     const form_data = new FormData();
        //     form_data.set("file", selected_image as File)
        //     form_data.set("product_id", productId)
        //     // form_data.set("file_name", file_obj.file_name)
        //     // form_data.set("user_id", user?.id)

        //     const fetch_upload = await fetch("/api/seller/products/upload_image", {
        //         method: "POST",
        //         body: form_data
        //     })
        // }

        if (selected_image === undefined) {

            setInitData(init_data => {
                return {
                    ...init_data, id: id,
                    productId: productId,
                    url: url,
                    user_id: user_id,
                    public_id: public_id
                }
            })
        }

        const compressImage = async (file: File, my_width: number, my_height: number,
            { quality = 1, type = file.type }) => {

            try {
                let resize_to_width = 1000;

                let aspectRatio = my_width / my_height;

                if (aspectRatio < 1) {
                    resize_to_width = 600
                }

                let max_width = resize_to_width;
                let max_height = max_width / aspectRatio


                if (my_width <= resize_to_width) {
                    max_width = my_width;
                    max_height = my_height
                }

                // my_width.toFixed(3) to get decilmals
                // Get as image data
                const imageBitmap = await createImageBitmap(file, { resizeWidth: max_width, resizeHeight: max_height });


                // Draw to canvas
                const canvas = document.createElement('canvas');
                canvas.width = imageBitmap.width;
                canvas.height = imageBitmap.height;

                // canvas.width = max_width;
                // canvas.height = max_height;

                const ctx: any = canvas.getContext('2d');
                ctx.drawImage(imageBitmap, 0, 0);

                // Turn into Blob
                const blob: any = await new Promise((resolve) =>
                    canvas.toBlob(resolve, type, quality)
                );

                // Turn Blob into File
                return new File([blob], file.name, {
                    type: blob.type,
                });
            } catch (err) {
                return file
            }

        };

        const get_image_sizes = async () => {
            const dataTransfer = new DataTransfer();

            let img = new Image()
            let obj = URL.createObjectURL(selected_image as File)

            img.onload = async function () {

                const compressedFile = await compressImage(selected_image as any, img.width, img.height, {
                    quality: 1.0,
                    type: 'image/jpeg',
                });
                dataTransfer.items.add(compressedFile);

                // URL.revokeObjectURL(obj)
                // upload this file dataTransfer.files[0]
                setCompressedImage(dataTransfer.files[0])

                const form_data = new FormData();
                // form_data.set("file", selected_image as File)
                form_data.set("file", dataTransfer.files[0] as File)
                form_data.set("product_id", productId)
                let file_name = user_id + "_" + productId + "_" + Math.round(Date.now() / 1000)

                form_data.set("file_name", file_name)
                form_data.set("user_id", user_id)

                const fetch_upload = await fetch("/api/seller/products/upload_image", {
                    method: "POST",
                    body: form_data,
                    next: { revalidate: 300 }

                })
                const fetch_result = await fetch_upload.json();
                // setInitData(init_data => {
                //     return { ...init_data, public_id: fetch_result.data.public_id, url: fetch_result.data.url }
                // })
                setInitData(fetch_result.data)
            }
            img.src = obj;
        }


        if (selected_image !== undefined) {
            get_image_sizes()
        }

    }, [selected_image])
    return (
        <div className=''>
            <div className='overflow-hidden rounded-lg relative border border-slate-300' style={{ width: "200px", height: "200px" }}>
                {
                    init_data.url !== "" ?
                        <div style={{ width: "200px", height: "200px" }} className='relative'>
                            <img src={init_data.url} className='object-contain' alt='product image' style={{ width: "200px", height: "200px" }} />

                            <div className='absolute top-0  bg-opacity-10 w-full h-full flex justify-center items-center'>
                                <div className='scale-100 hover:scale-125 mr-2 transition-all'>
                                    <Link href={`/product/preview_picture/${init_data.id}`} target='_blank'>

                                        <Tooltip title="Preview image" placement="bottom" >
                                            <div className='bg-white text-black hover:text-white hover:bg-green-600 bg-opacity-70 w-8 h-8  flex items-center justify-center rounded-full transition-all'>
                                                <EyeOutlined />
                                            </div>
                                        </Tooltip>

                                    </Link>
                                </div>
                                <div className='scale-100 hover:scale-125 ml-2 transition-all' onClick={() => {
                                    // setImageToDelete(id)
                                    showModal()
                                }}>
                                    <Tooltip title="Delete image" placement="bottom" >

                                        <div className='bg-white  text-black hover:text-white hover:bg-red-400 bg-opacity-70 w-8 h-8  flex items-center justify-center rounded-full transition-all'>
                                            <DeleteOutlined />
                                        </div>
                                    </Tooltip>
                                </div>

                                <Modal
                                    title="Delete Picture"
                                    open={open}
                                    onOk={handleOk}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}
                                >
                                    <p>{modalText}</p>
                                </Modal>
                            </div>

                            <div className={`

                            absolute top-2 right-2 w-8 h-8 scale-100  transition-all
                             ${init_data.id === product.image_cover_id ? "" : " hover:scale-125 "}
                            `}>
                                <Popconfirm
                                    title="Set as Default Picture"
                                    description="Are you sure you want to set as default picture?"
                                    onConfirm={() => {
                                        confirm(init_data.id)
                                    }}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                    disabled={init_data.id === product.image_cover_id ? true : false}
                                >
                                    <Tooltip title={init_data.id === product.image_cover_id ? "" : "Set image as default"} placement="left"  >

                                        <div className={`
                                         bg-white bg-opacity-80 rounded-full w-full h-full flex items-center justify-center  
                                         ${init_data.id === product.image_cover_id ? "" : " hover:text-white hover:bg-green-500"}
                                        `} >
                                            {init_data.id === product.image_cover_id ?
                                                <div className='text-2xl text-green-500'>
                                                    <CheckCircleOutlined />
                                                </div>
                                                :
                                                <div>
                                                    <ExclamationCircleOutlined />
                                                </div>
                                            }

                                            {/* <LoadingOutlined /> */}
                                            {/* <CheckCircleOutlined /> */}
                                        </div>
                                    </Tooltip>
                                </Popconfirm>


                            </div>
                        </div>
                        :
                        <div className='bg-slate-300 hover:bg-slate-200 text-slate-800 hover:text-green-600  w-full h-full flex flex-col justify-center items-center text-center scale-100 hover:scale-110 transition-all'>
                            {
                                selected_image !== undefined ?
                                    <div>
                                        <div>
                                            <Spin />
                                            <div className='text-sm mt-1'>Uploading...</div>
                                        </div>
                                    </div>
                                    :
                                    <div className=' w-full h-full relative'>
                                        <div className='flex flex-col  justify-center items-center w-full h-full'>
                                            <div className='text-3xl mb-2 '>
                                                <PlusOutlined />
                                            </div>
                                            <div>
                                                Upload Image
                                            </div>
                                        </div>
                                        <div className='absolute top-0 opacity-0'>
                                            <input
                                                onChange={(e: any) => {
                                                    const [file] = e.target.files
                                                    setSelectedImage(file)
                                                }}
                                                type='file' className='' style={{ width: "200px", height: "200px" }} />
                                        </div>
                                    </div>
                            }
                        </div>
                }

            </div>

        </div >
    )
}
