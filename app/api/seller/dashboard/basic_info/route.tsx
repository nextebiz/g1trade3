import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const user_id = form_data.get("user_id") as string;

    const product_count = await prisma.product.count({
        where: {
            userId: user_id
        }
    })

    return NextResponse.json({
        msg: "seller info",
        data: {
            product_count: product_count
        }
    })
}