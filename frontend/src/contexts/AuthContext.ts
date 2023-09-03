import { createContext, useContext } from "react"

export const AuthContext = createContext<any>({
  user: undefined,
  isLoading: false,
  setUser: () => { },
})

export const useAuthContext = () => useContext(AuthContext)