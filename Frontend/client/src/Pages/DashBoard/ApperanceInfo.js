import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import EditAppearanceInfo from "./EditAppearanceInfo";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

function ApperanceInfo() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [action, setAction] = useState(false);
  const handleClick = () => {
    setAction(!action);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/stage1/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.user);
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        } else {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [id]);
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-[40px] text-[14px] sm:text-[15px] px-[15px] py-[20px] shadow-md"
    >
      <div className="flex justify-between">
        <span className="font-semibold">Appearance</span>
        <Link
          state={{
            eyecolor: data.eyecolor,
            dresssize: data.dresssize,
            haircolor: data.haircolor,
            bodytype: data.bodytype,
            hairsize: data.hairsize,
            skintone: data.skintone,
            hairtype: data.hairtype,
            height: data.height,
            weight: data.weight,
            shoesize: data.shoesize,
            aboutyourself: data.aboutyourself,
            id: data._id,
          }}
          onClick={handleClick}
          className="text-white text-[18px] bg-black h-[30px] w-[50px] flex justify-center items-center"
        >
          {action ? <AiOutlineClose /> : <FaEdit />}
        </Link>
      </div>
      {action ? (
        <EditAppearanceInfo action={handleClick} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-[10px]"
        >
          <div className=" flex flex-col lg:flex-row  lg:gap-[30px]">
            <div className="lg:w-[350px]">
              <div className="flex items-center gap-[10px] border-b-[1px] border-t-[1px] sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold  w-[100px]">Height</span>
                <span className=" ">{data.height}</span>
              </div>
              <div className="flex items-center gap-[10px] border-b-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Weight</span>
                <span>{data.weight}</span>
              </div>
              <div className="flex items-center gap-[10px] border-b-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Hair Color</span>
                <span>{data.haircolor}</span>
              </div>
              <div className="flex items-center gap-[10px] border-b-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Hair Size</span>
                <span className="">{data.hairsize}</span>
              </div>
              <div className="flex items-center gap-[10px] border-b-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Hair Type</span>
                <span className="">{data.hairtype}</span>
              </div>
            </div>
            <div className="lg:w-[350px]">
              <div className="flex items-center gap-[10px] border-b-[1px] lg:border-t-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Shoe Size</span>
                <span>{data.shoesize}</span>
              </div>
              <div className="flex items-center gap-[10px] border-b-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Dress Size</span>
                <span>{data.dresssize}</span>
              </div>
              <div className="flex items-center gap-[10px] border-b-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Skin Tone</span>
                <span>{data.skintone}</span>
              </div>
              <div className="flex items-center gap-[10px] border-b-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Eye Color</span>
                <span>{data.eyecolor}</span>
              </div>
              <div className="flex items-center gap-[10px] border-b-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
                <span className="font-semibold w-[100px]">Body Type</span>
                <span>{data.bodytype}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-[10px] items-start justify-start">
            <span className="font-semibold sm:pl-[15px]">About Yourself</span>
            <span className="font-normal w-[180px] break-all">{data.aboutyourself}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ApperanceInfo;
