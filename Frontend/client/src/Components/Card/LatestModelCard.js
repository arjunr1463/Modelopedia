import React from "react";
import { Link } from "react-router-dom";
import profile from "../../Assets/Profile/profile.png"

function LatestModelCard({ image, name, place, id }) {
  return (
    <>
      <div className="bg-white flex flex-col items-center gap-[10px] md:gap-[2px] shadow-md lg:shadow-sm">
        <div>
          {image?(<Link to={`/ViewModel/${id}`}>
            <img
              src={`data:image/*;base64,${btoa(
                new Uint8Array(image.data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt=""
              className="lg:max-h-[450px] lg:w-[100vw] object-cover"
            />
          </Link>):<img src={profile} alt="" className=""/>}
          
        </div>

        <div className="text-center tracking-wide">
          <h className="text-[18px] md:text-[20px]  font-medium uppercase">
            {name}
          </h>
        </div>
        <div className=" text-center">
          <span className="text-[15px] sm:text-[18px] font-fair capitalize">
            {place}
          </span>
        </div>
      </div>
    </>
  );
}

export default LatestModelCard;
