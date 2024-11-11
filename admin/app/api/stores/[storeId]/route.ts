import prismadb from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"

export async function PATCH (
    req: Request,
    { params }: { params: Promise<{ storeId: string }>}
) {
    try {
        const { userId } = await auth();
        const { storeId } = await params;
        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if(!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: storeId,
                userId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store);
    } catch (err) {
        console.log('[STORE_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    } finally {

    }
}

//// Delete Method

export async function DELETE (
    req: Request,
    { params }: { params: Promise<{ storeId: string }>}
) {
    try {
        const { userId } = await auth();
        const { storeId } = await params;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: storeId,
                userId
            }
        })

        return NextResponse.json(store);
    } catch (err) {
        console.log('[STORE_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    } finally {

    }
}