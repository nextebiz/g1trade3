import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();

    const product_id = form_data.get("product_id") as string;

    if (product_id === undefined || product_id === null) {
        return NextResponse.json({
            status: 404,
            msg: "Product ID not found"
        })
    }

    const get_image_count = await prisma.imageProduct.count({
        where: {
            productId: product_id
        }
    })

    if (get_image_count > 0) {
        try {

            const public_ids_data = await prisma.imageProduct.findMany({
                where: {
                    productId: product_id
                }, select: {
                    public_id: true
                }
            })


            const public_ids: any = public_ids_data.map(p_id => {
                return p_id.public_id
            })

            const try_cloudinary_image_delete = await cloudinary.api.delete_resources(public_ids, { type: 'upload', resource_type: 'image' }).then(
                async () => {
                    const delete_images_from_db = await prisma.imageProduct.deleteMany({
                        where: {
                            productId: product_id as string
                        }
                    })

                }
            )

        } catch (err) {
            return NextResponse.json({
                status: 500,
                msg: "Failed to delete product images",
                data: err
            })
        }
    }

    try {
        const delete_product_city = await prisma.productCity.deleteMany({
            where: {
                productId: product_id as string
            }
        })
    } catch (err) {
        return NextResponse.json({
            status: 500,
            msg: "Failed to delete product city",
            data: err
        })
    }

    // delete from ORDER table

    try {
        const delete_product_from_db = await prisma.order.deleteMany({
            where: {
                productId: product_id
            }
        })
    } catch (err) {
        return NextResponse.json({
            status: 500,
            msg: "Failed to delete product orders",
            data: err
        })
    }
    // add product rating here..............
    try {
        const delete_product_from_db = await prisma.productLikes.deleteMany({
            where: {
                productId: product_id
            }
        })
    } catch (err) {
        return NextResponse.json({
            status: 500,
            msg: "Failed to delete product likes",
            data: err
        })
    }

    try {
        const delete_product_from_db = await prisma.product.delete({
            where: {
                id: product_id as string
            }
        })
    } catch (err) {
        return NextResponse.json({
            status: 500,
            msg: "Failed to delete product city",
            data: err
        })
    }
    await prisma.$disconnect()

    return NextResponse.json({
        status: 200,
        msg: "done deleted"
    })
}