import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { RiUserSearchLine } from "react-icons/ri";
import { BsFilm } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import axios from "axios";
import profile from "../../Assets/Profile/profile.png";

function ClientDashsidebar({ children }) {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/client/register/verify`,
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
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/client/register/logout`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        localStorage.removeItem("token");
        navigate("/ClientLogin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" flex flex-col border-r-[1px] border-t-[1px] border-l-[1px] shadow-sm">
      <div className="border-b-[1px] h-[50px] px-[10px] flex items-center">
        <h className="font-semibold  text-[20px]">My Profile</h>
      </div>
      <div className="flex flex-col h-[250px] justify-center items-center">
      {data.cmpnylogo ? (
            <img
              src={`data:image/*;base64,${btoa(
                new Uint8Array(data.cmpnylogo.data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt=""
              className="h-[100px] w-[100px] rounded-[8rem] object-fit" style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <img
              src={profile}
              alt=""
              className="h-[100px] w-[100px] rounded-[8rem]  relative"
            />
          )}

        <span className="font-semibold text-[18px]  uppercase">
          {data.companyname}
        </span>
        <span className="text-[14px] text-[#9e9ba2]">
          Client ID:-
          <span className="font-semibold text-[15px] text-[black]">{data.id}</span>
        </span>
      </div>
      <div className="flex flex-col  gap-[10px] border-t-[1px]">
        <ul className="tabs">
          <Link
          to="/Admin/Client/Dashboard"
            className={
              activeTab === "Dashboard"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("Dashboard")}
          >
            <span>
              <AiOutlineDashboard />
            </span>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/SearchModel"
            className={
              activeTab === "searchmodels"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("searchmodels")}
          >
            <span>
              <RiUserSearchLine />
            </span>
            <span>Search Models</span>
          </Link>

          <Link
            to="/Admin/Client/CastingCalls"
            className={
              activeTab === "castingcalls"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("castingcalls")}
          >
            <span>
              <BsFilm />
            </span>
            <span>Casting Calls</span>
          </Link>
          <Link
            to="/Admin/Client/Shortlist"
            className={
              activeTab === "shortlist"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("shortlist")}
          >
            <span>
              <BsCardChecklist />
            </span>
            <span>Shortlist</span>
          </Link>
          <Link
            to="/Admin/Client/ChangePassword"
            className={
              activeTab === "changepassword"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("changepassword")}
          >
            <span>
              <RiLockPasswordLine />
            </span>
            <span>Change Password</span>
          </Link>
          <button
            onClick={handleLogout}
            className={
              activeTab === "signout"
                ? "bg-[black] text-white flex gap-[15px] px-[20px]  items-center justify-start h-[40px]"
                : "flex gap-[15px] px-[20px] items-center justify-start w-full h-[40px]  hover:bg-black hover:text-white hover:duration-500"
            }
          >
            <span>
              <VscSignOut />
            </span>
            <span>Sign Out</span>
          </button>
        </ul>
        <div className="tab-content">{children}</div>
      </div>
    </div>
  );
}

export default ClientDashsidebar;
