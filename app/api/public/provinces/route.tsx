import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    const provinces = await prisma.province.findMany({
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
        msg: "provinces with cities",
        data: provinces
    })
}