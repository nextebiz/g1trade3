import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/libs/prisma";

export async function GET(req: Request) {
    // const form_data = await req.formData();
    // const product_id = form_data.get("product_id")
    // const product = await prisma.product.findFirst({
    //     where: {
    //         id: product_id as string
    //     }
    // })
    // if (!product) {
    //     return NextResponse.json({
    //         status: 404,
    //         msg: "Product not found",
    //         data: null
    //     })
    // }
    return NextResponse.json({
        status: 200,
        msg: "get for product",
        data: []
    })
}

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions)

    const data = await req.formData()

    if (!session) {
        return NextResponse.json({
            msg: "You are not logged in"
        })
    }

    if (session?.user.role !== "SELLER") {
        return NextResponse.json({
            msg: "Buyer is not allowed to access this page"
        })
    }

    if (session?.user.role == "SELLER") {

    }

    return NextResponse.json({ msg: "post products" })
}