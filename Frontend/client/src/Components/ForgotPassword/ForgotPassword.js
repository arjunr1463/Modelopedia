import React, { useState } from "react";
import model from "../../Assets/Model/modelgigi.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

function ForgotPassword() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/user/register/ForgotPassword/${id}`,
          {
            email: email,
          }
        )
        .then((res) => {
          setSuccess(res.data.message);
          setTimeout(() => {
            setSuccess("");
          }, 3000);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="gap-[50px] w-full h-full lg:h-[700px] flex flex-col items-center lg:flex-row  lg:gap-[20px] lg:justify-center py-[50px] md:py-[130px] lg:items-start  px-[10px]">
      {/*left */}
      <div className="px-[15px]  lg:px-0  flex ">
        <img
          src={model}
          alt=""
          className="lg:h-[300px] lg:w-[500px] md:h-[450px] md:w-[700px] sm:w-[550px] sm:h-[320px] w-[95vw] h-full object-cover"
        />
      </div>
      {/*Right */}
      <div className="flex flex-col gap-[20px]  lg:gap-5  border-[#d6dbe0] px-4 lg:w-[600px]  md:w-[700px] sm:w-[550px] w-[95vw]">
        <div className="flex justify-start items-center break-normal ">
          <h className="text-[25px] sm:text-[35px] font-medium">
            Forgot Password
          </h>
        </div>
        <div className="flex flex-col gap-8 lg:gap-10">
          <div>
            <input
              value={email}
              onChange={handleChange}
              type="email"
              placeholder="abc@gmail.com"
              className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[20px] input"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="bg-[black] flex justify-center items-center rounded-[0.4rem] h-[50px] cursor-pointer hover:bg-black/50 duration-300">
            <button
              onClick={handleSubmit}
              className="text-white font-semibold text-[20px] font-[sans-serif]"
            >
              Submit
            </button>
          </div>
          <div className="text-[red] flex justify-center text-center font-fair text-[14px] md:text-[16px]">
            {success}
          </div>
          <div className="text-[red] flex justify-center text-center font-fair text-[14px] md:text-[16px]">
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
