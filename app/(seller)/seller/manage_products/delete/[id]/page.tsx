// // cloudinary.v2.api
// //   .delete_resources(['g1trade/cll1anae90000rlb1kogc4lfk_cll6wttdg0001rlub8t1odmrz_1691777875', 'g1trade/cll1anae90000rlb1kogc4lfk_cll6wttdg0001rlub8t1odmrz_1691777872', 'g1trade/cll1anae90000rlb1kogc4lfk_cll6wttdg0001rlub8t1odmrz_1691777870', 'g1trade/cll1anae90000rlb1kogc4lfk_cll6wttdg0001rlub8t1odmrz_1691777827', 'g1trade/cll1anae90000rlb1kogc4lfk_cll4dgffz0001rl07bdflgr1y_1691627335', 'g1trade/cll1ao7qi0006rlb1nb7wf1t1_cll4ektcv0007rl07qjbaayyd_1691626407', 'g1trade/cll1anae90000rlb1kogc4lfk_cll4dgffz0001rl07bdflgr1y_1691624385', 'g1trade/cll1anae90000rlb1kogc4lfk_cll4dgffz0001rl07bdflgr1y_1691624379', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691615274', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691615138', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691614989', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691614843', 'g1trade/cll1anae90000rlb1kogc4lfk_cll47s4sn000drl3rb7lzpeaj_1691614821', 'g1trade/cll1anae90000rlb1kogc4lfk_cll1xvo8l0003rl7h9dikzo88_1691614506', 'g1trade/cll1anae90000rlb1kogc4lfk_cll1xvo8l0003rl7h9dikzo88_1691611133'], 
// //     { type: 'upload', resource_type: 'image' })

// import { v2 as cloudinary } from "cloudinary";
// import { NextResponse } from "next/server";

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });

// export async function POST(req: Request, res: Response) {

//     const form_data = await req.formData();
//     const product_id = form_data.get("product_id")
//     // const public_ids = form_data.get("public_ids[]")

//     return NextResponse.json({
//         msg: "DONE"
//     })
// }

import React from 'react'

export default function DeleteTest() {
  return (
    <div>DeleteTest</div>
  )
}
