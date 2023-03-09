import React from 'react'
import Banner from "../../Components/Banner/Blog"
import Content from "../../Components/SingleBlog/SingleBlog"
import Scroll from "../../Components/ScrollToTop";

function SingleBlog() {
  return (
    <div>
      <Scroll/>
      <Banner/>
      <Content/>
    </div>
  )
}

export default SingleBlog
