"use client"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
// import { Billboard } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <Heading
                title={`Order (${data?.length})`}
                description="Manage orders for your store"/>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </>
    )
}