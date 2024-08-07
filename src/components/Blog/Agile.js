import Image from "next/image";
import EmptyBlog_Image from '/public/Blog/EmptyBlog_Image.png';

export default function Agile(){
    return(<>
      <div className="my-10 flex flex-col justify-between items-center gap-4">
          <div>
            <Image src={EmptyBlog_Image} alt="" className="" />
          </div>
          <div className="w-full sm:w-[90%] md:w-[70%] xl:w-[40%] mx-auto text-center text-xl">
            {`We're brewing up some bright ideas for this category. Check back soon for new content!`}
          </div>
        </div>
    </>)
}