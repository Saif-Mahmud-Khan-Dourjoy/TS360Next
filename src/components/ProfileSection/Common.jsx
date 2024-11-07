import React from "react"

export default function Common({ selectedTab, setSelectedTab }) {
  return (
    <div className="flex flex-col gap-5 w-max">
      <div
        class={`${
          selectedTab == "PROFILE"
            ? "text-[#3ab6ff] font-extrabold "
            : "text-[#919eab] font-normal"
        }  text-sm  border-b pb-2 cursor-pointer w-full`}
        onClick={() => setSelectedTab("PROFILE")}
      >
        Profile
      </div>

      <div
        class={`${
          selectedTab == "MY_SUBSCRIPTION"
            ? "text-[#3ab6ff] font-extrabold "
            : "text-[#919eab] font-normal"
        }  text-sm  border-b pb-2 cursor-pointer w-full`}
        onClick={() => setSelectedTab("MY_SUBSCRIPTION")}
      >
        My Subscription
      </div>
      <div
        class={`${
          selectedTab == "PAYMENT_METHOD"
            ? "text-[#3ab6ff] font-extrabold "
            : "text-[#919eab] font-normal"
        }  text-sm  border-b pb-2 cursor-pointer w-full`}
        onClick={() => setSelectedTab("PAYMENT_METHOD")}
      >
        Payment Method
      </div>
      <div
        class={`${
          selectedTab == "PURCHASE_HISTORY"
            ? "text-[#3ab6ff] font-extrabold "
            : "text-[#919eab] font-normal"
        }  text-sm cursor-pointer w-full`}
        onClick={() => setSelectedTab("PURCHASE_HISTORY")}
      >
        Purchase History
      </div>
    </div>
  )
}
