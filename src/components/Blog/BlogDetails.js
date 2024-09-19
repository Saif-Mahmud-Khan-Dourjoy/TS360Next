import React from "react"
import BlogHeader from "./BlogHeader"
import Image from "next/image"
import ReactionShare from "./ReactionShare"
import Description from "./Description"
import RelatedBlog from "./RelatedBlog"
import Link from "next/link"
import noImage from "../../../public/Blog/noImage.png"
import moment from "moment"
import Arrow from "../../../public/Blog/Arrow.png"
import { headers } from "next/headers"

export default function BlogDetails({ blogDetails }) {
  const headersList = headers()
  const currentPath = headersList.get("x-current-path")
  const makePath = () => {
    let pathArr = currentPath.split("/")

    pathArr.shift()
    pathArr.pop()
    return `/${pathArr.join("/")}`
  }
  const getCategory = (category) => {
    let catArr = category?.map((cat) => {
      return cat?.name
    })
    return catArr.join(", ")
  }
  return (
    <div>
      <BlogHeader blogDetails={blogDetails} />
      <div className="w-full mt-8 h-[400px] sm:h-[500px] md:h-[620px]">
        <div className="relative h-full w-full">
          <Image
            src={blogDetails?.coverImagePath}
            className="object-cover object-top"
            fill
            alt=""
          />
        </div>

        <div></div>
      </div>
      <ReactionShare blogDetails={blogDetails} />
      <div className="mt-6">
        <Description description={blogDetails?.description} />
        <div className="mt-8">
          <div className="flex gap-5 items-center">
            <div className="text-base md:text-lg font-medium">Tags:</div>
            <div className="flex gap-2 md:gap-3 flex-wrap">
              {blogDetails?.tags?.map((item, index) => (
                <div
                  key={`tags-${index}`}
                  className="bg-[#F6F6F6] py-1 px-3 md:px-5 border-2 text-sm md:text-base text-[#486681] rounded-3xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <ReactionShare blogDetails={blogDetails} />
        {/* {blogDetails?.relatedBlogs.length > 0 && (
          <RelatedBlog relatedBlogs={blogDetails?.relatedBlogs} />
        )} */}

        {blogDetails?.relatedBlogs.length > 0 && (
          <div className="mt-6">
            <div className="text-3xl font-bold">Related Articles</div>
            <div className="mt-12">
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
                {blogDetails?.relatedBlogs?.map((item, index) => (
                  <Link
                    href={`${makePath()}/${item?.slug}`}
                    className="cursor-pointer relative transition-all duration-500 hover:-translate-y-6"
                    style={{
                      borderRadius: "10px",
                      background: "#FFF",
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    }}
                    key={`allBlog-${index}`}
                  >
                    {" "}
                    <div>
                      <div
                        className="overflow-hidden"
                        style={{
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                      >
                        <div className="relative h-[280px] hover:scale-110 transition-all duration-500">
                          {item?.coverImagePath ? (
                            <Image
                              src={item?.coverImagePath}
                              className="rounded-l-lg object-center object-cover h-full w-full"
                              alt="blog image"
                              fill
                            />
                          ) : (
                            <Image
                              src={noImage}
                              alt="blog image"
                              fill
                              className="rounded-l-lg object-center object-cover h-full w-full"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 justify-between text-sm pt-5 px-5">
                        <div className="text-[#3AB6FF] font-semibold">
                          {getCategory(item?.blogCategories)}
                        </div>
                        <div className=" text-[#A6A6A6] font-semibold">
                          {moment(item?.creationDate).format("DD MMMM, YYYY")}
                        </div>
                      </div>

                      <div className="mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5">
                        {item?.title}
                      </div>

                      <div className="absolute bottom-5 w-full">
                        <div className="flex justify-between w-full px-5">
                          <div className="text-[#545454] font-medium  cursor-pointer">
                            Read Article
                          </div>
                          <div>
                            <Image
                              src={Arrow}
                              alt=""
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
