import prisma from "@/libs/prisma";
import { get_user_from_session } from "@/utils/getUserData";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {


    const form_data = await req.formData();
    const user_id: string = form_data.get("user_id") as string
    const name: string = form_data.get("name") as string
    const phone1: string = form_data.get("phone1") as string
    const phone2: string = form_data.get("phone2") as string
    const description: string = form_data.get("description") as string



    const update_user = await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            name: name,
            phone1: phone1,
            phone2: phone2
        }
    })
    if (description !== null) {
        const add_description = await prisma.sellerProfile.upsert({
            where: {
                userId: user_id
            }, create: {
                userId: user_id,
                description1: description
            }
            , update: {
                description1: description
            }
        })
        
    }
    await prisma.$disconnect()
    return NextResponse.json({
        status: 200,
        msg: "user updated",
        data: update_user
    })
}