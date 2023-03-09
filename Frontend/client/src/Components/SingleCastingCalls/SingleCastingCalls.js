import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function SingleCastingCalls() {
  const navigate = useNavigate();
  const [apply, setApply] = useState([]);
  const [data, setData] = useState("");
  const [image, setImage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const API_URL = `${process.env.REACT_APP_API_URL}/api/client/register/castingcall/${id}`;
    axios
      .get(API_URL)
      .then((res) => {
        setData(res.data);
        setImage(res.data.image.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    try {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/client/register/castingcall/${id}`,
          apply,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setApply(res.data);
          setSuccessMessage(res.data.message);
          setTimeout(() =>{
            setSuccessMessage("")
          },3000);
          console.log(res.data);
        });
      if (!token) {
        navigate("/ModelLogin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {data ? (
        <div className="flex flex-col lg:flex-row gap-[100px] lg:gap-[30px] h-full lg:px-[20px] py-[50px] md:py-[100px] justify-center items-center ">
          {/*Left */}
          <div className="w-[90vw] sm:w-[600px] md:w-[700px] flex flex-col gap-[20px]">
            <div className="flex ">
              <h className="text-[33px] font-semibold">{data.title}</h>
            </div>

            <div className="break-normal">
              <div
                dangerouslySetInnerHTML={{ __html: data.discription }}
                className="text-[18px] font-normal"
              />
            </div>
            <div className="flex gap-[10px] justify-center sm:justify-start">
              <button
                onClick={handleSubmit}
                className="text-white bg-black flex justify-center items-center w-[100px] h-[35px] rounded-[0.3rem] font-semibold font-[sans-serif]"
              >
                Apply
              </button>
              {successMessage && (
                <div className="flex justify-center text-[red]">
                  {successMessage}
                </div>
              )}
            </div>
          </div>

          {/*Right */}
          <div className="">
            <img
              src={`data:image/*;base64,${btoa(
                new Uint8Array(image).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt=""
              className="w-[350px] h-[220px]"
            />
          </div>
        </div>
      ) : (
        <div className="text-[red] font-fair flex justify-center">
          Loading please wait...
        </div>
      )}
    </div>
  );
}

export default SingleCastingCalls;
