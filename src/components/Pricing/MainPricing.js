"use client"
import React from "react"
import PricingCards from "./PricingCards"
import ComparePlan from "./ComparePlan"
import FAQ from "./FAQ"

export default function MainPricing() {
  return (
    <>
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
    </>
  )
}
