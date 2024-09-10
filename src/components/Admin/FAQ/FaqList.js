"use client"
import {
  FAQDelete,
  GetAllFAQ,
  GetFAQByCategory,
  ToggleFAQVisibility,
} from "@/API/Admin/FAQApi"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { FaRegStar } from "react-icons/fa"
import { IoEyeOutline } from "react-icons/io5"
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from "react-icons/md"
import { useSession } from "next-auth/react"
import ComponentLoader from "@/components/Custom/ComponentLoader"
import CustomModal from "@/components/Custom/Modal"

import NotFoundData from "../../../../public/nodatafound.png"
import Image from "next/image"
export default function FaqList() {
  const [tab, setTab] = useState("ALL")
  const [reload, setReload] = useState(false)
  const [faqData, setFAQData] = useState([])
  const { data: session } = useSession()
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("success")
  const [modalMessage, setModalMessage] = useState("Operation was successful!")
  const [id, setId] = useState(null)

  useEffect(() => {
    setLoader(true)
    if (session) {
      if (tab == "ALL") {
        GetAllFAQ(session?.accessToken).then((res) => {
          console.log(res)
          if (res?.[0]) {
            setLoader(false)
            setFAQData([...res?.[0]])
          } else {
            setLoader(false)
            setFAQData([])
          }
        })
      } else {
        GetFAQByCategory(tab, session?.accessToken).then((res) => {
          console.log(res)
          if (res?.[0]) {
            setLoader(false)
            setFAQData([...res?.[0]])
          } else {
            setLoader(false)
            setFAQData([])
          }
        })
      }
    }
  }, [tab, session, reload])

  const openModal = (type, message) => {
    setModalType(type)
    setModalMessage(message)
    setModalOpen(true)
  }

  const handleOk = () => {
    setModalOpen(false)
    deleteFAQ(id)
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  function ensureQuestionMark(str) {
    // Trim any whitespace from the end to ensure accuracy
    str = str.trim()

    // Check if the string ends with '?'
    if (!str.endsWith("?")) {
      // If it doesn't, add a '?'
      str += "?"
    }

    return str
  }

  const FAQEdit = (id) => {
    router.push(`/admin/faq/manage-faq?id=${id}`)
  }
  const toggleVisibility = async (id) => {
    ToggleFAQVisibility(id, session?.accessToken).then((res) => {
      if (res?.[0]) {
        setReload(!reload)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }
  const deleteFAQ = async (id) => {
    FAQDelete(id, session?.accessToken).then((res) => {
      if (res?.[0]) {
        setReload(!reload)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }
  return (
    <>
      {loader && <ComponentLoader />}

      <div className="flex gap-4 flex-wrap items-center">
        <div
          className={`py-[6px] px-8 border ${
            tab == "ALL" ? "bg-[#486681] text-white" : "text-[#818181]"
          } border-[#486681] rounded-3xl font-medium cursor-pointer `}
          onClick={() => setTab("ALL")}
        >
          All
        </div>
        <div
          className={`py-[6px] px-8 border ${
            tab == "WEB" ? "bg-[#486681] text-white" : "text-[#818181]"
          } border-[#486681] rounded-3xl font-medium cursor-pointer `}
          onClick={() => setTab("WEB")}
        >
          Web Tech Support
        </div>
        <div
          className={`py-[6px] px-8 border ${
            tab == "MOBILE" ? "bg-[#486681] text-white" : "text-[#818181]"
          } border-[#486681] rounded-3xl font-medium cursor-pointer `}
          onClick={() => setTab("MOBILE")}
        >
          Mobile Tech Support
        </div>
        <div
          className={`py-[6px] px-8 border ${
            tab == "PRICING" ? "bg-[#486681] text-white" : "text-[#818181]"
          } border-[#486681] rounded-3xl font-medium cursor-pointer `}
          onClick={() => setTab("PRICING")}
        >
          Pricing
        </div>
      </div>
      {faqData.length > 0 ? (
        <div className="mt-5">
          <div>
            {faqData?.map((faq, index) => (
              <div
                key={`faq-${index}`}
                className="px-5 py-3 border-[1.7px] rounded-md flex justify-between flex-wrap gap-4 items-center mb-2"
              >
                <div className="text-[#486681] font-semibold text-sm">
                  Q: {ensureQuestionMark(faq.title)}
                </div>
                <div className=" flex gap-2 flex-wrap">
                  {/* <div className="group p-1 border-2 rounded-full w-fit cursor-pointer flex items-center hover:bg-[#0f0f10] transition-all duration-500">
                  <FaRegStar
                    size={18}
                    className="text-[rgb(169,169,169)] group-hover:text-white transition-colors duration-500"
                  />
                </div> */}
                  <div
                    onClick={() => toggleVisibility(faq?.id)}
                    className={`group hover:bg-black transition-all duration-500 p-[6px] border-2 rounded-full w-fit cursor-pointer ${
                      faq?.visible ? "bg-[#385166]" : ""
                    }  `}
                  >
                    <IoEyeOutline
                      size={18}
                      className={` transition-colors duration-500 group-hover:text-white ${
                        faq?.visible ? "text-white " : "text-[#A9A9A9]"
                      } `}
                    />
                  </div>
                  <div
                    className="group p-[6px] border-2 rounded-full w-fit cursor-pointer hover:bg-[#a89451] transition-all duration-500"
                    onClick={() => FAQEdit(faq?.id)}
                  >
                    <MdOutlineModeEdit
                      size={18}
                      className="text-[#A9A9A9] group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                  <div
                    className="group p-[6px] border-2 rounded-full w-fit cursor-pointer hover:bg-[#d14b4b] transition-all duration-500"
                    onClick={() => {
                      openModal("delete", "Do you want to Delete?")
                      setId(faq?.id)
                    }}
                  >
                    <MdOutlineDeleteOutline
                      size={18}
                      className="text-[#A9A9A9] group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0  m-auto flex flex-col items-center justify-center overflow-hidden h-fit w-fit">
          <Image src={NotFoundData} alt="" />
        </div>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        message={modalMessage}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  )
}
