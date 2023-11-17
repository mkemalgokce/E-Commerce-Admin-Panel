import Heading from "@/components/Heading.tsx"
import { Button } from "@/components/ui/button.tsx"
import { PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table.tsx"
import { ApiList } from "@/components/ui/api-list.tsx"

import {
  columns,
  BillboardColumn
} from "@/pages/billboards/components/Columns.tsx"

const BillboardClient = ({ data }: { data: BillboardColumn[] }) => {
  const params = useParams()
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => navigate(`/${params.storeId}/billboards/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
}

export default BillboardClient
