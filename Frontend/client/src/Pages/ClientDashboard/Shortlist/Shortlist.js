import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import "./shortlist.css";

function Shortlist() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/client/register/getmodel`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
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

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/client/register/getmodel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Not authenticated");
        localStorage.removeItem("token");
      } else {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/client/register/modelenquiry/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(()=>fetchUser())
      
  };

  return (
    <div className="border-[1px] flex flex-col gap-[20px]">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>Shortlist</h>
      </div>
      <div>
        <div
          className={
            data===5
              ? "overflow-x-scroll  h-[600px] scroll pb-[10px] md:px-[10px]"
              : "overflow-x-scroll scroll pb-[10px]"
          }
        >
          <table className=" border-[1px] font-fair">
            <thead
              className={
                data[0]
                  ? " sticky top-0 bg-black text-white"
                  : "bg-black text-white"
              }
            >
              <tr className=" ">
                <th className="border-[1px] h-[30px] w-[100px]">SI</th>
                <th className="border-[1px] h-[30px]  w-[250px]">Name</th>
                <th className="border-[1px] h-[30px] w-[150px] sm:w-[100px]">Model ID</th>
                <th className="border-[1px] h-[30px] ">Image</th>
                <th className="border-[1px] h-[30px]  w-[150px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datas, key) => (
                <tr className="text-[14px] text-left" key={datas.id}>
                  <td className="border-[1px] text-center px-[30px] md:px-0">
                    {key + 1}
                  </td>
                  <td className="border-[1px] text-center uppercase px-[30px] md:px-0">
                    {datas.userId.fullName}
                  </td>
                  <td className="border-[1px] px-[30px] ">{datas.userId.id}</td>
                  <td className="border-[1px]   px-[20px]">
                    <div className="flex justify-center w-[200px] py-[5px]">
                      <img
                        src={`data:image/*;base64,${btoa(
                          new Uint8Array(
                            datas.userId.images[0].image.data.data
                          ).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                          )
                        )}`}
                        alt=""
                        className="h-[100px] w-[100px]"
                      />
                    </div>
                  </td>
                  <td className="border-[1px] px-[50px] ">
                    <MdDelete
                      onClick={() => handleDelete(datas.userId._id)}
                      className="text-[20px] hover:text-[red] cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <thead
              className={
                data[0]
                  ? " sticky top-0 bg-black text-white"
                  : "bg-black text-white"
              }
            >
              <tr className=" ">
                <th className="border-[1px] h-[30px] w-[100px]">SI</th>
                <th className="border-[1px] h-[30px]  w-[150px]">Name</th>
                <th className="border-[1px] h-[30px] w-[100px]">Model ID</th>
                <th className="border-[1px] h-[30px]  w-[250px]">Image</th>
                <th className="border-[1px] h-[30px]  w-[150px]">Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Shortlist;
