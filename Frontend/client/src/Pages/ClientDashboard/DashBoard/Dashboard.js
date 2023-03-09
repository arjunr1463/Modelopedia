import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Shortlist/shortlist.css";

function Dashboard() {
  const [data, setData] = useState([]);
  console.log(data.length)
  const [castingmodel, setCastingModel] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/client/register/verify`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.user);
      } catch (error) {
        if (error.response.status === 401) {
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
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/client/register/getcastingmodels`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCastingModel(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        } else {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="border-[1px] flex flex-col gap-[30px] ">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>DashBoard</h>
      </div>
      <div className="overflow-x-scroll px-[10px] scroll pb-[10px]">
        <table className=" border-[1px] font-fair">
          <thead className="sticky top-0 bg-black text-white">
            <tr className=" ">
              <th className="border-[1px] h-[30px] w-[100px]">SI</th>
              <th className="border-[1px] h-[30px]  w-[250px]">Name</th>
              <th className="border-[1px] h-[30px] w-[150px] sm:w-[100px]">Model ID</th>
              <th className="border-[1px] h-[30px]  w-[300px]">Applied at</th>
            </tr>
          </thead>
          <tbody>
            {castingmodel.map((datas, key) => (
              <tr className="text-[14px] text-left" key={datas.id}>
                <td className="border-[1px] text-center px-[30px] md:px-0">
                  {key + 1}
                </td>
                <td className="border-[1px] text-center uppercase px-[30px] md:px-0">
                  {datas.userId.fullName}
                </td>
                <td className="border-[1px] px-[30px] ">{datas.userId.id}</td>
                <td className="border-[1px] px-[30px]"><div className="w-[200px]">
                {datas.castingcalltitle}
                </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
          <thead className="sticky top-0 bg-black text-white">
            <tr className=" ">
              <th className="border-[1px] h-[30px] w-[100px]">SI</th>
              <th className="border-[1px] h-[30px]  w-[150px]">Name</th>
              <th className="border-[1px] h-[30px]  ">Model ID</th>
              <th className="border-[1px] h-[30px]  w-[150px]">Applied at</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
