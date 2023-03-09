import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function ImageTable() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/stage1/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.user.specialstory);
        console.log(response.data.user.specialstory);
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
  }, [id]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/register/stage1/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.user.specialstory);
      console.log(response.data.user.specialstory)
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Not authenticated");
        localStorage.removeItem("token");
      } else {
        console.error(error);
      }
    }
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/register/UserSpecialStory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchUser();
      });
  };

  return (
    <div
      className={data ? "overflow-x-scroll scroll" : "flex justify-center"}
    >
      <table>
        <thead className="border-[1px] ">
          <tr className=" ">
            <th className="border-[1px] h-[50px] w-[100px]">SI</th>
            <th className="border-[1px] h-[50px]  ">Image</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.featuredimages?<tr className="">
              <td className="border-[1px] px-[50px] ">1</td>
              <td className="border-[1px]  py-[5px] px-[20px]">
                <div className="w-[200px] flex justify-center ">
                  <img
                    src={`data:image/*;base64,${btoa(
                      new Uint8Array(data.featuredimages?data.featuredimages.data.data:"").reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    )}`}
                    alt=""
                    className="h-[100px] w-[100px]"
                  />
                </div>
              </td>
              <td className="border-[1px] px-[50px] ">{data.status}</td>
              <td
                className="border-[1px] px-[50px] "
                onClick={handleDelete}
              >
                <MdDelete className="text-[20px] hover:text-[red] cursor-pointer" />
              </td>
            </tr>:""}
          
        </tbody>
        <thead className="border-[1px]">
          <tr className=" ">
            <th className="border-[1px] h-[50px] w-[100px]">SI</th>
            <th className="border-[1px] h-[50px]  w-[250px]">Image</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Action</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default ImageTable;
