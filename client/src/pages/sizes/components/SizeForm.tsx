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

import { SizeDocument, SizeCreateAttributes } from "@shared/size.document.ts"
import { createSize, deleteSize, updateSize } from "@/services/size.service.ts"

interface SizeFormProps {
  initialData: SizeDocument | null
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams()
  const navigate = useNavigate()

  const storeId = params.storeId
  console.log("QWewqe params:", params)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const title = initialData ? "Edit Size" : "Create Size"
  const description = initialData ? "Edit a Size." : "Add a new Size"
  const toastMessage = initialData ? "Size updated." : "Size created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<SizeCreateAttributes>({
    resolver: zodResolver(SizeCreateAttributes),
    defaultValues: initialData || {
      name: "",
      value: ""
    }
  })
  if (!storeId) return null
  const onSubmit = async (data: SizeCreateAttributes) => {
    console.log("Data", data)
    try {
      setLoading(true)
      if (initialData) {
        await updateSize(data, initialData.id, storeId)
      } else {
        if (!data.name && !data.value) return
        await createSize(data, storeId)
      }

      navigate(`/${storeId}/sizes`)
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
      await deleteSize(initialData.id, storeId)
      navigate(`/${params.storeId}/sizes`)
      toast.success("Size deleted.")
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
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
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
