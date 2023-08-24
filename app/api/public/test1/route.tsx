import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // const mykey = process.env.JWT_SECRET;
    return NextResponse.json({
        msg: "hello2", 
        // key: mykey
    })
}