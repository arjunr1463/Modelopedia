import React from "react";
import Main from "../../Components/Testimony/Testimony";
import View from "../../Components/Testimony/ViewTestimony";
import { motion } from "framer-motion";

function Testimony() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Main />
      <View />
    </motion.div>
  );
}

export default Testimony;
