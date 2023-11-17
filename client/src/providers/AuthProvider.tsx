import {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useEffect
} from "react"
import { UserDocument } from "@shared/user.document.ts"
import { refresh } from "@/services/auth.service.ts"

interface AuthContextProps {
  user: UserDocument | null
  setUser: (user: UserDocument) => void
}
const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {}
})

export const useUser = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
  initialUser?: UserDocument | null
}
export const UserProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDocument | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await refresh()
        if (user) setUser(user)
      } catch (e) {}
      setLoading(false)
    }
    getUser()
  }, [])
  return (
    (loading && <> </>) || (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    )
  )
}
