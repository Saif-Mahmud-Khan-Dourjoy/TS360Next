"use client"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
let timeoutId;
export default function Common() {
    const router = useRouter();
    const pathname = usePathname();
    const parts = pathname.split('/');
    const blogType = parts[2];
    const blogId = parts[3];
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString());
    const [search,setSearch]=useState("");
    useEffect(()=>{
      setSearch("")
    },[pathname])
    useEffect(()=>{
        timeoutId = setTimeout(() => {
         if(search){
            params.set("search", search);
         }
         else{
            params.delete("search");
         }
           
            router.replace(`${pathname}?${params.toString()}`);
        }, 1000);
        return ()=> clearTimeout(timeoutId);
    },[search])
    const setSelectedTab = (tab) => {
        if(tab=='allPost'){
 
            router.replace(`/blog/${tab}?filter=recent`);
        }
        else{
           
            router.replace(`/blog/${tab}`);
        }

       
        
    }
    const setSearchQuery = (e) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {

            params.set("search", e.target.value);
            router.replace(`${pathname}?${params.toString()}`);
        }, 1000);
    }
    
    return !blogId ? (
        <>
            <div className="font-bold text-3xl md:text-5xl text-center " data-aos="flip-left">
                <span className="text-gray-900 ">Stay</span> <span className="text-[#3AB6FF]">Ahead</span><span className="text-gray-900 ml-2">of the Tech Curve</span>
            </div>

            <div className='mt-10'>
                <div className='flex justify-between items-center flex-row gap-y-4'>
                    <div className='hidden lg:flex gap-x-5 '>
                        <div className={`cursor-pointer text-lg border-r-2 pr-5 h-fit ${pathname.includes('allPost') ? "text-[#3AB6FF]" : "text-[#A6A6A6]"}`} onClick={() => setSelectedTab('allPost')}>
                            All Posts
                        </div>
                        <div className={`cursor-pointer text-lg border-r-2 pr-5 h-fit ${pathname.includes('technical') ? "text-[#3AB6FF]" : "text-[#A6A6A6]"}`} onClick={() => setSelectedTab('technical')}>
                            Technicals
                        </div >
                        <div className={`cursor-pointer text-lg border-r-2 pr-5 h-fit ${pathname.includes('agile') ? "text-[#3AB6FF]" : "text-[#A6A6A6]"}`} onClick={() => setSelectedTab('agile')} >
                            Agile
                        </div>
                        <div className={`cursor-pointer text-lg border-r-2 pr-5 h-fit ${pathname.includes('news') ? "text-[#3AB6FF]" : "text-[#A6A6A6]"}`} onClick={() => setSelectedTab('news')}>
                            News
                        </div>
                        <div className={`cursor-pointer text-lg  ${pathname.includes('events') ? "text-[#3AB6FF]" : "text-[#A6A6A6]"}`} onClick={() => setSelectedTab('events')}>
                            Events
                        </div>
                    </div>
                    <div className='block lg:hidden'>
                        <select className={`${["allPost", "technical", "agile", "news", "events"].includes(blogType) ? "text-[#3AB6FF]" :

                            "text-[#A6A6A6]"
                            }`}
                            value={blogType}  onChange={(e) => setSelectedTab(e.target.value)}>
                            <option className="text-[#A6A6A6]" value="allPost">All Posts</option>
                            <option className="text-[#A6A6A6]" value="technical"> Technicals</option>
                            <option className="text-[#A6A6A6]" value="agile"> Agile</option>
                            <option className="text-[#A6A6A6]" value="news">News</option>
                            <option className="text-[#A6A6A6]" value="events">Events</option>
                        </select>
                    </div>
                    <div className='flex justify-end' style={{ zIndex: '0' }}>
                        <div className='relative'>
                            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className='p-2 pr-8 w-[200px] border-2 border-[#e2e2e2] rounded-md focus:border-[#3AB6FF]' />
                            <FaMagnifyingGlass className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[#9a9999]' />
                        </div>

                    </div>
                </div>
            </div>
        </>
    ):
    <>
    </>

}