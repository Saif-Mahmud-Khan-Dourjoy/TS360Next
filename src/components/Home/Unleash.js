import bottomBG from '../../../public/Home/bottomBG.png'
import Gear2 from '../../../public/Home/Gear2.png'
import ellipse from '../../../public/Home/Ellipse.png'
import Image from 'next/image'
export default function Unleash(){
    return(
        <>
         <div className='mt-24 pb-10 relative px-5 overflow-hidden'>
          <Image src={ellipse} alt="" className='absolute top-0 right-0 max-h-[120px] max-w-24 z-0' />
          <Image src={bottomBG} alt="" className='absolute bottom-0 left-3 max-h-[70px]  max-w-36 z-0' />
          <Image src={Gear2} alt="" className='gear-rotate absolute bottom-[-16px] left-[50px] max-h-[70px] max-w-[70px]' style={{ zIndex: '0' }} />
          <Image src={Gear2} alt="" className='gear-rotate absolute top-[25px] right-0 max-h-[70px] max-w-[70px]' style={{ zIndex: '0' }} />



          <div className='text-xl sm:text-2xl font-bold text-center w-full sm:w-[60%] lg:w-[45%] text-gray-300 mx-auto relative z-10' data-aos="flip-left">
            Unleash continuous testing
            with TestSprint360
          </div>
          <div className='mt-14 flex justify-center relative z-10' data-aos="flip-right">
            <button type="button" className="text-white bg-[#82D955] hover:bg-[#6fbc49] focus:outline-none  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ boxShadow: '0px 61px 17px 0px rgba(0, 0, 0, 0.00), 0px 39px 16px 0px rgba(0, 0, 0, 0.01), 0px 22px 13px 0px rgba(0, 0, 0, 0.04), 0px 10px 10px 0px rgba(0, 0, 0, 0.07), 0px 2px 5px 0px rgba(0, 0, 0, 0.08)' }}>Start Free Trail</button>
          </div>
        </div>
        </>
    )
}