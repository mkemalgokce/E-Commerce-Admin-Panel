import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import {
  BillboardDocument,
  BillboardUpdateAttributes,

} from "@shared/billboard.document.ts"
import { useParams, useNavigate } from "react-router-dom"
import axios from "@/utils/axios.ts"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import ImageUpload from "@/components/ImageUpload.tsx"
import {
  createBillboard,
  updateBillboard
} from "@/services/billboard.service.ts"

interface BillboardFormProps {
  initialData: BillboardDocument | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData
}) => {
  const params = useParams()
  const navigate = useNavigate()

  const storeId = params.storeId
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit billboard" : "Create billboard"
  const description = initialData ? "Edit a billboard." : "Add a new billboard"
  const toastMessage = initialData ? "Billboard updated." : "Billboard created."
  const action = initialData ? "Save changes" : "Create"
  if (!storeId) return null
  const form = useForm<BillboardUpdateAttributes>({
    resolver: zodResolver(BillboardUpdateAttributes),
    defaultValues: initialData || {
      name: "",
      description: "",
      image: ""
    }
  })

  const onSubmit = async (data: BillboardUpdateAttributes) => {
    try {
      setLoading(true)
      if (initialData) {
        await updateBillboard(data, initialData.id, storeId)
      } else {
        console.log("Store id", storeId)
        if (!data.name && !data.description && !data.image) return
        await createBillboard(
          {
            name: data.name!,
            description: data.description!,
            image: data.image!
          },
          storeId
        )
      }

      navigate(`/${storeId}/billboard`)
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      )
      navigate(0)
      navigate(`/${params.storeId}/billboards`)
      toast.success("Billboard deleted.")
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
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
      <Form {...form}>
        <div className="flex items-end justify-between w-full">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-8 mx-2 max-w-lg"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      onDataChange={url => field.onChange(url)}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Billboard label"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Billboard description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <Button disabled={loading} className="" type="submit">
              {action}
            </Button>
          </form>
        </div>

      </Form>
    </>
  )
}
