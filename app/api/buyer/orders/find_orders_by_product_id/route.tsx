import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const form_data = await req.formData();
    const buyer_id = form_data.get("buyer_id") as string;
    const product_id = form_data.get("product_id") as string;

    const find_orders = await prisma.order.findMany({
        where: {
            userId: buyer_id,
            productId: product_id
        },
        include: {
            product: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    await prisma.$disconnect()
    return NextResponse.json({
        status: 200,
        msg: "Found Products",
        data: find_orders
    })
}