import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await prisma.category.findMany({
        where:{
            enabled: true        }
    })

    await prisma.$disconnect()
    return NextResponse.json({
        msg: "categories",
        data: data
    })
}