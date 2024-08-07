"use client"
import Image from "next/image";
import Link from "next/link";
import BlogImage1 from '/public/Blog/BlogImage1.png';
import BlogImage2 from '/public/Blog/BlogImage2.jpg';
import BlogImage3 from '/public/Blog/BlogImage3.jpg';
import Arrow from '/public/Blog/Arrow.png';
import { useSearchParams,useRouter,usePathname } from "next/navigation";

export default function AllPost({ searchParams }) {
    const searchParam = useSearchParams()
    const router = useRouter();
    const params = new URLSearchParams(searchParam.toString());
    const pathname = usePathname();
    const setSelectedTab2 = (tab) => {
        if(tab){
          params.delete('filter');
        }
        params.set('filter',tab);

        router.replace(`${pathname}?${params.toString()}`);

       
        
    }
    return (
        <>
            <div className="flex-col md:flex-row  flex justify-between mt-8 gap-x-8 gap-y-8">
                <div className="md:w-[55%] lg:w-[60%] xl:w-[65%] 2xl:w-[70%] cursor-pointer">
                    <Link href={`${pathname}/1`}>  <div className="w-full relative h-full">
                        <Image className="rounded-lg h-[350px] sm:h-full w-full object-cover object-center" src={BlogImage1} alt="" />
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-900/40 rounded-lg" ></div>

                        <div className="absolute top-5  left-8  w-fit px-6 py-2 bg-[#6234c5] rounded-lg text-white" >
                            Featured Article
                        </div>
                        <div className="absolute top-[70%] transform -translate-y-[70%] px-8 text-lg md:text-xl lg:text-2xl w-full md:w-[80%] lg:w-[70%] xl:w-[50%] text-white font-semibold">
                            Solid Design Principles of Object-Oriented Design
                        </div>
                        <div className="w-full py-3 md:py-5 px-8 bg-[#3AB6FF] absolute left-0 bottom-0 rounded-b-lg">
                            <div className="flex justify-between ">
                                <div className="text-white">Agile</div>
                                <div className="text-white">20 June, 2024</div>
                            </div>

                        </div>
                    </div>
                    </Link>
                </div>

                <div className="flex-1 pt-3">
                    <div className="w-full sm:w-[70%] md:w-full flex justify-between mx-auto">
                        <div className={`transition-all duration-100 flex justify-center w-1/2 text-lg cursor-pointer ${searchParams.filter == 'recent' ? "text-[#3AB6FF] border-b-2 pb-1 border-b-[#3AB6FF]" : "text-[#A6A6A6]"}`} onClick={() => setSelectedTab2('recent')}>
                            Recent
                        </div>
                        <div className={`transition-all duration-100 flex justify-center w-1/2 text-lg cursor-pointer ${searchParams.filter == 'popular' ? "text-[#3AB6FF] border-b-2 pb-1 border-b-[#3AB6FF]" : "text-[#A6A6A6]"}`} onClick={() => setSelectedTab2('popular')}>
                            Popular
                        </div>

                    </div>
                    {searchParams.filter == 'recent' && <div className=" mt-7 md:mt-4">

                        <div className="cursor-pointer mb-4 last:mb-0 ">
                            <Link href={`${pathname}/3`}>  <div className="w-full sm:w-[70%] md:w-full flex gap-x-3 border-2 border-[#edecec] rounded-lg mx-auto">
                                <div className="w-[30%] flex-none">
                                    <Image
                                        className="h-full w-full rounded-l-lg object-cover object-center"
                                        src={BlogImage3}
                                        alt=""
                                    />
                                </div>
                                <div className="flex-1 p-2 flex flex-col justify-between">
                                    <div className="font-semibold">
                                        Reading from Properties file with Spring-Boot library
                                    </div>
                                    <div className="flex justify-between text-sm mt-6 text-[#818181]">
                                        <div>Technical</div>
                                        <div>10 July, 2024</div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>

                        <div className="cursor-pointer mb-4 last:mb-0">
                            <Link href={`${pathname}/2`}>  <div className="w-full sm:w-[70%] md:w-full flex gap-x-3 border-2 border-[#edecec] rounded-lg mx-auto">
                                <div className="w-[30%] flex-none">
                                    <Image className="h-full w-full rounded-l-lg object-cover object-center" src={BlogImage2} alt="" />
                                </div>
                                <div className="flex-1 p-2 flex flex-col justify-between">
                                    <div className="font-semibold ">
                                        How to create the Wireframe
                                        of your Sprint Project
                                    </div>
                                    <div className="flex justify-between text-sm mt-6 text-[#818181]">
                                        <div>
                                            Technical
                                        </div>
                                        <div>
                                            10 July, 2024
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>



                        <div className="cursor-pointer mb-4 last:mb-0">
                            <Link href={`${pathname}/1`}>   <div className="w-full sm:w-[70%] md:w-full flex gap-x-3 border-2 border-[#edecec] rounded-lg mx-auto">
                                <div className="w-[30%] flex-none">
                                    <Image className="h-full w-full rounded-l-lg object-cover object-center" src={BlogImage1} alt="" />
                                </div>
                                <div className="flex-1 p-2 flex flex-col justify-between">
                                    <div className="font-semibold ">
                                        Solid Design Principles of
                                        Object-Oriented Design
                                    </div>
                                    <div className="flex justify-between text-sm mt-6 text-[#818181]">
                                        <div>
                                            Technical
                                        </div>
                                        <div>
                                            10 July, 2024
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>





                    </div>
                    }

                    {searchParams.filter == 'popular' && <div className="mt-7 md:mt-4">
                        <div className="cursor-pointer mb-4 last:mb-0 ">
                            <Link href={`${pathname}/3`}>     <div className="w-full sm:w-[70%] md:w-full flex gap-x-3 border-2 border-[#edecec] rounded-lg mx-auto">
                                <div className="w-[30%] flex-none">
                                    <Image
                                        className="h-full w-full rounded-l-lg object-cover object-center"
                                        src={BlogImage3}
                                        alt=""
                                    />
                                </div>
                                <div className="flex-1 p-2 flex flex-col justify-between">
                                    <div className="font-semibold">
                                        Reading from Properties file with Spring-Boot library
                                    </div>
                                    <div className="flex justify-between text-sm mt-6 text-[#818181]">
                                        <div>Technical</div>
                                        <div>10 July, 2024</div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>

                        <div className="cursor-pointer mb-4 last:mb-0">
                            <Link href={`${pathname}/1`}>     <div className="w-full sm:w-[70%] md:w-full flex gap-x-3 border-2 border-[#edecec] rounded-lg mx-auto">
                                <div className="w-[30%] flex-none">
                                    <Image className="h-full w-full rounded-l-lg object-cover object-center" src={BlogImage1} alt="" />
                                </div>
                                <div className="flex-1 p-2 flex flex-col justify-between">
                                    <div className="font-semibold ">
                                        Solid Design Principles of
                                        Object-Oriented Design
                                    </div>
                                    <div className="flex justify-between text-sm mt-6 text-[#818181]">
                                        <div>
                                            Technical
                                        </div>
                                        <div>
                                            10 July, 2024
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>

                    </div>
                    }
                </div>

            </div>

            <div className="mt-20 mb-5">
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">

                    <Link href={`${pathname}/3`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
                        borderRadius: "10px",
                        background: '#FFF',
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                    }}>    <div >
                        <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                            <div className='relative hover:scale-110 transition-all duration-500'>
                                <Image src={BlogImage3} className='w-full h-[280px] object-cover object-center' alt="" />


                            </div>
                        </div>



                        <div className="flex justify-between text-sm pt-5 px-5">
                            <div className="text-[#3AB6FF] font-semibold">
                                Technical
                            </div>
                            <div className=" text-[#A6A6A6] font-semibold">
                                10 July, 2024
                            </div>
                        </div>

                        <div className='mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5'>
                            Reading from Properties file with Spring-Boot library
                        </div>

                        <div className="absolute bottom-5 w-full">
                            <div className="flex justify-between w-full px-5">
                                <div className="text-[#545454] font-medium  cursor-pointer">
                                    Read Article
                                </div>
                                <div>
                                    <Image src={Arrow} alt="" className="cursor-pointer" />
                                </div>
                            </div>
                        </div>





                    </div>
                    </Link>

                    <Link href={`${pathname}/2`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
                        borderRadius: "10px",
                        background: '#FFF',
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                    }}>   <div >
                        <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                            <div className='relative hover:scale-110 transition-all duration-500'>
                                <Image src={BlogImage2} className='w-full h-[280px] object-cover object-center' alt="" />


                            </div>
                        </div>



                        <div className="flex justify-between text-sm pt-5 px-5">
                            <div className="text-[#3AB6FF] font-semibold">
                                Technical
                            </div>
                            <div className=" text-[#A6A6A6] font-semibold">
                                10 July, 2024
                            </div>
                        </div>

                        <div className='mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5'>
                            How to create the Wireframe of
                            your Spring Project
                        </div>
                        <div className="absolute bottom-5 w-full">
                            <div className="flex justify-between w-full px-5">
                                <div className="text-[#545454] font-medium  cursor-pointer">
                                    Read Article
                                </div>
                                <div>
                                    <Image src={Arrow} alt="" className="cursor-pointer" />
                                </div>
                            </div>
                        </div>





                    </div>
                    </Link>
                </div>
            </div>

        </>


    )
}