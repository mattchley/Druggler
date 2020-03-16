import React, { useEffect } from 'react';
import { Card, CardText } from 'material-ui/Card';
import Auth from '../utils/Auth';
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DrugglerImage from '../images/drugglerBackgroundImage.jpeg';

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
      padding: '30px 30px',
      boxShadow: '3px 30px 5px 2px rgba(255, 105, 135, .8)',
    },
    login: {
      background: 'linear-gradient(180deg, #23395d 100%, black 10%)',
      borderRadius: 60,
      border: 0,
      color: 'white',
      fontWeight: '800',
      height: 48,
      padding: '30px 30px',
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
    <div className="container">
      <div>
        <h1 style={{ color: '#23395d', paddingBottom: '50px' }}>
          Welcome to Druggler!
        </h1>
        <h2 style={{ color: '#23395d' }}>
          Having trouble juggling all of your drugs?  Try Druggler!
        </h2>
        <img
          src={DrugglerImage}
          height="30%"
          width="50%"
          style={{ boxShadow: '3px 20px 10px 2px rgba(255, 105, 135, .8)' }}
        ></img>
        <hr></hr>
        <h3 style={{ color: '#23395d' }}>
          Don't have an account? Sign up!
        </h3>
      </div>
      {Auth.isUserAuthenticated() ? (
        <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</CardText>
      ) : (
          <div>
            <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
            <Card className="container">

            </Card>
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
          </div>
        )}
    </div>
  )

};

export default HomePage;