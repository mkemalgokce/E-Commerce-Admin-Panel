import { useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useParams, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modals/AlertModal.tsx"

import { SizeColumn } from "./Columns.tsx"
import { deleteSize } from "@/services/size.service.ts"

interface CellActionProps {
  data: SizeColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    try {
      setLoading(true)
      if (!params.storeId) return null
      await deleteSize(data.id, params.storeId)
      navigate(0)
      toast.success("Billboard deleted.")
      //window.location.reload( )
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
      )
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("Billboard ID copied to clipboard.")
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/${params.storeId}/sizes/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
