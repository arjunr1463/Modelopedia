import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { VscLayersActive } from "react-icons/vsc";
import { SlNote } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import ReactPlayer from "react-player";

function AddVideo() {
  const [data, setData] = useState([]);
  const [action, setAction] = useState(false);
  const [select, setSelect] = useState("");
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/register/${id}`
      );
      setData(response.data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/${id}`
        );
        setData(response.data.videos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (id) => {
    setAction(!action);
    setSelect(id);
  };

  const handleClickApprove = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/approveVideos/${id}`)
      .then(() => fetchUser());
  };
  const handleClickReject = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/rejectVideos/${id}`)
      .then(() => fetchUser());
  };
  const handleClickPending = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/pendingVideos/${id}`)
      .then(() => fetchUser());
  };
  const handleClickDelete = (key) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/user/register/${id}/videos/delete/${key}`
      )
      .then(() => fetchUser());
  };

  return (
    <div className="flex flex-col gap-[20px] ">
      <div>
        <h className="font-fair uppercase text-[20px] font-semibold">
          Model Videos
        </h>
      </div>

      <div
        className={
          data
            ? "overflow-x-scroll  scroll pb-[50px]"
            : "overflow-x-scroll  scroll pb-[50px] flex justify-center"
        }
      >
        <table className="">
          <thead className="border-[1px] ">
            <tr className=" ">
              <th className="border-[1px] h-[50px] w-[100px]">SI</th>
              <th className="border-[1px] h-[50px] w-[150px] ">Model Video</th>
              <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
              <th className="border-[1px] h-[50px]  w-[150px]"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas, key) => (
              <>
                {datas.url ? (
                  <tr key={datas.id} className="table-row">
                    <td className="border-[1px] px-[50px] ">{key + 1}</td>
                    <td className="border-[1px]  py-[5px] px-[20px]">
                      <ReactPlayer
                        url={datas.url}
                        width="200px"
                        height="100px"
                      />
                    </td>
                    <td className="border-[1px] px-[50px] ">
                      {datas.videostatus}
                    </td>
                    <td className="border-[1px]">
                      <div className="flex flex-col gap-[10px] relative">
                        <div className="flex justify-center w-[200px] ">
                          <div
                            onClick={() => handleChange(key)}
                            className="flex gap-[5px] cursor-pointer bg-[#4099ff] hover:duration-300 text-white justify-center items-center w-[60px] h-[30px]"
                          >
                            <span className="text-[18px]">
                              <AiFillSetting />
                            </span>
                            <span className="text-[14px]">
                              <AiFillCaretDown />
                            </span>
                          </div>
                        </div>
                        {action && select === key && (
                          <div className="flex z-[999] justify-center absolute top-[32px] right-[100px]">
                            <div className="bg-white shadow-md px-[10px] py-[10px] rounded-[0.2rem] w-[150px] gap-[15px] text-[14px] flex flex-col items-start">
                              <div className="flex gap-[10px] items-center">
                                <span>
                                  <VscLayersActive />
                                </span>
                                <button
                                  onClick={() => handleClickPending(datas._id)}
                                >
                                  Pending
                                </button>
                              </div>

                              <div className="flex gap-[10px] items-center">
                                <span className="text-[12px]">
                                  <SlNote />
                                </span>
                                <button
                                  onClick={() => handleClickApprove(datas._id)}
                                >
                                  Approve
                                </button>
                              </div>
                              <div className="flex gap-[10px] items-center">
                                <span>
                                  <SlNote />
                                </span>
                                <button
                                  onClick={() => handleClickReject(datas._id)}
                                >
                                  Reject
                                </button>
                              </div>
                              <div className="flex gap-[10px] items-center">
                                <span className="text-[red]">
                                  <AiFillDelete />
                                </span>
                                <button
                                  onClick={() => handleClickDelete(datas._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
              <th className="border-[1px] h-[50px] w-[100px]">SI</th>
              <th className="border-[1px] h-[50px]  ">Model Video</th>
              <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
              <th className="border-[1px] h-[50px]  w-[150px]"></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default AddVideo;
