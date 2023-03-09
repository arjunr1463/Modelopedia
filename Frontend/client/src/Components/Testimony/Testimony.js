import React, { useEffect, useState } from "react";
import "../Banner/Banner.css";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import axios from "axios";
import Slider from "react-slick";
function Testimony() {
  const [data, setData] = useState([]);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const animation1 = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation1.start({
        y: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
      animation2.start({
        y: 0,
        transition: {
          type: "spring",
          duration: 1.6,
          bounce: 0.3,
        },
      });
      animation3.start({
        y: 0,
        transition: {
          type: "spring",
          duration: 1.9,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation1.start({
        y: 100,
      });
      animation2.start({
        y: 100,
      });
      animation3.start({
        y: 100,
      });
    }
  }, [inView, animation1, animation2, animation3]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/Testimony`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const filterTestimony=data.filter((data)=>data.status==="Active")

  const settings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="bg-[#f8f9fa] h-full lg:h-[600px]  w-full flex flex-col items-center py-[60px] lg:py-[30px]"
      ref={ref}
    >
      <div className="hidden lg:flex lg:relative">
        <motion.h
          animate={animation1}
          className="text-[#eeeff0] text-[120px] tracking-widest font-semibold"
        >
          Testimony
        </motion.h>
      </div>

      <div className="w-[90vw] sm:w-[500px] md:w-[500px] lg:w-[700px] px-[10px] lg:absolute  lg:mt-[130px] gap-[20px] lg:gap-[10px] ">
        <Slider {...settings}>
          {filterTestimony.map((testimony) => (
            <>
              <div className="flex justify-center">
                <motion.img
                  animate={animation2}
                  src={`data:image/*;base64,${btoa(
                    new Uint8Array(testimony.image.data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt=""
                  className=" h-[100px] w-[100px]  rounded-[5rem] "
                />
              </div>

              <motion.p
                animate={animation3}
                className="text-[16px] text-[#838f9d] tracking-wide font-fair  flex justify-center"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: testimony.discription }}
                  className="text-center px-[10px] text-[#99919c]"
                />
              </motion.p>
              <motion.span
                animate={animation3}
                className="font-semibold text-[18px] flex justify-center"
              >
                {testimony.fullname}
              </motion.span>
              <motion.span
                animate={animation3}
                className="font-[sans-serif] flex justify-center"
              >
                {testimony.companyname}
              </motion.span>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Testimony;
