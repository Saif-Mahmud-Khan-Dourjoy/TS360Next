
import AllPost from "./AllPost"
import PostByCategory from "./PostByCategory"


export default function BlogData({ params, searchParams, blogData }) {
  return (
    <>
      {params.blogType == "All" ? (
        <AllPost searchParams={searchParams} blogData={blogData} />
      ) : (
        <PostByCategory blogData={blogData} />
      )}
    </>
  )
}
