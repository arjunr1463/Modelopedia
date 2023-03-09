import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

const SITable = () => {
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
        setData(response.data.user.images);
      } catch (error) {
        if (error.response.status === 401) {
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
      setData(response.data.user.images);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      } else {
        console.error(error);
      }
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/register/AddImage/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchUser();
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={data.length===5 ? "overflow-x-scroll scroll h-[600px]" : "overflow-x-scroll scroll"}
    >
      <table className="">
        <thead className="border-[1px] ">
          <tr className=" ">
            <th className="border-[1px] h-[50px] w-[100px]">SI</th>
            <th className="border-[1px] h-[50px]  ">Image</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((datas, key) => (
            <tr className="" key={datas.id}>
              <td className="border-[1px] px-[50px] ">{key + 1}</td>
              <td className="border-[1px]  py-[5px] px-[20px]">
                <div className="w-[200px] flex justify-center ">
                  <img
                    src={`data:image/*;base64,${btoa(
                      new Uint8Array(
                        datas.image ? datas.image.data.data : ""
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
              <td className="border-[1px] px-[50px] ">{datas.imagestatus}</td>
              <td
                className="border-[1px] px-[50px] "
                onClick={() => handleDelete(datas._id)}
              >
                <MdDelete className="text-[20px] hover:text-[red] cursor-pointer" />
              </td>
            </tr>
          ))}
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
    </motion.div>
  );
};

export default SITable;
