"use client"
import { profileContext } from "@/context"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getUserById } from "@/API/User/Profile/Profile"
export default function ProfileProvider({ children }) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (session) {
      getUserById(session?.user?.id, session?.accessToken).then((res) => {
        setLoading(false)
        if (res?.[0]) {
          setProfile(res?.[0])
          console.log(res?.[0])
        } else {
          setError(res?.[1])
        }
      })
    }
  }, [session, isUpdate])
  console.log(session?.user?.id)
  return (
    <profileContext.Provider
      value={{ profile, error, loading, isUpdate, setIsUpdate }}
    >
      {children}
    </profileContext.Provider>
  )
}

// export function useCategories() {
//   return useContext(CategoryContext)
// }
