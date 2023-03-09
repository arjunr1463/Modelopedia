import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import HomeNavBar from "./Components/NavBar/HomeNavBar";
import Testimony from "./Components/Testimony/Testimony";
import Subscribe from "./Components/Subscribe/Subscribe";
import Footer from "./Components/Footer/Footer";
import ModelLogin from "./Pages/Models/ModelLogin";
import SearchModel from "./Pages/SearchModel/SearchModel";
import ClientLogin from "./Pages/ClientLogin/ClientLogin";
import CastingCalls from "./Pages/CastingCalls/CastingCalls";
import OurTeam from "./Pages/OurTeam/OurTeam";
import ViewModel from "./Pages/ViewModel/ViewModel";
import SingleBlog from "./Pages/SingleBlog/SingleBlog";
import SingleCastingCall from "./Pages/SingleCastingCall/SingleCastingCall";
import Blog from "./Pages/Blog/Blog";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import TermsCondition from "./Pages/TermsCondition/TermsCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "./Pages/RefundPolicy/RefundPolicy";
import TestimonyMain from "./Pages/Testimony/Testimony";
import Contest from "./Pages/Contest/Contest";
import ContactUs from "./Pages/ContactUs/ContactUs";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import DashBanner from "./Components/Banner/DashBanner";
import DashSideBar from "./Components/DashSideBar/DashSideBar";
import ScrollToTop from "react-scroll-to-top";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Myprofile from "./Pages/DashBoard/Myprofile";
import Portfolio from "./Pages/DashBoard/Portfolio";
import Payment from "./Pages/DashBoard/PaymentStep5";
import UpgradeListing from "./context/Upgrade";
import PaymentBasic from "./Pages/DashBoard/PaymentBasic";
import PaymentFeatured from "./Pages/DashBoard/PaymentFeatured";
import PaymentDiamond from "./Pages/DashBoard/PaymentDiamond";
import ChangePassword from "./Pages/DashBoard/ChangePassword";
import Reg from "./context/context";
import AddImage from "./Pages/DashBoard/AddImage";
import AddVideo from "./Pages/DashBoard/AddVideo";
import Completed from "./Pages/DashBoard/Completed";
import ContextDashboard from "./context/Dashboard";
import DiamondFeature from "./context/DiamondFeature";
import ClientDashSideBar from "./Components/DashSideBar/ClientDashsidebar";
import ClientDashBanner from "./Components/Banner/ClientDashBanner";
import ClientDashBoard from "./Pages/ClientDashboard/DashBoard/Dashboard";
import ClientCastingCalls from "./Pages/ClientDashboard/CastingCall/CastingCall";
import ClientShortlist from "./Pages/ClientDashboard/Shortlist/Shortlist";
import ClientChangePassword from "./Pages/ClientDashboard/ChangePassword/ChangePassword";
import { successContext } from "./context/success";
import ViewCastingCall from "./Pages/ClientDashboard/CastingCall/ViewCastingCall";
import EditClientCastingCall from "./Pages/ClientDashboard/CastingCall/EditClientCastingCall";
import EditPersonalInfo from "./Pages/DashBoard/EditPersonalInfo";
import DashboardFooter from "./Components/Footer/DashboardFooter";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword";
import ClientForgotPassword from "./Pages/ForgotPassword/ClientForgotPassword";
import ClientResetPassword from "./Pages/ForgotPassword/ClientResetPassword";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Testimony />
      <Subscribe />
      <Footer />
    </div>
  );
};
const Layout1 = () => {
  return (
    <div>
      <HomeNavBar />
      <Outlet />
    </div>
  );
};
const Layout2 = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Subscribe />
      <Footer />
    </div>
  );
};
//Model DashBoard
const Layout3 = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <DashBanner />
        <div className="lg:justify-center flex flex-col items-center gap-[30px] lg:gap-[20px] lg:items-start lg:flex-row pt-[100px] md:px-[10px] pb-[40px] ">
          <div className="w-[90vw] md:w-[70vw] lg:w-[250px]">
            <DashSideBar />
          </div>
          <div className="w-[90vw] md:w-[70vw] lg:w-[800px]">
            <Outlet />
          </div>
        </div>
      </div>
      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};

