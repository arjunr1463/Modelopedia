import React from "react";
import "./Banner.css";
import bg3 from "../../Assets/Banner/CastingCalls/003.jpeg";
import { motion } from "framer-motion";

function OurTeam() {
  return (
    <div className="relative">
      <div className="">
        <img
          src={bg3}
          alt=""
          className="w-full h-[120px] lg:h-[200px] object-cover"
        />
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
          <motion.h
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.4,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="text-[18px] lg:text-[35px] font-bold tracking-widest"
          >
            OUR TEAM
          </motion.h>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.4,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="font-medium text-[15px] lg:text-[18px] tracking-wide"
          >
            HOME TEAM
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
