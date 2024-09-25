import { AllPlan } from "@/API/User/Pricing"
import React from "react"
import { FaCheck } from "react-icons/fa6"

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

export default async function PricingCards() {
  const plans = await AllPlan()
  const allPlan = plans?.[0]
  const sortedPlans = allPlan.sort((a, b) => {
    // If startingPrice is null, place it at the end
    if (a.startingPrice === null) return 1
    if (b.startingPrice === null) return -1

    // Otherwise, sort by startingPrice in ascending order
    return a.startingPrice - b.startingPrice
  })

  console.log(sortedPlans?.[1]?.planFrequency)
  return (
    <div className="mt-24 mb-5">
      {sortedPlans.length > 0 && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 gap-y-16">
          {sortedPlans?.map((plan, index) => (
            <div
              key={`plan-${index}`}
              className=" group bg-white relative rounded-lg shadow-cardShadow hover:shadow-2xl hover:border-2 hover:border-[#55c3BE] transform transition-all duration-300 ease-in-out lg:hover:scale-105 py-5 md:py-10 px-5 border-2 z-[100] hover:z-[999]"
            >
              {plan?.isRecommended && (
                <div className="  absolute w-full  -top-[48px] left-0 group-hover:outline group-hover:outline-2 group-hover:outline-[#55c3BE] bg-gradient-to-r from-[#82D955]   to-[#3AB6FF]  font-bold text-white text-center p-x-2 py-3 rounded-t-lg transform transition-all duration-300 ease-in-out">
                  RECOMMENDED
                </div>
              )}
              <div className="">
                <div className="text-[#486681] text-2xl font-bold">
                  {plan?.name.toUpperCase()}
                </div>
                <div className="mt-3 text-[#A6A6A6] text-sm font-medium min-h-32">
                  {plan?.description}
                </div>
                {plan?.startingPrice !== null ? (
                  <div className="min-h-32">
                    <div className="">
                      <span className="text-[#3A9ED9] text-4xl font-extrabold mr-2">
                        ${monthlyConst(plan?.planFrequency)}
                      </span>

                      <span className="text-[#818181] text-sm font-medium">
                        per user/month
                      </span>
                    </div>
                    {plan?.startingPrice == 0 && (
                      <div className="mt-3">
                        <span className="text-[#2F2F2F] text-sm font-bold mr-2">
                          30 days
                        </span>
                        {""}
                        <span className="text-[#818181] text-sm font-medium">
                          Free Trial
                        </span>
                      </div>
                    )}
                    <div>
                      {othersPlan(plan?.planFrequency).map((item, index) => (
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
                              <span className="text-[#818181]  font-light">
                                {`(extra`}{" "}
                              </span>
                              <span className="text-[#818181]  font-bold">
                                {item?.additionalMonths} months
                              </span>
                              <span className="text-[#818181]  font-light">
                                {" "}
                                {` subscription with annual purchase)`}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-[#3A9ED9] font-extrabold text-4xl min-h-32">
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
                    <div key={`feature-${index}`} className="flex gap-x-4 mt-3">
                      <div>
                        <FaCheck color="#3AB6FF" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-[#2F2F2F]">
                          {feature?.name}
                        </div>
                        {feature?.description && (
                          <div className="font-light text-sm text-[#2F2F2F] mt-1">
                            {`(${feature?.description})`}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {plan?.isRecommended && (
                <div className=" absolute left-0 bottom-14  w-full flex justify-center items-center ">
                  <div className="cursor-pointer text-lg font-medium py-2 px-6 bg-[#3AB6FF] text-white rounded-md hover:bg-[#40a5df]">
                    Buy Now
                  </div>
                </div>
              )}

              {plan?.startingPrice == null && (
                <div className=" absolute left-0 bottom-14  w-full flex justify-center items-center ">
                  <div className="cursor-pointer text-lg font-medium py-2 px-6 bg-white outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md hover:bg-[#3AB6FF] hover:text-white">
                    Contact
                  </div>
                </div>
              )}

              {!plan?.isRecommended && plan?.startingPrice != null && (
                <div className=" absolute left-0 bottom-14  w-full flex justify-center items-center ">
                  <div className="cursor-pointer text-lg font-medium py-2 px-6 bg-white outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md hover:bg-[#3AB6FF] hover:text-white">
                    Buy Now
                  </div>
                </div>
              )}

              {plan?.startingPrice == 0 && (
                <div className=" absolute left-0 bottom-14  w-full flex justify-center items-center ">
                  <div className="cursor-pointer text-lg font-medium py-2 px-6 bg-white outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md hover:bg-[#3AB6FF] hover:text-white">
                    Start Trial
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
