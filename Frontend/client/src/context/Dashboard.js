import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const {id}=useParams()
  const navigate = useNavigate();
  const [datas, setData] = useState([]);
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
      setData(response.data.user.progress);
      if ((datas === 1)) {
        navigate("/Admin/Model/Dashboard");
      } else if(datas === 2) {
        navigate("/Admin/Model/Payment");
      }
      else if(datas === 3) {
        navigate("/Admin/Model/Completed");
      }
      else{
        <div>Something Went wrong</div>
      }
      console.log(response.data.user.progress);
    };
    fetchData();
  }, [id,navigate,datas]);
}

export default Dashboard;
