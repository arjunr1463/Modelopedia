import React from "react";
import Main from "../../Components/OurTeam/OurTeam";
import View from "../../Components/OurTeam/ViewOurTeam";
import { motion } from "framer-motion";

function OurTeam() {
  return (
    <motion.div
      className=""
      initial={{ y: -20, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Main />
      <View />
    </motion.div>
  );
}

export default OurTeam;
