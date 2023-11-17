import { ApiAlert } from "@/components/ui/ApiAlert.tsx"
import { useParams } from "react-router-dom"

interface ApiListProps {
  entityName: string
  entityIdName: string
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName
}) => {
  const params = useParams()

  console.log("params:", params)
  const baseUrl = `${origin}/${params.storeId}`

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  )
}
