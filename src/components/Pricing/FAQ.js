"use client"
import { GetFAQByCategory } from "@/API/Admin/FAQApi"
import React, { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { FaMinus } from "react-icons/fa"

const Data = [
  {
    title: "How do I know which plan is right for me?",
    content:
      "Sample Content Sample Content  Sample Content Sample Content Sample Content Sample Content Sample Content Sample Content Sample Content",
  },
  {
    title: "How do I know which plan is right for me 2?",
    content:
      "Sample Content Sample Content  Sample Content Sample Content Sample Content Sample Content Sample Content Sample Content Sample Content",
  },
  {
    title: "How do I know which plan is right for me 3?",
    content: "Sample Content Sample Content  Sample Content",
  },
]

export default function FAQ() {
  const [selected, setSelected] = useState(null)
  const [faqData, setFAQData] = useState(null)

  useState(() => {
    GetFAQByCategory("PRICING").then((res) => {
      console.log(res)
      if (res?.[0]) {
        setFAQData([...res?.[0]])
      } else {
        setFAQData([])
      }
    })
  })
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
    </div>
  )
}
