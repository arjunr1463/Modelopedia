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
import { AiFillCloseCircle } from 'react-icons/ai';

function AddImage() {
  const [data, setData] = useState([]);
  const [action, setAction] = useState(false);
  const [select, setSelect] = useState("");
  const { id } = useParams();
  const [image, setImage] = useState(false);
  const [imageselect, setImageselect] = useState("");

  const handleImage = (key) => {
    setImage(!image);
    setImageselect(key);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/register/${id}`
      );
      setData(response.data.images);
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
        setData(response.data.images);
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
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/approveImages/${id}`)
      .then(() => fetchUser());
  };
  const handleClickReject = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/rejectImages/${id}`)
      .then(() => fetchUser());
  };
  const handleClickPending = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/pendingImages/${id}`)
      .then(() => fetchUser());
  };
  const handleClickDelete = (key) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/user/register/${id}/Adminimages/${key}`
      )
      .then(() => fetchUser());
  };

  return (
    <div className="flex flex-col gap-[20px] relative ">
      <div>
        <h className="font-fair uppercase text-[20px] font-semibold">
          Model Images
        </h>
      </div>

      <div
        className={
          data.length===5
            ? "overflow-x-scroll h-[600px] scroll "
            : "overflow-x-scroll scroll  "
        }
      >
        <table className="">
          <thead className="border-[1px] ">
            <tr className=" ">
              <th className="border-[1px] h-[50px] w-[100px]">SI</th>
              <th className="border-[1px] h-[50px]  ">Model Image</th>
              <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
              <th className="border-[1px] h-[50px]  w-[150px]"></th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((datas, key) => (
                  <tr key={datas.id} className="table-row">
                    <td className="border-[1px] px-[50px] ">{key + 1}</td>
                    <td className="border-[1px]  py-[5px] px-[20px]">
                      <div className="w-[200px]  flex justify-center ">
                        <img
                          src={`data:image/*;base64,${btoa(
                            new Uint8Array(datas.image.data.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ""
                            )
                          )}`}
                          alt=""
                          className="h-[100px] w-[100px] cursor-pointer "
                          onClick={() => handleImage(key)}
                        />
                        {image && imageselect === key && (
                          <div className="absolute top-0 right-5">
                            <span onClick={() => handleImage(key)} className="flex justify-end  text-[22px] cursor-pointer"><AiFillCloseCircle/></span>
                            <div className=" bg-white shadow-md py-[10px] px-[10px]">
                              <img
                                src={`data:image/*;base64,${btoa(
                                  new Uint8Array(datas.image.data.data).reduce(
                                    (data, byte) =>
                                      data + String.fromCharCode(byte),
                                    ""
                                  )
                                )}`}
                                alt=""
                                className="h-[450px]"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border-[1px] px-[50px] ">
                      {datas.imagestatus}
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
                          <div className="flex z-[999] justify-center  absolute top-[-15px] right-[130px]">
                            <div className="bg-white shadow-md px-[10px] py-[10px] rounded-[0.2rem] w-[150px] gap-[10px] text-[14px] flex flex-col items-start">
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
                ))
              : ""}
          </tbody>
          <thead className="border-[1px]">
            <tr className=" ">
              <th className="border-[1px] h-[50px] w-[100px]">SI</th>
              <th className="border-[1px] h-[50px]  ">Model Image</th>
              <th className="border-[1px] h-[50px]  w-[150px]">Status</th>
              <th className="border-[1px] h-[50px]  w-[150px]"></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default AddImage;
