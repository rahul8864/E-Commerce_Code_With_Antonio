import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import { ColorClient } from './components/client'
import { ColorColumn } from './components/columns'

const ColorsPage = async ({ 
    params
}: { 
    params: Promise<{ storeId: string }>
}) => {

    const { storeId } = await params;
    const colors = await prismadb.color.findMany({
        where: {
            storeId: storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedColors: ColorColumn[] = colors.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    )
}

export default ColorsPage;