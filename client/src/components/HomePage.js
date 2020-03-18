import React, { useEffect } from 'react';
import { Card, CardText } from 'material-ui/Card';
import Auth from '../utils/Auth';
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

const HomePage = (props) => {

  useEffect(() => {
    props.toggleAuthenticateStatus();
  }, [])

  const useStyles = makeStyles({
    signUp: {
      background: 'linear-gradient(180deg, seagreen 100%, black 10%)',
      borderRadius: 60,
      border: 0,
      color: 'white',
      fontWeight: '800',
      height: 48,
      padding: '25px 25px',
      boxShadow: '3px 30px 5px 2px rgba(255, 105, 135, .8)',
    },
    login: {
      background: 'linear-gradient(180deg, #23395d 100%, black 10%)',
      borderRadius: 60,
      border: 0,
      color: 'white',
      fontWeight: '800',
      height: 48,
      padding: '25px 25px',
      boxShadow: '3px 30px 5px 2px rgba(255, 105, 135, .8)',
    },
    label: {
      textTransform: 'capitalize',
    },
    homePageButtonDiv: {
      backgroundColor: 'black'
    }
  });

  const classes = useStyles();

  return (
    <div>

      {Auth.isUserAuthenticated() ? (

        <div className="container">
          <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</CardText>
        </div>

      ) : (
          <div className="container">
            <div>
              <motion.div
                animate={{
                  scale: [1, 1.25, 1.5, 1.25, 1],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.5, 0.75, 1],
                  loop: Infinity,
                  repeatDelay: 0,
                }}
              >
                <h1 style={{ color: '#23395d', paddingBottom: '20px' }}>
                  Welcome to Druggler!
                </h1>
              </motion.div>
              <h2 style={{ color: '#23395d' }}>
                Having trouble juggling all of your drugs?  Try Druggler!
              </h2>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/wEudPZ4jTrQ"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>

              <h3 style={{ color: '#23395d' }}>
                Don't have an account? Sign up!
              </h3>

              <motion.div
                animate={{
                  scale: [1, 1.25, 1.5, 1.25, 1],
                  rotate: [-3, 3, -3, 3, -3],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.5, 0.75, 1],
                  loop: Infinity,
                  repeatDelay: 0,
                }}
              >
                <Button
                  classes={{ root: classes.login, label: classes.label }}
                  size="large"
                  variant="contained"
                  component={RouterLink} to="/login"
                  style={{ width: "30%" }}
                >
                  Login
                </Button>

                <Button
                  size="large"
                  classes={{ root: classes.signUp, label: classes.label }}
                  variant="contained"
                  component={RouterLink} to="/signup"
                  style={{ width: "30%" }}
                >
                  Sign up
                </Button>
              </motion.div>
              <div style={{ margin: "50px" }}> </div>
              <CardText style={{ fontSize: '16px', color: 'green', }}>You are not logged in.</CardText>
            </div>
          </div>
        )}
    </div>
  )

};

export default HomePage;