import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { name, value } = body;
        const { storeId } = await params; 

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400});
        }

        if (!storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const color = await prismadb.color.create({
            data : {
                name,
                value,
                storeId: storeId
            }
        })

        return NextResponse.json(color);

    } catch (err) {
        console.log(`[COLORS_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params; 
        
        if (!storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const colors = await prismadb.color.findMany({
            where: {
                storeId: storeId
            }
        })

        return NextResponse.json(colors);

    } catch (err) {
        console.log(`[COLORS_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}