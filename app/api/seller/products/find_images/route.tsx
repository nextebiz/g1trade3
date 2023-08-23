import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const form_data = await req.formData()
    const product_id: string = form_data.get("product_id") as string

    if (product_id !== undefined) {
        const fetch_images = await prisma.imageProduct.findMany({
            where: {
                productId: product_id
            }
        })

        await prisma.$disconnect()

        if (fetch_images) {
            return NextResponse.json({
                status: 200,
                msg: "product images",
                data: fetch_images
            })
        } else {
            return NextResponse.json({
                status: 404,
                msg: "No images found",
                data: []
            })
        }

    }

    return NextResponse.json({
        msg: "posted"
    })
}