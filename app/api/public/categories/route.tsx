import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const data = await prisma.category.findMany({
        where: {
            enabled: true,
            
        }
    })

    await prisma.$disconnect()
    return NextResponse.json({
        msg: "categories",
        data: data
    })
}