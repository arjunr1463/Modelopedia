import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import EditPersonalInfo from "./EditPersonalInfo";
import { motion } from "framer-motion";

function PersonalInfo() {
  const [action, setAction] = useState(false);
  const [data, setData] = useState({});
  const [date, setDate] = useState(null);
  const [separatedData, setSeparatedData] = useState(null);
  const { id } = useParams();

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
        const dateOnly = response.data.user.dob.slice(0, 10);
        const formattedDate = new Date(dateOnly).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        setDate(formattedDate);
        setSeparatedData(response.data.user.language.join(" "));
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
      className="flex flex-col gap-[40px] px-[15px] py-[20px] shadow-md"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between">
        <span className="font-semibold">About Me</span>

        <Link
          className="text-white text-[18px] bg-black h-[30px] w-[50px] flex justify-center items-center"
          onClick={handleClick}
          state={{
            name: data.fullName,
            email: data.email,
            mobile: data.mobile,
            gender: data.gender,
            language: separatedData,
            city: data.city,
            state: data.state,
            address: data.address,
            pincode: data.postcode,
            instagram: data.instagram,
            facebook: data.facebook,
            experience: data.experience,
            id: data._id,
          }}
        >
          {action ? <AiOutlineClose /> : <FaEdit />}
        </Link>
      </div>
      {action ? (
        <EditPersonalInfo action={handleClick} />
      ) : (
        <motion.div
          className=" flex flex-col text-[14px] sm:text-[15px] lg:flex-row lg:gap-[30px]"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-center gap-[10px] border-b-[1px] border-t-[1px] sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold  w-[100px] ">Fullname</span>
              <span className="text-left uppercase text-[13px] sm:text-[15px]">{data.fullName}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Gender</span>
              <span>{data.gender}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Birth Date</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Language</span>
              <span className="w-[180px] break-all text-left capitalize">
                {separatedData}
              </span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Location</span>
              <span className="w-[180px] text-left capitalize">
                {data.address}
              </span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">City</span>
              <span className="capitalize">{data.city}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px] ">State</span>
              <span>{data.state}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Zipcode</span>
              <span className="w-[180px] break-all">{data.postcode}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-[10px] border-b-[1px] lg:border-t-[1px]  sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Email</span>
              <span>{data.email}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Mobile Number</span>
              <span>{data.mobile}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Facebook ID</span>
              <span className="w-[180px] break-all">{data.facebook}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Instagram ID</span>
              <span className="w-[180px] break-all">{data.instagram}</span>
            </div>
            <div className="flex items-center gap-[10px] border-b-[1px]   sm:pl-[10px] sm:pr-[30px] py-[12px]">
              <span className="font-semibold w-[100px]">Experience</span>
              <span >{data.experience}</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default PersonalInfo;
