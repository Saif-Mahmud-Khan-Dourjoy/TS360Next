"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"

import { FaRegCirclePlay } from "react-icons/fa6"
import ModalVideo from "react-modal-video"
import "react-modal-video/scss/modal-video.scss"
import V1 from "../../../../public/Video/V1.png"
import { IoEyeOutline } from "react-icons/io5"
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from "react-icons/md"
import { useRouter } from "next/navigation"
import {
  GetAllVideo,
  ToggleVisibility,
  VideoDelete,
} from "@/API/Admin/VideoApi"
import { signOut, useSession } from "next-auth/react"
import { showErrorAlert } from "@/components/Alerts/Alert"
import ComponentLoader from "@/components/Custom/ComponentLoader"
import CustomModal from "@/components/Custom/Modal"
import NotFoundData from "../../../../public/nodatafound.png"
import jwt from "jsonwebtoken"
import { validateToken } from "@/lib/tokenValidation"

export default function AllVideo() {
  const [isOpen, setOpen] = useState(false)
  const [videoId, setVideoId] = useState("")
  const router = useRouter()
  const { data: session } = useSession()
  const [allVideo, setAllVideo] = useState([])
  const [reload, setReload] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("success")
  const [modalMessage, setModalMessage] = useState("Operation was successful!")
  const [id, setId] = useState(null)

  useEffect(() => {
    setLoader(true)
    if (session) {
      GetAllVideo(session?.accessToken).then((res) => {
        console.log(res)
        if (res?.[0]) {
          setLoader(false)
          setAllVideo([...res?.[0]])
        } else {
          setLoader(false)
          setAllVideo([])
        }
      })
    }
  }, [session, reload])

  const videoEdit = (id) => {
    router.push(`/admin/demo-video/manage-video?id=${id}`)
  }
  const toggleVisibility = async (id) => {
    const isValid = validateToken(session) // Synchronous validation

    if (!isValid) {
      signOut({ callbackUrl: "/login" })
    } else {
      ToggleVisibility(id, session?.accessToken).then((res) => {
        if (res?.[0]) {
          setReload(!reload)
        } else {
          showErrorAlert(res?.[1], "center", 2000)
        }
      })
    }
  }
  const deleteVideo = async (id) => {
    const isValid = validateToken(session) // Synchronous validation

    if (!isValid) {
      signOut({ callbackUrl: "/login" })
    } else {
      VideoDelete(id, session?.accessToken).then((res) => {
        if (res?.[0]) {
          setReload(!reload)
        } else {
          showErrorAlert(res?.[1], "center", 2000)
        }
      })
    }
  }

  const openModal = (type, message) => {
    setModalType(type)
    setModalMessage(message)
    setModalOpen(true)
  }

  const handleOk = () => {
    setModalOpen(false)
    deleteVideo(id)
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  return (
    <>
      {loader && <ComponentLoader />}
      {allVideo.length > 0 ? (
        <div className="mt-10 mb-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {allVideo?.map((video, index) => {
              return (
                <div
                  key={video?.id}
                  className="relative"
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
                    <div
                      className="relative hover:scale-110 transition-all duration-500 cursor-pointer"
                      onClick={() => {
                        setVideoId(video?.uniqueValue)
                        setOpen(true)
                      }}
                    >
                      <div className="relative w-full h-[200px]">
                        <Image
                          src={video?.thumbnailPath}
                          alt="video thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div
                        className={`z-10 absolute top-5 left-5 py-[6px] px-3 w-fit ${
                          video?.visible ? "bg-[#6EC143]" : "bg-[#A6A6A6]"
                        } text-white text-sm rounded-md`}
                      >
                        {video?.visible ? "Public" : "Private"}
                      </div>
                      <div className="bg-gray-400/50 absolute top-0 left-0 right-0 bottom-0"></div>
                      <FaRegCirclePlay className="shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500  text-[50px] hover:text-[60px]" />
                    </div>
                  </div>

                  <div className="pt-5 px-5 pb-8">
                    <div className=" text-xl md:text-2xl font-semibold text-gray-950">
                      {video?.title}
                    </div>
                    <div className="mt-3 text-base md:text-xl mb-14">
                      {video?.description}
                    </div>
                    <div className="absolute bottom-5 w-full px-5">
                      <div className="flex justify-end w-full px-5 gap-2 md:gap-3">
                        <div
                          onClick={() => toggleVisibility(video?.id)}
                          className={`group hover:bg-black transition-all duration-500 p-2 border-2 rounded-full w-fit cursor-pointer ${
                            video?.visible ? "bg-[#385166]" : ""
                          }  `}
                        >
                          <IoEyeOutline
                            size={20}
                            className={` transition-colors duration-500 group-hover:text-white ${
                              video?.visible ? "text-white " : "text-[#A9A9A9]"
                            } `}
                          />
                        </div>
                        <div
                          className="group p-2 border-2 rounded-full w-fit cursor-pointer hover:bg-[#a89451] transition-all duration-500"
                          onClick={() => videoEdit(video?.id)}
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
                            setId(video?.id)
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
                </div>
              )
            })}
          </div>
          {/* <div className="mt-1"></div> */}
        </div>
      ) : (
        <div className="absolute inset-0  m-auto flex flex-col items-center justify-center overflow-hidden h-fit w-fit">
          <Image src={NotFoundData} alt="" />
        </div>
      )}
      <ModalVideo
        channel="youtube"
        youtube={{ autoplay: 1, mute: 0, rel: 0 }}
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
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
