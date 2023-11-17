import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { RegisterCredentials } from "@shared/user.document.ts"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { register } from "@/services/auth.service"
import { toast } from "react-hot-toast"
import { useUser } from "@/providers/AuthProvider"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { AxiosError } from "axios"
const SignUpForm = () => {
  const { user, setUser } = useUser()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof RegisterCredentials>>({
    resolver: zodResolver(RegisterCredentials),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  })
  useEffect(() => {
    if (user) navigate("/create-store")
  }, [user])
  const onSubmit = async (data: z.infer<typeof RegisterCredentials>) => {
    try {
      const user = await register(data);
      if (!user) return toast.error("Invalid Credentials")
      setUser(user)
      toast.success("Login Successful")
    } catch (e: AxiosError | any) {
      toast.error(e?.response?.data?.message || "Invalid Credentials")
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-col items-center justify-center space-y-2"
      >
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input required placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="firstName"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input required placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="lastName"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input required placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="email"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="password"
        />
        <div className="flex w-full items-center justify-between">
          <Button type="submit" disabled={false} className="mt-4 w-full">
            {false ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm
