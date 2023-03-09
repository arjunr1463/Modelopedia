import React, { useState } from "react";
import axios from "axios";

function Portfolio() {
  const [success, setSuccess] = useState("");
  const data = "Enquiry";
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/register/Enquiry`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success === "success") {
          setSuccess("Enquired successfully");
          setTimeout(()=>{
            setSuccess("")
          },3000)
        }
      });
  };
  return (
    <div className="border-[1px]">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>Portfolio</h>
      </div>
      <div className=" flex flex-col gap-[20px] py-[120px] px-[20px]">
        <span className="font-fair text-[#aca4a8] text-[18px]">
          If you do not have any portfolio like photos or videos, we will arange
          it. Please enquiry us.
        </span>
        <div className="flex items-center gap-[10px]">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[black] text-white rounded-[0.2rem] font-semibold font-fair flex justify-center h-[35px] items-center w-[100px] text-[18px]"
          >
            Enquiry
          </button>
          {success && <div className="text-[red] text-[13px] font-fair">Successfully Enquired !!!</div>}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
