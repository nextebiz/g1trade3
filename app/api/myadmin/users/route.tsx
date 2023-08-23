import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { NextApiRequest } from "next";

export async function GET(req: Request) {

}

export async function POST(req: Request, res: Response) {

    const data = await req.formData();
    const take = data.get("take")
    const skip = data.get("skip")

    const total = await prisma.user.count()

    let users = await prisma.user.findMany({
        take: parseInt(take as string),
        skip: parseInt(skip as string),
        include: {
            _count: true,
        }
    })
    await prisma.$disconnect()
    return NextResponse.json({
        msg: "from users",
        data: {
            users: users,
            total: total,
            take: parseInt(take as string),
            skip: parseInt(skip as string),
        },

    })
}