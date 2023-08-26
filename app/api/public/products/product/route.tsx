import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const product_id = form_data.get("product_id") as string;
    const buyer_id = form_data.get("buyer_id") as string;
    let found_like = "no";

    const product = await prisma.product.findFirst({
        where: {
            id: product_id
        },
        include: {
            _count: true,
            Category: true,
            images: true,
            rating: {
                select: {
                    stars: true
                }
            },
            productCity: {
                include: {
                    City: true
                }
            },
            User: true,
        }
    })

    if (buyer_id !== undefined) {

        const find_like = await prisma.productLikes.findFirst({
            where: {
                userId: buyer_id,
                productId: product_id
            },
        })
        if (find_like) {
            found_like = "yes"
        }
    }
    await prisma.$disconnect()

    if (product) {
        return NextResponse.json({
            status: 200,
            msg: "Product found",
            data: product,
            like: found_like
        })
    }

    return NextResponse.json({
        status: 404,
        msg: "Product not found",
        data: null
    })
}