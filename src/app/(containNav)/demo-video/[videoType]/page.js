"use client"
import { useState } from "react";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";
import V1 from '/public/Video/V1.png'
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import EmptyBlog_Image from '/public/Blog/EmptyBlog_Image.png';


export default function VideoType({ params }) {
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  return (
    <>
      <div className='mt-8'>
        {params.videoType == 'allVideo' &&
          <>
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
              <div className='' style={{
                borderRadius: "10px",
                background: '#FFF',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
              }}>
                <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                  <div className='relative hover:scale-110 transition-all duration-500 cursor-pointer' onClick={() => { setVideoId("hAdT_0O7TI8"); setOpen(true) }}>
                    <Image src={V1} className='w-full max-h-[300px]' alt="" />
                    <div className='bg-gray-400/50 absolute top-0 left-0 right-0 bottom-0'></div>
                    <FaRegCirclePlay className='shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500  text-[50px] hover:text-[60px]' />
                  </div>
                </div>

                <div className='pt-5 px-5 pb-8'>
                  <div className=' text-xl md:text-2xl font-semibold text-gray-950'>
                    Getting started with TS360 Web
                  </div>
                  <div className='mt-3 text-base md:text-xl'>
                    Get familiar with the basics of using TS360 and create test cases with ease
                  </div>

                </div>
              </div>

            </div>
            <div className='mt-1'>

            </div>
          </>
        }
        {params.videoType == 'essential' && <>
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
            <div className='' style={{
              borderRadius: "10px",
              background: '#FFF',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
            }}>
              <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                <div className='relative hover:scale-110 transition-all duration-500 cursor-pointer' onClick={() => { setVideoId("hAdT_0O7TI8"); setOpen(true) }}>
                  <Image src={V1} className='w-full max-h-[300px]' alt="" />
                  <div className='bg-gray-400/50 absolute top-0 left-0 right-0 bottom-0'></div>
                  <FaRegCirclePlay className='shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[50px] hover:text-[60px] transition-all duration-500 ' />
                </div>
              </div>

              <div className='pt-5 px-5 pb-8'>
                <div className=' text-xl md:text-2xl font-semibold text-gray-950'>
                  Getting started with TS360 Web
                </div>
                <div className='mt-3 text-base md:text-xl'>
                  Get familiar with the basics of using TS360 and create test cases with ease
                </div>

              </div>
            </div>

          </div>
          <div className='mt-1'>

          </div>
        </>
        }

        {params.videoType == 'advance' &&
          <>




            <div className="my-10 flex flex-col justify-between items-center gap-4">
              <div>
                <Image src={EmptyBlog_Image} alt="" />
              </div>
              <div className="w-full sm:w-[90%] md:w-[70%] xl:w-[40%] mx-auto text-center text-xl">
                {`We're brewing up some bright ideas for this category. Check back soon for new content!`}
              </div>
            </div>


          </>

        }
        {params.videoType == 'web' &&
          <>
            <div className="my-10 flex flex-col justify-between items-center gap-4">
              <div>
                <Image src={EmptyBlog_Image} alt="" />
              </div>
              <div className="w-full sm:w-[90%] md:w-[70%] xl:w-[40%] mx-auto text-center text-xl">
                {`We're brewing up some bright ideas for this category. Check back soon for new content!`}
              </div>
            </div>
          </>

        }
        {params.videoType == 'mobile' &&
          <>
            <div className="my-10 flex flex-col justify-between items-center gap-4">
              <div>
                <Image src={EmptyBlog_Image} alt="" />
              </div>
              <div className="w-full sm:w-[90%] md:w-[70%] xl:w-[40%] mx-auto text-center text-xl">
                {`We're brewing up some bright ideas for this category. Check back soon for new content!`}
              </div>
            </div>
          </>

        }

      </div>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
    </>
  )
}