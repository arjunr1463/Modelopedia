import React from 'react'
import Banner from "../../Components/Banner/CastingCalls"
import Casting from "../../Components/SingleCastingCalls/SingleCastingCalls"
import Scroll from "../../Components/ScrollToTop";

function SingleCastingCall() {
  return (
    <div>
      <Scroll/>
      <Banner/>
      <Casting/>
    </div>
  )
}

export default SingleCastingCall
