import React from 'react';
import Button from '@material-ui/core/Button';
// import '../css/nav';
import NavSpacer from './components/NavSpacer';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ ease: "easeOut", duration: 1.5 }}
            >
                <div className="appBar">
                    <div className="navTitle">Mark Bernstein</div>
                    <div>
                        <Button
                            className="navButton"
                            variant="outlined"
                        >
                            <Link className="link" to="/resume"> Resume </Link>
                        </Button>
                    </div>
                    <div>
                        <Button
                            className="navButton"
                            variant="outlined"
                        >
                            <Link className="link" to="/projects"> Projects </Link>
                        </Button>
                    </div>
                    <div>
                        <Button 
                            className="navButton"   
                            variant="outlined"
                        > 
                            <Link className="link" to="/"> About </Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
            <NavSpacer />
        </div>

    )
}

export default NavBar;