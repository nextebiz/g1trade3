import prisma from "@/libs/prisma";
import { OrderActions } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const order_id = form_data.get("order_id") as string;
    const user_id = form_data.get("user_id") as string
    const order_action = form_data.get("order_action") as OrderActions;
    const seller_comments = form_data.get("seller_comments") as string

    console.log(form_data)
    const update_order = await prisma.order.update({
        where: {
            id: order_id,
            // userId: user_id
        },
        data: {
            orderAction: order_action,
            sellerComments: seller_comments
        }
    })

    // await prisma.$disconnect()

    return NextResponse.json({
        status: 200,
        msg: "order updated",

    })
}