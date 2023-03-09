import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { GiBugleCall } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineMenu } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import "./Scroll.css";
import axios from "axios";
import { SidebarContext } from "../../Hooks/Context";
import { motion } from "framer-motion";

function SideBar() {
  const { isOpen } = useContext(SidebarContext);
  const [casting, setCasting] = useState(false);
  const [approveimage, setApproveimage] = useState([]);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [data, setData] = useState([]);
  const [client, setClientData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/api/user/register`).then((res) => {
        const filter = res.data.filter((row) => !row.isDeleted && row.newmodel);
        setData(filter);
      });
    };

    fetchData();
    fetchClientData();
    fetchApproveImageData();
    const intervalId = setInterval(() => {
      fetchData();
      fetchClientData();
      fetchApproveImageData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchClientData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/register`
    );
    setClientData(response.data);
  };

  const fetchApproveImageData = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/user/register`).then((res) => {
      const filteredData = res.data.filter(
        (row) =>
          !row.isDeleted &&
          row.paymentStatus === "success" &&
          row.images.some((data) => data.imagestatus === "Pending")
      );
      setApproveimage(filteredData);
    });
  };

  const clientData = client.filter((data) => data.personalStatus === "Pending");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleChange = () => {
    setCasting(!casting);
  };

  return (
    <div className="">
      {isOpen && (
        <div className="">
          <ul className="text-[15px] font-fair ">
            <Link
              to="/admin/home/Dashboard"
              className={
                activeTab === "Dashboard"
                  ? " flex gap-[10px] px-[20px] items-center justify-start h-[55px] text-[white] bg-[black] "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("Dashboard")}
            >
              <span>
                <FiHome />
              </span>
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/home/NewModels"
              className={
                activeTab === "newmodels"
                  ? "bg-[black] flex gap-[30px] items-center  h-[55px] text-[white] hover:text-white"
                  : "flex gap-[30px]  text-[white]  items-center  h-[55px] hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("newmodels")}
            >
              <div
                className={
                  activeTab === "newmodels"
                    ? "flex gap-[10px] px-[20px] items-center justify-start"
                    : "flex gap-[10px] px-[20px] items-center justify-start"
                }
              >
                <span>
                  <FiHome />
                </span>
                <span>New Models</span>
              </div>
              <div
                className={
                  activeTab === "newmodels"
                    ? "flex justify-end bg-[#ffb64d] px-[6px] text-[12px] font-semibold rounded-[0.2rem] font-fair"
                    : "flex justify-end bg-[#ffb64d] px-[6px] text-[12px] font-semibold rounded-[0.2rem] font-fair"
                }
              >
                <span>{data.length}</span>
              </div>
            </Link>
            <Link
              to="/admin/home/AllModels"
              className={
                activeTab === "allmodels"
                  ? "bg-[black]  flex gap-[10px] px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("allmodels")}
            >
              <span>
                <FiHome />
              </span>
              <span>All Models</span>
            </Link>
            <Link
              to="/admin/home/AllClient"
              className={
                activeTab === "allclient"
                  ? "bg-[black]  flex gap-[45px] items-center  h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[45px] text-[white] items-center  h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("allclient")}
            >
              <div
                className={
                  activeTab === "allclient"
                    ? "flex gap-[10px] px-[20px] items-center justify-start"
                    : "flex gap-[10px] px-[20px] items-center justify-start"
                }
              >
                <span>
                  <FiHome />
                </span>
                <span>All Clients</span>
              </div>
              <div
                className={
                  activeTab === "allclient"
                    ? "flex justify-end bg-[#ffb64d] px-[6px] text-[12px] font-semibold rounded-[0.2rem] font-fair"
                    : "flex justify-end bg-[#ffb64d] px-[6px] text-[12px] font-semibold rounded-[0.2rem] font-fair"
                }
              >
                <span>{clientData.length}</span>
              </div>
            </Link>
            <div
              className={
                activeTab === "castingcall"
                  ? "bg-[black] cursor-pointer  flex ]  px-[20px] items-center justify-between h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] cursor-pointer text-[white] px-[20px] items-center justify-between h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => {
                handleChange();
                handleTabClick("castingcall");
              }}
            >
              <div className="cursor-pointer flex items-center gap-[10px]">
                <span>
                  <GiBugleCall />
                </span>
                <span>Casting Call</span>
              </div>
              {casting && (
                <motion.span
                  initial={{ y: 0 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2 }}
                  className="cursor-pointer "
                >
                  <AiOutlineDown />
                </motion.span>
              )}
              {!casting && (
                <motion.span
                  initial={{ y: 0 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2 }}
                  className="cursor-pointer "
                >
                  <AiOutlineRight />
                </motion.span>
              )}
            </div>
            {casting && (
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[black] text-[white] py-[10px] flex flex-col gap-[10px] items-start text-[12px] px-[20px] font-fair"
              >
                <Link
                  to="/admin/home/CastingCall"
                  className="flex items-center gap-[10px]"
                >
                  <span className="text-white">
                    <AiOutlineRight />
                  </span>
                  <span>Add/View</span>
                </Link>
                <Link
                  to="/admin/home/CastingCallModel"
                  className="flex items-center gap-[10px]"
                >
                  <span className="text-white">
                    <AiOutlineRight />
                  </span>
                  <span>View casting models</span>
                </Link>
              </motion.div>
            )}
            <Link
              to="/admin/home/ContestModel"
              className={
                activeTab === "contestmodel"
                  ? "bg-[black] flex gap-[5px] items-center  h-[55px] text-[white] hover:text-white"
                  : "flex gap-[5px]  text-[white]  items-center  h-[55px] hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("contestmodel")}
            >
              <div
                className={
                  activeTab === "contestmodel"
                    ? "flex gap-[10px] px-[20px] items-center justify-start"
                    : "flex gap-[10px] px-[20px] items-center justify-start"
                }
              >
                <span>
                  <FiHome />
                </span>
                <span>Approve Images</span>
              </div>
              <div
                className={
                  activeTab === "newmodels"
                    ? "flex justify-end bg-[#ffb64d] px-[6px] text-[12px] font-semibold rounded-[0.2rem] font-fair"
                    : "flex justify-end bg-[#ffb64d] px-[6px] text-[12px] font-semibold rounded-[0.2rem] font-fair"
                }
              >
                <span>{approveimage.length}</span>
              </div>
            </Link>
            <Link
              to="/admin/home/SpecialStory"
              className={
                activeTab === "special"
                  ? " bg-[black] flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("special")}
            >
              <span>
                <FiSettings />
              </span>
              <span>Special Story</span>
            </Link>
            <Link
              to="/admin/home/Testimony"
              className={
                activeTab === "testimony"
                  ? "bg-[black]  flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("testimony")}
            >
              <span>
                <FiSettings />
              </span>
              <span>Testimony</span>
            </Link>
            <Link
              to="/admin/home/OurTeam"
              className={
                activeTab === "ourteam"
                  ? "bg-[black]  flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("ourteam")}
            >
              <span>
                <FiSettings />
              </span>
              <span>Our Team</span>
            </Link>
            <Link
              to="/admin/home/PortFolioEnquiry"
              className={
                activeTab === "portfolio"
                  ? "bg-[black]  flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("portfolio")}
            >
              <span>
                <FiSettings />
              </span>
              <span>Portfolio Enquiry</span>
            </Link>
            <Link
              to="/admin/home/Blog"
              className={
                activeTab === "blog"
                  ? "bg-[black]  flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("blog")}
            >
              <span>
                <FiSettings />
              </span>
              <span>Blog</span>
            </Link>
            <Link
              to={`/admin/home/Awards/6405f1e689da4161f647535b`}
              className={
                activeTab === "Awards"
                  ? "bg-[black]  flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("Awards")}
            >
              <span>
                <FiSettings />
              </span>
              <span>Awards</span>
            </Link>
            <Link
              to="/admin/home/ModelExpiry"
              className={
                activeTab === "model"
                  ? "bg-[black]  flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("model")}
            >
              <span>
                <MdOutlineMenu />
              </span>
              <span>Model Expiry</span>
            </Link>
            <Link
              to="/admin/home/TrashModel"
              className={
                activeTab === "trash"
                  ? "bg-[black]  flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("trash")}
            >
              <span>
                <MdOutlineMenu />
              </span>
              <span>Trash Models</span>
            </Link>

            <Link
              to="/"
              className={
                activeTab === "logout"
                  ? "bg-[black]  flex gap-[10px]  px-[20px] items-center justify-start h-[55px] text-[white] hover:text-white  "
                  : "flex gap-[10px] text-[white] px-[20px] items-center justify-start h-[55px]  hover:bg-black hover:text-white hover:duration-500"
              }
              onClick={() => handleTabClick("logout")}
            >
              <span>
                <BiLogOut />
              </span>
              <span>Log Out</span>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SideBar;
