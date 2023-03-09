import React,{useEffect} from 'react'
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";

function LatestModel() {
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
        y:50,
      });
    }
  }, [inView, animation]);
  return (
    <div className='bg-[#f8f9fa] h-full  flex flex-col items-center gap-2 pt-[20px] pb-[70px]' ref={ref}>
    <div className='hidden lg:flex lg:relative'>
      <motion.h animate={animation} className="text-[#eeeff0] text-[120px] tracking-widest font-bold">Models</motion.h>
    </div>
    <div className='px-[15px] w-[90vw] lg:absolute md:mt-[30px] lg:mt-[90px] break-normal flex justify-center'>
      <motion.h animate={animation}  className="text-[30px] tracking-widest font-fair">LATEST</motion.h>
    </div>
  </div>
  )
}

export default LatestModel
