import React from 'react'
import Main from "../../Components/CastingCall/CastingCall"
import View from "../../Components/CastingCall/ViewCastingCall"
import {motion} from "framer-motion"

function CastingCall() {
  return (
    <motion.div initial={{y:-20,opacity:0.1}} animate={{y:0,opacity:1}} transition={{duration:0.2}} >
      <Main/>
      <View/>
    </motion.div>
  )
}

export default CastingCall
