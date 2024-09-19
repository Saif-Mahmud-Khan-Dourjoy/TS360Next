"use client"
import moment from "moment"
import Link from "next/link"
import React from "react"
import Avatar from "react-avatar"
import { FaAngleLeft } from "react-icons/fa6"

export default function BlogHeader({ blogDetails }) {
  console.log(blogDetails)
  return (
    <>
      <div className="w-fit  text-sm text-[#A6A6A6] cursor-pointer ">
        <Link href="/blog" className="flex items-center">
          {" "}
          <FaAngleLeft /> <span className="ml-1">Back to Blog</span>{" "}
        </Link>
      </div>
      <div className="text-3xl text-black font-extrabold mt-5">
        {blogDetails?.title}
      </div>
      <div className="flex gap-4 items-center mt-4">
        <div>
          <Avatar
            size="35"
            round={true}
            name="Test Sprint"
            color="#3AB6FF"
            fgColor="white"
            className="font-semibold "
          />
        </div>
        <div>
          <div className="text-[#212B36] font-semibold text-xl">
            {blogDetails?.createdByUser}
          </div>
          <div className="text-[#486681] text-sm font-medium ">
            {moment(blogDetails?.creationDate).format("DD MMMM, YYYY")} |{" "}
            {blogDetails?.timeRequiredToRead}
          </div>
        </div>
      </div>
    </>
  )
}
