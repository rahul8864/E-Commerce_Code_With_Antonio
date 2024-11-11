import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

const ColorPage = async ({ params }: { params: Promise<{ colorId: string }> }) => {
    const { colorId } = await params
    const color = await prismadb.color.findUnique({ 
        where: {
            id: colorId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ColorForm initialData={color} />
            </div>
        </div>
    )
}

export default ColorPage;