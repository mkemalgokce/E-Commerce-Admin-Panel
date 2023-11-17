"use client"

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-hot-toast"

import { AlertModal } from "@/components/modals/AlertModal.tsx"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { ProductColumn } from "./Columns.tsx"
import { deleteProduct } from "@/services/product.service.ts"

interface CellActionProps {
  data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const onConfirm = async () => {
    try {
      const storeId = params.storeId
      if (!storeId) return
      setLoading(true)
      await deleteProduct(data.id, storeId)
      toast.success("Product deleted.")
      navigate(0)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("Product ID copied to clipboard.")
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
            onClick={() => navigate(`/${params.storeId}/products/${data.id}`)}
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
