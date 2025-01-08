import useProfile from "@/hook"
import { signOut, useSession } from "next-auth/react"
import React, { useEffect } from "react"
import jwt from "jsonwebtoken"
import { useRouter } from "next/navigation"

const validateToken = (token) => {
  console.log("Validating token:", token)
  try {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000)

    const decoded = jwt.decode(token, { complete: true })
    const exp = decoded?.payload?.exp
    console.log("Expiration time:", exp)

    if (!exp) {
      console.log("Expiration time not found in token payload")
      return false
    }

    return exp > currentTimeInSeconds
  } catch (error) {
    console.error("Error validating token:", error)
    return false
  }
}

export default function Common({ selectedTab, setSelectedTab }) {
  const { profile } = useProfile()
  const { data: session } = useSession()
  const router = useRouter()
  const tabs = [
    { key: "PROFILE", label: "Profile" },
    { key: "MY_SUBSCRIPTION", label: "My Subscription" },
    ...(profile?.user?.pgCustomerId
      ? [{ key: "PAYMENT_METHOD", label: "Payment Method" }]
      : []),
    { key: "PURCHASE_HISTORY", label: "Purchase History" },
  ]

  useEffect(() => {
    if (session?.accessToken) {
      const isValid = validateToken(session?.accessToken) // Synchronous validation
      console.log(isValid)
      if (!isValid) {
        signOut({ callbackUrl: "/login" })
      }
    }

  
  }, [session?.accessToken, selectedTab]) // Add dependencies as required

  return (
    <div className="flex md:flex-col flex-row md:w-full overflow-x-auto gap-4 md:gap-0">
      {tabs.map((tab, index) => (
        <h1
          key={tab.key}
          className={`${
            selectedTab === tab.key
              ? "text-[#3ab6ff] font-bold"
              : "text-[#919eab] font-normal"
          } text-sm py-3 cursor-pointer whitespace-nowrap ${
            index !== tabs.length - 1 ? "md:border-b" : ""
          }`}
          onClick={() => setSelectedTab(tab.key)}
        >
          {tab.label}
        </h1>
      ))}
    </div>
  )
}
