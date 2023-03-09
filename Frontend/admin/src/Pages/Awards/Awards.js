import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";

function Awards() {
  const [award, setAward] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setAward(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/awards/update`, {
        awards: award,
      })
      .then((res) => {
        setSuccess(res.data);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[white] rounded-[0.4rem] shadow-lg flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll"
    >
      <h className="font-semibold sticky left-0 tracking-wider ">Awards</h>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-[10px] w-[300px]">
          <input
            name="award"
            type="text"
            onChange={handleChange}
            placeholder="Enter the number of awards"
            className="w-full shadow-md h-[35px] px-[10px] outline-none border-[1px]"
          />
          <button
            type="submit"
            className="bg-[#4099ff] font-semibold font-fair text-white rounded-[0.1rem]"
          >
            Update
          </button>
          <div className="text-[red] text-[14px] flex justify-center">
            {success}
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default Awards;
