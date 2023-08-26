import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { NextApiRequest } from "next";

export async function GET(req: Request) {

}

export async function POST(req: Request, res: Response) {

    const data = await req.formData();
    const take = data.get("take") as string;
    const skip = data.get("skip") as string;

    const search_filter = data.get("search_filter") as any;

    const total = await prisma.user.count({
        where: {
            role: {
                in: search_filter === "ALL" ? ["ADMIN", "BUYER", "SELLER"] : [search_filter]
            }
        }
    })



    let users = await prisma.user.findMany({
        take: parseInt(take),
        skip: parseInt(skip),
        include: {
            _count: true,
        },
        where: {
            role: {
                in: search_filter === "ALL" ? ["ADMIN", "BUYER", "SELLER"] : [search_filter]
            }
        },
        orderBy:{
            createdAt: "desc"
        }

    })
    await prisma.$disconnect()
    return NextResponse.json({
        msg: "from users",
        data: {
            users: users,
            stats: {
                total: total,
                take: parseInt(take as string),
                skip: parseInt(skip as string),
            }

        },

    })
}