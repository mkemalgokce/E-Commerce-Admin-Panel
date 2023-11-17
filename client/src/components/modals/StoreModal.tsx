import z from "zod"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/components/ui/modal.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { StoreCreateAttributes } from "@shared/store.document.ts"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { useModalStore } from "@/stores/storeModal.store.ts"
import { createStore } from "@/services/store.service.ts"
import { useState } from "react"
const StoreModal = () => {
  const { isOpen, closeModal } = useModalStore()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof StoreCreateAttributes>>({
    resolver: zodResolver(StoreCreateAttributes),
    defaultValues: {
      name: "",
      description: ""
    }
  })
  const onSubmit = async (data: z.infer<typeof StoreCreateAttributes>) => {
    setLoading(true)
    try {
      const store = await createStore(data)
      console.log(store)
      closeModal()
      toast.success("Store created successfully")
      window.location.assign(`/${store.id}`)
    } catch (e: any) {
      toast.error(e.message ?? "Store creation failed")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage your products and orders in one place."
      isOpen={isOpen}
      onClose={closeModal}
    >
      <div>
        <div className="space-y-4 pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex-col items-center justify-center"
            >
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store name</FormLabel>
                    <FormControl>
                      <Input placeholder="Store name" {...field} />
                    </FormControl>
                    <FormMessage className="py-0" />
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

              <div
                className="flex w-full items-center justify-end space-x-2
              object-top pt-6"
              >
                <Button
                  loading={loading}
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button loading={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal
