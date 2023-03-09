import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CastingCallCard({ title,content,id,date}) {
  return (
    <div className=" w-[90vw] sm:w-[40vw] md:w-[240px] lg:w-[300px] border-[1px]  flex flex-col justify-center px-[15px] gap-[20px] pt-[10px] pb-[30px] ">
      <div className="h-[50px] flex items-center text-center">
        <h className="text-[18px] font-[sans-serif] font-semibold ">{title}</h>
      </div>
      <div className=" break-normal  max-h-[100px] overflow-hidden text-center">
        <div dangerouslySetInnerHTML={{__html: content}} className="text-[#7e7c7b]"/>
      </div>
      <div className="flex justify-between">
        <div>
          <span>{date.slice(0,10)}</span>
        </div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className=""
        >
          <Link
            to={`/SingleCastingCall/${id._id}`}
            
            className=" text-[white] font-semibold bg-[#232f3e] w-[100px] h-[25px]  sm:w-[120px] sm:h-[30px] text-[15px] rounded-[0.2rem] flex justify-center items-center"
          >
            View More
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default CastingCallCard;
