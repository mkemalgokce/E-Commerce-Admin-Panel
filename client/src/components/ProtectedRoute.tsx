//protect route if access token is not present redirect to login page

import { Navigate } from "react-router-dom"
import { useUser } from "@/providers/AuthProvider"
interface ProtectRouteProps {
  children: React.ReactNode
}
const ProtectedRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const { user } = useUser()



  if (user) {
    return <div>{children}</div>
  } else {
    return <Navigate to="/signin" />
  }
}

export default ProtectedRoute
