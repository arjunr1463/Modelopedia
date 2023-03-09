import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import axios from "axios";
function Subscribe() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const animation1 = useAnimation();
  const animation2 = useAnimation();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/Newsletter/create`, {
          email: email,
        })
        .then((res) => {
          console.log(res);
          setSuccess(res.data);
          setTimeout(() => {
            setSuccess("");
          }, 3000);
        });
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    if (inView) {
      animation1.start({
        scale: 1,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    animation2.start({
      x: 0,
      transition: {
        type: "spring",
        duration: 1.3,
        bounce: 0.3,
      },
    });
    if (!inView) {
      animation1.start({
        scale: 1.1,
      });
      animation2.start({
        x: -70,
      });
    }
  }, [inView, animation1, animation2]);
  return (
    <div
      className="h-full lg:h-[400px] flex flex-col items-center gap-2 pb-[100px] "
      ref={ref}
    >
      <div className="hidden lg:flex lg:relative">
        <motion.h
          animate={animation1}
          className="text-[#eeeff0] text-[120px] tracking-widest font-bold"
        >
          Subscribe
        </motion.h>
      </div>
      <div className="px-[15px] w-[90vw] lg:absolute mt-[90px] break-normal flex justify-center">
        <motion.h
          animate={animation1}
          className="text-[22px] sm:text-[30px] font-fair tracking-widest"
        >
          SUBSCRIBE TO OUR NEWSLETTER
        </motion.h>
      </div>
      <div className="flex flex-col sm:flex-row  mt-[25px] lg:mt-[0px]">
        <motion.input
          animate={animation2}
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-[90vw] h-[50px] sm:w-[400px] border-[1px] text-[18px] lg:text-[20px] px-[10px] outline-none"
        />
        <div className="">
          <button
            onClick={handleSubmit}
            className="font-[sans-serif] font-semibold bg-[#eeeff0] flex justify-center items-center border-[1px] border-black/50 w-full  h-[40px] sm:h-[50px] md:w-[90px]"
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex justify-center font-fair text-[14px] text-[red]">
        {success}
      </div>
    </div>
  );
}

export default Subscribe;
