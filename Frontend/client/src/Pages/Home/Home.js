import React, { useState,useEffect } from "react";
import axios from "axios";
import Banner from "../../Components/Banner/Home";
import FeaturedModels from "../../Components/Featured/Featured";
import FeaturedModelCard from "../../Components/Card/FeaturedModelCard";
import LatestModel from "../../Components/Latest/Latest";
import RecentBlog from "../../Components/RecentBlog/RecentBlog";
import DisoverBanner from "../../Components/Banner/Discover";
import Status from "../../Components/Status/Status";
import Scroll from "../../Components/ScrollToTop";
import Testimony from "../../Components/Testimony/Testimony";
import Subscribe from "../../Components/Subscribe/Subscribe";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/HomeNavBar";

function Home() {
  const [loading, setLoading] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [Latestdata, setLatestData] = useState([]);
  const [Blogdata, setBlogData] = useState([]);
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const Latestresponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register`
        );
        const Blogresponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/Blog`); 
        setLoading(false);
        setLatestData(Latestresponse.data);  
        setBlogData(Blogresponse.data)  
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchModel();
  },[]);
  const changebackground = () => {
    if (window.scrollY >= 500) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  

  window.addEventListener("scroll", changebackground);
  return (
    <div  className={navbar ? "" : "absolute top-0"}>
      <Scroll />
      <div className="flex lg:hidden">
        <NavBar />
      </div>

      <Banner />
      <FeaturedModels />
      <FeaturedModelCard />
      <LatestModel data={Latestdata} loading={loading}/>
      <DisoverBanner />
      <RecentBlog data={Blogdata}/>
      <Status />
      <Testimony />
      <Subscribe />
      <Footer />
    </div>
  );
}

export default Home;
