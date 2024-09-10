import AllBlog from "@/components/Admin/Blog/AllBlog"
import Link from "next/link"
import { CiCirclePlus } from "react-icons/ci"
export default function page() {
  return (
    <>
      <div className="w-fit">
        <Link href="/admin/blog/manage-blog" className="w-fit cursor-pointer">
          <div className="w-fit px-5  py-2  bg-[#3AB6FF] rounded-lg">
            <div className="flex items-center gap-3 text-base text-white font-medium">
              <CiCirclePlus size={25} /> Add a new Blog
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-10 mb-5">
        <AllBlog />
      </div>
    </>
  )
}
