import React from "react";

export default function Common({ selectedTab, setSelectedTab }) {
  return (
    <div className="flex flex-col w-max">
      <h1
        class={`${
          selectedTab == "PROFILE"
            ? "text-[#3ab6ff] font-bold "
            : "text-[#919eab] font-normal"
        }  text-sm  border-b py-3 cursor-pointer w-full`}
        onClick={() => setSelectedTab("PROFILE")}
      >
        Profile
      </h1>

      <h1
        class={`${
          selectedTab == "MY_SUBSCRIPTION"
            ? "text-[#3ab6ff] font-bold "
            : "text-[#919eab] font-normal"
        }  text-sm  border-b py-3 cursor-pointer w-full`}
        onClick={() => setSelectedTab("MY_SUBSCRIPTION")}
      >
        My Subscription
      </h1>
      <h1
        class={`${
          selectedTab == "PAYMENT_METHOD"
            ? "text-[#3ab6ff] font-bold "
            : "text-[#919eab] font-normal"
        }  text-sm  border-b py-3 cursor-pointer w-full`}
        onClick={() => setSelectedTab("PAYMENT_METHOD")}
      >
        Payment Method
      </h1>
      <h1
        class={`${
          selectedTab == "PURCHASE_HISTORY"
            ? "text-[#3ab6ff] font-bold "
            : "text-[#919eab] font-normal"
        }  text-sm pt-3 cursor-pointer w-full`}
        onClick={() => setSelectedTab("PURCHASE_HISTORY")}
      >
        Purchase History
      </h1>
    </div>
  );
}
