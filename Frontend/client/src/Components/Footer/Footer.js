import React, { useEffect } from "react";
import { Link as Router } from "react-router-dom";
//import {Link as Scroll} from "react-scroll"
import { AiOutlineInstagram } from "react-icons/ai";
import { TfiYoutube } from "react-icons/tfi";
import { BsFacebook } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";

function Footer() {
  const { ref, inView } = useInView({
    threshold: 0.1,
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
    }
    animation2.start({
      y: 0,
      transition: {
        type: "spring",
        duration: 1.3,
        bounce: 0.3,
      },
    });
    animation3.start({
      y: 0,
      transition: {
        type: "spring",
        duration: 1.6,
        bounce: 0.3,
      },
    });
    if (!inView) {
      animation1.start({
        y: 50,
      });
      animation2.start({
        y: 70,
      });
      animation3.start({
        y: 100,
      });
    }
  }, [inView, animation1, animation2, animation3]);
  return (
    <div
      className="bg-[#f8f9fa] h-full lg:h-[600px] flex flex-col pt-[50px] px-[10px] md:px-[20px] lg:justify-center"
      ref={ref}
    >
      <div className="flex flex-col gap-[40px] lg:-gap-0 lg:flex-row lg:justify-between">
        {/*left*/}

        <div className="flex flex-col lg:items-center lg:justify-center gap-[45px]  lg:px-[0px] ">
          <h className="tracking-widest font-[sans-serif] text-[18px] flex justify-centerz lg:justify-start">
            MODELOPEDIA
          </h>
          <div className="flex gap-[20px] justify-center lg:justify-start ">
            <motion.span animate={animation1} className="text-[40px]">
              <TfiYoutube />
            </motion.span>
            <motion.span animate={animation2} className="text-[40px]">
              <BsFacebook />
            </motion.span>
            <motion.span animate={animation3} className="text-[45px]">
              <AiOutlineInstagram />
            </motion.span>
          </div>
        </div>
        {/*Center*/}

        <div className="flex flex-row justify-between lg:justify-center lg:gap-[80px] ">
          <div className="flex flex-col gap-[10px] ">
            <h className="font-[sans-serif] tracking-widest">MENU</h>
            <ul className="flex flex-col gap-[40px] font-fair">
              <li>About</li>
              <li>
                <Router to="/Blog">Blog</Router>
              </li>
              <li>
                <Router to="/Contest">Contest</Router>
              </li>
              <li>
                <Router to="/ContactUs">Contact Us</Router>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[10px]">
            <h className="font-[sans-serif] tracking-widest">HELP</h>
            <ul className="flex flex-col gap-[40px] font-fair">
              <li>
                <Router to="/Testimony">Testimony</Router>
              </li>
              <li>
                <Router to="/HowToWork">How it works?</Router>
              </li>
              <li>
                <Router to="/TermsCondition">Terms&Conditions</Router>
              </li>
              <li>
                <Router to="/PrivacyPolicy">Privacy Policy</Router>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-[10px]">
            <ul className="flex flex-col gap-[40px] font-fair">
              <h className="">FAQs</h>
              <Router to="/RefundPolicy">
                <li>Refund Policy</li>
              </Router>
              <Router to="/OurTeam">
                <li>Our Team</li>
              </Router>
            </ul>
          </div>
        </div>

        {/*Right*/}
        <div className=" flex flex-col lg:items-center gap-[30px]">
          <h className="tracking-widest font-[sans-serif]">HAVE A QUESTION?</h>
          <div className="flex items-center gap-10 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[300px]">
            <span className="text-[22px] ">
              <ImLocation />
            </span>
            <span className="">
              Suite 112, 39/2475-B1, LR Towers, Sjrra 104, Janatha Rd,
              Palarivattom, Cochin, Kerala - 682 025
            </span>
          </div>
          <div className="flex items-center gap-10 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[300px]">
            <span className="text-[22px] ">
              <ImLocation />
            </span>
            <span className="">
              40 BowLand Road, Manchester, M231JG, +447471044700
            </span>
          </div>
          <div className="flex items-center  gap-10 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[300px] lg:ml-3">
            <span className="text-[22px]">
              <BsTelephoneFill />
            </span>
            <span className="">+91 9072790720</span>
          </div>
          <div className="flex items-center  gap-10 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[300px] lg:ml-3">
            <span className="text-[22px]">
              <MdEmail />
            </span>
            <span>
              <a href="mailto:sales@modelopedia.com">sales@modelopedia.com</a>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-[12px] md:text-[18px] lg:text-[18px] mt-[50px] lg:mt-[80px]">
        <span>Copyright © 2023 All rights reserved | Powered by Squadmind</span>
      </div>
    </div>
  );
}

export default Footer;
