import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        msg: "test"
    })
}


export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const user_id: string = form_data.get("user_id") as string

    const take = parseInt(form_data.get("take") as string)
    const skip = parseInt(form_data.get("skip") as string)
    if (user_id !== null) {
        const total = await prisma.product.count({
            where: {
                userId: user_id,
                enabled: true,
                AND: {
                    User: {
                        enabled: true
                    }
                }
            }
        })

        const products = await prisma.product.findMany({
            take: take,
            skip: skip,
            where: {
                userId: user_id,
                enabled: true,
                AND: {
                    User: {
                        enabled: true
                    }
                }
            }, orderBy: {
                createdAt: "desc"
            }, include: {
                productCity: {
                    include: { City: true }
                },
                Category: true,
                images: {
                    // take: 1, 
                    // orderBy: {
                    //     // id: "desc"
                    // }
                }
            }
        })
        await prisma.$disconnect()

        if (!products) {
            return NextResponse.json({
                status: 404,
                msg: "Product Not Found",
                data: null
            })
        }

        return NextResponse.json({
            status: 200,
            msg: "Products Found",
            data: {
                status: 200,
                products: products,
                pagination: {
                    total: total,
                    take: take,
                    skip: skip
                }
            }
        })
    } else {
        return NextResponse.json({
            status: 500,
            msg: "User ID is missing",
            data: null
        })
    }
}