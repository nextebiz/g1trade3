import { NextResponse } from "next/server";
import crypto from "crypto"
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/libs/prisma";

let timestamp = new Date().getTime();


export async function POST(req: Request, res: Response) {

    // post image and get 800 width image like this
    //https://res.cloudinary.com/demo/image/fetch/w_800,f_auto/https://res.cloudinary.com/dcfqlyms8/image/upload/v1691487689/g1trade/cll1anae90000rlb1kogc4lfk_cll1xvo8l0003rl7h9dikzo88_1691487685.png

    const formData = await req.formData();
    let file_name = formData.get("file_name")
    let public_id = "g1trade/" + file_name;

    const signature = generateSHA1(generateSignature(public_id, `${process.env.API_SECRET}`))

    // let myfile = formData.get("myfile") as any;
    // formData.append("file", myfile)
    // const signature = await generateSHA1(signature_string)
    formData.append("public_id", public_id)
    formData.append("signature", signature)
    formData.append("api_key", `${process.env.API_KEY}`)
    formData.append("timestamp", `${timestamp}`)
    const product_id = formData.get("product_id")

    let url = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`;


    try {
        const fetch_cloudinary = await fetch(url, { method: "POST", body: formData })
        const cloudinary_upload_response = await fetch_cloudinary.json()


        if (cloudinary_upload_response?.url) {
            const add_image_to_db = await prisma.imageProduct.create({
                data: {
                    url: cloudinary_upload_response.url,
                    productId: product_id as string, 
                    asset_id: cloudinary_upload_response.asset_id as string, 
                    public_id: cloudinary_upload_response.public_id as string
                }
            })
        await prisma.$disconnect()

            return NextResponse.json({
                status: 200,
                msg: "Image Uploaded",
                data: add_image_to_db
            })
            // above response will return {
            // id: 'cll25zzfu0001rllhygmq9t8r',
            // url: 'http://res.cloudinary.com/dcfqlyms8/image/upload/v1691490885/g1trade/cll1anae90000rlb1kogc4lfk_cll1xvo8l0003rl7h9dikzo88_1691490879.png',
            // productId: 'cll1xvo8l0003rl7h9dikzo88'
        } else {
            // return NextResponse.json({
            //     status: 500,
            //     msg: "Erro uploading image",
            //     data: add_image_to_db
            // })
        }
    } catch (err) {
        await prisma.$disconnect()

        return NextResponse.json({
            status: 500,
            msg: "Erro uploading image",
            data: (err)
        })
    }

}

const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};