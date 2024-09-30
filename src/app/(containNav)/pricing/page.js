export const dynamic = "force-dynamic"
import ComparePlan from "@/components/Pricing/ComparePlan"
import FAQ from "@/components/Pricing/FAQ"
import PricingCards from "@/components/Pricing/PricingCards"
import React from "react"

export const metadata = {
  title: "Pricing",
  description: "All plans pricing here",
}

export default function Pricing() {
  return (
    <div className=" mt-40 md:mt-[200px] relative mb-14">
      <div className="px-7 w-fit mx-auto" data-aos="flip-left">
        <span className="text-zinc-800 text-3xl lg:text-4xl font-bold">
          Choose your
        </span>
        <span className="text-sky-400 text-3xl lg:text-4xl font-bold ">
          {" "}
          perfect
        </span>
        <span className="text-zinc-800 text-3xl lg:text-4xl font-bold ">
          {" "}
          plan
        </span>
      </div>
      <div className="lg:px-24 px-7">
        <PricingCards />
        <ComparePlan />
        <FAQ />
      </div>
    </div>
  )
}
