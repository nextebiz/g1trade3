import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const product_id: string = form_data.get("product_id") as string;
    const image_id: string = form_data.get("image_id") as string;

    try {
        const set_default = await prisma.product.update({
            where: {
                id: product_id as string
            },
            data: {
                image_cover_id: image_id as string
            }
        })

        await prisma.$disconnect()


        return NextResponse.json({
            status: 200,
            msg: "default image set done",
        })

    } catch (err) {
        await prisma.$disconnect()

        return NextResponse.json({
            status: 500,
            msg: "failed to set default image",
        })
    }
}


