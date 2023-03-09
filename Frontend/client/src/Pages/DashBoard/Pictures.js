import React from "react";
import { Link } from "react-router-dom";
import Table from "./ImageTable";
import { motion } from "framer-motion";

function Pictures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-[10px] sm:px-[40px] py-[50px] flex flex-col gap-[50px]"
    >
      <div className="flex gap-[20px] items-center">
        <span className="font-fair">Images</span>
        <Link
          to="/Admin/Model/AddImage"
          className="bg-[black] text-white flex justify-center items-center h-[40px] w-[120px] font-semibold"
        >
          Add Image
        </Link>
      </div>
      <div>
        <Table />
      </div>
    </motion.div>
  );
}

export default Pictures;
