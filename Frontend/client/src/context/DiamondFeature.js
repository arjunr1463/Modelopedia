import React, { useState, useEffect } from "react";
import Feature from "../Pages/DashBoard/DiamondFeature/DiamondFeature";
import NotElgible from "../Pages/DashBoard/DiamondFeature/NotEligible";
import axios from "axios";
import { useParams } from "react-router-dom";

function DiamondFeature() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/register/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.user);
    };
    fetchData();
  }, [id, data.paymentStatus, data.paymentType]);
  if (data.paymentStatus === "success" && data.paymentType === "Diamond") {
    return (
      <>
        <Feature />
      </>
    );
  } else {
    return (
      <>
        <NotElgible />
      </>
    );
  }
}

export default DiamondFeature;
