import useProfile from "@/hook"
import { signOut, useSession } from "next-auth/react"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { validateToken } from "@/lib/tokenValidation"

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
