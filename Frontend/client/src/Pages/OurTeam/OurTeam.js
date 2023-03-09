import React from 'react'
import Banner from "../../Components/Banner/OurTeam"
import HomeTeam from "../../Components/HomeTeam/HomeTeam"
import Scroll from "../../Components/ScrollToTop";
function OurTeam() {
  return (
    <div>
      <Scroll/>
      <Banner/>
      <HomeTeam  select="" type="Team Leaders"/>
      <HomeTeam select="OUR MENTORS" type="Team Mentors"/>
      <HomeTeam select="The Times of India initiative ‘Go Glowrious 2021’ Panel Members" type="Go Glowrius 2021 Panel Member"/>
    </div>
  )
}

export default OurTeam
