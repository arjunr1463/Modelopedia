import React from "react";
import "./Banner.css";
import bg1 from "../../Assets/Banner/Blog/05.jpeg";
import bg2 from "../../Assets/Banner/Blog/06.jpeg";
import { motion } from "framer-motion";

function Blog() {
  return (
    <div className="relative">
      <div className="hidden lg:flex">
        <img
          src={bg1}
          alt=""
          className="w-full h-[120px] lg:h-[200px] object-cover"
        />
      </div>
      <div className="flex lg:hidden">
        <img
          src={bg2}
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
            BLOG
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
            HOME BLOG
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export default Blog;
