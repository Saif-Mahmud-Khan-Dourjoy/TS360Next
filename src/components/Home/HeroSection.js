import Image from 'next/image'
import laptop from '../../../public/Home/laptop.png'
export default function HeroSection() {
    return (
        <>
            <div className='curved-bg'>

                <div className='relative z-10 md:pl-24  lg:py-0 pl-7 md:pr-24 pr-7 h-full'>
                    <div className='flex justify-center  lg:justify-between lg:items-center h-full lg:flex-row flex-col gap-y-4 top-[-5%] sm:top-[-10%] lg:top-0 relative'>
                        <div className='lg:order-1 order-2 ' data-aos="fade-right">
                            <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left'>
                                Continuous Testing at the speed of Agile
                            </div>
                            <div className='text-xl sm:text-2xl font-semibold my-4 text-center md:text-left'>
                                More Automation, Less Hassle

                            </div>
                            <div className="text-xl sm:text-2xl font-semibold gradient-text text-center md:text-left" >Expected Launch December 2024!</div>
                            <div className='mt-4 sm:gap-x-3 flex sm:flex-row flex-col gap-y-3 justify-center items-center md:justify-start'>
                                <button type="button" className="text-white bg-[#3A9ED9] hover:bg-[#54b1e6eb] focus:outline-none  font-medium rounded-full text-sm md:text-xl px-7 md:px-10 lg:px-[27px] xl:px-10  py-[14px] lg:py-2.5 text-center me-2 mb-2 shadow-homeButtom" >Buy Now</button>
                                <button type="button" className="text-white bg-[#82D955] hover:bg-[#6fbc49] focus:outline-none  font-medium rounded-full text-sm md:text-xl px-7 md:px-10 lg:px-[27px] xl:px-10  py-[14px] lg:py-2.5 text-center me-2 mb-2 shadow-homeButtom" >Start Free Trial</button>
                            </div>
                        </div>
                        <div className='lg:order-2 order-1 flex justify-center' data-aos="fade-left">

                            <Image className='max-h-96 lg:max-h-[1000px] w-auto lg:w-[1250px] home-laptop-img' src={laptop} alt="" />


                        </div>


                    </div>

                </div>

            </div>
        </>
    )
}