"use client"
import logo from "/public/logo.png";
import Auth2 from "/public/Auth/auth2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { OtpVarification } from "@/app/(auth)/Api/AuthenticationApi";
import { showErrorAlert, showSuccessAlert } from "../Alerts/Alert";
import CustomModal from "../Custom/Modal";
import LoaderModal from "../Custom/Loader";
import { useRouter } from 'next/navigation';


export default function OtpValidation() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [finalOtp, setFinalOtp] = useState("")
    const [activeOtpIndex, setActiveOtpIndex] = useState(0);
    const [sendCode, setSendCode] = useState(false);
    const inputRef = useRef(null);
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('success');
    const [modalMessage, setModalMessage] = useState('Operation was successful!');
    const router = useRouter();
    // const [clicked, setClicked] = useState(false);






    useEffect(() => {
        inputRef.current.focus();
    }, [activeOtpIndex]);

    useEffect(() => {
        console.log(otp)
        const hasEmptyString = otp.some((item) => item === "" || item === undefined);
        setSendCode(!hasEmptyString);

    }, [otp]);

    const openModal = (type, message) => {
        setModalType(type);
        setModalMessage(message);
        setModalOpen(true);
    };

    const handleOk = () => {

        setModalOpen(false);
        router.push(`/login`);

    };

    const handleCancel = () => {

        setModalOpen(false);
    };

    const handleChangeForOtp = (e, i) => {
        if (isNaN(e.target.value)) return false;

        const newOtp = [...otp];
        newOtp[i] = e.target.value;

        setOtp(newOtp);
        // handleChange({ target: { name: `otp[${i}]`, value: e.target.value } });
        setValues({ ...values, otp: newOtp })
        setFinalOtp(newOtp.join(''));

        // if (e.target.value !== "" && i < otp.length - 1) {
        //   setActiveOtpIndex((prev) => prev + 1);
        // }
        if (!e.target.value) {
            if (i > 0) {
                setActiveOtpIndex((prev) => prev - 1);
            }
        }
        else {
            if (e.target.value !== "" && i < otp.length - 1) {
                setActiveOtpIndex((prev) => prev + 1);
            }
        }
    };

    // const submitOtp = () => {

    //     if (finalOtp.length < 6) {
    //         alert('hfh')
    //         setClicked(true);
    //     }

    //     let data = {
    //         username: email,
    //         otp: finalOtp,
    //     }

    //     console.log(data)
    // }

    console.log(otp)

    const { handleSubmit, handleChange, values, touched, errors, handleBlur, setValues, resetForm } = useFormik({
        initialValues: {
            username: email,
            otp: new Array(6).fill(""),
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            otp: Yup.array()
                .of(Yup.string().length(1, 'Each OTP digit must be 1 character long'))
                .length(6, 'OTP must have exactly 6 digits')
                .required('OTP array is required'),
        }),
        onSubmit: (values) => {

            const { username, otp } = values;
            let data = {
                username,
                otp: otp.join('')
            }
            handleOtpVarification(data);
        }
    });

    const handleOtpVarification = async (data) => {
        setIsLoaderOpen(true)
        OtpVarification(data).then((res) => {
            if (res?.[0]) {
                setIsLoaderOpen(false)
                openModal('success', 'Your OTP is correct. Want to log in?')
                console.log(res?.[0])
                // setSuccessModalVisible(true);
                // showSuccessAlert('OTP is correct', 'center', 2000);
                // setTimeout(() => {
                //   router.push('/otp-varification');
                // }, 2000);
                // router.push(`/login`);

            } else {
                setIsLoaderOpen(false)
                openModal('error', res[1]?.response?.data?.message || "Something went wrong!")
                console.log(res[1]?.response?.data?.message || "Something went wrong!");
                // showErrorAlert(res[1]?.response?.data?.message || "Something went wrong!", 'center', 2000);
                // router.push(`/otp-varification?email=${values.email}`);
                // setErrorMessage(res[1]?.response?.data?.message || "Something went wrong!");
                // setShowErrorModal(true);
            }
        })
    }

    console.log(finalOtp)
    console.log(email)
    return (
        <>
            <div className="absolute top-8 lg:left-24 left-7">
                <Link href='/'>
                    <div className="font-medium text-xl cursor-pointer flex items-center gap-1">
                        <Image className="w-11 h-11" src={logo} alt="logo" />
                        <h1 className="font-bold text-lg ml-2">
                            <span className="text-[#82D955]">Test</span>
                            <span className="text-[#3AB6FF]">Sprint</span>360
                        </h1>
                    </div>
                </Link>
            </div>

            <div className="py-8 lg:px-24 px-7 flex justify-between items-center h-screen">


                <div className=" w-full lg:w-[45%]">

                    <div className="font-bold text-2xl md:text-[30px] text-gray-950 mt-8">
                        Otp Varification
                    </div>
                    <div className="text-sm font-medium text-gray-400 mt-2">
                        We sent a code to to your mail<span className="text-gray-700 font-semibold"></span>
                    </div>

                    <div className="mt-14">
                        <div className="mb-6 text-gray-900 text-sm font-semibold">
                            Enter Code
                        </div>



                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="w-full flex justify-center space-x-5">
                                    {values.otp.map((data, i) => (
                                        <input
                                            as="input"
                                            ref={i === activeOtpIndex ? inputRef : null}
                                            className={`border-b-2 ${i === activeOtpIndex ? " border-gray-900" : ""}  w-8 sm:w-12  xl:w-16 h-16 outline-none text-center text-xl font-semibold  ${data === "" && touched.otp && touched.otp[i] ? "border-red-600" : ""}`}
                                            type="text"
                                            key={`input-${i}`}
                                            value={data}
                                            maxLength={1}
                                            onChange={(e) => handleChangeForOtp(e, i)}
                                            // onBlur={handleBlur}
                                            name={`otp[${i}]`}
                                        />
                                    ))}
                                </div>

                            </div>
                            <div className="mb-10 text-center text-red-700 text-[13px]">
                                {touched.otp && touched.otp.every(item => item === true) && values.otp.some(item => item === "") && <span> fill up all inputs</span>}
                            </div>


                            <div className="w-full">
                                <button type="submit" className={`shadow-lg w-full  text-white ${sendCode ? "bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   cursor-pointer" : "bg-gray-400  focus:ring-4 focus:outline-none focus:ring-gray-300 cursor-not-allowed "}   font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Send Code</button>

                                {/* <Link to='/new-password'><button type="submit" className={`shadow-lg w-full  text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   cursor-pointer font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Send Code</button></Link>  */}
                            </div>
                        </form>




                    </div>
                    <hr className="mt-6 mb-3" />
                    {/* 
                    <div className="text-sm text-center text-gray-400 ">
                        {`Didn’t receive the code?`} <span className="text-blue-400 cursor-pointer">Resend it</span>
                    </div> */}
                    <div className="text-center text-gray-400 mt-6">
                        <Link href='/login' className="text-blue-500 flex justify-center items-center"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-1 max-h-4 max-w-4" /> Sign In </Link>
                    </div>


                </div>

                <div className="hidden lg:block w-[45%] ">
                    <Image src={Auth2} alt="" />
                </div>
            </div>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                type={modalType}
                message={modalMessage}
                onOk={handleOk}
                onCancel={handleCancel}
            />
            <LoaderModal isOpen={isLoaderOpen} />



        </>
    );
}


