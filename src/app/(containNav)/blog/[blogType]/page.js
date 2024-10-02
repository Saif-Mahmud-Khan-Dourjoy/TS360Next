import {
  BlogCategory,
  GetBlogByCategory,
  PublicAllBlog,
} from "@/API/Admin/BlogApi"
import BlogData from "@/components/Blog/BlogData"

export async function generateMetadata() {
  return {
    title: "Blog",
    description: "Experience our all blogs related to test automation",
  }
}
const findId = async (category, blogType) => {
  return category?.[0]?.find((item) => {
    return item?.name === decodeURIComponent(blogType)
  })?.id
}
export default async function BlogType({ params, searchParams }) {
  let blogData = { ALL: [], RECENT: [], POPULAR: [], FEATURED: null }
  const category = await BlogCategory()
  if (category?.length > 0) {
    let catId = await findId(category, params.blogType)
    if (catId) {
      let blog = await GetBlogByCategory(
        catId,
        searchParams?.search ? searchParams?.search : ""
      )

      blogData = blog?.[0]
    } else {
      let blog = await PublicAllBlog(
        searchParams?.search ? searchParams?.search : ""
      )
      blogData = blog?.[0]
    }
  }

  return (
    <>
      <BlogData
        params={params}
        searchParams={searchParams}
        blogData={blogData}
      />
    </>
  )
}
