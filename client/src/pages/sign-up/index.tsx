import SignUpForm from "@/pages/sign-up/SignUpForm.tsx"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="flex h-screen min-h-full min-w-full items-center justify-center bg-gradient-to-t from-neutral-50 to-neutral-200">
      <Card className="w-full max-w-[20rem] p-4">
        <CardHeader className="text-center">
          <CardTitle className="">Sign Up</CardTitle>
          <CardDescription>Enter your credentials to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-neutral-500">
            Already have an account?
            <h1 className="font-semibold text-neutral-900 hover:font-bold hover:underline">
              <Link to="/signin">Sign In</Link>
            </h1>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp
