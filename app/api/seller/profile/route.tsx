import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();

    const user_id: string = form_data.get("user_id") as string
    // const description: string = form_data.get("description") as string

    const get_profile = await prisma.sellerProfile.findFirst({
        where: {
            userId: user_id
        }
    })

    await prisma.$disconnect()

    if (get_profile) {
        return NextResponse.json({
            status: 200,
            msg: "profile",
            data: get_profile
        })
    }

    return NextResponse.json({
        status: 404,
        msg: "failed to find seller's profile"
    })
}