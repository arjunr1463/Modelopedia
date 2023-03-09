import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import { BsFilm } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { BsCardList } from "react-icons/bs";
import { SlDiamond } from "react-icons/sl";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import axios from "axios";
import profile from "../../Assets/Profile/profile.png";

function DashSideBar({ children }) {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [imageData, setImageData] = useState({});
  const [image, setImage] = useState();
  const [message, setMessage] = useState("");
  console.log(image);
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Dashboard");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };
  useEffect(() => {
    const activeTab = localStorage.getItem("activeTab");
    if (activeTab) {
      setActiveTab(activeTab);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/stage1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseImage = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.user);
        setImageData(responseImage.data.user.profilepicture.data.data);
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

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/register/stage1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseImage = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/register/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.user);
      setImageData(responseImage.data.user.profilepicture.data.data);
      console.log(response.data.user.profilepicture);
      console.log(response.data.user);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      } else {
        console.error(error);
      }
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/register/logout`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        localStorage.removeItem("token");
        navigate("/ModelLogin");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    try {
      const formData = new FormData();
      formData.append("images", file);
      const token = localStorage.getItem("token");
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/user/register/AddProfilePicture`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => fetchUser())
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex flex-col border-r-[1px] border-t-[1px] border-b-[1px] border-l-[1px] shadow-sm">
      <div className="border-b-[1px] h-[50px] px-[10px] flex items-center">
        <h className="font-semibold  text-[20px]">My Profile</h>
      </div>
      <div className="flex flex-col h-[250px] justify-center items-center">
        <div className="relative px-[15px]">
          <input
            id="profile"
            type="file"
            onChange={handleChange}
            className="hidden"
          />
          {data.profilepicture ? (
            <img
              src={`data:image/*;base64,${btoa(
                new Uint8Array(imageData).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt=""
              className="h-[100px] w-[100px] rounded-[8rem] object-cover relative"
            />
          ) : (
            <img
              src={profile}
              alt=""
              className="h-[100px] w-[100px] rounded-[8rem] object-cover relative"
            />
          )}

          <label
            htmlFor="profile"
            className="absolute bottom-0 right-[7px] text-[30px] cursor-pointer"
          >
            <AiFillCamera />
          </label>
        </div>
        <span className="font-semibold text-[18px]  uppercase">
          {data.fullName}
        </span>
        <span className="text-[14px] text-[#9e9ba2] capitalize">
          {data.city},{data.state}
        </span>
        <span className="text-[14px] text-[#9e9ba2]">
          Model ID:-
          <span className="font-semibold text-[15px] text-[black]">
            MODEL {data.id}
          </span>
        </span>
      </div>
      <div className="flex flex-col  gap-[10px] border-t-[1px]">
        <ul className="tabs">
          <Link
            to="/Admin/Model/Main"
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
            to="/"
            onClick={() => {
              handleTabClick("Dashboard");
            }}
            className="flex gap-[15px] px-[20px] items-center justify-start w-full h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
          >
            <span>
              <AiOutlineHome />
            </span>
            <span>Modelopedia Home</span>
          </Link>

          <Link
            to={`/Admin/Model/Myprofile/${data._id}`}
            className={
              activeTab === "Myprofile"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("Myprofile")}
          >
            <span>
              <HiOutlineUser />
            </span>
            <span>My Profile</span>
          </Link>
          <Link
            to="/CastingCalls"
            onClick={() => {
              handleTabClick("Dashboard");
            }}
            className="flex gap-[15px] px-[20px] items-center justify-start w-full h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
          >
            <span>
              <BsFilm />
            </span>
            <span>Casting Calls</span>
          </Link>
          <Link
            to="/Admin/Model/Portfolio"
            className={
              activeTab === "portfolio"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("portfolio")}
          >
            <span>
              <AiOutlineCamera />
            </span>
            <span>Create Your Portfolio</span>
          </Link>
          <Link
            to="/Admin/Model/UpgradeListing"
            className={
              activeTab === "Listing"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("Listing")}
          >
            <span>
              <BsCardList />
            </span>
            <span>Upgrade Your Listing</span>
          </Link>
          <Link
            to="/Admin/Model/FeatureMain"
            className={
              activeTab === "feature"
                ? "bg-[black] text-white flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px]"
                : "flex gap-[15px] px-[20px] items-center justify-start h-[40px] border-b-[1px] hover:bg-black hover:text-white hover:duration-500"
            }
            onClick={() => handleTabClick("feature")}
          >
            <span>
              <SlDiamond />
            </span>
            <span>Diamond Feature</span>
          </Link>
          <Link
            to="/Admin/Model/Changepassword"
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
            onClick={() => {
              handleLogout();
              handleTabClick("Dashboard");
            }}
            className="flex gap-[15px] px-[20px] items-center justify-start w-full h-[40px]  hover:bg-black hover:text-white hover:duration-500"
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

export default DashSideBar;
