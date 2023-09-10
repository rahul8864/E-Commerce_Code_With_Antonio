import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

interface DashboardType {
    children: React.ReactNode;
    params: { storeId: string }
}

export default async function Dashboard({children, params}: DashboardType) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb?.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}