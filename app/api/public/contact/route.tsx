import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {


    const form_data = await req.formData();
    const user_id = form_data.get("user_id") as string;
    const department = form_data.get("department") as string;
    const message = form_data.get("message") as string;

    const save_message = await prisma.adminMessages.create({
        data: {
            department: department,
            message: message,
            userId: user_id,
            action: "PENDING"
        }
    })
    console.log(save_message)

    return NextResponse.json({
        status: 200,
        msg: "sent"
    })
}