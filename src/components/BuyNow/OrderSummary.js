"use client"
import React, { useEffect, useState } from "react"
import { BsFillInfoCircleFill } from "react-icons/bs"
export default function OrderSummary({
  setCurrentStep,
  currentStep,
  isSmall,
  setSummaryModalOpen = null,
  planFrequency,
  selectedCycle,
  setSelectedCycle,
  totalUser,
  submitForm,
  customerId,
 
}) {
  const [total, setTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [totalWithTax, setTotalWithTax] = useState(0)
  useEffect(() => {
    let total = selectedCycle?.price * totalUser?.length
    let tax = total * (5 / 100)
    setTotal(total)
    setTax(tax)
    setTotalWithTax(total + tax)
  }, [selectedCycle, totalUser])
  const ChangeCycle = (e) => {
    const current_cycle = planFrequency?.filter((plan, index) => {
      return plan?.id === Number(e.target.value)
    })?.[0]

    setSelectedCycle(current_cycle)
  }

  const handleProceed = () => {
    if (currentStep === 0) {
      // Submit the form when proceeding from "Add User" step
      submitForm()
    } else {
      setCurrentStep(currentStep + 1)
      if (setSummaryModalOpen) setSummaryModalOpen(false)
    }
  }

  return (
    <>
      <div className="">
        {!isSmall && <div className="invisible">hdggd</div>}
        <div
          className={`font-bold text-xl text-center ${
            !isSmall ? "mt-10" : ""
          } `}
        >
          Order Summary
        </div>
        <div className="flex gap-3 text-[#2F2F2F] mt-10">
          <span>Selected Plan: </span>
          <span className="font-bold">Professional</span>
        </div>
        {currentStep < 2 && (
          <div className="mt-5 flex justify-between">
            <div className="w-[35%]">
              <span>Billing Cycle:</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between flex-wrap gap-3">
                {/* <div className="flex gap-2">
                  <input className="relative -top-1" type="radio" />
                  <span className="font-semibold">Monthly</span>
                </div> */}
                {planFrequency?.map((item, index) => (
                  <div className="flex gap-2 " key={`cycle-${index}`}>
                    <input
                      type="radio"
                      className="relative -top-[2px] cursor-pointer"
                      name="plan_cycle"
                      value={item?.id}
                      checked={item?.id == selectedCycle?.id}
                      onChange={(e) => ChangeCycle(e)}
                    />
                    <span className="font-semibold">
                      {item?.frequencyInterval
                        // ?.slice(0, -2)
                        .toLowerCase()
                        .replace(/^./, (char) => char.toUpperCase())}
                    </span>
                    {item?.additionalMonths > 0 && (
                      <div className="relative -top-1 rounded-md text-xs py-2 px-2 w-fit text-[#59B32B] bg-[#CDF3BA]">
                        +{item?.additionalMonths} months extra
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {currentStep == 2 && (
          <div className="mt-5 flex gap-3">
            <span>Billing Cycle:</span>
            <div className="">
              <span className="font-bold">
                {selectedCycle?.frequencyInterval
                  .toLowerCase()
                  .replace(/^./, (char) => char.toUpperCase())}
              </span>
            </div>
          </div>
        )}
        <div className="mt-3 border-b-2"></div>
        <div className="mt-8 flex justify-between text-[#2F2F2F] font-medium">
          <div className="">1x TS360 Professional Plan Subscription</div>
          <div>${total}</div>
        </div>
        <div className="mt-1 flex gap-2">
          <div className="text-[#2F2F2F] text-xs font-medium">
            ${selectedCycle?.price}
          </div>
          <div className="text-[#818181] text-xs">x</div>
          <div className="flex gap-[6px]">
            <span className="text-[#2F2F2F] text-xs font-medium">
              {totalUser?.length}
            </span>
            <span className="text-[#818181] text-xs"> users</span>
          </div>
          <div className="text-[#818181] text-xs">x</div>

          <div className="flex gap-[6px]">
            <span className="text-[#2F2F2F] text-xs font-medium">1</span>
            <span className="text-[#818181] text-xs">
              {selectedCycle?.frequencyInterval
                ?.slice(0, -2)
                .toLowerCase()
                .replace(/^./, (char) => char.toUpperCase())}
            </span>
          </div>
        </div>
        <div className="mt-10 border-b-2"></div>
        <div className="mt-5 flex justify-between text-[#2F2F2F] ">
          <div className="font-medium">Subtotal</div>
          <div className="font-bold">${total}</div>
        </div>
        {currentStep == 2 && (
          <>
            <div className="mt-5 flex justify-between text-[#2F2F2F] ">
              <div className="flex gap-3 items-center">
                <div className="font-medium">Tax </div>
                <BsFillInfoCircleFill color="#3AB6FF" />
              </div>

              <div className="font-bold">${tax?.toFixed(2)}</div>
            </div>
            <div className="mt-5 border-b-2"></div>
            <div className="mt-5 flex justify-between text-[#2F2F2F] ">
              <div className="font-medium">Total</div>
              <div className="font-bold">${totalWithTax?.toFixed(2)}</div>
            </div>
          </>
        )}
        <div className="mt-10 ">
          <div
            // onClick={() => {
            //   setCurrentStep(currentStep + 1)
            //   setSummaryModalOpen && setSummaryModalOpen(false)
            // }}
            onClick={handleProceed}
            className="cursor-pointer text-[#FFF] text-sm lg:text-base font-semibold rounded-md py-2 px-5 w-fit mx-auto bg-[#3AB6FF] shadow-2xl"
          >
            {currentStep == 0 && "Proceed to Payment Information"}
            {currentStep == 1 && "Review & Confirm"}
            {currentStep >= 2 && "Complete Payment"}
          </div>
        </div>
      </div>
    </>
  )
}
