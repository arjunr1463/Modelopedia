import React, { useContext } from "react";
import { SidebarContext } from "../../Hooks/Context";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";

function DashBoard({ title,total, view, icon, style }) {
  const { isOpen } = useContext(SidebarContext);
  const Total=total.props.children
  const { number } = useSpring({
    from: { number: 0 },
    to: { number:Total },
    config: { duration: 2000 },
  });
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div
      className={
        isOpen
          ? ` px-[10px] py-[20px] rounded-[0.3rem] flex flex-col gap-[15px] ${style} shadow-lg`
          : ` px-[10px] py-[20px] rounded-[0.3rem] flex flex-col gap-[15px] ${style} shadow-lg`
      }
    >
      <div className="flex flex-col gap-[10px] w-full">
        <div className=" text-white">
          <motion.h
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="font-fair text-[16px] text-left font-semibold tracking-wider"
          >
            {typeof title === "string" &&
              title.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
          </motion.h>
        </div>
        <div className="flex justify-between items-center px-[10px]">
          <span className="text-[22px] font-semibold text-white">
            {" "}
            <animated.h1>{number.to((val) => val.toFixed(0))}</animated.h1>
          </span>
          <span className="bg-[white] h-[40px] w-[40px] rounded-[3rem] flex justify-center items-center text-[30px]">
            {icon}
          </span>
        </div>
      </div>
      <div className=" flex items-center">
        <h className="text-white font-fair text-[14px]">{view}</h>
      </div>
    </div>
  );
}

export default DashBoard;
