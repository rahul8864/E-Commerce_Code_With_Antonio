import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({ params }: { params: Promise<{ billboardId: string }> }) => {
    const { billboardId } = await params
    const billboard = await prismadb.billboard.findUnique({ 
        where: {
            id: billboardId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    )
}

export default BillboardPage;