import React from 'react'
import ModelProfile from '../../Components/ModelProfile/ModelProfile'
import Scroll from "../../Components/ScrollToTop";
import Banner from "../../Components/Banner/ModelProfile"

function ViewModel() {
  return (
    <div>
        <Scroll/>
        <Banner/>
        <ModelProfile/>
      
    </div>
  )
}

export default ViewModel
