import React from "react";
import "../ClientSignup/ClientSignup.css";
import image from "../../Assets/Contest/Contest.jpeg";

function Contest() {
  return (
    <div className="flex flex-col items-center gap-20 py-[80px] px-[10px]">
      <div className="flex flex-col justify-center items-center ">
        <h className="text-[20px] sm:text-[30px] md:text-[40px] font-semibold font-[sans-serif]">
          Miss. TEEN PAGEANT 2021
        </h>
        <span className="text-[16px] sm:text-[18px] lg:text-[20px] font-semibold">
          SOUTH INDIA FASHION SHOW
        </span>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-[700px] w-[90vw] sm:w-[550px] md:w-[650px] flex flex-col gap-[20px]">
          <input
            type="text"
            placeholder="Full Name:"
            className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px] tracking-wider input"
          />
          <input
            type="email"
            placeholder="abc@gmail.com"
            className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px]  input"
          />
          <input
            type="tel"
            placeholder="Mobile Number:"
            className=" h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px]  input"
          />
          <div className="flex flex-row">
            <label
              htmlFor="dob"
              className=" text-[14px] md:text-[20px] font-[sans-serif] flex items-center px-[30px] w-[300px]"
            >
              Date Of Birth:{" "}
            </label>
            <input
              type="date"
              id="dob"
              className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px]  input"
            />
          </div>

          <input
            type="text"
            placeholder="Full Address:"
            className="w-full h-[100px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px] input"
          />
          <input
            type="text"
            placeholder="City:"
            className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px] tracking-wider input"
          />
          <input
            type="text"
            placeholder="Post/Zip code:"
            className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px] tracking-wider input"
          />
          <select className="flex  w-full h-[50px] pl-[30px] pr-[5px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px] text-[#7e7c7b]">
            <option value="">Select State</option>
            <option value="Andhrapradesh">Andhra Pradesh</option>
            <option value="Arunachapradesh">Arunachal pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chattisgarh">Chatttisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="HimachalPradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="MadhyaPradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Tamilnadu">Tamilnadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="UttarPradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Westbengal">West Bengal</option>
          </select>

          <div className="flex  flex-row items-center px-[30px] gap-[20px] md:gap-[100px]">
            <span className="text-[20px]">Gender:</span>
            <div className="flex gap-1 items-center justify-center ">
              <input type="radio" id="gender" className="h-[13px] w-[13px]" />
              <label htmlFor="gender" className="text-[18px]">
                Female
              </label>
            </div>
          </div>
          <input
            type="text"
            placeholder="About You:"
            className="w-full h-[100px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] text-[18px]  address"
          />
          <div className="flex items-center">
            <label
              htmlFor="img"
              className="w-full flex items-center h-[35px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] text-[12px] font-[sans-serif]  input"
            >
              Choose Files To Upload
            </label>
            <input type="file" className="hidden" id="img" />
            <div className="bg-black hidden w-[150px] lg:flex justify-center items-center h-[35px] rounded-[0.2rem] cursor-pointer">
              <label htmlFor="img" className="text-white cursor-pointer">
                Choose Files
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center bg-black w-full h-[40px] rounded-[0.3rem]">
            <button className="text-white font-bold text-[18px]">
              Register Now
            </button>
          </div>
        </div>
        <div>
          <img src={image} alt="" className="w-[350px] h-[450px]" />
        </div>
      </div>
    </div>
  );
}

export default Contest;
