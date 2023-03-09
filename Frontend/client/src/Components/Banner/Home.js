import React from "react";
import bg from "../../Assets/Banner/Home/homebg1.jpg";
import "./Banner.css";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="relative">
      <div className="md:hidden">
        <img
          src={bg}
          alt=""
          className="w-full h-[550px] lg:h-[650px] object-cover sm:object-top blur-[0.7px]"
        />
      </div>
      <div className="hidden md:flex">
        <img
          src={bg}
          alt=""
          className="w-full h-[550px] lg:h-[720px] object-cover object-top blur-[0.7px]"
        />
      </div>
      <div className="flex flex-col container items-center mt-[80px] sm:mt-0">
        <div className="break-normal flex flex-row gap-[10px] sm:gap-[30px]">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="text-white text-[35px] sm:text-[70px] lg:text-[100px] font-semibold font-[sans-serif]"
          >
            KARLIE
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="text-white text-[35px] sm:text-[70px] lg:text-[100px] font-semibold font-[sans-serif]"
          >
            KLOSS
          </motion.span>
        </div>
        <div className="flex  justify-center items-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="text-white text-[16px]  sm:text-[25px] font-semibold tracking-widest"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.5, ease: "easeOut" }}
            >
              W
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.6, ease: "easeOut" }}
            >
              O
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.7, ease: "easeOut" }}
            >
              M
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.8, ease: "easeOut" }}
            >
              E
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.9, ease: "easeOut" }}
            >
              N
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="pl-2"
            >
              OF THE WEEK
            </motion.span>
          </motion.span>
        </div>
      </div>
      <Link to="Featured" smooth={true} offset={50} duration={500}>
        <div className="bg-[#ffffff] w-[60px] h-[60px] flex justify-center items-center rounded-[3rem] container mt-[220px] cursor-pointer">
          <motion.div
            animate={{ y: [-10, 0, 10] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <AiOutlineDown className="text-[25px]" />
          </motion.div>
        </div>
      </Link>
    </div>
  );
}

export default Home;
