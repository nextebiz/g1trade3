import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const picture_id = form_data.get("picture_id") as string;

    const pic = await prisma.imageProduct.findFirst({
        where: {
            id: picture_id
        },
    })

    await prisma.$disconnect()


    if (pic) {
        return NextResponse.json({
            status: 200,
            msg: "Product found",
            data: pic
        })
    }

    return NextResponse.json({
        status: 404,
        msg: "Product not found",
        data: null
    })
}