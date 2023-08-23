import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const user_id = form_data.get("user_id") as string
    
    const count = await prisma.order.count({
        where: {
            product: {
                User: {
                    id: user_id
                }
            },
            orderAction: "PENDING"
        }
    })
    await prisma.$disconnect()

    return NextResponse.json({
        status: 200,
        msg: "order updated",
        data: {
            count: count
        }

    })
}