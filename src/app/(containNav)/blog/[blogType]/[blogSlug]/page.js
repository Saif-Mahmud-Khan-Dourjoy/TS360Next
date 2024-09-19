import { GetBlogBySlug } from "@/API/Admin/BlogApi"
import BlogDetails from "@/components/Blog/BlogDetails"

export async function generateMetadata() {
  return {
    title: "Single Blog",
    description: "Experience single blog related to test automation",
  }
}

export default async function SingleBlog({ params }) {
  const blogBySlug = await GetBlogBySlug(params?.blogSlug)
  const singleBlog = blogBySlug?.[0]
  return (
    <>
      <div className="mb-10">
        <BlogDetails blogDetails={singleBlog} />
      </div>
    </>
  )
}
