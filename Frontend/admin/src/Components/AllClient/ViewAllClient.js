import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { VscLayersActive } from "react-icons/vsc";
import { SlNote } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import EnquiredModel from "./EnquiredModel";

function ViewAllClient() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [cmpny, setCmpny] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/client/register/getclient/${id}`)
        .then((res) => {
          setData(res.data);
          setImage(res.data.cmpnylogo.data.data);
          setCmpny(res.data.cmpnycertificate.data.data);
          console.log(res.data);
        });
    };
    fetchData();
  }, [id]);

  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/client/register/getclient/${id}`)
      .then((res) => {
        setData(res.data);
        setImage(res.data.cmpnylogo.data.data);
        setCmpny(res.data.cmpnycertificate.data.data);
        console.log(res.data);
      });
  };

  const handleClick = () => {
    setSelected(!selected);
  };

  const handleclickActive = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/client/register/admin/client/active/${id}`
      )
      .then(() => fetchData());
  };
  const handleclickInactive = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/client/register/admin/client/Inactive/${id}`
      )
      .then(() => fetchData());
  };
  const handleclickPending = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/client/register/admin/client/pending/${id}`
      )
      .then(() => fetchData());
  };
  const handleclickDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/client/register/admin/client/delete/${id}`
      )
      .then(() => navigate("/admin/home/AllClient"));
  };

  return (
    <div className="">
      <div className="bg-[white] rounded-[0.4rem] shadow-lg flex flex-col gap-[20px] px-[20px] py-[20px] ">
        <div className="flex flex-col gap-[5px]">
          <h className="font-semibold sticky left-0  text-[15px]">
            {data.fullname}
          </h>
          <div className="border-b-[2px] w-[150px] sticky left-0"></div>
        </div>
        <div className="flex gap-[30px]">
          <div className="text-[14px] flex flex-col gap-[15px]">
            <div className="flex gap-[5px]">
              <span className="font-bold">Email:</span>
              <span className="font-fair">{data.email}</span>
            </div>
            <div className="flex gap-[5px]">
              <span className="font-bold">Phone:</span>
              <span className="font-fair">{data.mobile}</span>
            </div>
            <div className="flex gap-[5px]">
              <span className="font-bold">Address:</span>
              <span className="font-fair max-w-[400px]">{data.address}</span>
            </div>
            <div className="flex gap-[5px]">
              <span className="font-bold">City:</span>
              <span className="font-fair">{data.city}</span>
            </div>
            <div className="flex gap-[5px]">
              <span className="font-bold">State:</span>
              <span className="font-fair">{data.state}</span>
            </div>
            <div className="flex gap-[5px]">
              <span className="font-bold">Zipcode:</span>
              <span className="font-fair">{data.postcode}</span>
            </div>
            <div className="flex gap-[5px]">
              <span className="font-bold">gstnumber:</span>
              <span className="font-fair">{data.id}</span>
            </div>
            <div className="flex gap-[5px]">
              <span className="font-bold">Status:</span>
              <span className="font-fair">{data.personalStatus}</span>
            </div>
          </div>

          {/*Right */}
          <div>
            <div className="text-[14px] flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[5px]">
                <span className="font-bold">Gst Certificate</span>
                <div>
                  <img
                    src={`data:image/*;base64,${btoa(
                      new Uint8Array(cmpny).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    )}`}
                    alt=""
                    className="h-[40px]  object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="font-bold">Company logo</span>
                <div>
                  <img
                    src={`data:image/*;base64,${btoa(
                      new Uint8Array(image).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    )}`}
                    alt=""
                    className="h-[40px]  object-cover"
                  />
                </div>
              </div>
              <div className="flex justify-center relative">
                <div
                  onClick={handleClick}
                  className="bg-[#4099ff] px-[10px] cursor-pointer py-[5px] text-white flex gap-[5px] items-center"
                >
                  <span className=" text-[22px]">
                    <AiFillSetting />
                  </span>
                  <span className="text-[14px]">
                    <AiFillCaretDown />
                  </span>
                </div>

                {selected && (
                  <div className="flex justify-center absolute top-[35px]">
                    <div className="bg-white shadow-md px-[10px] py-[10px] rounded-[0.2rem] w-[150px] gap-[10px] text-[14px] flex flex-col items-start">
                      <div className="flex gap-[10px] items-center">
                        <span>
                          <VscLayersActive />
                        </span>
                        <button onClick={handleclickPending}>Pending</button>
                      </div>

                      <div className="flex gap-[10px] items-center">
                        <span className="text-[12px]">
                          <SlNote />
                        </span>
                        <button onClick={handleclickActive}>Active</button>
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <span className="text-[12px]">
                          <SlNote />
                        </span>
                        <button onClick={handleclickInactive}>Inactive</button>
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <span className="text-[red]">
                          <AiFillDelete />
                        </span>
                        <button onClick={handleclickDelete}>Delete</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <EnquiredModel />
        </div>
      </div>
    </div>
  );
}

export default ViewAllClient;
