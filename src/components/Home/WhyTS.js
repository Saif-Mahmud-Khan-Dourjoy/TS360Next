"use client"
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import topBG from '../../..../../../public/Home/topBG.png'
import bottomBG from '../../../public/Home/bottomBG.png'
import TrendUp from '../../../public/Home/TrendUp.png'
import Scales from '../../../public/Home/Scales.svg'
import Laptop from '../../../public/Home/Laptop.svg'
import Gear from '../../../public/Home/Gear.svg'
import Handshake from '../../../public/Home/Handshake.svg'
import "../../../public/css/slickSlider.css"
import "../../../public/css/slickSlider.css"
import Slider from "react-slick";
import Image from 'next/image'

const images = [TrendUp, Gear, Laptop, Scales, Handshake]
const tabs = [
    { id: 0, title: "Do more with less", content: "TestSprint360 would allow you to do more with less. All capabilities from Test Case creation to runtime environment for running both locally and in your own CI/CD server is provided in one package. Generate customized Pdf test execution report with your own logo." },
    { id: 1, title: "Customization according to your need", content: "TestSprint360 would customize to meet the enterprise requirement of your test organization. That includes integration with your test management systems, allowing your developers to write custom functions, localization testing to cover both LTR and RTL languages and dedicated customer support. Pricing based on customization type." },
    { id: 2, title: "Run locally or in our infrastructure", content: "As much as you can run locally, you can also choose to run in our hosted infrastructure. We would help you set up your daily batch run in our hosted Jenkins. TestSprint360 would partner with a leading cloud testing provider to allow you to run your tests on multiple browsers and devices." },
    { id: 3, title: "Overcome the agility gap in testing", content: "Both large and small companies struggle with agile testing. Big companies, despite resources, face challenges implementing sprint-based automation, leading to delays. Smaller companies lack the resources for extensive solutions. Existing low-code options are often expensive and limited, forcing them into pricier options that might not be perfect fits." },
    { id: 4, title: "Partner with us", content: "Do you have your own test lab and want to orchestrate in your own devices? Are you thinking of setting up your own lab? In either case, our team of engineers would help you get set up so that you can orchestrate tests in your lab devices with TestSprint360." },
  
  ];
  const settings = {
    dots: false,         // Dont Show dots for navigation
    infinite: true,     // Infinite looping of slides
    speed: 5000,         // Transition speed
    slidesToShow: 1,    // Number of slides to show at a time
    slidesToScroll: 1,  // Number of slides to scroll at a time
    arrows: false,      // Disable the arrows
    autoplay: true,     // Enable autoplay
    autoplaySpeed: 5000 // Autoplay speed in milliseconds (5000ms = 5 seconds)
  };
  

export default function WhyTS() {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);
    const progressIntervalRef = useRef(null);
  
    const startIntervals = () => {
      intervalRef.current = setInterval(() => {
        setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
        setProgress(0);
      }, 5000);
  
      progressIntervalRef.current = setInterval(() => {
        setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 2 : 0));
      }, 100);
    };
  
    const resetIntervals = () => {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
      setProgress(0);
      startIntervals();
    };
  
    useEffect(() => {
      startIntervals();
      return () => {
        clearInterval(intervalRef.current);
        clearInterval(progressIntervalRef.current);
      };
    }, []);
  
    const handleTabClick = (index) => {
      setActiveTab(index);
      resetIntervals();
    };
    return (
        <>
            <div className='mt-12'>
                <div className='text-white font-semibold text-2xl lg:text-3xl text-center' data-aos="flip-left">
                    Why TestSprint360?
                </div>
                <div className="hidden lg:flex mt-8 gap-x-36 items-stretch">
                    <div className="w-[30%] flex flex-col" data-aos="fade-up-right">
                        {tabs.map((tab, index) => (
                            <div key={tab.id} className="relative mb-5">
                                <div
                                    className={`text-xl lg:text-2xl p-2 cursor-pointer ${index === activeTab ? 'text-[#FFF]' : 'text-[#5C7E9D]'}`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    {tab.title}
                                </div>
                                {index === activeTab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 rounded" style={{
                                        width: `${progress}%`, transition: 'width 0.1s linear', backgroundColor: '#dbf26e',
                                        backgroundImage: 'linear-gradient(319deg, #dbf26e 0%, #61fa74 37%, #1cfdd6 100%)'
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-[60%] flex " data-aos="fade-up-left">
                        {tabs.map((tab, index) => (
                            <div key={tab.id} className={`slider-bg mt-4 relative w-full ${index === activeTab ? 'whyTSRight' : ''} ${index === activeTab ? '' : 'hidden'}`} >
                                <div className='px-5 h-full w-full absolute top-[-10px] left-[-10px]'>

                                    <div className='bg-[#71B48D] rounded-lg h-full w-full flex flex-col justify-center px-5   text-xl font-medium relative'>
                                        <div>
                                            <Image src={images[index]} alt="" className={`max-h-14 max-w-16`} />

                                        </div>
                                        <div className='text-base lg:text-xl relative z-10 mt-3'>
                                            {tab.content}
                                        </div>
                                        <Image src={topBG} alt="" className='absolute top-0 right-0 -z-0 max-h-16 max-w-24' />
                                        <Image src={bottomBG} alt="" className='absolute bottom-0 left-3 -z-0 max-h-16 max-w-28' />

                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-8 block lg:hidden' data-aos="fade-up-left">
                    <Slider {...settings}>
                        {tabs.map((tab, index) => (
                            <div className="flex flex-col" key={index}>
                                <div key={tab.id} className="flex justify-center">
                                    <div
                                        className={`h-[60px] sm:h-fit text-xl sm:text-2xl p-2 cursor-pointer text-white text-center`}

                                    >
                                        {tab.title}
                                    </div>

                                </div>

                                <div className={`slider-bg mt-8 relative max-w-[95%] md:max-w-[70%] min-h-[450px] sm:min-h-[400px] mx-auto `} >
                                    <div className='sm:px-5 h-full w-full absolute sm:top-[-10px] sm:left-[-10px] '>

                                        <div className='bg-[#71B48D] rounded-lg h-full w-full flex flex-col justify-center px-5   sm:text-xl font-medium relative'>
                                            <div>
                                                <Image src={images[index]} alt="" className={`max-h-14 max-w-16`} />

                                            </div>
                                            <div className='relative z-10 mt-3'>
                                                {tab.content}
                                            </div>
                                            <Image src={topBG} alt="" className='absolute top-0 right-0 -z-0 max-h-16 max-w-24' />
                                            <Image src={bottomBG} alt="" className='absolute bottom-0 left-3 -z-0 max-h-16 ' />

                                        </div>

                                    </div>

                                </div>





                            </div>
                        ))}


                    </Slider>
                </div>
            </div>
        </>
    )
}