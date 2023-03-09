import React, { useContext } from "react";
import logo from "../../Assets/Main/logo.png";
import { BiToggleRight } from "react-icons/bi";
import { BiToggleLeft } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { SidebarContext } from "../../Hooks/Context";

function Main() {
  const { isOpen, toggle } = useContext(SidebarContext);

  return (
    <div className="bg-[#ffffff] shadow-md h-[72px] z-[999]">
      {/* Top */}
      <div className="h-full justify-between flex items-center  px-[20px] lg:px-0">
        {/* Left */}
        <div className="lg:w-[260px]  h-full flex items-center justify-between lg:px-[10px] lg:z-[999] ">
        {isOpen ? (
            <button onClick={toggle} className=" flex lg:hidden ">
              <BiToggleRight className="text-[black] text-[25px]" />
            </button>
          ) : (
            <button onClick={toggle} className="flex lg:hidden">
              <BiToggleLeft className="text-[black] text-[25px] " />
            </button>
          )}
          <img src={logo} alt="" className=" object-cover w-[100px] hidden lg:flex  " />
          {isOpen ? (
            <button onClick={toggle}>
              <BiToggleRight className="text-[black] text-[25px] hidden lg:flex" />
            </button>
          ) : (
            <button onClick={toggle}>
              <BiToggleLeft className="text-[black] text-[25px] hidden lg:flex" />
            </button>
          )}
          
        </div>
        <img src={logo} alt="" className="h-[45px] w-[100px] flex lg:hidden " />
        <button className="text-black lg:hidden"><FiMoreHorizontal/></button>
        <div className=" w-full items-center justify-between px-[30px] hidden lg:flex">
          <span className="text-black">
            <CropFreeIcon />
          </span>
          <h className="text-black">admin</h>
        </div>
      </div>
    </div>
  );
}

export default Main;
