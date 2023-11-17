import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useParams, useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/Heading.tsx"
import { AlertModal } from "@/components/modals/AlertModal.tsx"

import {
  ProductDocument,
  ProductCreateAttributes
} from "@shared/product.document.ts"
import {
  createProduct,
  deleteProduct,
  updateProduct
} from "@/services/product.service.ts"
import ImageUpload from "@/components/ImageUpload.tsx"
import { CategoryDocument } from "@shared/category.document.ts"
import { ColorDocument } from "@shared/color.document.ts"
import { SizeDocument } from "@shared/size.document.ts"

interface ProductFormProps {
  initialData: ProductDocument | null
  categories: CategoryDocument[]
  colors: ColorDocument[]
  sizes: SizeDocument[]
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  sizes,
  categories = [],
  colors
}) => {
  const params = useParams()
  const navigate = useNavigate()

  const storeId = params.storeId

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const title = initialData ? "Edit Product" : "Create Product"
  const description = initialData ? "Edit a Product." : "Add a new Product"
  const toastMessage = initialData ? "Product updated." : "Product created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<ProductCreateAttributes>({
    resolver: zodResolver(ProductCreateAttributes),
    defaultValues: initialData || {
      name: "",
      imageUrls: [],
      description: "",
      colorId: "",
      sizeId: "",
      categoryId: "",
      price: "",
      isFeatured: false,
      isArchived: false
    }
  })
  if (!storeId) return null
  const onSubmit = async (data: ProductCreateAttributes) => {
    console.log("Data", data)
    try {
      setLoading(true)
      if (initialData) {
        await updateProduct(data, initialData.id, storeId)
      } else {
        if (
          !data.colorId &&
          !data.sizeId &&
          !data.categoryId &&
          !data.price &&
          !data.name &&
          !data.description &&
          !data.isFeatured &&
          !data.isArchived
        ) {
          toast.error("Please fill in the form.")
          return
        }
        await createProduct(data, storeId)
      }
      navigate(`/${storeId}/products`)
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
      await deleteProduct(initialData.id, storeId)
      navigate(`/${params.storeId}/products`)
      toast.success("Product deleted.")
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
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="imageUrls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? field.value : []}
                      disabled={loading}
                      maxCount={5}
                      listType={"picture-card"}
                      onDataChange={url => {
                        field.onChange([...field.value, url])
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="gap-8 md:grid md:grid-cols-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Product name"
                        {...field}
                      />
                    </FormControl>
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
                      <Textarea
                        disabled={loading}
                        placeholder="Product description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="9.99"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
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
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
                name="sizeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
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
                            placeholder="Select a size"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map(size => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
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
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
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
                            placeholder="Select a color"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map(color => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
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
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This product will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This product will not appear anywhere in the store.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
