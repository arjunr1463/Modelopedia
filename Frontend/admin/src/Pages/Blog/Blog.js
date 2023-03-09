import React from 'react'
import Main from "../../Components/Blog/Blog"
import View from "../../Components/Blog/ViewBlog"
import {motion} from "framer-motion"

function Blog() {
  return (
    <motion.div className='' initial={{ y: -20, opacity: 0.1 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.2 }}>
      <Main/>
      <View/>
    </motion.div>
  )
}

export default Blog
