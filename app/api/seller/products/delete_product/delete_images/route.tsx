import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


export async function POST(req: Request, res: Response) {


    const form_data = await req.formData();
    const product_id: string = form_data.get("product_id") as string

    const public_ids_data = await prisma.imageProduct.findMany({
        where: {
            productId: product_id
        }, select: {
            public_id: true
        }
    })

    const public_ids: any = public_ids_data.map(p_id => {
        return p_id.public_id
    })

    const try_cloudinary_image_delete = await cloudinary.api.delete_resources(public_ids, { type: 'upload', resource_type: 'image' }).then(
        async () => {
            const delete_images_from_db = await prisma.imageProduct.deleteMany({
                where: {
                    productId: product_id as string
                }
            })

        }
    )
    await prisma.$disconnect()

    return NextResponse.json({
        msg: try_cloudinary_image_delete
    })
}


//     return NextResponse.json({
//         msg: "ok"
//     })
// }


// // cloudinary.v2.api
// //   .delete_resources(['g1trade/cll1anae90000rlb1kogc4lfk_cll6wttdg0001rlub8t1odmrz_1691777875', 'g1trade/cll1anae90000rlb1kogc4lfk_cll6wttdg0001rlub8t1odmrz_1691777872', 'g1trade/cll1anae90000rlb1kogc4lfk_cll6wttdg0001rlub8t1odmrz_1691777870', 'g1trade/cll1anae90000rlb1kogc4lfk_cll6wttdg0001rlub8t1odmrz_1691777827', 'g1trade/cll1anae90000rlb1kogc4lfk_cll4dgffz0001rl07bdflgr1y_1691627335', 'g1trade/cll1ao7qi0006rlb1nb7wf1t1_cll4ektcv0007rl07qjbaayyd_1691626407', 'g1trade/cll1anae90000rlb1kogc4lfk_cll4dgffz0001rl07bdflgr1y_1691624385', 'g1trade/cll1anae90000rlb1kogc4lfk_cll4dgffz0001rl07bdflgr1y_1691624379', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691615274', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691615138', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691614989', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691614843', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691614821', 'g1trade/cll1anae90000rlb1kogc4lfk_cll1xvo8l0003rl7h9dikzo88_1691614506', 'g1trade/cll1anae90000rlb1kogc4lfk_cll1xvo8l0003rl7h9dikzo88_1691611133'], 
// //     { type: 'upload', resource_type: 'image' })
// //   .then(//);
