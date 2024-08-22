import Image from "next/image";
import Link from "next/link";
import BlogImage1 from '../../../public/Blog/BlogImage1.png';
import BlogImage2 from '../../../public/Blog/BlogImage2.jpg';
import BlogImage3 from '../../../public/Blog/BlogImage3.jpg';
import BlogImage4 from '../../../public/Blog/BlogImage4.png';
import BlogImage5 from '../../../public/Blog/BlogImage5.png';
import Arrow from '../../../public/Blog/Arrow.png';
import { headers } from "next/headers";

export default function Technicals() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  return (
    <>
      <div className="mt-14 mb-5">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">

          <Link href={`${pathname}/1`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
            borderRadius: "10px",
            background: '#FFF',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
          }}>    <div >
              <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                <div className='relative hover:scale-110 transition-all duration-500'>
                  <Image src={BlogImage1} className='w-full h-[280px] object-cover object-center' alt="" />


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
                Solid Design Principles of Object-Oriented Design
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

          <Link href={`${pathname}/3`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
            borderRadius: "10px",
            background: '#FFF',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
          }}>     <div >
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
          }}>    <div >
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
          <Link href={`${pathname}/4`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
            borderRadius: "10px",
            background: '#FFF',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
          }}>            <div >
              <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                <div className='relative hover:scale-110 transition-all duration-500'>
                  <Image src={BlogImage4} className='w-full h-[280px] object-cover object-center' alt="" />


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
                Group and run your tests selectively using Gradle tasks
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
          <Link href={`${pathname}/5`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
            borderRadius: "10px",
            background: '#FFF',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
          }}>            <div >
              <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                <div className='relative hover:scale-110 transition-all duration-500'>
                  <Image src={BlogImage5} className='w-full h-[280px] object-cover object-center' alt="" />


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
                Deciding on an efficient Locator strategy for multiple web browsers and mobile OS
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