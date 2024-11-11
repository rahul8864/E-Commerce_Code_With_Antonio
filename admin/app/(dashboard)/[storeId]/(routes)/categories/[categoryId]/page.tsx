import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({ params }: { params: Promise<{ categoryId: string, storeId: string }> }) => {
    const { categoryId, storeId } = await params;
    const category = await prismadb.category.findUnique({ 
        where: {
            id: categoryId
        }
    });

    const billboards = await prismadb.billboard.findMany({ 
        where: {
            storeId: storeId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <CategoryForm billboards={billboards} initialData={category} />
            </div>
        </div>
    )
}

export default CategoryPage;