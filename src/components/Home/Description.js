import infinite from '../../../public/Home/infinite.png'
import desktop from '../../../public/Home/desktop.png'
import Image from 'next/image'
export default function Description() {
    return (
        <>
            <div className='flex justify-center'>
                <div className=' text-white font-bold text-3xl  text-center  lg:w-[60%]  xl:w-[50%]' data-aos="zoom-in">
                    <div className='inline-block relative top-[-2.5px] leading-[60px]'>Test</div> <div className="text-container">
                        <span className='text-white ' >Automation</span>
                        <span className='text-[#56AF82]'>Automation</span>
                        <span className='text-[#8781F2]'>Automation</span>
                        <span className='text-[#F2985A]'>Automation</span>
                        <span className='text-[#FF5656]'>Automation</span>
                    </div> <div className='inline-block relative top-[-2.5px] leading-[60px]'>that keeps pace </div>
                    <div className='inline-block relative top-[-2.5px] leading-[60px]'> with your agile cadence </div>
                </div>
            </div>

            <div className='mt-14'>
                <div className='flex justify-between gap-x-20 gap-y-10 flex-wrap flex-col md:flex-row'>
                    <div className='flex flex-col items-center justify-center bg-[#486681] rounded-md p-10 flex-1 hover:shadow-2xl home-about-div' data-aos="fade-up">
                        <div>
                            <Image className='max-h-48 mb-5 max-w-48' src={infinite} alt="" />
                        </div>
                        <div className='text-center text-gray-300  home-about-div-text lg:text-xl text-base'>
                            Our CICD pipelines seamlessly integrate Continuous Testing (CT) across the software development lifecycle. We believe Agile thrives on a foundation of automated testing.
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-[#486681] rounded-md p-10 flex-1 hover:shadow-2xl home-about-div' data-aos="fade-down">
                        <div>
                            <Image className='max-h-48 mb-5 max-w-48' src={desktop} alt="" />
                        </div>
                        <div className='text-center text-gray-300 home-about-div-text lg:text-xl text-base'>
                            We offer end-to-end mobile, web, and API testing capabilities that seamlessly align with the Agile cadence of both large and small firms, propelling them towards efficient and timely software delivery.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}