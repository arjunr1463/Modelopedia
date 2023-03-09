import React from "react";
import Banner from "../../Components/Banner/ModelLogin";
import ModelSignIn from "../../Components/ModelSignIn/ModelSignIn";
import Scroll from "../../Components/ScrollToTop";

function Modellogin() {
  return (
    <div>
      <Scroll />
      <Banner />
      <ModelSignIn />
    </div>
  );
}

export default Modellogin;
