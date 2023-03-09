import React from "react";
import bg from "../../Assets/HowItWorks/Howitworks.png";
import {Link} from "react-router-dom"

function HowItWorks() {
  return (
    <div>
      <div className=" flex justify-center items-center pt-[30px] lg:pt-[100px]">
        <h className="text-[30px] lg:text-[50px] font-semibold ">How it Works?</h>
      </div>
      <div className="flex justify-center">
        <Link to="/ModelRegistration"><img src={bg} alt="" className="w-[90vw] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[700px]" /></Link>
      </div>
    </div>
  );
}

export default HowItWorks;
