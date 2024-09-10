"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { FaRegStar } from "react-icons/fa"
import { IoEyeOutline } from "react-icons/io5"
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from "react-icons/md"
import BlogImage3 from "../../../../public/Blog/BlogImage3.jpg"
import { useSession } from "next-auth/react"
import noImage from "../../../../public/Blog/noImage.png"
import {
  BlogDelete,
  GetAllBlog,
  MakeFeatured,
  ToggleVisibility,
} from "@/API/Admin/BlogApi"
import { useRouter } from "next/navigation"
import ComponentLoader from "@/components/Custom/ComponentLoader"
import NotFoundData from "../../../../public/nodatafound.png"
import moment from "moment"
import CustomModal from "@/components/Custom/Modal"
import { showErrorAlert } from "@/components/Alerts/Alert"

export default function AllBlog() {
  const router = useRouter()
  const { data: session } = useSession()
  const [allBlog, setAllBlog] = useState([])
  const [reload, setReload] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("success")
  const [modalMessage, setModalMessage] = useState("Operation was successful!")
  const [id, setId] = useState(null)

  useEffect(() => {
    setLoader(true)
    if (session) {
      GetAllBlog(session?.accessToken).then((res) => {
        console.log(res?.[0])
        if (res?.[0]) {
          setLoader(false)
          setAllBlog([...res?.[0]])
        } else {
          setLoader(false)
          setAllBlog([])
        }
      })
    }
  }, [session, reload])

  const BlogEdit = (id, status, slug) => {
    debugger
    if (status === "DRAFTED") {
      router.push(
        `/admin/blog/manage-blog?id=${id}&status=${status}&slug=${slug}`
      )
    } else {
      router.push(
        `/admin/blog/manage-blog?id=${id}&status=${status}&slug=${slug}`
      )
    }
  }
  const toggleVisibility = async (id) => {
    ToggleVisibility(id, session?.accessToken).then((res) => {
      if (res?.[0]) {
        setReload(!reload)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  const makeFeatured = async (id) => {
    MakeFeatured(id, session?.accessToken).then((res) => {
      if (res?.[0]) {
        setReload(!reload)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }
  const deleteBlog = async (id) => {
    BlogDelete(id, session?.accessToken).then((res) => {
      if (res?.[0]) {
        setReload(!reload)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  const openModal = (type, message) => {
    setModalType(type)
    setModalMessage(message)
    setModalOpen(true)
  }

  const handleOk = () => {
    setModalOpen(false)
    deleteBlog(id)
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  const getStatus = (status) => {
    if (!status) return "" // Handle empty or invalid input
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Public":
        return "#6EC143"
      case "Private":
        return "#A6A6A6"
      case "Draft":
        return "#8555EB"
      default:
        return "#6EC143"
    }
  }
  const getCategory = (category) => {
    let catArr = category?.map((cat) => {
      return cat?.name
    })
    return catArr.join(", ")
  }
  return (
    <>
      {loader && <ComponentLoader />}
      {allBlog.length > 0 ? (
        <div className="mt-10 mb-5">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {allBlog?.map((blog, index) => {
              return (
                <div
                  key={`blog-${index + 1}`}
                  className=" relative "
                  style={{
                    borderRadius: "10px",
                    background: "#FFF",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                >
                  <div
                    className="overflow-hidden"
                    style={{
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="relative hover:scale-110 transition-all duration-500">
                      <div className="relative w-full h-[200px]">
                        {blog?.coverImagePath ? (
                          <Image
                            src={blog?.coverImagePath}
                            alt="blog thumbnail"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <Image
                            src={noImage}
                            alt="blog thumbnail"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                      </div>
                      <div
                        className={`  z-10 absolute top-5 left-5 py-[6px] px-3 w-fit bg-[${getStatusColor(
                          blog?.flag
                        )}] text-white text-sm rounded-md`}
                      >
                        {getStatus(blog?.flag)}
                      </div>
                      <div className="bg-gray-400/50 absolute top-0 left-0 right-0 bottom-0"></div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm pt-5 px-5 flex-wrap items-center">
                    <div className="text-[#3AB6FF] font-semibold">
                      {getCategory(blog?.blogCategories)}
                    </div>
                    <div className=" text-[#A6A6A6] font-semibold">
                      {moment(blog?.lastModifiedDate).format("DD MMMM, YYYY")}
                    </div>
                  </div>

                  <div className="mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5">
                    {blog?.title}
                  </div>

                  <div className="absolute bottom-5 w-full">
                    <div className="flex justify-end w-full px-5 gap-2 md:gap-3">
                      <div
                        onClick={() => makeFeatured(blog?.id)}
                        className={`group hover:bg-green-900 transition-all duration-500 p-2 border-2 rounded-full w-fit cursor-pointer ${
                          blog?.featured ? "bg-green-700" : ""
                        }  `}
                      >
                        <FaRegStar
                          size={20}
                          className={` transition-colors duration-500 group-hover:text-white ${
                            blog?.featured ? "text-white " : "text-[#A9A9A9]"
                          } `}
                        />
                      </div>
                      <div
                        onClick={() => toggleVisibility(blog?.id)}
                        className={`group hover:bg-black transition-all duration-500 p-2 border-2 rounded-full w-fit cursor-pointer ${
                          blog?.visible ? "bg-[#385166]" : ""
                        }  `}
                      >
                        <IoEyeOutline
                          size={20}
                          className={` transition-colors duration-500 group-hover:text-white ${
                            blog?.visible ? "text-white " : "text-[#A9A9A9]"
                          } `}
                        />
                      </div>
                      <div
                        className="group p-2 border-2 rounded-full w-fit cursor-pointer hover:bg-[#a89451] transition-all duration-500"
                        onClick={() =>
                          BlogEdit(blog?.id, blog?.blogStatus, blog?.slug)
                        }
                      >
                        <MdOutlineModeEdit
                          size={20}
                          className="text-[#A9A9A9] group-hover:text-white transition-colors duration-500"
                        />
                      </div>
                      <div
                        className="group p-2 border-2 rounded-full w-fit cursor-pointer hover:bg-[#d14b4b] transition-all duration-500"
                        onClick={() => {
                          openModal("delete", "Do you want to Delete?")
                          setId(blog?.id)
                        }}
                      >
                        <MdOutlineDeleteOutline
                          size={20}
                          className="text-[#A9A9A9] group-hover:text-white transition-colors duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
