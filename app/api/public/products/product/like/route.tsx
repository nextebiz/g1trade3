import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    let liked = "yes"
    const form_data = await req.formData();
    const product_id = form_data.get("product_id") as string;
    const user_id = form_data.get("user_id") as string;
    // const like_action = form_data.get("like_action") as string; // add, remove

    const find_like = await prisma.productLikes.findFirst({
        where: {
            productId: product_id,
            userId: user_id
        },
    })


    if (find_like === null) {
        const add_like = await prisma.productLikes.create({
            data: {
                productId: product_id,
                userId: user_id
            }
        })

    } else {
        const remove_like = await prisma.productLikes.delete({
            where: {
                id: find_like.id
            }
        })

        liked = "no"
    }
    const total_likes_of_product = await prisma.productLikes.count({
        where: {
            productId: product_id
        }
    })
    await  prisma.$disconnect()

    return NextResponse.json({
        status: 200,
        msg: "Likes updated",

        data: {
            likes: total_likes_of_product,
            liked: liked
        }
    })
}