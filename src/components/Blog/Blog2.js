"use client"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft, FaHeart, FaLink, FaCheck, FaCircle, FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import Avatar from "react-avatar";
import BlogImage1 from '/public/Blog/BlogImage1.png';
import BlogImage2 from '/public/Blog/BlogImage2.jpg';
import BlogImage3 from '/public/Blog/BlogImage3.jpg';
import BlogImage4 from '/public/Blog/BlogImage4.png';
import BlogImage5 from '/public/Blog/BlogImage5.png';
import Figure_2_1 from '/public/Blog/Figure_2_1.png';
import Figure_2_2 from '/public/Blog/Figure_2_2.png';
import Arrow from '/public/Blog/Arrow.png';
import Share from '/public/Blog/Share.png';
import '/public/css/blog.css';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  XIcon
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import Image from "next/image";


const javaCode = `
    package com.example.demo;
    
    import org.junit.jupiter.api.Test;
    import org.springframework.boot.test.context.SpringBootTest;
    
    @SpringBootTest
    class DemoApplicationTests {
    
      @Test
      void contextLoads() {
      }
    }`;


export default function Blog2() {
  const [love, setLove] = useState(false);
  const [showShareOption, setShowShareOption] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyFunc = () => {
    setCopied(true)
  }
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }, [copied])
  const makePath = () => {
    let pathArr = pathname.split('/');
    pathArr.shift();
    pathArr.pop();
    return `/${pathArr.join('/')}`;

  }
  return (
    <div className=" mb-10">
      <div className="w-fit  text-sm text-[#A6A6A6] cursor-pointer ">
        <Link href='/blog/allPost?filter=recent' className="flex items-center"> <FaAngleLeft /> <span className="ml-1">Back to Blog</span> </Link>
      </div>
      <div className="text-3xl text-black font-extrabold mt-5">
        How to create the Wireframe of your Spring Project
      </div>
      <div className="flex gap-4 items-center mt-4">
        <div>
          <Avatar size="35" round={true} name="Test Sprint" color="#3AB6FF" fgColor="white" className="font-semibold " />
        </div>
        <div>
          <div className="text-[#212B36] font-semibold text-xl">
            TS Engineering Team
          </div>
          <div className="text-[#486681] text-sm font-medium ">
            10 July, 2024 | 2 min read
          </div>
        </div>


      </div>

      <div className="w-full mt-8">

        <Image src={BlogImage2} className="w-full object-cover object-top h-[400px] sm:h-[500px] md:h-[620px]" alt="" />
        <div>

        </div>

      </div>
      <div className="py-6 px-4 border-b-2 ">
        <div className="flex  justify-between">
          <div className="flex gap-3 items-center flex-1">
            {!love && <> <FaRegHeart className="text-2xl cursor-pointer" color="#818181" onClick={() => setLove(true)} /> <span className="text-lg text-[#818181] ">13</span> </>}
            {love && <> < FaHeart className="text-2xl cursor-pointer" color="red" onClick={() => setLove(false)} /> <span className="text-lg text-[#818181] ">14</span> </>}
          </div>
          <div className="w-[70%] sm:flex-1 flex justify-end relative">
            <div className="">
              <Image onClick={() => setShowShareOption(!showShareOption)} src={Share} alt="" className="cursor-pointer " />

              <div className={`w-fit transition-all duration-500 absolute ${showShareOption ? 'right-0 top-12 opacity-1' : 'right-0 top-10 opacity-0'}  h-fit bg-white z-50`} style={{ boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px' }}>
                <div className="relative triangle">

                </div>
                <div className="p-3 sm:p-5" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                  <CopyToClipboard onCopy={copyFunc} text={url}>
                    <div className="flex gap-4 items-center text-[#818181] w-fit cursor-pointer mb-3 relative"  >
                      <FaLink className="text-xl sm:text-2xl" /> <span style={{ fontSize: '12px' }}>Copy the link</span>
                      {copied && <FaCheck className="absolute -right-5 top-1/2 transform -translate-y-1/2" color="green" />}
                    </div>
                  </CopyToClipboard>
                  <hr />
                  <div className=" mt-3"  >
                    <FacebookShareButton className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer" url={url} hashtag={"#blog #TS360"}>
                      <FacebookIcon round='true' size='30'   >

                      </FacebookIcon>
                      <span className="text-[#818181]" style={{ fontSize: '12px' }}>Share on Facebook</span>
                    </FacebookShareButton>

                  </div>
                  <div className=" mt-3"  >
                    <LinkedinShareButton className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer" url={url} hashtag={"#blog #TS360"}>
                      <LinkedinIcon round='true' size='30'   >

                      </LinkedinIcon>
                      <span className="text-[#818181]" style={{ fontSize: '12px' }}>Share on Linkedin</span>
                    </LinkedinShareButton>

                  </div>
                  <div className=" mt-3"  >
                    <TwitterShareButton className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer" url={url} hashtag={"#blog #TS360"}>
                      <XIcon round='true' size='30'   >

                      </XIcon>
                      <span className="text-[#818181]" style={{ fontSize: '12px' }}>Share on Twitter(X)</span>
                    </TwitterShareButton>

                  </div>
                </div>



              </div>
            </div>

          </div>

        </div>

      </div>
      <div className="mt-6">
        <div className="text-base md:text-lg ">
          In this blog, we will show you how to create the <span className="font-semibold">Spring-Boot</span>  wireframe and initial folder structure for your project.
        </div>
        <div className="mt-10 ">


          <div>
            <div className="text-lg md:text-xl font-semibold">Bootstrapping with Spring-Boot:</div>
            <div className="mt-6 text-base md:text-lg ">
              Bootstrapping with Spring-Boot: Let’s get started! Open your browser and go to <Link className="text-[#3A9ED9] underline  break-all" target="_blank" href="https://start.spring.io"> https://start.spring.io</Link>. This is from where we would bootstrap. Select Project, language and any release version of Spring-Boot. TS360 uses Gradle, Java with Spring-Boot 2.x. Now fill up the project meta data, packaging and Java version. So, my screen now looks like this:
            </div>
            <div className="mt-6 flex justify-center">
              <Image src={Figure_2_1} className="object-center object-cover" alt="" />
            </div>
            <div className="text-center text-[#818181] text-sm mt-2">
              Fig: Spring Initializr User Interface
            </div>
            <div className="text-base md:text-lg mt-5">
              Click on <span className="font-semibold">GENERATE</span> button. This would download the project zip file to your personal computer. Unzip the file in any desired location.
            </div>



          </div>


        </div>

        <div className="mt-10 ">


          <div>
            <div className="text-lg md:text-xl font-semibold">Opening your project in IntelliJ:</div>
            <div className="mt-6 text-base md:text-lg ">
              Now open the project in your IntelliJ editor. In your editor, click on <span className="font-semibold">{`File menu -> Open -> Go to your folder location -> Select build.gradle.`} </span>
            </div>
            <div className="mt-1 text-base md:text-lg ">
              You may see a pop-up like below. Select <span className="font-semibold">Open as Project.</span>
            </div>
            <div className="mt-6 flex justify-center">
              <Image src={Figure_2_2} className="object-center object-cover" alt="" />
            </div>
            <div className="text-center text-[#818181] text-sm mt-2">
              Fig: Open Project prompt in IntelliJ Editor
            </div>
            <div className="text-base md:text-lg mt-5">
              DemoApplication class in <span className="font-semibold">src/main/java/com/example/demo</span> folder is the runner class with main method in Spring. This gets triggered when you run any other class with Junit.
            </div>
            <div className="text-base md:text-lg mt-8">
              <span className="font-semibold">DemoApplicationTests</span> class is by default created and it looks like below:
            </div>
            <div className="mt-4">
              <pre className=" break-words whitespace-pre-wrap"><code>{javaCode}</code></pre>

            </div>
            <div className="mt-6 text-base md:text-lg">
              You would also see the file <span className="font-semibold">application.propertie</span>  which is empty. You can use it to provide your app data and source it using <span className="font-semibold">@PropertySources</span>spring annotation. More on that would be in a later blog.
            </div>



          </div>


        </div>


        <div className="mt-8">
          <div className="flex gap-5 items-center">
            <div className="text-base md:text-lg font-medium">
              Tags:
            </div>
            <div className="flex gap-2 md:gap-3 flex-wrap">
              <div className="bg-[#F6F6F6] py-1 px-3 md:px-5 border-2 text-sm md:text-base text-[#486681] rounded-3xl">
                Java
              </div>
              <div className="bg-[#F6F6F6] py-1 px-3 md:px-5 border-2 text-sm md:text-base text-[#486681] rounded-3xl">
                SpringBoot
              </div>
              <div className="bg-[#F6F6F6] py-1 px-3 md:px-5 border-2 text-sm md:text-base text-[#486681] rounded-3xl">
                OOP
              </div>


            </div>
          </div>
        </div>

        <div className="py-6 px-4 border-b-2 ">
          <div className="flex  justify-between">
            <div className="flex gap-3 items-center flex-1">
              {!love && <> <FaRegHeart className="text-2xl cursor-pointer" color="#818181" onClick={() => setLove(true)} /> <span className="text-lg text-[#818181] ">13</span> </>}
              {love && <> <FaHeart className="text-2xl cursor-pointer" color="red" onClick={() => setLove(false)} /> <span className="text-lg text-[#818181] ">14</span> </>}
            </div>
            <div className="w-[70%] sm:flex-1 flex justify-end relative">
              <div className="">
                <Image onClick={() => setShowShareOption(!showShareOption)} src={Share} alt="" className="cursor-pointer " />

                <div className={`w-fit transition-all duration-500 absolute ${showShareOption ? 'right-0 top-12 opacity-1' : 'right-0 top-10 opacity-0'}  h-fit bg-white z-50`} style={{ boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px' }}>
                  <div className="relative triangle">

                  </div>
                  <div className="p-3 sm:p-5" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                    <CopyToClipboard onCopy={copyFunc} text={url}>
                      <div className="flex gap-4 items-center text-[#818181] w-fit cursor-pointer mb-3 relative"  >
                        <FaLink className="text-xl sm:text-2xl" /> <span style={{ fontSize: '12px' }}>Copy the link</span>
                        {copied && <FaCheck className="absolute -right-5 top-1/2 transform -translate-y-1/2" color="green" />}
                      </div>
                    </CopyToClipboard>
                    <hr />
                    <div className=" mt-3"  >
                      <FacebookShareButton className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer" url={url} hashtag={"#blog #TS360"}>
                        <FacebookIcon round='true' size='30'   >

                        </FacebookIcon>
                        <span className="text-[#818181]" style={{ fontSize: '12px' }}>Share on Facebook</span>
                      </FacebookShareButton>

                    </div>
                    <div className=" mt-3"  >
                      <LinkedinShareButton className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer" url={url} hashtag={"#blog #TS360"}>
                        <LinkedinIcon round='true' size='30'   >

                        </LinkedinIcon>
                        <span className="text-[#818181]" style={{ fontSize: '12px' }}>Share on Linkedin</span>
                      </LinkedinShareButton>

                    </div>
                    <div className=" mt-3"  >
                      <TwitterShareButton className="flex gap-3 sm:gap-4 items-center  w-fit cursor-pointer" url={url} hashtag={"#blog #TS360"}>
                        <XIcon round='true' size='30'   >

                        </XIcon>
                        <span className="text-[#818181]" style={{ fontSize: '12px' }}>Share on Twitter(X)</span>
                      </TwitterShareButton>

                    </div>
                  </div>



                </div>
              </div>

            </div>

          </div>

        </div>
        <div className="mt-6">
          <div className="text-3xl font-bold">
            Related Articles
          </div>
          <div className="mt-12">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">

              <Link href={`${makePath()}/1`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
                borderRadius: "10px",
                background: '#FFF',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
              }}>     <div>
                  <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                    <div className='relative hover:scale-110 transition-all duration-500'>
                      <Image src={BlogImage1} className='w-full h-[280px] object-cover object-center' alt="" />


                    </div>
                  </div>



                  <div className="flex justify-between text-sm pt-5 px-5">
                    <div className="text-[#3AB6FF] font-semibold">
                      Technical
                    </div>
                    <div className=" text-[#A6A6A6] font-semibold">
                      10 July, 2024
                    </div>
                  </div>

                  <div className='mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5'>
                    Solid Design Principles of Object-Oriented Design
                  </div>

                  <div className="absolute bottom-5 w-full">
                    <div className="flex justify-between w-full px-5">
                      <div className="text-[#545454] font-medium  cursor-pointer">
                        Read Article
                      </div>
                      <div>
                        <Image src={Arrow} alt="" className="cursor-pointer" />
                      </div>
                    </div>
                  </div>





                </div>
              </Link>

              <Link href={`${makePath()}/3`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
                borderRadius: "10px",
                background: '#FFF',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
              }}>      <div >
                  <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                    <div className='relative hover:scale-110 transition-all duration-500'>
                      <Image src={BlogImage3} className='w-full h-[280px] object-cover object-center' alt="" />


                    </div>
                  </div>



                  <div className="flex justify-between text-sm pt-5 px-5">
                    <div className="text-[#3AB6FF] font-semibold">
                      Technical
                    </div>
                    <div className=" text-[#A6A6A6] font-semibold">
                      10 July, 2024
                    </div>
                  </div>

                  <div className='mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5'>
                    Reading from Properties file with Spring-Boot library
                  </div>

                  <div className="absolute bottom-5 w-full">
                    <div className="flex justify-between w-full px-5">
                      <div className="text-[#545454] font-medium  cursor-pointer">
                        Read Article
                      </div>
                      <div>
                        <Image src={Arrow} alt="" className="cursor-pointer" />
                      </div>
                    </div>
                  </div>





                </div>
              </Link>
              <Link href={`${makePath()}/4`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
                borderRadius: "10px",
                background: '#FFF',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
              }}>            <div >
                  <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                    <div className='relative hover:scale-110 transition-all duration-500'>
                      <Image src={BlogImage4} className='w-full h-[280px] object-cover object-center' alt="" />


                    </div>
                  </div>



                  <div className="flex justify-between text-sm pt-5 px-5">
                    <div className="text-[#3AB6FF] font-semibold">
                      Technical
                    </div>
                    <div className=" text-[#A6A6A6] font-semibold">
                      10 July, 2024
                    </div>
                  </div>

                  <div className='mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5'>
                    Group and run your tests selectively using Gradle tasks
                  </div>
                  <div className="absolute bottom-5 w-full">
                    <div className="flex justify-between w-full px-5">
                      <div className="text-[#545454] font-medium  cursor-pointer">
                        Read Article
                      </div>
                      <div>
                        <Image src={Arrow} alt="" className="cursor-pointer" />
                      </div>
                    </div>
                  </div>





                </div>
              </Link>
              <Link href={`${makePath()}/5`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
                borderRadius: "10px",
                background: '#FFF',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
              }}>            <div >
                  <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                    <div className='relative hover:scale-110 transition-all duration-500'>
                      <Image src={BlogImage5} className='w-full h-[280px] object-cover object-center' alt="" />


                    </div>
                  </div>



                  <div className="flex justify-between text-sm pt-5 px-5">
                    <div className="text-[#3AB6FF] font-semibold">
                      Technical
                    </div>
                    <div className=" text-[#A6A6A6] font-semibold">
                      10 July, 2024
                    </div>
                  </div>

                  <div className='mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5'>
                    Deciding on an efficient Locator strategy for multiple web browsers and mobile OS
                  </div>
                  <div className="absolute bottom-5 w-full">
                    <div className="flex justify-between w-full px-5">
                      <div className="text-[#545454] font-medium  cursor-pointer">
                        Read Article
                      </div>
                      <div>
                        <Image src={Arrow} alt="" className="cursor-pointer" />
                      </div>
                    </div>
                  </div>





                </div>
              </Link>

            </div>
          </div>
        </div>
      </div >
    </div>
  )
}