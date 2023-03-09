import React from "react";
import Banner from "../../Components/Banner/PrivacyPolicy";
import Main from "../../Components/PrivacyPolicy/PrivacyPolicy";
import Scroll from "../../Components/ScrollToTop";

function PrivacyPolicy() {
  return (
    <div>
      <Scroll/>
      <Banner />
      <Main />
    </div>
  );
}

export default PrivacyPolicy;
