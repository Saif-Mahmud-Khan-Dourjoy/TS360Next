import BlogData from "@/components/Blog/BlogData";
export async function generateMetadata() {
  return {
    title: "Blog",
    description: "Experience our all blogs related to test automation",
  }
};


export default function BlogType({params,searchParams }){
 
  
    return (
      <>
         <BlogData params={params} searchParams={searchParams}/>
      </>
    )
}