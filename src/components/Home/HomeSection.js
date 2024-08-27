"use client"
import { useEffect } from "react";
import Description from "./Description";
import HeroSection from "./HeroSection";
import Unleash from "./Unleash";
import WhyTS from "./WhyTS";

import AOS from 'aos';
import 'aos/dist/aos.css';
import Video from "./Video";



export default function HomeSection() {
  useEffect(() => {
    AOS.init({
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 2000, // values from 0 to 3000, with step 50ms
      easing: 'ease',
    });
  }, [])
  return (
    <>
      <div className="overflow-hidden mt-[109px] main-div" style={{ background: 'linear-gradient(to bottom,#46647f,#1d3850 )' }}>
        <HeroSection />
        <div className='mt-10 md:pl-24 pl-7 md:pr-24 pr-7'>
          <Description />
          <WhyTS />
        </div>
        <Video />
        <Unleash />
      </div>
    </>
  )
}