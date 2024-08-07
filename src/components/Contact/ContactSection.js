"use client"
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import ContactForm from "./ContactForm";
import ContactEmail from "./ContactEmail";



export default function ContactSection(){
    useEffect(()=>{
        AOS.init({
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 2000, // values from 0 to 3000, with step 50ms
            easing: 'ease',
          });
    },[])
    return(
        <>
            <div className="md:flex mt-40 md:mt-[200px] relative overflow-hidden">
                <ContactForm/>
                <ContactEmail/>
                
            </div> 
        </>
    )
}