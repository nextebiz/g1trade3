import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto"
// import { v2 as cloudinary } from "cloudinary";

let timestamp = new Date().getTime();

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    const public_id: string = form_data.get("public_id") as string
    const image_id: string = form_data.get("image_id") as string

    const signature = generateSHA1(generateSignature(public_id, `${process.env.API_SECRET}`))

    form_data.append("signature", signature)
    form_data.append("api_key", `${process.env.API_KEY}`)
    form_data.append("timestamp", `${timestamp}`)

    if (public_id) {
        try {
            // let deleteimg = await cloudinary.uploader.destroy("malik/1690729629749sample_image")
            let delete_url = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/destroy`
            let delete_img = await fetch(delete_url, { method: "POST", body: form_data })
            const delete_response = await delete_img.json();

            if (delete_response.result === "ok") {
                const delete_image = await prisma.imageProduct.delete({
                    where: {
                        id: image_id
                    }
                })
                return NextResponse.json({
                    status: 200,
                    msg: "deleted image"
                })
            }
        } catch (err) {
        await prisma.$disconnect()

            return NextResponse.json({
                status: 500,
                msg: "failed to delete image",
                data: err
            })
        }
    }
    await prisma.$disconnect()

    return NextResponse.json({
        status: 400,
        msg: "failed to delete image"
    })
}

const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};