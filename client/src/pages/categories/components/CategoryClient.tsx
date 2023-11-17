import Heading from "@/components/Heading.tsx"
import { Button } from "@/components/ui/button.tsx"
import { PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table.tsx"
import { ApiList } from "@/components/ui/api-list.tsx"

import {
  columns,
  CategoryColumn
} from "@/pages/categories/components/Columns.tsx"

const CategoryClient = ({ data }: { data: CategoryColumn[] }) => {
  const params = useParams()
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage Categories for your store"
        />
        <Button onClick={() => navigate(`/${params.storeId}/categories/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Category" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  )
}

export default CategoryClient
