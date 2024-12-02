import useProfile from "@/hook"
import React from "react"

export default function Common({ selectedTab, setSelectedTab }) {
  const { profile } = useProfile()
  const tabs = [
    { key: "PROFILE", label: "Profile" },
    { key: "MY_SUBSCRIPTION", label: "My Subscription" },
    ...(profile?.user?.pgCustomerId
      ? [{ key: "PAYMENT_METHOD", label: "Payment Method" }]
      : []),
    { key: "PURCHASE_HISTORY", label: "Purchase History" },
  ]

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
