import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb";

interface DashboardType {
    children: React.ReactNode;
    params: { storeId: string }
}

export default async function SetupLayout({children}: DashboardType) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb?.store?.findFirst({
        where: {
            userId
        }
    })

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    )
}