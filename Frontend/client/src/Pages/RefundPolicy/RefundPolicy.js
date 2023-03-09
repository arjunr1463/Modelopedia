import React from "react";
import Banner from "../../Components/Banner/RefundPolicy";
import Main from "../../Components/RefundPolicy/RefundPolicy"
import Scroll from "../../Components/ScrollToTop";

function RefundPolicy() {
  return (
    <div>
      <Scroll />
      <Banner />
      <Main/>
    </div>
  );
}

export default RefundPolicy;
