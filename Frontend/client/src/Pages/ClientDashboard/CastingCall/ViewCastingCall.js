import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "./scroll.css";
import { Link } from "react-router-dom";

function ViewCastingCall() {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState("");
  const [active, setActive] = useState(false);
  const handleChange = (id) => {
    setSelect(id);
    setActive(!active);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/client/register/getclientcastingcalls`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/client/register/getclientcastingcalls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/client/register/castingcall/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchData();
        console.log(res);
      });
  };

  return (
    <div className="border-[1px]">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>View Casting Calls</h>
      </div>
      <div
        className={
          data[0]
            ? "px-[10px] overflow-x-scroll scroll py-[50px]"
            : "px-[10px] flex justify-center overflow-x-scroll scroll py-[50px]"
        }
      >
        <table className="font-fair">
          <thead className="border-[1px] ">
            <tr>
              <th
                className={
                  data[0]
                    ? "border-[1px] h-[50px]"
                    : "border-[1px] h-[50px] w-[80px]"
                }
              >
                SI
              </th>
              <th
                className={
                  data[0]
                    ? "border-[1px] h-[50px]"
                    : "border-[1px] h-[50px] w-[100px]"
                }
              >
                Title
              </th>
              <th
                cclassName={
                  data[0]
                    ? "border-[1px] h-[50px]"
                    : "border-[1px] h-[50px] w-[200px]"
                }
              >
                Image
              </th>
              <th
                className={
                  data[0]
                    ? "border-[1px] h-[50px]"
                    : "border-[1px] h-[50px] w-[250px]"
                }
              >
                Discription
              </th>
              <th className="border-[1px] h-[50px] w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.flatMap((datas, key) => (
              <tr className="text-[14px] text-left" key={datas.id}>
                <td className="border-[1px] ">
                  <div className="w-[80px] text-center">{key + 1}</div>
                </td>
                <td className="border-[1px]">
                  <div className="w-[200px] px-[10px]">{datas.title}</div>
                </td>
                <td className="border-[1px]  py-[5px] px-[10px]">
                  <div className="w-[200px] flex justify-center ">
                    <img
                      src={`data:image/*;base64,${btoa(
                        new Uint8Array(datas.image.data.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ""
                        )
                      )}`}
                      alt=""
                      className="h-[100px] object-cover"
                    />
                  </div>
                </td>
                <td className="border-[1px]  py-[10px]">
                  <div className="h-[200px] px-[10px]  scroll  w-[300px] overflow-y-scroll">
                    <span
                      dangerouslySetInnerHTML={{ __html: datas.discription }}
                    />
                  </div>
                </td>
                <td className="border-[1px] px-[50px] relative">
                  <div className="">
                    <AiFillSetting
                      onClick={() => handleChange(key)}
                      className="text-[22px] hover:text-[blue] cursor-pointer "
                    />
                  </div>

                  {active && select === key && (
                    <div className="flex flex-col absolute top-50 right-[60px] w-[50px] rounded-sm bg-white shadow-lg gap-[10px] px-[40px] py-[5px] justify-center items-center">
                      <div className="flex items-center gap-[5px] font-fair text-[green]">
                        <i>
                          <AiFillEdit />
                        </i>
                        <Link
                          to={`/Admin/Client/EditCastingCall/${datas._id}`}
                          state={{
                            title: `${datas.title}`,
                            discription: `${datas.discription}`,
                          }}
                        >
                          Edit
                        </Link>
                      </div>
                      <div
                        onClick={() => handleDelete(datas._id)}
                        className="cursor-pointer flex items-center gap-[5px] font-fair text-[red]"
                      >
                        <i>
                          <MdDelete />
                        </i>
                        <span>Delete</span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <thead className="border-[1px] ">
            <tr>
              <th className="border-[1px] h-[50px] ">SI</th>
              <th className="border-[1px] h-[50px] ">Title</th>
              <th className="border-[1px] h-[50px]">Image</th>
              <th className="border-[1px] h-[50px] ">Discription</th>
              <th className="border-[1px] h-[50px] ">Action</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default ViewCastingCall;
