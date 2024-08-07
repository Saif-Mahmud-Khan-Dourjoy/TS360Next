
import { FaArrowRight } from "react-icons/fa6";
export default function ContactForm() {
    return (
        <div className="md:w-[60%]">
            <div className="lg:pl-24 pl-7 pr-5" data-aos="flip-left">
                <span className="text-zinc-800 text-3xl lg:text-4xl font-bold">We’d </span><span className="text-sky-400 text-3xl lg:text-4xl font-bold ">Love</span><span className="text-zinc-800 text-3xl lg:text-4xl font-bold "> to Hear from You</span>
                <div className=" text-slate-600 text-base font-normal mt-2">Have a question, suggestion, or just want to chat about test automation? Let us know!</div>
            </div>
            <div className=" bg-blue-400 lg:pl-24 pl-7 pr-7 md:pr-20 pt-10 pb-12 mt-8 relative" data-aos="flip-right">
                {/* <div className="hidden md:block w-[70px] h-[90px] bg-lime-400 absolute bottom-0 right-0"></div> */}
                <div className="grid gap-6 mb-1 sm:grid-cols-2">
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-100 ">Name</label>
                        <input type="text" id="name" className="bg-transparent  border-b-2 focus:border-b-gray-300 focus:outline-none text-gray-100 focus:ring-0 text-sm block w-full p-2.5 focus:border-b-2 placeholder-gray-300" placeholder="Enter Name" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-100 ">Email</label>
                        <input type="email" id="email" className="bg-transparent  border-b-2 focus:border-b-gray-300 focus:outline-none text-gray-100 focus:ring-0 text-sm block w-full p-2.5 focus:border-b-2 placeholder-gray-300" placeholder="Enter E-mail" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-100 ">Message</label>
                    <textarea rows="4" id="message" className="bg-transparent  border-b-2 focus:border-b-gray-300 focus:outline-none text-gray-100 focus:ring-0 text-sm block w-full p-2.5 focus:border-b-2 placeholder-gray-300" placeholder="Write your message"> </textarea>

                </div>

                <div className="mt-[39px] text-white ">
                    <span className="cursor-pointer hover:text-gray-200 flex justify-center items-center">SEND MESSAGE 
                    <FaArrowRight className="ml-2" /></span>
                </div>

            </div>
        </div>
    )
}