import React from "react";
import { useLocation } from "react-router-dom";

function SingleModel() {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="bg-white rounded-md shadow-md flex flex-col gap-5 p-6 overflow-x-auto">
      <h2 className="font-bold">Special Story</h2>
      <div className="flex flex-col lg:flex-row gap-[50px]">
        <div className="flex flex-col gap-[20px]">
          <div><span className="text-[25px] tracking-wide font-fair">{location.state.name}</span></div>
          <div>
            <span
            className="text-[18px] font-fair"
              dangerouslySetInnerHTML={{ __html: location.state.description }}
            />
          </div>
        </div>

        <div>
          <img
            src={`data:image/*;base64,${btoa(
              new Uint8Array(location.state.image).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )}`}
            alt=""
            className="h-[600px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SingleModel;
