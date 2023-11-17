import SignInForm from "@/pages/sign-in/SignInForm.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"

const SignIn = () => {
  return (
    <div className="flex h-screen min-h-full min-w-full items-center justify-center bg-gradient-to-t from-neutral-50 to-neutral-200">
      <Card className="w-full max-w-[20rem] p-4">
        <CardHeader className="text-center">
          <CardTitle className="">Sign In</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-neutral-500">
            Don't have an account?{" "}
            <h1 className="font-semibold text-neutral-900 hover:underline">
              <Link to="/signup">Sign Up</Link>
            </h1>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn
