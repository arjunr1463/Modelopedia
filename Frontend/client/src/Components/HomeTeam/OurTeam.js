import React from "react";
import "./ourteam.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";

function OurTeam({ close, image, name, about }) {
  return (
    <div  className="fixed inset-0 top-[80px] px-[10px] md:top-[90px] lg:top-[100px]  bg-opacity-50 bg-zinc-500 backdrop-blur-[1px] flex justify-center items-center z-[999]">
      <div className="flex flex-col relative py-[20px] px-[21px]">
        <div className=" absolute top-2 right-0">
          <button onClick={close} className="text-[22px]">
            <AiFillCloseCircle />
          </button>
        </div>
        <motion.div initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} className="flex flex-col  bg-[white] rounded-[0.1rem]  overflow-y-scroll gap-[10px] items-center shadow-md max-h-[500px] max-w-[320px]">
          <div className=" flex w-full ">
            <img
              src={`data:image/*;base64,${btoa(
                new Uint8Array(image.data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt=""
              className="h-[250px] w-full px-[10px] py-[10px] object-cover"
            ></img>
          </div>
          <div>
            <span className="font-semibold">{name}</span>
          </div>
          <div className="flex max-w-[350px]  px-[20px] font-fair  break-all">
            <span
              dangerouslySetInnerHTML={{ __html: about }}
              className="text-[14px]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OurTeam;
