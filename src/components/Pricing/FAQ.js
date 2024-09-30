"use client"
import { GetFAQByCategory } from "@/API/Admin/FAQApi"
import React, { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { FaMinus } from "react-icons/fa"
import ComponentLoader2 from "../Custom/ComponentLoader2"

export default function FAQ() {
  const [selected, setSelected] = useState(null)
  const [faqData, setFAQData] = useState([])
  const [faqLoader, setFaqLoader] = useState(true)

  useEffect(() => {
    setFaqLoader(true)
    GetFAQByCategory("PRICING").then((res) => {
      if (res?.[0]) {
        setFaqLoader(false)
        setFAQData([...res?.[0]])
      } else {
        setFaqLoader(false)
        setFAQData([])
      }
    })
  }, [])
  const toggle = (i) => {
    if (selected == i) {
      setSelected(null)
    } else {
      setSelected(i)
    }
  }
  return (
    <div className="mt-12">
      <div className="text-[#2F2F2F] text-[40px] font-bold text-center">
        Frequently Asked Questions
      </div>
      {faqData.length > 0 && !faqLoader && (
        <div className="mt-10">
          {faqData?.map((data, index) => (
            <div
              key={`FAQ-${index}`}
              className={`w-[60%] mx-auto border border-[#CBCACA] rounded-md py-4 px-6 ${
                index > 0 ? "mt-8" : ""
              }`}
            >
              <div
                className="flex justify-between items-center gap-4 "
                onClick={() => toggle(index)}
              >
                <div className="text-[#486681] font-semibold text-lg">
                  {data?.title}
                </div>
                <div className="">
                  {selected == index ? (
                    <FaMinus color="#486681" className="cursor-pointer t" />
                  ) : (
                    <FaPlus color="#486681" className="cursor-pointer" />
                  )}
                </div>
              </div>
              <div
                className={` transition-[max-height] duration-500  overflow-hidden ${
                  selected == index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className={`mt-2 text-[#8d8b8b]  `}>
                  <div className=" border-t border-gray-300 mb-2" />
                  {data?.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {faqLoader && (
        <div className="mt-14">
          <ComponentLoader2 />
        </div>
      )}

      {faqData.length < 1 && !faqLoader && (
        <div className="text-gray-500 text-xl text-center mt-10">
          {" "}
          No FAQ is Available right now
        </div>
      )}
    </div>
  )
}
