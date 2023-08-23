import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const data = await req.formData();
    const id = data.get("id");

    const user = await prisma.user.findFirst({
        where: {
            id: id as string,

        }, include: {
            accounts: {

            }
        }
    })

    await prisma.$disconnect()

    if (!user) {
        return NextResponse.json({
            status: 404,
            msg: "User Not Found",
            data: null
        })
    }

    return NextResponse.json({
        status: 200,
        msg: "Found User",
        data: user
    })
}

