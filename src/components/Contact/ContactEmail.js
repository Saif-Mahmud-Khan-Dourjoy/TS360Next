import Image from "next/image";
import Laptop from '../../../public/ContactUs/laptopContact.png'
import Intersect from '../../../public/ContactUs/Intersect.png'
import Intersect1 from '../../../public/ContactUs/Intersect-1.png'

export default function ContactEmail() {
  return (
    <div className="md:rounded-tl-[70px] h-auto p-5 flex-1 bg-gradient-to-b from-[#538195]  to-[#2F5B6F] relative flex flex-col justify-center items-center" data-aos="zoom-in">

      <Image src={Intersect} alt="" className="absolute bottom-0 left-10 h-10 max-w-28  " style={{ zIndex: '2' }} />
      <Image src={Intersect1} alt="" className="absolute top-0 right-0 h-20 max-w-24 sm:max-w-[120px] sm:h-28 " style={{ zIndex: '2' }} />
      <Image src={Laptop} alt="" className="  max-h-80 max-w-[300px] sm:max-w-[350px]  " />
      <div className=" text-center absolute bottom-[15%]  md:static z-10 ">
        <div className="text-white lg:text-base xl:text-lg font-normal ">You can also directly e-mail us at</div>
        <div className="  text-white lg:text-[22px] xl:text-[26px] font-semibold mt-2">contact@testsprint360.com</div>
      </div>
    </div>
  )
}