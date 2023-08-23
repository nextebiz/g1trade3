import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import prisma from "@/libs/prisma"


export async function GET(req: Request) {

    return NextResponse.json({
        msg: "Cities",

    })
}


export async function POST(req: Request) {

    // const prisma = new PrismaClient();

    const formdata = await req.formData()
    const province_id = formdata.get("province_id") as string

    const cities = await prisma.city.findMany({
        where: {
            provinceId: province_id
        }
    })

    await prisma.$disconnect();

    return NextResponse.json({
        msg: "Cities",
        cities: cities

    })
}