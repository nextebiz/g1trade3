import prisma from "@/libs/prisma";
import { OrderActions } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const user_id = form_data.get("user_id") as string
    const order_action = form_data.get("order_action") as string;
    const skip = parseInt(form_data.get("skip") as string);
    // const skip = 0;
    const take = 20;
    // console.log("form_data")
    // console.log(form_data)


    const [orders, count, pending_count, accepted_count, delivered_count, cancelled_count] = await prisma.$transaction([
        prisma.order.findMany({
            where: {
                product: {
                    User: {
                        id: user_id
                    }
                },
                // userId: user_id,
                orderAction: order_action as OrderActions
            },
            orderBy: {
                createdAt: "desc"
            },
            take: take,
            skip: skip,
            include: {
                product: true,
                user: true,
            }
        }),
        prisma.order.count({
            where: {
                product: {
                    User: {
                        id: user_id
                    }
                },
                orderAction: order_action as OrderActions
            },
            // take: take,
            // skip: skip,
        }),
        prisma.order.count({
            where: {
                product: {
                    User: {
                        id: user_id
                    }
                },
                orderAction: "PENDING"
            },
        }),
        prisma.order.count({
            where: {
                product: {
                    User: {
                        id: user_id
                    }
                },
                orderAction: "ACCEPTED"
            },
        }),
        prisma.order.count({
            where: {
                product: {
                    User: {
                        id: user_id
                    }
                },
                orderAction: "DELIVERED"
            },
        }),
        prisma.order.count({
            where: {
                product: {
                    User: {
                        id: user_id
                    }
                },
                orderAction: "CANCELLED"
            },
        }),
    ])
    await prisma.$disconnect()

    return NextResponse.json({
        status: 200,
        msg: "orders",
        data: {
            orders: orders,
            skip: skip,
            take: take,
            total: count,
            pending_count,
            accepted_count,
            delivered_count,
            cancelled_count
        }
    })
}