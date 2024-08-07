
export default function Video() {

  return (
    <>
      <div className='mt-14 md:pl-24 pl-7 md:pr-24 pr-7'>
        <div className=''>
          <div className='text-white text-base sm:text-lg md:text-2xl font-semibold text-center' data-aos="flip-left">
            Check out our introduction video to learn more
          </div>
          <div className="">
            <div className='mt-12'>
              <iframe style={{ boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset' }} className='home-video mx-auto sm:w-[560px]  sm:h-[315px] lg:w-[800px] lg:h-[450px]' src="https://www.youtube.com/embed/rnKDss5NtAc?autoplay=1&mute=1&rel=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>

        </div>



      </div>

    </>
  )
}