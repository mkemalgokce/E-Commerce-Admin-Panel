//create a beautiful 404 page
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  CardHeader
} from "@/components/ui/card.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import notFoundImage from "@/assets/404.png"
import { Link } from "react-router-dom"
const Notfound = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center px-5">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">404 Not Found</CardTitle>
          <CardDescription>Page not found</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex justify-center">
            <img src={notFoundImage} alt="404" className="w-1/2" />
          </div>
        </CardContent>
        <CardFooter className="flex w-full text-center">
          <CardDescription className="w-full text-center font-semibold hover:scale-110 hover:underline">
            <Link to="/">Go back to the home page</Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Notfound
