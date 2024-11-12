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

        const { name, billboardId } = body; 
        const { storeId } = await params; 

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400});
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

        const category = await prismadb.category.create({
            data : {
                name,
                billboardId,
                storeId: storeId
            }
        })

        return NextResponse.json(category);

    } catch (err) {
        console.log(`[CATEGORIES_POST] ${err}`);
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

        const categories = await prismadb.category.findMany({
            where: {
                storeId: storeId
            }
        })

        return NextResponse.json(categories);

    } catch (err) {
        console.log(`[CATEGORIES_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}