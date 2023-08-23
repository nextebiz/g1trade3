
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/libs/prisma';


export const POST = async (req: Request, res: Response) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ msg: "You are not logged in" })
    }

    if (session?.user?.role === "BUYER") {
        const data = await req.formData();
        // const prismaclient = new PrismaClient()
        const create_message = await prisma.message.create({
            data: {
                message: data.get("msg") as string
            }
        })
        await prisma.$disconnect()

        return NextResponse.json({ msg: "hi", session: session })
    } else {
        return NextResponse.json({ msg: "you are a seller", session: session })

    }
}