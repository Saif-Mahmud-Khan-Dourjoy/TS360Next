import Image from "next/image";
import NotFoundImage from "/public/404.jpg"
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <div className="flex justify-center items-center flex-col h-screen">
                <Image height={500} alt="" src={NotFoundImage} />
                <div className="text-2xl text-red-400 flex flex-col gap-4 items-center" >
                    Page Not Found <Link href='/home'> <button className=" text-[#6aa6cf]  text-lg px-4 py-2 border-2 border-[#57a7dd]  rounded-full hover:bg-[#57a7dd] hover:text-white transition duration-300">Go to Home</button> </Link>
                </div>
            </div>
        </>
    )
}