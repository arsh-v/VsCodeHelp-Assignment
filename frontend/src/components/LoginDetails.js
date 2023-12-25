import React from "react";
import axios from "axios";
import {
  BOOK_APPOINTMENT_URL,
  CURRENT_USER_URL,
  SEND_OTP_URL,
} from "../constants/urls";
import { VERIFY_OTP_URL } from "../constants/urls";
import { useUser } from "../context/user";

function LoginDetails({ selectedAppointment, selectedClinic, currentDoctor }) {
  const [currentStep, setCurrentStep] = React.useState("checking");
  const emailRef = React.useRef(null);
  const [email, setEmail] = React.useState("");
  const otpRef1 = React.useRef(null);
  const otpRef2 = React.useRef(null);
  const otpRef3 = React.useRef(null);
  const otpRef4 = React.useRef(null);
  const otpRef5 = React.useRef(null);
  const otpRef6 = React.useRef(null);

  const { user, setUser } = useUser();

  const handleSendOTP = async () => {
    let local_email = emailRef.current?.value || email;
    // validate email using regex
    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!local_email || regex.test(local_email)) {
      setCurrentStep("verify");
      await axios.post(SEND_OTP_URL, { email: local_email });
      setEmail(local_email);
    } else {
      alert("Invalid Email");
    }
  };

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(CURRENT_USER_URL, {
          withCredentials: true,
        });
        setEmail(res.data.user);
        setCurrentStep("done");
      } catch (err) {
        setCurrentStep("send");
      }
    };
    fetchCurrentUser();
  }, []);

  const bookAppointment = async () => {
    try {
      const res = await axios.post(
        BOOK_APPOINTMENT_URL,
        {
          doctor: currentDoctor._id,
          slot: selectedAppointment.slot._id,
          clinic: selectedClinic.clinic._id,
        },
        {
          withCredentials: true,
        }
      );
      console.log("res", res);
      alert("Appointment booked successfully");
      window.location.href = "/";
    } catch (err) {
      console.log("err", err);
      alert(err.message);
    }
  };

  const handleVerifyOTP = async () => {
    let otp =
      otpRef1.current?.value +
      otpRef2.current?.value +
      otpRef3.current?.value +
      otpRef4.current?.value +
      otpRef5.current?.value +
      otpRef6.current?.value;

    // validate otp using regex
    let regex = /^[0-9]{6}$/;
    if (regex.test(otp)) {
      try {
        const res = await axios.post(
          VERIFY_OTP_URL,
          { email, otp },
          {
            withCredentials: true,
          }
        );
        alert("OTP verified successfully");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setCurrentStep("done");
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className='mt-20'>
      <div className='mt-10 border-2 rounded-md p-4 flex flex-col'>
        {currentStep === "checking" ? (
          <>
            <div className='text-black font-bold text-xl'>Loading...</div>
          </>
        ) : currentStep === "done" ? (
          <>
            {/* Just a green button with confirm booking */}
            <div className='flex justify-between items-center'>
              <p>You are logged in as {email}.</p>
              <button
                className='p-1 px-10 bg-green-600 text-white rounded-md text-sm self-end mt-1'
                onClick={bookAppointment}
              >
                Confirm Booking
              </button>
            </div>
          </>
        ) : currentStep === "send" ? (
          <>
            <div className='text-black font-bold text-xl'>
              Enter Email to continue
            </div>
            <p className='text-black text-sm h-2'>
              Please enter your email address to receive timely updates.
            </p>
            <div className='text-gray-400 font-bold text-1xl pt-3'>
              Email Address*
            </div>
            <input type='text' className='border-b-2 w-1/2' ref={emailRef} />
            <p className='text-xs'>
              Please enter the email address of the patient. You will receive a
              confirmation message on this email.
            </p>
            <button
              onClick={handleSendOTP}
              className='p-1 px-6 bg-blue-600 text-white rounded-md text-sm self-end mt-1'
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className='mt-4 items-center w-full'>
              <div className='text-black text-sm my-2'>Enter OTP:</div>
              <div className='flex ml-1'>
                <input
                  ref={otpRef1}
                  type='text'
                  inputmode='numeric'
                  pattern='[0-9]*'
                  className='border-b-2 w-6 mx-1 text-center'
                  maxLength='1'
                />
                <span className='text-lg mx-1'></span>
                <input
                  ref={otpRef2}
                  type='text'
                  inputmode='numeric'
                  pattern='[0-9]*'
                  className='border-b-2 w-6 mx-1 text-center'
                  maxLength='1'
                />
                <span className='text-lg mx-1'></span>
                <input
                  ref={otpRef3}
                  type='text'
                  inputmode='numeric'
                  pattern='[0-9]*'
                  className='border-b-2 w-6 mx-1 text-center'
                  maxLength='1'
                />
                <span className='text-lg mx-1'></span>
                <input
                  ref={otpRef4}
                  type='text'
                  inputmode='numeric'
                  pattern='[0-9]*'
                  className='border-b-2 w-6 mx-1 text-center'
                  maxLength='1'
                />
                <span className='text-lg mx-1'></span>
                <input
                  ref={otpRef5}
                  type='text'
                  inputmode='numeric'
                  pattern='[0-9]*'
                  className='border-b-2 w-6 mx-1 text-center'
                  maxLength='1'
                />
                <span className='text-lg mx-1'></span>
                <input
                  ref={otpRef6}
                  type='text'
                  inputmode='numeric'
                  pattern='[0-9]*'
                  className='border-b-2 w-6 mx-1 text-center'
                  maxLength='1'
                />
              </div>
            </div>
            <p className='mt-4 text-sm text-gray-400'>
              We have sent you an OTP on your email address -{" "}
              <span className=''>{email}</span>
            </p>
            <div className='text-sm text-red-600 mt-4'>
              Please enter a valid OTP
            </div>
            <div className='text-xs text-blue-400 mt-3 underline'>
              <button onClick={handleSendOTP}>Resend OTP</button>
            </div>
            {/* Email and Verify Button */}
            <div className=' text-black text-sm flex justify-between mt-4'>
              <div></div>
              <button
                className='p-1 px-10 bg-blue-600 text-white rounded-md text-sm '
                onClick={handleVerifyOTP}
              >
                Verify
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginDetails;
