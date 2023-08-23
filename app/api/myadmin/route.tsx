import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return NextResponse.json({ msg: "hi form myadmin" })
}
export async function POST(req: Request, res: Response) {
    return NextResponse.json({ msg: "posted at MY ADMIN" })
}