import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
function Featured() {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation.start({
        y: 50,
      });
    }
  }, [inView, animation]);

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
      className=" h-full flex flex-col items-center gap-2 py-[70px] "
      id="Featured"
      ref={ref}
    >
      <div className="hidden lg:flex lg:relative">
        <motion.h
          animate={animation}
          className="text-[#eeeff0] text-[120px] tracking-widest font-bold"
        >
          Models
        </motion.h>
      </div>
      <div  className="px-[15px] w-[90vw] lg:absolute mt-[30px] lg:mt-[90px] break-normal flex justify-center">
        <motion.h
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="text-[30px] font-fair  tracking-widest"
         
        >
          {["F", "E", "A", "T", "U", "R", "E", "D"].map((letter, index) => (
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
    </div>
  );
}

export default Featured;
