import React,{useEffect} from 'react'
import bg from "../../Assets/Home/Discover.jpg"
import "./Discover.css"
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";

function Discover() {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        scale: 1,
        transition: { type: 'spring', duration: 1, bounce: 0.3 }
      });
    } else {
      animation.start({ scale: 1.1 });
    }
  }, [inView, animation]);

  return (
    <div className='relative' ref={ref}>
      <div className=''>
        <img src={bg} alt='' className='lg:h-[700px] w-[100vw] blur-[0.7px] object-cover' />
      </div>
      <div className='discover w-[80vw] lg:w-[1000px]'>
        <motion.h
          animate={animation}
          className='text-white text-[22px] sm:text-[50px] md:text-[60px] lg:text-[100px] font-[sans-serif] font-semibold flex justify-center'
        >
          DISCOVER AND BE
        </motion.h>
        <motion.span
          animate={animation}
          className='text-white text-[22px] sm:text-[50px] md:text-[60px] lg:text-[100px] font-[sans-serif] font-semibold flex justify-center'
        >
          DISCOVERED
        </motion.span>
      </div>
    </div>
  );
}

export default Discover;



