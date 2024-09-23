"use client"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import { FaRegCirclePlay } from "react-icons/fa6"
import ModalVideo from "react-modal-video"
import "react-modal-video/scss/modal-video.scss"
import EmptyBlog_Image from "../../../../../public/Blog/EmptyBlog_Image.png"
import { useSearchParams } from "next/navigation"
import {
  GetAllVideo,
  GetVideoByCategory,
  VideoCategory,
} from "@/API/Admin/VideoApi"
import ComponentLoader from "@/components/Custom/ComponentLoader"

export default function VideoType({ params }) {
  const [isOpen, setOpen] = useState(false)
  const [videoId, setVideoId] = useState("")
  const [category, setCategory] = useState([])
  const [allVideo, setAllVideo] = useState([])
  const searchParams = useSearchParams()
  const search = searchParams.get("search")

  const [loader, setLoader] = useState(false)
  useEffect(() => {
    VideoCategory().then((res) => {
      if (res?.[0]) {
        console.log(res?.[0])
        let catArr = []
        let category = [...res?.[0]]
        category?.map((cat, ind) => {
          catArr.push({ name: cat.name, value: cat.id, id: cat.id })
        })
        setCategory(catArr)
      } else {
        setCategory([])
      }
    })
  }, [])

  useEffect(() => {
    setLoader(true)
    console.log(params.videoType)
    let catId = category?.filter((item) => {
      return item?.name == decodeURIComponent(params.videoType)
    })?.[0]?.id
    if (category.length > 0) {
      if (catId) {
        GetVideoByCategory(catId, search?search:"").then((res) => {
          if (res?.[0]) {
            console.log(res?.[0])
            setLoader(false)
            setAllVideo([...res?.[0]])
          } else {
            setLoader(false)
            setAllVideo([])
          }
        })
      } else {
        GetAllVideo("",search ? search : "").then((res) => {
          if (res?.[0]) {
            console.log(res?.[0])
            setLoader(false)
            setAllVideo([...res?.[0]])
          } else {
            setLoader(false)
            setAllVideo([])
          }
        })
      }
    }
  }, [category, params])

  return (
    <>
      {loader && <ComponentLoader />}

      <div className="mt-8">
        {allVideo?.length > 0 ? (
          <div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {allVideo?.map((video, index) => (
                <div
                  key={`video-${index}`}
                  className=""
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
                      <div className="bg-gray-400/50 absolute top-0 left-0 right-0 bottom-0"></div>
                      <FaRegCirclePlay className="shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500  text-[50px] hover:text-[60px]" />
                    </div>
                  </div>

                  <div className="pt-5 px-5 pb-8">
                    <div className=" text-xl md:text-2xl font-semibold text-gray-950">
                      {video?.title}
                    </div>
                    <div className="mt-3 text-base md:text-xl">
                      {video?.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-1"></div>
          </div>
        ) : (
          <div className="my-10 flex flex-col justify-between items-center gap-4">
            <div>
              <Image src={EmptyBlog_Image} alt="" />
            </div>
            <div className="w-full sm:w-[90%] md:w-[70%] xl:w-[40%] mx-auto text-center text-xl">
              {`We're brewing up some bright ideas for this category. Check back soon for new content!`}
            </div>
          </div>
        )}
      </div>
      <ModalVideo
        channel="youtube"
        youtube={{ autoplay: 1, mute: 0, rel: 0 }}
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
