import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React, { useState, useContext } from "react";
import NavBar from "./Components/NavBar/NavBar";
import SideBar from "./Components/SideBar/SideBar";
import DashBoard from "./Pages/DashBoard/DashBoard";
import NewModels from "./Pages/NewModels/NewModels";
import AllModels from "./Pages/AllModels/AllModels";
import ContestModel from "./Pages/ContestModel/ContestModel";
import AllClient from "./Pages/AllClient/AllClient";
import Testimony from "./Pages/Testimony/Testimony";
import CastingCall from "./Pages/CasingCall/CastingCall";
import OurTeam from "./Pages/OurTeam/OurTeam";
import Blog from "./Pages/Blog/Blog";
import ModelExpiry from "./Pages/ModelExpiry/ModelExpiry";
import SpecialStory from "./Pages/SpecialStory/SpecialStory";
import PortfolioEnquiry from "./Pages/PortFolioEnquiry/PortFolioEnquiry";
import TrashModel from "./Pages/TrashModel/TrashModel";
import { SidebarContext } from "./Hooks/Context";
import "./Components/SideBar/Scroll.css";
import ViewModel from "./Components/AllModels/ViewModel";
import ViewClient from "./Components/AllClient/ViewAllClient";
import CastingModel from "./Components/CastingCall/CastingCallModel";
import ViewAppliedModels from "./Components/CastingCall/ViewAppliedModels";
import Editcastingcall from "./Components/CastingCall/editcastingcall";
import EditOurTeam from "./Components/OurTeam/EditOurTeam";
import EditTestimony from "./Components/Testimony/EditTestimony";
import EditBlog from "./Components/Blog/EditBlog";
import EditSpecialStory from "./Components/SpecialStory/EditSpecialStory";
import SingleModel from "./Components/SpecialStory/SingleModel";
import { motion } from "framer-motion";
import Login from "./Pages/Login/Login";
import Awards from "./Pages/Awards/Awards";

const Layout = () => {
  const { isOpen } = useContext(SidebarContext);
  return (
    <div className="">
      <div className="">
        <NavBar />
      </div>

      <div className="flex">
        <motion.div
          initial={{ x: isOpen ? -100 : 0 }}
          animate={{ x: isOpen ? 0 : -300 }}
          transition={{ duration: 0.2 }}
          className={
            isOpen
              ? "h-[92vh] lg:h-[90vh] rounded-r-[0.2rem] bg-[#333333] w-[230px] absolute z-[999] lg:z-0 lg:sticky overflow-y-scroll scroll"
              : ""
          }
        >
          <SideBar />
        </motion.div>
        <motion.div
          className={
            isOpen
              ? "w-full lg:w-[85vw]  py-[40px] lg:px-[20px] h-[90vh] overflow-y-scroll scroll"
              : "w-full py-[40px] lg:px-[20px] h-[90vh] overflow-y-scroll scroll"
          }
          initial={{ x: isOpen ? 0 : 0 }}
          animate={{ x: isOpen ? 0 : -10 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/admin/home/Dashboard",
        element: <DashBoard />,
      },
      {
        path: "/admin/home/NewModels",
        element: <NewModels />,
      },
      {
        path: "/admin/home/AllModels",
        element: <AllModels />,
      },
      {
        path: "/admin/home/ContestModel",
        element: <ContestModel />,
      },
      {
        path: "/admin/home/AllClient",
        element: <AllClient />,
      },
      {
        path: "/admin/home/Testimony",
        element: <Testimony />,
      },
      {
        path: "/admin/home/CastingCall",
        element: <CastingCall />,
      },
      {
        path: "/admin/home/OurTeam",
        element: <OurTeam />,
      },
      {
        path: "/admin/home/Blog",
        element: <Blog />,
      },
      {
        path: "/admin/home/ModelExpiry",
        element: <ModelExpiry />,
      },
      {
        path: "/admin/home/SpecialStory",
        element: <SpecialStory />,
      },
      {
        path: "/admin/home/PortFolioEnquiry",
        element: <PortfolioEnquiry />,
      },
      {
        path: "/admin/home/TrashModel",
        element: <TrashModel />,
      },
      {
        path: "/admin/home/ViewModel/:id",
        element: <ViewModel />,
      },
      {
        path: "/admin/home/ViewClient/:id",
        element: <ViewClient />,
      },
      {
        path: "/admin/home/ViewCastingModel/:id",
        element: <ViewAppliedModels />,
      },
      {
        path: "/admin/home/CastingCallModel",
        element: <CastingModel />,
      },
      {
        path: "/admin/home/EditCastingCall/:id",
        element: <Editcastingcall />,
      },
      {
        path: "/admin/home/EditOurTeam/:id",
        element: <EditOurTeam />,
      },
      {
        path: "/admin/home/EditTestimony/:id",
        element: <EditTestimony />,
      },
      {
        path: "/admin/home/EditBlog/:id",
        element: <EditBlog />,
      },
      {
        path: "/admin/home/EditSpecialStory/:id",
        element: <EditSpecialStory />,
      },
      {
        path: "/admin/home/SingleModel/:id",
        element: <SingleModel />,
      },
      {
        path: "/admin/home/Awards/6405f1e689da4161f647535b",
        element: <Awards />,
      },
    ],
  },
]);

function App() {
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState("");
  const toggle = () => {
    setActive(!active);
  };
  return (
    <>
      <SidebarContext.Provider
        value={{
          isOpen: active,
          toggle: toggle,
          filter: filter,
          setFilter: setFilter,
        }}
      >
        <RouterProvider router={router} />
      </SidebarContext.Provider>
    </>
  );
}

export default App;
