import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

// export async function GET() {
//     return NextResponse.json({
//         msg: "test"
//     })
// }

export async function POST(req: Request, res: Response) {


    const form_data = await req.formData();
    const product_id = form_data.get("product_id")

    const product = await prisma.product.findFirst({
        where: {
            id: product_id as string
        }, include: {
            images: true,  // earlier {}
            productCity: true, 
            User: true
        }
    })

    await prisma.$disconnect()


    if (!product) {
        return NextResponse.json({
            status: 404,
            msg: "Product Not Found",
            data: null
        })
    }

    return NextResponse.json({
        status: 200,
        msg: "Found the product",
        data: product
    })
}