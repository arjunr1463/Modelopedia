import React,{useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios"

function PaymentStep5() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/register/progress/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });
  return (
    <div className="border-[1px] ">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>DashBoard</h>
      </div>
      <div className="flex flex-col gap-[30px] pt-[100px] pb-[20px] px-[30px]">
        <div className="flex flex-col items-center">
          <span className="text-[16px] font-fair">Step-5</span>
          <span className="font-semibold text-[28px]">Select a plan</span>
        </div>
        <div className="flex flex-col gap-[50px] md:flex-row justify-center md:gap-[30px]">
          <div className="flex flex-col bg-white shadow-md rounded-[0.3rem]">
            <div className="flex flex-col items-center bg-black text-white py-[30px] rounded-[0.3rem]">
              <h className="text-[26px] font-semibold">Basic Plan</h>
              <div>
                <span className="text-[24px] font-semibold">999</span>
                <span>/-</span>
                <span className="text-[12px] ">Per Month</span>
              </div>

              <span className="text-[10px] font-fair">*GST included</span>
            </div>
            <div className="pt-[50px]  pb-[10px] flex flex-col gap-[125px]">
              <div className="flex flex-col gap-[20px] text-[16px] font-fair text-center px-[30px]">
                <span>1 Year Subscription</span>
                <span>10 Photos</span>
                <span>2 Video Profile</span>
                <span>Normal Listing</span>
                <span>Normal Profile Campaign</span>
              </div>
              <div className="flex justify-center">
              <Link to="/Admin/Model/PaymentBasic" className="bg-black flex justify-center items-center rounded-[0.2rem] text-white font-semibold font-fair h-[40px] w-[130px]">View Details</Link>
              </div>
              
            </div>
          </div>
          <div className="flex flex-col bg-white shadow-md rounded-[0.3rem]">
            <div className="flex flex-col items-center bg-black text-white py-[30px] rounded-[0.3rem]">
              <h className="text-[26px] font-semibold">Featured Plan</h>
              <div>
                <span className="text-[24px] font-semibold">3999</span>
                <span>/-</span>
                <span className="text-[12px] ">Per Month</span>
              </div>

              <span className="text-[10px] font-fair">*GST included</span>
            </div>
            <div className="pt-[50px] pb-[10px] flex flex-col gap-[100px]">
              <div className="flex flex-col gap-[20px] text-[16px] font-fair  text-center px-[30px]">
                <span>1 Year Subscription</span>
                <span>45 Days Featuring Listing</span>
                <span>20 Photos</span>
                <span>5 Videos</span>
                <span>Social Media Campaign</span>
              </div>
              <div className="flex justify-center">
              <Link to="/Admin/Model/PaymentFeatured" className="bg-black flex justify-center items-center rounded-[0.2rem] text-white font-semibold font-fair h-[40px] w-[130px]">View Details</Link>
              </div>
              
            </div>
          </div>
          <div className="flex flex-col bg-white shadow-md rounded-[0.3rem]">
            <div className="flex flex-col items-center bg-black text-white py-[30px] rounded-[0.3rem]">
              <h className="text-[26px] font-semibold">Diamond Plan</h>
              <div>
                <span className="text-[24px] font-semibold">8999</span>
                <span>/-</span>
                <span className="text-[12px] ">Per Month</span>
              </div>

              <span className="text-[10px] font-fair">*GST included</span>
            </div>
            <div className="pt-[50px] pb-[10px] flex flex-col gap-[58px]">
              <div className="flex flex-col gap-[20px] text-[16px] font-fair text-center px-[30px]">
                <span>1 Year Subscription</span>
                <span>45 Days Featuring Listing</span>
                <span>Special Story in Home Page</span>
                <span>20 Photos</span>
                <span>5 Videos</span>
                <span>Social Media Campaign</span>
              </div>
              <div className="flex justify-center">
              <Link to="/Admin/Model/PaymentDiamond" className="bg-black flex justify-center items-center rounded-[0.2rem] text-white font-semibold font-fair h-[40px] w-[130px]">View Details</Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentStep5;
