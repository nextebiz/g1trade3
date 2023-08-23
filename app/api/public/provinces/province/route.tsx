import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const province_id = form_data.get("province_id")

    const province = await prisma.province.findFirst({
        where: {
            id: province_id as string
        },
        include: {
            city: {
                where: {
                    enabled: true,
                },
                orderBy: {
                    name: "asc"
                },
                include: {
                    _count: {
                        select: {
                            product: {
                                where: {
                                    Product: {
                                        enabled: true,
                                        status: "APPROVED"
                                    }
                                }
                            }
                        }
                    }
                }
            }

            , _count: {
                select: {
                    product: {
                        where: {
                            Product: {
                                enabled: true,
                                status: "APPROVED"
                            }
                        }
                    }
                }
            },
        },
        orderBy: {
            name: "asc"
        }
    })
    await prisma.$disconnect()

    return NextResponse.json({
        status: 200,
        msg: "Found Province",
        data: province
    })
}