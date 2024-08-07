import BlogData from "@/components/Blog/BlogData";



export default function BlogType({params,searchParams }){
 
  
    return (
      <>
         <BlogData params={params} searchParams={searchParams}/>
      </>
    )
}