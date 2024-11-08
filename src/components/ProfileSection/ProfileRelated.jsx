"use client";
import React, { useState } from "react";
import EditProfileMain from "./EditProfile/EditProfileMain";
import Common from "./Common";
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";
import SubscriptionDetails from "./Subscription/SubscriptionDetails";
import PaymentMethod from "./Payment/PaymentMethod";

export default function ProfileRelated() {
  const [selectedTab, setSelectedTab] = useState("PROFILE");
  return (
    <>
      <div className="flex justify-between gap-x-20">
        <div className="">
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

        {selectedTab === "PAYMENT_METHOD" && (
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
  );
}
