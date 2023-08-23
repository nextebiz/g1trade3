import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prisma";
import { ProductCity, WeightUnit } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // const form_data = await req.formData();
    // const product_id = form_data.get("product_id")
    // const product = await prisma.product.findFirst({
    //     where: {
    //         id: product_id as string
    //     }
    // })
    // if (!product) {
    //     return NextResponse.json({
    //         status: 404,
    //         msg: "Product not found",
    //         data: null
    //     })
    // }
    // return NextResponse.json({
    //     status: 200,
    //     msg: "Product not found",
    //     data: product
    // })
}

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions)

    const posted_data = await req.formData()

    if (!session) {
        return NextResponse.json({
            status: 405,
            msg: "You are not logged in",
            data: null
        })
    }

    if (session?.user.role !== "SELLER") {
        return NextResponse.json({
            status: 405,
            msg: "Buyer is not allowed to access this page",
            data: null
        })
    }

    if (session?.user.role == "SELLER") {

        const userId = session?.user.id;
        const title = posted_data.get("title") as string;
        const categoryId = posted_data.get("categoryId") as string;
        const weight = parseFloat(posted_data.get("weight") as string)
        const weightUnit = posted_data.get("weightUnit") as string as WeightUnit;
        const price = parseInt(posted_data.get("price") as string);
        const priceUnit = posted_data.get("priceUnit") as string as WeightUnit;
        const receiveOffers_str = posted_data.get("receiveOffers") as string;
        const receiveOffers = receiveOffers_str.toLowerCase() === "true"
        const description = posted_data.get("description") as string;

        const cities: City[] = JSON.parse(posted_data.get("cities[]") as string) as City[]
        const save_data = {
            userId: userId,
            title: title,
            categoryId: categoryId,
            weight: weight,
            weightUnit: weightUnit,
            price: price,
            priceUnit: priceUnit,
            receiveOffers: receiveOffers,
            description: description

        }

        const create_product = await prisma.product.create({
            data: save_data,
        })
        const cities_to_add: ProductCity[] = cities.map(city => {
            return {
                // City: city,
                cityId: city.id,
                productId: create_product.id,
                provinceId: city.provinceId
            }
        })

        if (create_product) {
            const add_cities = await prisma.productCity.createMany({
                data: cities_to_add
            })
        }

        await prisma.$disconnect()


        return NextResponse.json({
            status: 200,
            msg: "Product is added",
            data: create_product
        })
    }

    return NextResponse.json({ msg: "post products" })
}