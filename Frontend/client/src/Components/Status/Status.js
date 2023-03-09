import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import axios from "axios";
import bg from "../../Assets/Status/bg_4.jpg";
import { useSpring, animated } from "react-spring";
function Status() {
  const [totalModels, setTotalModels] = useState([]);
  const [totalClients, setTotalClients] = useState([]);
  const [totalSpecial, setTotalSpecial] = useState([]);
  const [totalawards, setTotalawards] = useState([]);

  const fetchTotalModel = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/register/`
    );
    setTotalModels(response.data.length);
  };
  const fetchTotalClient = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/register`
    );
    setTotalClients(response.data.length);
  };
  const fetchTotalSpecialStory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/register`)
      .then((res) => setTotalSpecial(res.data));
  };

  const TotalAwards = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/Awards/get`)
      .then((res) => {
        setTotalawards(res.data[0].Awards)
      });
  };

  const filterSpecial = totalSpecial.filter((datas) =>
    datas.specialstory ? datas.specialstory.status === "Approved" : ""
  );
  const filter = filterSpecial.length;

  useEffect(() => {
    fetchTotalModel();
    fetchTotalClient();
    fetchTotalSpecialStory();
    TotalAwards();
  },[]);
  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  const animation1 = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();
  const animation4 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation1.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1.9,
          bounce: 0.3,
        },
      });
      animation2.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1.6,
          bounce: 0.3,
        },
      });
      animation3.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1.3,
          bounce: 0.3,
        },
      });
      animation4.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation1.start({
        x: -100,
      });
      animation2.start({
        x: -70,
      });
      animation3.start({
        x: -40,
      });
      animation4.start({
        x: -20,
      });
    }
  }, [inView, animation1, animation2, animation3, animation4]);

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: totalModels },
    config: { duration: 2000 },
  });
  const { clients } = useSpring({
    from: { clients: 0 },
    to: { clients: totalClients },
    config: { duration: 2000 },
  });
  const { Featured } = useSpring({
    from: { Featured: 0 },
    to: { Featured: filter },
    config: { duration: 2000 },
  });
  const { Awards } = useSpring({
    from: { Awards: 0 },
    to: { Awards: totalawards },
    config: { duration: 2000 },
  });

  return (
    <div
      ref={ref}
      className="bg-[#f5f5f5] lg:bg-white h-[500px]  md:h-[300px] flex flex-col items-center justify-center  gap-2"
    >
      <div className="hidden lg:flex relative">
        <img src={bg} alt="" className="hidden lg:flex"/>
      </div>
      <div className=" flex flex-col md:flex-row gap-[40px] md:gap-[50px] absolute">
        <motion.div animate={animation1} className="flex flex-col items-center">
          <animated.h1 className="font-[sans-serif] text-[30px]">
            {number.to((val) => val.toFixed(0))}
          </animated.h1>
          <h className="font-[sans-serif] tracking-widest">Happy Models</h>
        </motion.div>
        <motion.div animate={animation2} className="flex flex-col items-center">
          <animated.h1 className="font-[sans-serif] text-[30px]">
            {clients.to((val) => val.toFixed(0))}
          </animated.h1>
          <h className="font-[sans-serif] tracking-widest">Casting Agencies</h>
        </motion.div>
        <motion.div animate={animation3} className="flex flex-col items-center">
          <animated.h1 className="font-[sans-serif] text-[30px]">
            {Featured.to((val) => val.toFixed(0))}
          </animated.h1>
          <h className="font-[sans-serif] tracking-widest">Featured Models</h>
        </motion.div>
        <motion.div animate={animation4} className="flex flex-col items-center">
          <animated.h1 className="font-[sans-serif] text-[30px]">
            {Awards.to((val) => val.toFixed(0))}
          </animated.h1>
          <h className="font-[sans-serif] tracking-widest">Awards</h>
        </motion.div>
      </div>
    </div>
  );
}

export default Status;
