"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { FaRegHeart } from "react-icons/fa"
import { FaCheck, FaHeart, FaLink } from "react-icons/fa6"
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share"
import Share from "../../../public/Blog/Share.png"
import "../../../public/css/blog.css"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ReactBlog } from "@/API/Admin/BlogApi"

export default function ReactionShare({ blogDetails }) {
  const [love, setLove] = useState(false)
  const [showShareOption, setShowShareOption] = useState(false)
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState("")
  const { data: session } = useSession()
  console.log(session)
  const [number, setNumber] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  useEffect(() => {
    if (blogDetails?.reactionInfos && session) {
      if (
        blogDetails?.reactionInfos.some((item) => {
          return item?.createdById == session?.user?.id
        })
      ) {
        setLove(true)
      }
    }
  }, [blogDetails, session])

  console.log(blogDetails)

  const copyFunc = () => {
    setCopied(true)
  }
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }, [copied])

  const loveReact = async () => {
    if (session) {
      ReactBlog(
        blogDetails?.id,
        {
          reactionName: "LOVE",
          reactionType: "POSITIVE",
        },
        session?.accessToken
      ).then((res) => {
        setLove(true)
        setNumber(blogDetails?.reactionSummary?.positiveCount + 1)
      })
    } else {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }

  const showNumber = () => {
    if (number > blogDetails?.reactionSummary?.positiveCount) {
      return number
    }
    return blogDetails?.reactionSummary?.positiveCount
  }

  return (
    <>
      <div className="py-6 px-4 border-b-2 ">
        <div className="flex  justify-between">
          <div className="flex gap-3 items-center flex-1">
            {!love && (
              <>
                {" "}
                <FaRegHeart
                  className="text-2xl cursor-pointer"
                  color="#818181"
                  onClick={loveReact}
                />{" "}
                <span className="text-lg text-[#818181] ">
                  {blogDetails?.reactionSummary?.positiveCount}
                </span>{" "}
              </>
            )}
            {love && (
              <>
                {" "}
                <FaHeart className="text-2xl cursor-pointer" color="red" />{" "}
                <span className="text-lg text-[#818181] ">{showNumber()}</span>{" "}
              </>
            )}
          </div>
          <div className="w-[70%] sm:flex-1 flex justify-end relative">
            <div className="">
              <Image
                onClick={() => setShowShareOption(!showShareOption)}
                src={Share}
                alt=""
                className="cursor-pointer "
              />
              <div className="">
                <div
                  className={`w-fit transition-all duration-500 absolute ${
                    showShareOption
                      ? "right-0 top-12 opacity-1"
                      : "right-0 top-10 opacity-0"
                  }  h-fit bg-white z-50`}
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                  }}
                >
                  <div className="relative triangle"></div>
                  <div
                    className="p-3 sm:p-5"
                    style={{
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    }}
                  >
                    <CopyToClipboard onCopy={copyFunc} text={url}>
                      <div className="flex gap-4 items-center text-[#818181] w-fit cursor-pointer mb-3 relative">
                        <FaLink className="text-xl sm:text-2xl" />{" "}
                        <span style={{ fontSize: "12px" }}>Copy the link</span>
                        {copied && (
                          <FaCheck
                            className="absolute -right-5 top-1/2 transform -translate-y-1/2"
                            color="green"
                          />
                        )}
                      </div>
                    </CopyToClipboard>
                    <hr />
                    <div className=" mt-3">
                      <FacebookShareButton
                        className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer"
                        url={url}
                        hashtag={"#blog #TS360"}
                      >
                        <FacebookIcon round="true" size="30"></FacebookIcon>
                        <span
                          className="text-[#818181]"
                          style={{ fontSize: "12px" }}
                        >
                          Share on Facebook
                        </span>
                      </FacebookShareButton>
                    </div>
                    <div className=" mt-3">
                      <LinkedinShareButton
                        className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer"
                        url={url}
                        hashtag={"#blog #TS360"}
                      >
                        <LinkedinIcon round="true" size="30"></LinkedinIcon>
                        <span
                          className="text-[#818181]"
                          style={{ fontSize: "12px" }}
                        >
                          Share on Linkedin
                        </span>
                      </LinkedinShareButton>
                    </div>
                    <div className=" mt-3">
                      <TwitterShareButton
                        className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer"
                        url={url}
                        hashtag={"#blog #TS360"}
                      >
                        <XIcon round="true" size="30"></XIcon>
                        <span
                          className="text-[#818181]"
                          style={{ fontSize: "12px" }}
                        >
                          Share on Twitter(X)
                        </span>
                      </TwitterShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
