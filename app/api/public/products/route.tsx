import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function POST(req: Request, res: Response) {

    const form_data = await req.formData();
    let page = parseInt(form_data.get("page") as string);
    let province_id = form_data.get("province_id") as string
    let city_id = form_data.get("city_id") as string
    let category_id = form_data.get("category_id") as string;

    let take = 4;
    let skip = 0;

    if (page > 1) {
        skip = (take * page) - take
    }

    let citySearch = {}
    let categorySearch = {}
    let some_obj = {}

    if (category_id !== null) {
        categorySearch = {
            id: category_id
        }
    }

    if (province_id !== null) {
        some_obj = {
            provinceId: province_id,
        }
    }


    if (province_id !== null && city_id !== null) {
        some_obj = {
            provinceId: province_id,
            cityId: city_id
        }
    }
    // if (province_id !== null) {
    //     citySearch = {
    //         some: {
    //             provinceId: province_id,
    //             cityId: "cll7nomq0004drlp6hrez177b"
    //         }
    //     }
    // }

    if (province_id !== null) {
        citySearch = {
            some: some_obj
        }
    }



    const query: Prisma.ProductFindManyArgs = {
        take: take,
        skip: skip,
        where: {
            enabled: true,
            status: "APPROVED",
            productCity: citySearch,
            Category: categorySearch,
            User: {
                expiryDate:{
                    gt: new Date()
                }
            }
        },
        include: {
            _count: true,
            images: true,
            Category: true,
            User: true,
            rating: {
                select: {
                    stars: true
                }
            },
            productCity: {
                include: {
                    City: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    }



    const [products, count] = await prisma.$transaction([
        prisma.product.findMany(query),
        prisma.product.count({ where: query.where })
    ])
    await prisma.$disconnect()

    return NextResponse.json({
        msg: "products",
        data: products,
        stats: {
            count: count,
            take: take,
            page: page
        }
    })
}