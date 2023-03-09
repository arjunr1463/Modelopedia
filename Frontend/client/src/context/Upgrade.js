import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Upgrade1 from "../Pages/DashBoard/UpgradeListing/Upgrade1";
import Upgrade2 from "../Pages/DashBoard/UpgradeListing/Upgrade2";
import Upgrade3 from "../Pages/DashBoard/UpgradeListing/Upgrade3";
import Completed from "../Pages/DashBoard/UpgradeListing/Complete";

function Upgrade() {
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
  if (data.paymentStatus === "pending") {
    return (
      <div>
        <Upgrade1 />
      </div>
    );
  } else if (data.paymentStatus === "success" && data.paymentType === "Basic") {
    return (
      <>
        <Upgrade2 />
      </>
    );
  } else if (
    data.paymentStatus === "success" &&
    data.paymentType === "Featured"
  ) {
    return (
      <>
        <Upgrade3 />
      </>
    );
  } else if (
    data.paymentStatus === "success" &&
    data.paymentType === "Diamond"
  ) {
    return (
      <>
        <Completed />
      </>
    );
  } else {
    return <div className="text-[red] text-[14px] flex justify-center">Loading Please Wait</div>;
  }
}

export default Upgrade;
