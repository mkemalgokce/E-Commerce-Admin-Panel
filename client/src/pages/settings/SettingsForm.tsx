import { StoreDocument } from "@shared/store.document.ts"
import { FC, useState } from "react"
import Heading from "@/components/Heading.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator.tsx"
import { StoreUpdateAttributes } from "@shared/store.document.ts"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input.tsx"

import {
  deleteStore,
  getStores,
  updateStore
} from "@/services/store.service.ts"
import { useStoresStore } from "@/stores/stores.store.ts"
import { AlertModal } from "@/components/modals/AlertModal.tsx"
import { useNavigate } from "react-router-dom"
import { ApiAlert } from "@/components/ui/ApiAlert.tsx"

interface SettingsFormProps {
  initialStore: StoreDocument
}
const SettingsForm: FC<SettingsFormProps> = ({ initialStore }) => {
  const form = useForm<StoreUpdateAttributes>({
    resolver: zodResolver(StoreUpdateAttributes),
    defaultValues: {
      name: initialStore.name,
      description: initialStore.description
    }
  })
  const params = useParams()
  const setStore = useStoresStore(state => state.setStores)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const onSubmit = async (data: StoreUpdateAttributes) => {
    setLoading(true)
    try {
      const store = await updateStore(data, initialStore.id)
      if (!store) return toast.error("Something went wrong")
      const updatedStores = await getStores()

      setStore(updatedStores)
      toast.success("Store Updated")
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      const isDeleted = await deleteStore(initialStore.id)
      if (!isDeleted) return toast.error("Something went wrong")
      const updatedStores = await getStores()
      setStore(updatedStores)
      toast.success("Store Deleted")
      setOpen(false)
      navigate("/")
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong")
    }
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between px-2">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => {
            setOpen(true)
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 space-y-8 px-2"
        >
          <div className="grid w-full max-w-screen-lg grid-cols-2 content-center space-x-2">
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="name"
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="description"
            />
          </div>

          <Button type="submit" loading={loading} disabled={loading}>
            Save
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="PUCLIC_API_URL"
        description={`${import.meta.env.VITE_SERVER_URL + "/" + params.id}`}
        variant="public"
      />
    </>
  )
}

export default SettingsForm
