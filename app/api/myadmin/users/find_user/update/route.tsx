import prisma from "@/libs/prisma";
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    const posted_data = await req.formData();
    const get_user = posted_data.get("user")
    const user: User = JSON.parse(get_user as string)


    try {
        const update_user = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                emailVerified: user.emailVerified,
                image: user.image,
                role: user.role,
                phone1: user.phone1,
                phone2: user.phone2,
                phone3: user.phone3,
                address: user.address,
                picture: user.picture,
                cartId: user.cartId,
                cityLimits: user.cityLimits as any,
                numberOfAllowedCities: user.numberOfAllowedCities,
                numberOfAllowedAds: user.numberOfAllowedAds,
                expiryDate: user.expiryDate,
                status: user.status as any,
                enabled: user.enabled,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }

        })

    } catch (err) {
        await prisma.$disconnect()
        return NextResponse.json({
            status: 500,
            msg: "Failed to update user",
            data: user
        })
    }
    await prisma.$disconnect()

    return NextResponse.json({
        status: 200,
        msg: "updated user",
        data: user
    })
}