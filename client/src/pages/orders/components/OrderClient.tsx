import Heading from "@/components/Heading.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { DataTable } from "@/components/ui/data-table.tsx"

import { columns, OrderColumn } from "./Columns.tsx"

const OrderClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />

      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  )
}

export default OrderClient
