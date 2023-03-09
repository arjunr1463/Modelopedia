import React, { useContext } from "react";
import Card from "../Card/DashBoard";
import PeopleIcon from "@mui/icons-material/People";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { SidebarContext } from "../../Hooks/Context";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"

function DashBoard() {
  const [totalModels, setTotalModels] = useState([]);
  const [totalClients, setTotalClients] = useState([]);
  const [totalSpecial, setTotalSpecial] = useState([]);
  const [totalBlog, setTotalBlog] = useState([]);
  const fetchTotalModel = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/register`
    );
    setTotalModels(response.data.length);
  };
  const fetchTotalClient = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/register`
    );
    setTotalClients(response.data.length);
  };
  const fetchTotalBlog = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Blog/`);
    setTotalBlog(response.data.length);
  };

  const fetchTotalSpecialStory = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/user/register`).then((res) => {
      setTotalSpecial(res.data);
    });
  };

  const filterSpecial = totalSpecial.filter((datas) =>
    datas.paymentStatus === "success"
      ? datas.paymentType === "Diamond"
        ? datas.specialstory
          ? datas.specialstory.status === "Approved" ||
            datas.specialstory.status === "Rejected" ||
            datas.specialstory.status === "Pending"
          : ""
        : ""
      : ""
  );
  const filter = filterSpecial.length;

  useEffect(() => {
    fetchTotalModel();
    fetchTotalClient();
    fetchTotalSpecialStory();
    fetchTotalBlog();
  }, []);

  const { isOpen } = useContext(SidebarContext);
  const data = [
    {
      title: "Total Models",
      total: <div>{totalModels}</div>,
      view: <Link to="/admin/home/AllModels">View Models</Link>,
      icon: <PersonAddAlt1Icon />,
      bgColor: "bg-[#ff5370]",
    },
    {
      title: "Total Clients",
      total: <div>{totalClients}</div>,
      view: <Link to="/admin/home/AllClient">View Clients</Link>,
      icon: <PeopleIcon />,
      bgColor: "bg-[#4099ff]",
    },
    {
      title: "Total special Story",
      total: <div>{filter}</div>,
      view: <Link to="/admin/home/SpecialStory">View Special Story</Link>,
      icon: <AutoStoriesIcon />,
      bgColor: "bg-[#2ed8b6]",
    },
    {
      title: "Total Blog",
      total: <div>{totalBlog}</div>,
      view: <Link to="/admin/home/Blog">View Blog</Link>,
      icon: <MenuIcon />,
      bgColor: "bg-[#ffb64d]",
    },
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={
        isOpen
          ? "flex flex-col lg:flex-row justify-around lg:w-full items-center gap-[40px] md:gap-0 "
          : " flex flex-col lg:flex-row justify-around  md:w-[100vw] lg:w-full items-center gap-[40px] lg:gap-[60px]"
      }
    >
      {data.map((card) => (
        <div
          className={isOpen ? "w-[80vw] lg:w-[17vw]" : "w-[80vw] lg:w-[17vw]"}
        >
          <Card
            style={card.bgColor}
            title={card.title}
            total={card.total}
            view={card.view}
            icon={card.icon}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default DashBoard;
