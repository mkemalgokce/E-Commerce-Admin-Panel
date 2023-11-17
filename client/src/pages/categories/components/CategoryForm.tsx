"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import {
  CategoryCreateAttributes,
  CategoryDocument,
  CategoryUpdateAttributes
} from "@shared/category.document.ts"
import { useParams, useNavigate } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/Heading.tsx"
import { AlertModal } from "@/components/modals/AlertModal.tsx"
import {
  createCategory,
  deleteCategory,
  updateCategory
} from "@/services/category.service.ts"
import { BillboardDocument } from "@shared/billboard.document.ts"

interface CategoryFormProps {
  initialData: CategoryDocument | null
  billboards: BillboardDocument[]
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards
}) => {
  const params = useParams()
  const navigate = useNavigate()

  const storeId = params.storeId
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const title = initialData ? "Edit Category" : "Create Category"
  const description = initialData ? "Edit a Category." : "Add a new Category"
  const toastMessage = initialData ? "Category updated." : "Category created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<CategoryCreateAttributes>({
    resolver: zodResolver(CategoryCreateAttributes),
    defaultValues: {
      ...initialData,
      billboardId: initialData?.billboard?.id ?? ""
    } || {
      name: "",
      description: "",
      billboardId: ""
    }
  })
  if (!storeId) return null
  const onSubmit = async (data: CategoryUpdateAttributes) => {
    console.log("Data", data)
    try {
      setLoading(true)
      if (initialData) {
        await updateCategory(data, initialData.id, storeId)
      } else {
        if (!data.name && !data.description && !data.billboardId) return
        await createCategory(
          {
            name: data.name!,
            description: data.description!,
            billboardId: data.billboardId!
          },
          storeId
        )
      }

      navigate(`/${storeId}/categories`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      if (!initialData) return
      await deleteCategory(initialData.id, storeId)
      navigate(`/${params.storeId}/categories`)
      toast.success("Category deleted.")
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this Category first."
      )
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="flex w-full items-end justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-2 flex w-full max-w-lg flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map(billboard => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
