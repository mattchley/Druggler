import React, { useEffect } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../utils/Auth';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from 'react-router-dom';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const HomePage = (props) => {

  useEffect(() => {
    props.toggleAuthenticateStatus();
  }, [])

  const useStyles = makeStyles({
    signUp: {
      background: 'linear-gradient(180deg, seagreen 100%, black 80%)',
      borderRadius: 60,
      border: 0,
      color: 'white',
      fontWeight: '800',
      height: 48,
      padding: '30px 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    login: {
      background: 'linear-gradient(180deg, #23395d 100%, black 80%)',
      borderRadius: 60,
      border: 0,
      color: 'white',
      fontWeight: '800',
      height: 48,
      padding: '30px 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
        <div style={{ paddingBottom: '100px' }}></div>
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
              style={{ width: "50%" }}
            >
              Login
                </Button>

            <Button
              size="large"
              classes={{ root: classes.signUp, label: classes.label }}
              variant="contained"
              component={RouterLink} to="/signup"
              style={{ width: "50%" }}
            >
              Sign up
                </Button>
          </div>
        )}
    </div>
  )

};

export default HomePage;