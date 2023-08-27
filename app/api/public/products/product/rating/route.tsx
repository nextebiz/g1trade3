import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const form_data = await req.formData();
    const product_id = form_data.get("product_id") as string;
    let skip = 0;

    const get_skip = parseInt(form_data.get("skip") as string);
    if (get_skip > 0) {
        skip = get_skip
    }

    let take = 10;

    const get_take = parseInt(form_data.get("take") as string);
    if (get_take > 0) {
        take = get_take
    }

    const ratings = await prisma.productRating.findMany({
        where: {
            productId: product_id
        },
        include: {
            User: {
                select: {
                    name: true
                }
            }
        },
        take: take,
        skip: skip,
        orderBy:{
            createdAt: "desc"
        }
    })
    const count_ratings = await prisma.productRating.count({ where: { productId: product_id } })
    if (ratings) {
        return NextResponse.json({
            msg: "ratings",
            data: {
                ratings: ratings,
                stats: {
                    total: count_ratings,
                    take: take,
                    skip: skip
                }
            }
        })
    }

    return NextResponse.json(
        {
            msg: "ratings",
            data: {
                ratings: [],
                stats: {
                    total: 0,
                    take: take,
                    skip: skip
                }
            }
        }
    )
}