//Client Dashboard
const Layout4 = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <ClientDashBanner />
        <div className="lg:justify-center flex flex-col items-center gap-[30px] lg:gap-[20px] lg:items-start lg:flex-row pt-[100px] pb-[30px] ">
          <div className="w-[90vw] md:w-[70vw] lg:w-[250px]">
            <ClientDashSideBar />
          </div>
          <div className="w-[90vw] md:w-[70vw] lg:w-[800px]">
            <Outlet />
          </div>
        </div>
      </div>
      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout1 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout2 />,
    children: [
      {
        path: "/Testimony",
        element: <TestimonyMain />,
      },
    ],
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/ModelRegistration",
        element: <Reg />,
      },
      {
        path: "/ModelLogin",
        element: <ModelLogin />,
      },
      {
        path: "/SearchModel",
        element: <SearchModel />,
      },
      {
        path: "/ClientLogin",
        element: <ClientLogin />,
      },
      {
        path: "/CastingCalls",
        element: <CastingCalls />,
      },
      {
        path: "/OurTeam",
        element: <OurTeam />,
      },
      {
        path: "/ViewModel/:id",
        element: <ViewModel />,
      },
      {
        path: "/SingleBlog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/SingleCastingCall/:id",
        element: <SingleCastingCall />,
      },
      {
        path: "/Blog",
        element: <Blog />,
      },
      {
        path: "/HowToWork",
        element: <HowItWorks />,
      },
      {
        path: "/TermsCondition",
        element: <TermsCondition />,
      },
      {
        path: "/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/RefundPolicy",
        element: <RefundPolicy />,
      },
      {
        path: "/Testimony",
        element: <TestimonyMain />,
      },
      {
        path: "/Contest",
        element: <Contest />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/forgotpassword/:id",
        element: <ForgotPassword />,
      },
      {
        path: "/resetpassword/:id",
        element: <ResetPassword />,
      },
      {
        path: "/forgotpasswordClient/:id",
        element: <ClientForgotPassword />,
      },
      {
        path: "/resetpasswordClient/:id",
        element: <ClientResetPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout3 />,
    children: [
      {
        path: "/Admin/Model/Dashboard",
        element: <DashBoard />,
      },
      {
        path: "/Admin/Model/Myprofile/:id",
        element: <Myprofile />,
      },
      {
        path: "/Admin/Model/Portfolio",
        element: <Portfolio />,
      },
      {
        path: "/Admin/Model/UpgradeListing",
        element: <UpgradeListing />,
      },
      {
        path: "/Admin/Model/Changepassword",
        element: <ChangePassword />,
      },
      {
        path: "/Admin/Model/PaymentBasic",
        element: <PaymentBasic />,
      },
      {
        path: "/Admin/Model/PaymentFeatured",
        element: <PaymentFeatured />,
      },
      {
        path: "/Admin/Model/PaymentDiamond",
        element: <PaymentDiamond />,
      },
      {
        path: "/Admin/Model/AddImage",
        element: <AddImage />,
      },
      {
        path: "/Admin/Model/AddVideo",
        element: <AddVideo />,
      },
      {
        path: "/Admin/Model/Payment",
        element: <Payment />,
      },
      {
        path: "/Admin/Model/Completed",
        element: <Completed />,
      },
      {
        path: "/Admin/Model/Main",
        element: <ContextDashboard />,
      },
      {
        path: "/Admin/Model/FeatureMain",
        element: <DiamondFeature />,
      },
      {
        path: "/Admin/Model/EditPersonal",
        element: <EditPersonalInfo />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout4 />,
    children: [
      {
        path: "/Admin/Client/Dashboard",
        element: <ClientDashBoard />,
      },
      {
        path: "/Admin/Client/CastingCalls",
        element: <ClientCastingCalls />,
      },
      {
        path: "/Admin/Client/ViewCastingCalls",
        element: <ViewCastingCall />,
      },
      {
        path: "/Admin/Client/Shortlist",
        element: <ClientShortlist />,
      },
      {
        path: "/Admin/Client/ChangePassword",
        element: <ClientChangePassword />,
      },
      {
        path: "/Admin/Client/EditCastingCall/:id",
        element: <EditClientCastingCall />,
      },
    ],
  },
]);

function App() {
  const [success, setSuccess] = useState("");
  return (
    <>
      <successContext.Provider value={{ success, setSuccess }}>
        <RouterProvider router={router} />
        <ScrollToTop
          smooth
          color="black"
          width="20px"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            width: "35px",
            position: "fixed",
            right: "4px",
            bottom: "10px",
          }}
        />
      </successContext.Provider>
    </>
  );
}

export default App;
