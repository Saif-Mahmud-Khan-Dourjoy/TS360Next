import Blog1 from "@/components/Blog/Blog1";
import Blog2 from "@/components/Blog/Blog2";
import Blog3 from "@/components/Blog/Blog3";
import Blog4 from "@/components/Blog/Blog4";
import Blog5 from "@/components/Blog/Blog5";
export async function generateMetadata() {
    return {
      title: "Single Blog",
      description: "Experience single blog related to test automation",
    }
  };
  
export default function SingleBlog({ params }) {
    return (
        <>
            <div>
                {params.blogId == 1 && <Blog1 />}
                {params.blogId == 2 && <Blog2 />}
                {params.blogId == 3 && <Blog3 />}
                {params.blogId == 4 && <Blog4 />}
                {params.blogId == 5 && <Blog5 />}
            </div>

        </>
    )
}