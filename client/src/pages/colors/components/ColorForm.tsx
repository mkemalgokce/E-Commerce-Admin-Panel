"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"

import { useParams, useNavigate } from "react-router-dom"

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

import {
  createColor,
  deleteColor,
  updateColor
} from "@/services/color.service.ts"
import { ColorCreateAttributes, ColorDocument } from "@shared/color.document.ts"

interface ColorFormProps {
  initialData: ColorDocument | null
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const params = useParams()
  const navigate = useNavigate()

  const storeId = params.storeId

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const title = initialData ? "Edit Color" : "Create Color"
  const description = initialData ? "Edit a Color." : "Add a new Color"
  const toastMessage = initialData ? "Color updated." : "Color created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<ColorCreateAttributes>({
    resolver: zodResolver(ColorCreateAttributes),
    defaultValues: initialData || {
      name: "",
      hexCode: ""
    }
  })
  if (!storeId) return null
  const onSubmit = async (data: ColorCreateAttributes) => {
    console.log("Data", data)
    try {
      setLoading(true)
      if (initialData) {
        await updateColor(data, initialData.id, storeId)
      } else {
        if (!data.name && !data.hexCode) return
        await createColor(data, storeId)
      }
      navigate(`/${storeId}/colors`)
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
      await deleteColor(initialData.id, storeId)
      navigate(`/${params.storeId}/colors`)
      toast.success("Color deleted.")
    } catch (error) {
      console.log("Error:", error)
      toast.error("Unknown Error")
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
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hexCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="rounded-full border p-4"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
