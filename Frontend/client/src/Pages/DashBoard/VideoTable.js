import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

function VideoTable() {
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
        setData(response.data.user.videos);
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
      setData(response.data.user.videos);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      } else {
        console.error(error);
      }
    }
  };

  const handleDelete = (key) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/register/videos/delete/${key}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchUser();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={data[0] ? "overflow-x-scroll scroll" : "flex justify-center"}
    >
      <table className="">
        <thead className="border-[1px] ">
          <tr className=" ">
            <th className="border-[1px] h-[50px] w-[100px]">SI</th>
            <th className="border-[1px] h-[50px]  ">Video</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, key) => (
            <>
              {data.url ? (
                <tr className="">
                  <td className="border-[1px] text-center px-[50px]">
                    {key + 1}
                  </td>
                  <td className="border-[1px]  py-[20px] px-[20px]">
                    <ReactPlayer url={data.url} width="200px" height="100px" />
                  </td>
                  <td className="border-[1px] px-[50px] ">
                    {data.videostatus}
                  </td>
                  <td className="border-[1px] px-[50px] ">
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="text-[20px] "
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </>
          ))}
        </tbody>

        <thead className="border-[1px]">
          <tr className=" ">
            <th className="border-[1px] h-[50px] w-[80px]">SI</th>
            <th className="border-[1px] h-[50px] w-[150px] ">Video</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
            <th className="border-[1px] h-[50px]  w-[150px]">Action</th>
          </tr>
        </thead>
      </table>
    </motion.div>
  );
}

export default VideoTable;
