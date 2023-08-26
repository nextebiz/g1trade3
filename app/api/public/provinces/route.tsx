import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const provinces = await prisma.province.findMany({
        where: {
            
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
                                        status: "APPROVED",
                                        User: {
                                            expiryDate: {
                                                gt: new Date()
                                            }
                                        }
                                
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
                                status: "APPROVED",
                                User: {
                                    expiryDate: {
                                        gt: new Date()
                                    }
                                }
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