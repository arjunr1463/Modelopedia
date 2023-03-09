import React, { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Completed() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/register/progress/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });
  return (
    <div className="border-[1px]">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>DashBoard</h>
      </div>
      <div className="py-[120px] text-center px-[20px] flex justify-center">
        <span className="font-fair  text-[#aca4a8] text-[20px] tracking-wide">
          <motion.span
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: "inline-block" }}
          >
            Successfully
          </motion.span>{" "}
          <motion.span
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Completed
        </motion.span>
        </span>
      </div>
    </div>
  );
}

export default Completed;
