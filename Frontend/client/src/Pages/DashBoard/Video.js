import React from "react";
import { Link } from "react-router-dom";
import Table from "./VideoTable";
import { motion } from "framer-motion";

function Video() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-[10px] sm:px-[40px] py-[50px] flex flex-col gap-[50px]"
    >
      <div className="flex gap-[20px] items-center">
        <span className="font-fair">Videos</span>
        <Link
          to="/Admin/Model/AddVideo"
          className="bg-[black] text-white flex justify-center items-center h-[40px] w-[120px] font-semibold"
        >
          Add Video
        </Link>
      </div>
      <Table />
    </motion.div>
  );
}

export default Video;
