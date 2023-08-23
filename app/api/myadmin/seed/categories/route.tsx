import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import prisma from "@/libs/prisma"

export async function GET(req: Request) {
    // const prisma = new PrismaClient()

    const data = await prisma.category.findMany({})

    await prisma.$disconnect()
    return NextResponse.json({
        msg: "categories",
        data: data
    })
}

export async function POST(req: Request, res: Response) {
    // const prisma = new PrismaClient()
    const formData = await req.formData();
    const categories = JSON.parse(formData.get("categories") as string)

    const postData = await prisma.category.createMany({
        data: categories
    })
    await prisma.$disconnect()
    return NextResponse.json({
        msg: "post for cat",
        postData: postData
    })
}