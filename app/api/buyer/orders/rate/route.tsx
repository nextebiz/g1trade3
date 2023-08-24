import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const form_data = await req.formData();
    const user_id = form_data.get("user_id") as string
    const message = form_data.get("message") as string
    const stars = parseInt(form_data.get("stars") as string)
    const product_id = form_data.get("product_id") as string
    const order_id = form_data.get("order_id") as string

    const add_rating = await prisma.productRating.create({
        data: {
            message: message,
            stars: stars,
            productId: product_id,
            userId: user_id
        }
    })
    prisma.$disconnect();
    return NextResponse.json({
        msg: "Rating posted"
    })
}
