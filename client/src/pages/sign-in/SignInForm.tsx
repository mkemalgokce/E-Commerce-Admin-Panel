import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"

import { useForm } from "react-hook-form"
import { LoginCredentials } from "@shared/user.document.ts"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import toast from "react-hot-toast"
// import { useEffect } from "react";
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/services/auth.service.ts"
import { useUser } from "@/providers/AuthProvider.tsx"
import { useEffect } from "react"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

const SignInForm = () => {
  const { user, setUser } = useUser()
  const navigate = useNavigate()
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(LoginCredentials),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  useEffect(() => {
    if (user) navigate("/create-store")
  }, [user])

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const user = await login(data)
      if (!user) return toast.error("Invalid Credentials")
      setUser(user)
      toast.success("Login Successful")
      navigate(0)
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
          <a href="#" className="text-sm text-neutral-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className="flex w-full items-center justify-between">
          <Button type="submit" disabled={false} className="mt-4 w-full">
            {false ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm
