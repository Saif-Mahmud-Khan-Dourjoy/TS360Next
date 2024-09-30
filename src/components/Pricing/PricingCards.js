"use client"
import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AllPlan } from "@/API/User/Pricing"
import { FaCheck } from "react-icons/fa6"
import ContactModal from "../Custom/ContactModal"
import ComponentLoader2 from "../Custom/ComponentLoader2"
import { useSession } from "next-auth/react"
// import VerticalProgressBar from "./VerticalProgressBar"
import HorizontalProgressBar from "./HorizontalProgressBar"
import StepProgressBar from "./HorizontalProgressBar"

const monthlyConst = (planFrequency) => {
  return planFrequency?.find((item) => {
    return item.frequencyInterval == "MONTHLY"
  })?.price
}

const othersPlan = (planFrequency) => {
  return (
    planFrequency
      ?.filter((item) => item.frequencyInterval !== "MONTHLY") // Filter out items with "MONTHLY"
      .map((item) => ({
        price: item?.price,
        plan: item?.frequencyInterval?.slice(0, -2), // Remove last two characters (LY)
        additionalMonths: item?.additionalMonths,
      })) || []
  ) // Return an empty array if planFrequency is undefined
}

export default function PricingCards() {
  const [sortedPlans, setSortedPlans] = useState([])
  const [loader, setLoader] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [planLoader, setPlanLoader] = useState(true)
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null) // Track which card is hovered
  const { data: session } = useSession()
  const steps = ["Add User", "Payment Information", "Review & Confirm"]

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    AllPlan().then((res) => {
      setPlanLoader(true)
      if (res?.[0]) {
        console.log(res?.[0])
        setPlanLoader(false)
        const allPlan = res?.[0]
        const plans = allPlan.sort((a, b) => {
          // If startingPrice is null, place it at the end
          if (a.startingPrice === null) return 1
          if (b.startingPrice === null) return -1

          // Otherwise, sort by startingPrice in ascending order
          return a.startingPrice - b.startingPrice
        })

        setSortedPlans(plans)
      } else {
        setPlanLoader(false)
        setSortedPlans([])
      }
    })
  }, [])
  useEffect(() => {
    const recommendedIndex = sortedPlans.findIndex((plan) => plan.isRecommended)
    if (recommendedIndex !== -1) {
      setHoveredCardIndex(recommendedIndex)
    }
  }, [sortedPlans])

  const BuyNow = (plan) => {
    if (session) {
      console.log(session)
    } else {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }

  return (
    <>
      <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      {sortedPlans.length > 0 && !planLoader && (
        <div className="mt-24 mb-5">
          {sortedPlans.length > 0 && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 gap-y-20">
              {sortedPlans?.map((plan, index) => (
                <div
                  key={`plan-${index}`}
                  // Track hover on mouse enter and leave
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className={`group bg-white relative rounded-lg shadow-cardShadow py-5 md:py-10 px-5 border-2 z-[100] transform transition-all duration-300 ease-in-out 
                    ${
                      hoveredCardIndex === null && plan.isRecommended
                        ? "shadow-2xl border-2 border-[#55c3BE] scale-105 z-[999]" // Apply hover effect to recommended plan when no other card is hovered
                        : ""
                    }
                    ${
                      hoveredCardIndex === index
                        ? "shadow-2xl border-2 border-[#55c3BE] scale-105 z-[999]" // Apply hover effect to hovered card
                        : ""
                    }
                    hover:shadow-2xl hover:border-2 hover:border-[#55c3BE] hover:scale-105 hover:z-[999]"`}
                >
                  {plan?.isRecommended && (
                    <div
                      className={`absolute w-full -top-[48px] left-0   ${
                        hoveredCardIndex === null && plan.isRecommended
                          ? "outline outline-2 outline-[#55c3BE]" // Apply hover effect to recommended plan when no other card is hovered
                          : ""
                      }
                    ${
                      hoveredCardIndex === index
                        ? "outline outline-2 outline-[#55c3BE]" // Apply hover effect to hovered card
                        : ""
                    } group-hover:outline  group-hover:outline-2 group-hover:outline-[#55c3BE] bg-gradient-to-r from-[#82D955] to-[#3AB6FF] font-bold text-white text-center py-3 rounded-t-lg`}
                    >
                      RECOMMENDED
                    </div>
                  )}
                  <div>
                    <div className="text-[#486681] text-2xl font-bold">
                      {plan?.name.toUpperCase()}
                    </div>
                    <div className="mt-3 text-[#A6A6A6] text-sm font-medium min-h-32">
                      {plan?.description}
                    </div>
                    {plan?.startingPrice !== null ? (
                      <div className="min-h-32">
                        <div>
                          <span className="text-[#3A9ED9] text-4xl font-extrabold mr-2">
                            ${monthlyConst(plan?.planFrequency)}
                          </span>
                          <span className="text-[#818181] text-sm font-medium">
                            per user/month
                          </span>
                        </div>
                        {plan?.startingPrice === 0 && (
                          <div className="mt-3">
                            <span className="text-[#2F2F2F] text-sm font-bold mr-2">
                              30 days
                            </span>
                            <span className="text-[#818181] text-sm font-medium">
                              Free Trial
                            </span>
                          </div>
                        )}
                        <div>
                          {othersPlan(plan?.planFrequency).map(
                            (item, index) => (
                              <div className="mt-3" key={`otherplan-${index}`}>
                                <div>
                                  <span className="text-[#818181] text-sm font-medium">
                                    billed at{" "}
                                  </span>
                                  <span className="text-[#2F2F2F] text-sm font-bold mr-2">
                                    ${item?.price}
                                  </span>
                                  <span className="text-[#818181] text-sm font-medium">
                                    per user/{item?.plan.toLowerCase()}
                                  </span>
                                </div>
                                {item?.additionalMonths > 0 && (
                                  <div className="text-[12px] mt-1">
                                    <span className="text-[#818181] font-light">
                                      Extra
                                    </span>
                                    <span className="text-[#818181] font-bold">
                                      {item?.additionalMonths} months
                                    </span>
                                    <span className="text-[#818181] font-light">
                                      {" "}
                                      subscription with annual purchase
                                    </span>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className=" text-[#3A9ED9] font-extrabold text-4xl min-h-32">
                        Contact for quote
                      </div>
                    )}
                  </div>
                  <div className="mt-4 border-t-2 border-gray-300" />
                  <div className="mt-8 pb-24">
                    {plan?.feauteTitle && (
                      <div className="font-bold text-sm text-[#2F2F2F]">
                        {plan?.feauteTitle}:
                      </div>
                    )}

                    <div className="mt-5">
                      {plan?.keyFeatures.map((feature, index) => (
                        <div
                          key={`feature-${index}`}
                          className="flex gap-x-4 mt-3"
                        >
                          <div>
                            <FaCheck color="#3AB6FF" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-[#2F2F2F]">
                              {feature?.name}
                            </div>
                            {feature?.description && (
                              <div className="font-light text-sm text-[#2F2F2F] mt-1">
                                {feature?.description}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute left-0 bottom-14 w-full flex justify-center items-center">
                    {plan?.startingPrice !== 0 &&
                      plan?.startingPrice != null && (
                        <div
                          onClick={() => BuyNow(plan)}
                          className={`cursor-pointer text-lg font-medium py-2 px-6  outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md ${
                            hoveredCardIndex === null && plan.isRecommended
                              ? "bg-[#3bb4fa] text-white " // Apply hover effect to recommended plan when no other card is hovered
                              : ""
                          }
                    ${
                      hoveredCardIndex === index
                        ? "bg-[#3AB6FF] text-white" // Apply hover effect to hovered card
                        : ""
                    } group-hover:bg-[#3AB6FF] group-hover:text-white`}
                        >
                          Buy Now
                        </div>
                      )}
                    {plan?.startingPrice === 0 && (
                      <div
                        className={`cursor-pointer text-lg font-medium py-2 px-6 bg-white outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md ${
                          hoveredCardIndex === null && plan.isRecommended
                            ? "bg-[#3AB6FF] text-white" // Apply hover effect to recommended plan when no other card is hovered
                            : ""
                        }
                    ${
                      hoveredCardIndex === index
                        ? "bg-[#3AB6FF] text-white" // Apply hover effect to hovered card
                        : ""
                    }  group-hover:bg-[#3AB6FF] group-hover:text-white`}
                      >
                        Start Trial
                      </div>
                    )}
                    {plan?.startingPrice == null && (
                      <div
                        onClick={() => setModalOpen(true)}
                        className={`cursor-pointer text-lg font-medium py-2 px-6 bg-white outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md ${
                          hoveredCardIndex === null && plan.isRecommended
                            ? "" // Apply hover effect to recommended plan when no other card is hovered
                            : ""
                        }
                    ${
                      hoveredCardIndex === index
                        ? "bg-[#3AB6FF] text-white" // Apply hover effect to hovered card
                        : ""
                    } group-hover:bg-[#3AB6FF] group-hover:text-white`}
                      >
                        Contact
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {planLoader && (
        <div className="mt-16">
          <ComponentLoader2 />
        </div>
      )}

      {sortedPlans.length < 1 && !planLoader && (
        <div className="text-gray-500 text-xl text-center mt-10">
          No Plan is Available right now
        </div>
      )}
      <>
        <StepProgressBar steps={steps} />
      </>
    </>
  )
}
