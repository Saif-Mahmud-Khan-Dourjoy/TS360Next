import { profileContext } from "@/context"
import { useContext } from "react"

const useProfile = () => {
  return useContext(profileContext)
}

export default useProfile;
