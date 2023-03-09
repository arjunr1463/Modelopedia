import React, { useState, useRef, useEffect } from "react";
import logo from "../../Assets/NavBar/logo.png";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import { motion } from "framer-motion";
import "../NavBar/NavBar.css";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";

function NavBar() {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [message, setMessage] = useState("");
  const [navbar, setNavbar] = useState(false);
  const [active, setActive] = useState(false);
  const [profile, setProfile] = useState(false);
  const [menu, setMenu] = useState(false);

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
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changebackground);

  const menuclick = () => {
    setMenu(!menu);
  };

  const clicked = () => {
    setActive(!active);
  };
  const profileClicked = () => {
    setProfile(!profile);
  };
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setActive(false);
        //setMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  //
  return (
    <div className="sticky top-0 z-[999]">
      <div
        className={
          navbar
            ? "bg-[white]  flex justify-between lg:justify-around items-center h-[80px] lg:h-[100px] px-[15px] lg:px-10 w-full shadow-md"
            : "bg-[#eba6a9] lg:bg-[white]  lg:bg-opacity-10  flex justify-between lg:justify-around items-center h-[80px] lg:h-[100px] px-[15px] lg:px-10 w-full"
        }
      >
        {/*Left*/}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex justify-center items-center outline-none"
        >
          <Link to="/">
            <img
              src={logo}
              alt=""
              className=" py-[2px] object-cover w-[105px] lg:w-[200px]"
            />
          </Link>
        </motion.div>

        {/*Right*/}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex justify-center items-center font-semibold  gap-1 lg:hidden"
          onClick={menuclick}
        >
          <span className="text-[24px]">
            <AiOutlineMenu />
          </span>
          <h className="text-[19px]">MENU</h>
        </motion.div>

        <div className="hidden lg:flex gap-7 text-[14px]  mt-8 font-sans  font-normal">
          <Link to="/">Home</Link>
          <div
            className="flex justify-center items-center cursor-pointer gap-[1px]"
            onClick={clicked}
          >
            <h>Models</h>
            <span className="text-[12px] mt-[3px]">
              <AiFillCaretDown />
            </span>
          </div>
          {active && (
            <motion.div
              animate={{ y: [-20, 0], transition: { duration: 0.2 } }}
              className="bg-[white] absolute top-[90px] h-[90px] ml-10 gap-3 flex flex-col items-start justify-center px-[10px] py-[10px] rounded-[0.3rem] z-[999]"
              ref={menuRef}
              onClick={active}
            >
              <Link
                to="/ModelRegistration"
                className="flex justify-center items-center"
              >
                <button>Model Registration</button>
              </Link>
              <Link
                to="/ModelLogin"
                className="flex justify-center items-center"
              >
                <button>Model Login</button>
              </Link>
            </motion.div>
          )}

          <Link to="/SearchModel">Search Model</Link>
          <Link to="/ClientLogin">Client Login</Link>
          <Link to="/CastingCalls">Casting Calls</Link>
          <Link to="/OurTeam">Our Team</Link>
          {clientData.fullname||data.fullName ? (
            <div
              className="flex items-center relative cursor-pointer"
              onClick={profileClicked}
            >
              <span className="uppercase">{clientData.fullname||data.fullName}</span>
              <span className="text-[12px] mt-[3px]">
                <AiFillCaretDown />
              </span>
              {profile && (
                <motion.div
                  animate={{ y: [-20, 0], transition: { duration: 0.2 } }}
                  className="bg-[white] w-[100px] absolute top-[25px] h-[80px] ml-10 gap-3 flex flex-col items-start justify-center px-[10px] py-[10px] rounded-[0.3rem] z-[999]"
                  ref={menuRef}
                >
                  <div className="flex items-center gap-[5px]">
                    <span className="text-[13px]">
                      <FaUserAlt />
                    </span>
                    <Link
                    
                      to={clientData.fullname?"/Admin/Client/Dashboard":data.fullName?"/Admin/Model/Main":""}
                      className="flex justify-center items-center"
                    >
                      Profile
                    </Link>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <span className="text-[15px]">
                      <BiLogOut />
                    </span>
                    <button onClick={data.fullName?handleLogout:clientData.fullname?handleClientLogout:""}>Logout</button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {menu && (
        <div>
          <Menu menuRef={menuRef} menu={menu} />
        </div>
      )}
    </div>
  );
}

export default NavBar;
