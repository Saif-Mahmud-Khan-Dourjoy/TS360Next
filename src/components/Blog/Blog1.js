"use client"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft,FaHeart,FaLink ,FaCheck,FaCircle,FaStar  } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import Avatar from "react-avatar";
import BlogImage1 from '/public/Blog/BlogImage1.png';
import BlogImage2 from '/public/Blog/BlogImage2.jpg';
import BlogImage3 from '/public/Blog/BlogImage3.jpg';
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
    public class Employee {
    private String empCode;
    private String empName;
    private LocalDate joiningDate;
    public String getEmpCode() { return empCode; }
    public String getEmpName() {return empName;}
    public LocalDate getJoiningDate() {return joiningDate;}
    public void setEmpCode(String code) {this.empCode = code;}
    public void setEmpName(String name) {this.empName = name;}
    public void setJoiningDate(LocalDate date) {this.joiningDate = date;}
    public void printOrgName() { System.out.println("XXXX");}
}`;

const javaCode2 = `
    public class TwoDimension {
        private String height;
        private String width;
        …
    public void addHeight (int x, int y) {… }
    public void addWidth (int x, int y) { … }
    } }
    public class ThreeDimension extends TwoDimension {
    public void addHeight (int x, int y, int z) {… }
    public void addWidth (int x, int y, int z) { … }
}`;




export default function Blog1() {
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
   

    const makePath=()=>{
       let pathArr=pathname.split('/');
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
                Solid Design Principles of Object-Oriented Design
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

                <Image src={BlogImage1} className="w-full object-cover object-top h-[400px] sm:h-[500px] md:h-[620px]" alt="" />
                <div>

                </div>

            </div>
            <div className="py-6 px-4 border-b-2 ">
                <div className="flex  justify-between">
                    <div className="flex gap-3 items-center flex-1">
                        {!love && <> <FaRegHeart className="text-2xl cursor-pointer" color="#818181" onClick={() => setLove(true)} /> <span className="text-lg text-[#818181] ">13</span> </>}
                        {love && <> < FaHeart className="text-2xl cursor-pointer"  color="red" onClick={() => setLove(false)} /> <span className="text-lg text-[#818181] ">14</span> </>}
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
                                            <FaLink  className="text-xl sm:text-2xl" /> <span style={{ fontSize: '12px' }}>Copy the link</span>
                                            {copied && <FaCheck className="absolute -right-5 top-1/2 transform -translate-y-1/2" color="green"  />}
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
                    In this blog, we would discuss what the <span className="font-semibold">SOLID</span>  design principles are in the context of our chosen programming language <span className="font-semibold">Java</span> .
                </div>
                <div className="mt-6 text-base md:text-lg">
                    <span className="font-semibold">SOLID</span> stands for the following:
                </div>
                <div className="mt-10 px-4">
                    <div className=" flex gap-4 ">
                        <FaCircle  className="text-[6px] relative top-[10px]" />
                        <div>
                            <div className="text-lg md:text-xl font-semibold">Single Responsibility Principle</div>
                            <div className="mt-2 text-base md:text-lg ">
                                A class should only have a single responsibility meaning it should have only one functional reason to change.
                            </div>
                            <div className="text-base md:text-lg font-semibold  mt-8">
                                Bad:
                            </div>
                            <div className="mt-1">
                                <div className="px-4">
                                    <div className="flex gap-3 text-base md:text-lg">
                                        <FaStar className="text-[6px] relative top-[10px]" />
                                        <span>In the below example, Employee class is supposed to have methods and variables related to employee,</span>

                                    </div>
                                    <div className="mt-1 flex gap-3 text-base md:text-lg">
                                        <FaStar className="text-[6px] relative top-[10px]" />
                                        <span> however the class does more than 1 thing which is it prints the Org Name. It clearly violates the rule of SRP.
                                        </span>

                                    </div>
                                    <div className="mt-4">
                                        <pre className="break-words whitespace-pre-wrap"><code>{javaCode}</code></pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-8 px-4">
                    <div className=" flex gap-4 ">
                        <FaCircle className="text-[6px] relative top-[10px]" />
                        <div>
                            <div className="text-lg md:text-xl font-semibold">Open/Closed Principle</div>
                            <div className="mt-5 text-base md:text-lg ">
                                {`"Software entities should be open for extension but closed for modification."`}
                                


                            </div>

                        </div>
                    </div>

                    <div className="mt-8 px-4">
                        <div className=" flex gap-4 ">
                            <FaCircle className="text-[6px] relative top-[10px]" />
                            <div>
                                <div className="text-lg md:text-xl font-semibold">Liskov Substitution Principle</div>
                                <div className="mt-5 text-base md:text-lg ">
                                    {`"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program." At its heart LSP is about interfaces and contracts as well as how to decide when to extend a class vs. use another strategy such as composition to achieve your goal.`}
                                </div>
                                <div className="text-base md:text-lg font-semibold  mt-8">
                                    Bad:
                                </div>
                                <div className="mt-1">
                                    <div className="px-4">
                                        <div className="flex gap-3 text-base md:text-lg">
                                            <FaStar className="text-[6px] relative top-[10px]" />
                                            <span> In the below example, ThreeDimension class extends the TwoDimension class,</span>

                                        </div>
                                        <div className="mt-1 flex gap-3 text-base md:text-lg">
                                            <FaStar className="text-[6px] relative top-[10px]" />
                                            <span> however the derived class alters the behavior of the base class by introducing one more parameter. It clearly violates the rule of LISP.
                                            </span>

                                        </div>
                                        <div className="mt-4">
                                            <pre className=" break-words whitespace-pre-wrap"><code>{javaCode2}</code></pre>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-8 px-4">
                        <div className=" flex gap-4 ">
                            <FaCircle className="text-[6px] relative top-[10px]" />
                            <div>
                                <div className="text-lg md:text-xl font-semibold">Interface Segregation Principle</div>
                                <div className="mt-5 text-base md:text-lg ">
                                    {`"Many client-specific interfaces are better than one general-purpose interface."`} meaning clients should not be forced to depend on interfaces they do not use. <Link className="text-[#3A9ED9] underline  break-all" target="_blank" href="https://www.oodesign.com/interface-segregation-principle.html" >

                                        https://www.oodesign.com/interface-segregation-principle.html

                                    </Link>  gives a good example.
                                </div>


                            </div>

                        </div>
                    </div>

                    <div className="mt-8 px-4">
                        <div className=" flex gap-4 ">
                            <FaCircle className="text-[6px] relative top-[10px]" />
                            <div>
                                <div className="text-lg md:text-xl font-semibold">Dependency Inversion Principle</div>
                                <div className="mt-5 text-base md:text-lg ">
                                    {`One should "depend upon abstractions, [not] concretions." This says high level modules should not depend on low level modules.  Both should depend upon abstractions (interfaces) and be implemented through dependency injection. `}<Link className="text-[#3A9ED9] underline  break-all" target="_blank" href="https://www.tutorialsteacher.com/ioc/dependency-inversion-principle" >

                                        https://www.tutorialsteacher.com/ioc/dependency-inversion-principle

                                    </Link> gives a good example.
                                </div>


                            </div>

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
                                Design Principles
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
                            {!love && <> <FaRegHeart className="text-2xl cursor-pointer"  color="#818181" onClick={() => setLove(true)} /> <span className="text-lg text-[#818181] ">13</span> </>}
                            {love && <> <FaHeart className="text-2xl cursor-pointer"  color="red" onClick={() => setLove(false)} /> <span className="text-lg text-[#818181] ">14</span> </>}
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
                                                {copied && <FaCheck className="absolute -right-5 top-1/2 transform -translate-y-1/2" color="green"  />}
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

                        <Link href={`${makePath()}/3`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
                                borderRadius: "10px",
                                background: '#FFF',
                                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                            }}>        <div >
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
            <Link href={`${makePath()}/2`} className='cursor-pointer relative transition-all duration-500 hover:-translate-y-6' style={{
                                borderRadius: "10px",
                                background: '#FFF',
                                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                            }}>            <div >
                                <div className='overflow-hidden' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }}>
                                    <div className='relative hover:scale-110 transition-all duration-500'>
                                        <Image src={BlogImage2} className='w-full h-[280px] object-cover object-center' alt="" />


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
                                    How to create the Wireframe of
                                    your Spring Project
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