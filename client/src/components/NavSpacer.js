import React from 'react';
import '../css/nav.css';
import { motion } from 'framer-motion';


function NavSpacer() {
    return (
        <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ ease: "easeOut", duration: 1 }}
        >
            <div className="spacer"></div>
        </motion.div>
    )
}

export default NavSpacer;