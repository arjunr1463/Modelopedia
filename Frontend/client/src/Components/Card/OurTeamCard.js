import React, { useState } from "react";
import OurTeam from "../HomeTeam/OurTeam";

function OurTeamCard({ image, name, desc,about }) {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      {active && (
        <OurTeam close={handleClick} image={image} name={name} about={about} />
      ) }
        <div
          onClick={handleClick}
          className="w-[80vw] cursor-pointer sm:w-[250px] lg:w-[250px] border-[1px] flex flex-col items-center px-[2px] py-[2px] gap-[5px] shadow-md hover:shadow-xl duration-300 "
        >
          <div>
            <img
              src={`data:image/*;base64,${btoa(
                new Uint8Array(image.data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt=""
              className="w-[90vw] object-cover"
            />
          </div>
          <div className="text-center">
            <h className="text-[18px] font-[sans-serif] font-semibold">
              {name}
            </h>
          </div>
          <div className="break-all  w-full text-center">
            <span className="text-[black] text-[14px] font-semibold">
              {desc}
            </span>
          </div>
        </div>
   
    </>
  );
}

export default OurTeamCard;
