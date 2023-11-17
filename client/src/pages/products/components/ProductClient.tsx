import Heading from "@/components/Heading.tsx"
import { Button } from "@/components/ui/button.tsx"
import { PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table.tsx"
import { ApiList } from "@/components/ui/api-list.tsx"

import { columns, ProductColumn } from "@/pages/products/components/Columns.tsx"

const ProductClient = ({ data }: { data: ProductColumn[] }) => {
  const params = useParams()
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage Products for your store"
        />
        <Button onClick={() => navigate(`/${params.storeId}/products/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  )
}

export default ProductClient
