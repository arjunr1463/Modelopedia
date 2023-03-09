import React from "react";

function DashboardFooter() {
  return (
    <div className="bg-[black] flex flex-col  md:flex-row md:justify-between text-[14px] py-[20px] md:py-[30px] text-[#59748f] items-center md:px-[80px] ">
      <div>
        <span>Copyright by <span className="text-white">squadmind</span>.All Rights Reserved</span>
      </div>
      <div className="flex gap-[20px]">
        <span>Privacy</span>
        <span>Terms & Conditions</span>
        <span>Blog</span>
      </div>
    </div>
  );
}

export default DashboardFooter;
