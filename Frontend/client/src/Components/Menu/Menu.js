import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function Menu({ menuRef, menu }) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [clientData, setClientData] = useState([]);
  const [menus, setMenus] = useState(false);
  const [profile, setProfile] = useState(false);
  const [models, setModels] = useState(false);

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
        setData(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Not authenticated");
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
      .post(`${process.env.REACT_APP_API_URL}/api/user/register/logout`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        console.log(res.data.message);
        localStorage.removeItem("token");
        window.location.reload();
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token2 = localStorage.getItem("token");
        const clientresponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/client/register/verify`,
          {
            headers: {
              Authorization: `Bearer ${token2}`,
            },
          }
        );
        setClientData(clientresponse.data.user);

        console.log(clientresponse.data.user);
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Not authenticated");
          localStorage.removeItem("token");
        } else {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleClientLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/client/register/logout`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        console.log(res.data.message);
        localStorage.removeItem("token");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const changebackground = () => {
    if (window.scrollY >= 80) {
      setMenus(true);
    } else {
      setMenus(false);
    }
  };
  window.addEventListener("scroll", changebackground);

  const click = () => {
    setModels(!models);
  };
  const profileClicked = () => {
    setProfile(!profile);
  };
  const items = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.9,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        variants={items}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "", opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit="exit"
        className={
          menus
            ? "bg-white px-[20px] py-[20px] "
            : "bg-[#eba6a9] px-[20px] py-[20px]"
        }
        ref={menuRef}
      >
        <div className="flex flex-col gap-[10px] ">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={
              menus
                ? "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[black]"
                : "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[#fefdfc]"
            }
          >
            <Link to="/" onClick={menu}>
              Home
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={
              menus
                ? "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[black]"
                : "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[#fefdfc]"
            }
            onClick={click}
          >
            <h className="">Models</h>
            <span className="text-[12px] mt-[3px]">
              <AiFillCaretDown />
            </span>
          </motion.div>
          {models && (
            <motion.div
              animate={{ y: [-20, 0], transition: { duration: 0.3 } }}
              className={
                menus
                  ? "flex flex-col text-[18px] bg-black gap-[10px] px-[20px] rounded-[0.3rem]"
                  : "flex flex-col text-[18px] bg-white gap-[10px] px-[20px] rounded-[0.3rem]"
              }
            >
              <Link
                to="/ModelRegistration"
                onClick={menu}
                className={menus ? "text-white" : "text-black"}
              >
                <button>Model Registration</button>
              </Link>
              <Link
                to="/ModelLogin"
                onClick={menu}
                className={menus ? "text-white" : "text-black"}
              >
                <button>Model Login</button>
              </Link>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={
              menus
                ? "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[black]"
                : "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[#fefdfc]"
            }
          >
            <Link to="/SearchModel" onClick={menu}>
              Search Model
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={
              menus
                ? "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[black]"
                : "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[#fefdfc]"
            }
          >
            <Link to="/ClientLogin" onClick={menu}>
              Client Login
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={
              menus
                ? "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[black]"
                : "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[#fefdfc]"
            }
          >
            <Link to="/CastingCalls" onClick={menu}>
              Casting Calls
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={
              menus
                ? "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[black]"
                : "flex items-center cursor-pointer gap-[1px] text-[18px] font-fair text-[#fefdfc]"
            }
          >
            <Link to="/OurTeam" onClick={menu}>
              Our Team
            </Link>
          </motion.div>
          {clientData.fullname || data.fullName ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className={
                menus
                  ? "flex items-center cursor-pointer gap-[5px]  text-[18px] font-fair text-[black]"
                  : "flex items-center cursor-pointer gap-[5px] text-[18px] font-fair text-[#fefdfc]"
              }
              onClick={profileClicked}
            >
              <h className="text-[16px]">
                {clientData.fullname || data.fullName}
              </h>
              <span className="text-[12px] ">
                <AiFillCaretDown />
              </span>
            </motion.div>
          ) : (
            ""
          )}
          {profile && (
            <motion.div
              animate={{ y: [-20, 0], transition: { duration: 0.3 } }}
              className={
                menus
                  ? "flex flex-col text-[18px] bg-black gap-[10px] px-[20px] rounded-[0.3rem]"
                  : "flex flex-col text-[18px] bg-white gap-[10px] px-[20px] rounded-[0.3rem]"
              }
            >
              <Link
                to={
                  clientData.fullname
                    ? "/Admin/Client/Dashboard"
                    : data.fullName
                    ? "/Admin/Model/Main"
                    : ""
                }
                onClick={menu}
                className={menus ? "text-white" : "text-black"}
              >
                Profile
              </Link>
              <div>
                <button
                  className={menus ? "text-white" : "text-black"}
                  onClick={
                    data.fullName
                      ? handleLogout
                      : clientData.fullname
                      ? handleClientLogout
                      : ""
                  }
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Menu;
