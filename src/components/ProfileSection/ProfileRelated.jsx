"use client"
import React, { useEffect, useState } from "react"
import EditProfileMain from "./EditProfile/EditProfileMain"
import Common from "./Common"
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory"
import SubscriptionDetails from "./Subscription/SubscriptionDetails"
import PaymentMethod from "./Payment/PaymentMethod"
import useProfile from "@/hook"
import ComponentLoader from "../Custom/ComponentLoader"

export default function ProfileRelated() {
  const [selectedTab, setSelectedTab] = useState("PROFILE")
  const { error, loading, profile } = useProfile()

  useEffect(() => {
    const selectedTab = localStorage.getItem("selectedTab")
    if (selectedTab) {
      setSelectedTab(selectedTab)
      localStorage.removeItem("selectedTab") // Clean up
    }
  }, [])

  if (error) {
    return (
      <div className="h-[52vh] flex justify-center items-center text-red-500 text-lg font-bold">
        {error}
      </div>
    )
  }

  return (
    <>
      {loading && <ComponentLoader />}
      <div className="flex flex-col md:flex-row justify-between gap-x-20 min-h-[55vh]">
        <div className="mb-4">
          <Common selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>

        {selectedTab === "PROFILE" && (
          <div className="flex-1">
            <EditProfileMain />
          </div>
        )}

        {selectedTab === "MY_SUBSCRIPTION" && (
          <div className="flex-1">
            <SubscriptionDetails />
          </div>
        )}
        {profile?.user?.pgCustomerId && selectedTab === "PAYMENT_METHOD" && (
          <div className="flex-1">
            <PaymentMethod />
          </div>
        )}

        {selectedTab === "PURCHASE_HISTORY" && (
          <div className="flex-1">
            <PurchaseHistory />
          </div>
        )}
      </div>
    </>
  )
}
