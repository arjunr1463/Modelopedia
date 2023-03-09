import React from "react";
import "../TestimonyMain/Testimony.css"
function TestimonyMainCard({ image, name, companyname, discription }) {
  return (
    <div className="lg:w-[300px] gap-[30px] pb-[50px] flex flex-col items-center border-[1px] shadow-md hover:shadow-2xl duration-300">
      <div className="w-full py-[5px] px-[5px]">
        <img
          src={`data:image/*;base64,${btoa(
            new Uint8Array(image.data.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )}`}
          alt=""
          className="bg-[red] object-cover"
        />
      </div>
      <div className="flex flex-col items-center">
        <h className="text-[22px]">{name}</h>
        <span className="text-[16px] font-[sans-serif]">{companyname}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html:discription }} className="text-center px-[10px] text-[#99919c]"/>
    </div>
  );
}

export default TestimonyMainCard;
