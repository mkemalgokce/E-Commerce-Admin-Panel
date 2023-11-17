import Heading from "@/components/Heading.tsx"
import { Button } from "@/components/ui/button.tsx"
import { PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table.tsx"
import { ApiList } from "@/components/ui/api-list.tsx"

import { columns, ColorColumn } from "@/pages/colors/components/Columns.tsx"

const ColorClient = ({ data }: { data: ColorColumn[] }) => {
  const params = useParams()
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage Colors for your store"
        />
        <Button onClick={() => navigate(`/${params.storeId}/colors/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  )
}

export default ColorClient
