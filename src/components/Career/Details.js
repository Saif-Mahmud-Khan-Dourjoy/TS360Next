

import { FaClock,FaLocationDot,FaCircle  } from "react-icons/fa6";


export default function SingleJob() {
    return (
        <div className="mt-40 md:mt-44 lg:px-24 px-7 mb-10">
            <div className="flex sm:justify-between sm:items-center sm:flex-row flex-col">
                <div className="">
                    <div className=" text-3xl md:text-4xl font-bold mb-6">
                        JavaScript Developer
                    </div>
                    <div className="flex gap-x-4">
                        <div className="bg-[#486681] h-fit px-3 sm:px-6 py-2 rounded-full text-white shadow-2xl hover:bg-[#426d94] cursor-pointer flex items-center">
                            <FaLocationDot className="mr-2"  />
                            Remote

                        </div>
                        <div className="bg-[#486681] h-fit px-3 sm:px-6 py-2 rounded-full text-white shadow-2xl hover:bg-[#426d94] cursor-pointer flex items-center">
                            <FaClock className="mr-2"  />
                            Full-time

                        </div>
                    </div>


                </div>
                <div >

                    <div className="bg-[#6EC740] px-10 py-2 rounded-xl text-white shadow-2xl hover:bg-[#7be745] cursor-pointer sm:mt-0 mt-8 w-fit mx-auto sm:mx-0">

                        Apply Now
                    </div>

                </div>
            </div>
            <div className="mt-8">
                Experience Required: <span className="font-bold">2+ years</span>
            </div>
            <div className="mt-8">
                <div className="font-bold text-xl sm:text-2xl">
                    Responsibilities
                </div>
                <div>
                    <hr className="w-full h-0.5 bg-gray-400 border-0 my-4" />
                </div>
                <div className="flex justify-between md:flex-row flex-col gap-x-10 gap-y-5">
                    <div className="flex-1">
                        <div className="flex">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Develop, test, and maintain user-facing features for TestSprint360's web application using modern JavaScript frameworks (e.g., React, Vue.js).`}</span>
                        </div>
                        <div className="flex my-5">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Collaborate with designers and back-end developers to ensure a seamless user experience.`}</span>
                        </div>
                        <div className="flex">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`

                              Write clean, maintainable, and well-documented code.`}</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }}  />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Participate in code reviews and contribute to improving code quality.`}</span>
                        </div>
                        <div className="flex my-5">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }}  />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Stay up-to-date with the latest JavaScript technologies and best practices.`}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div className="font-bold text-xl sm:text-2xl">
                    Qualifications
                </div>
                <div>
                    <hr className="w-full h-0.5 bg-gray-400 border-0 my-4" />
                </div>
                <div className="flex justify-between md:flex-row flex-col gap-x-10 gap-y-5">
                    <div className="flex-1">
                        <div className="flex">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }}  />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`2-4 years of experience as a JavaScript developer.`}</span>
                        </div>
                        <div className="flex my-5">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }}  />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Strong understanding of JavaScript fundamentals (ES6+).`}</span>
                        </div>
                        <div className="flex">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }}  />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`

                              Proficiency in a popular JavaScript framework (e.g., React, Vue.js).`}</span>
                        </div>
                        <div className="flex mt-5">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`

                              Experience with web development tools (e.g., Git, npm).`}</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Excellent communication and collaboration skills.`}</span>
                        </div>
                        <div className="flex my-5">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`A passion for building high-quality, user-friendly applications.`}</span>
                        </div>
                        <div className="flex my-5">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Bonus points for experience with no-code testing tools or frameworks.`}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div className="font-bold text-xl sm:text-2xl">
                Benefits
                </div>
                <div>
                    <hr className="w-full h-0.5 bg-gray-400 border-0 my-4" />
                </div>
                <div className="flex justify-between md:flex-row flex-col gap-x-10 gap-y-5">
                    <div className="flex-1">
                        <div className="flex">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Competitive salary and benefits package.`}</span>
                        </div>
                        <div className="flex my-5">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Opportunity to work on a cutting-edge product that is revolutionizing the QA industry.`}</span>
                        </div>
                       
                    </div>

                    <div className="flex-1">
                        <div className="flex">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Fast-paced and collaborative work environment.`}</span>
                        </div>
                        <div className="flex my-5">
                            <FaCircle color="#486681" className="mr-2 relative top-[12px] -z-10" style={{ height: '5px' }} />
                            <span className="text-[#486681] text-base sm:text-lg md:text-xl">{`Continuous learning and development opportunities.`}</span>
                        </div>
                       

                    </div>
                </div>
            </div>
        </div>
    )
}
