import React from 'react'
import {Link} from "react-router-dom"

function Upgrade2() {
    return (
        <div className="border-[1px] ">
          <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
            <h>Upgrade Your Listing</h>
          </div>
          <div className="flex flex-col gap-[30px] pt-[100px] pb-[20px] px-[30px]">
            <div className="flex flex-col items-center">
              <span className="text-center text-[30px] sm:text-[35px] font-semibold ">Select a Upgrade Plan</span>
            </div>
            <div className="flex flex-col gap-[50px] md:flex-row justify-center md:gap-[30px]">
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
                    <span>180 Days Featuring Listing</span>
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
                    <span>180 Days Featuring Listing</span>
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

export default Upgrade2
