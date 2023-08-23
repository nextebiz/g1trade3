import prisma from "@/libs/prisma";
import { WeightUnit } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData()
    const product_id = form_data.get("product_id") as string;
    const note = form_data.get("note") as string;
    const weight = parseInt(form_data.get("weight") as string)
    const weight_units = form_data.get("weight_units") as string;
    const user_id = form_data.get("user_id") as string;
    // const order_action = form_data.get("order_action")

    try {
        const save_order = await prisma.order.create({
            data: {
                productId: product_id,
                userId: user_id,
                weight: weight,
                weightUnit: weight_units as WeightUnit,
                note: note,
            }
        })

        await prisma.$disconnect()
        if (save_order) {
            return NextResponse.json({
                status: 200,
                msg: "order is placed"
            })
        }
    } catch (err) {
        await prisma.$disconnect()
        return NextResponse.json({
            status: 500,
            msg: "order is not placed placed",
            error: err
        })
    }
}
