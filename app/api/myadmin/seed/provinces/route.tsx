import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import prisma from "@/libs/prisma"


export async function GET(req: Request) {
    // const prisma = new PrismaClient();

    const result = await prisma.province.findMany({

        include: {
            city: true,
            _count: {
                select: {
                    city: true
                }
            }
        }
    })
    await prisma.$disconnect()
    return NextResponse.json({ msg: "found all provinces", data: result })
}
export async function POST(req: Request, res: Response) {

    // const prisma = new PrismaClient();

    const data = await req.formData()
    const provinces_string = data.get("provinces") as string
    const province_names: [] = JSON.parse(provinces_string)

    // const result = await prisma.province.createMany({
    //     data: province_names,
    //     skipDuplicates: true
    // })

    province_names.forEach(async (province: Province) => {
        const province_inserted = await prisma.province.create({
            data: {
                name: province.name
            }
        })
        let result: any = null;

        if (province_inserted?.id) {
            const city_with_province_id = province.city.map((city) => {
                city.provinceId = province_inserted.id as string
                return city
            })
            result = await prisma.city.createMany({
                data: city_with_province_id
            })
        }
    })

    await prisma.$disconnect()

    return NextResponse.json({ msg: "posted at provinces", result: "result" })
}