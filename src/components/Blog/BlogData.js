import Agile from "./Agile"
import AllPost from "./AllPost"
import Event from "./Events"
import News from "./News"
import Technicals from "./Technicals"

export default function BlogData({ params, searchParams, blogData }) {
  return (
    <>
      {params.blogType == "All" ? (
        <AllPost searchParams={searchParams} blogData={blogData} />
      ) : (
        <Technicals blogData={blogData}/>
      )}
     
    </>
  )
}
