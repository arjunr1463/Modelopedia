import React from "react";
import AddImage from "./AddImage";


function DiamondFeature() {
  return (
    <div className=" ">
      <div className=" h-[50px] flex items-center px-[10px] font-semibold text-[20px] border-t-[1px] border-r-[1px] border-l-[1px]">
        <h>Diamond Feature</h>
      </div>
      <div>
        <AddImage />
      </div>
    </div>
  );
}

export default DiamondFeature;
