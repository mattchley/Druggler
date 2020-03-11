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

const HomePage = (props) => {

  useEffect(() => {
    props.toggleAuthenticateStatus();
  }, [])


  return (
    <Card className="container">
      <CardTitle
        title="Welcome to Druggler!"
        subtitle="Please Login to use our application. Don't have an account? Sign up!"
      />
      {Auth.isUserAuthenticated() ? (
        <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</CardText>
      ) : (
          <div>
            <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
            <Card className="container">
              <CardActions>
                <Button 
                  size="large" 
                  color="primary"
                  variant="contained"
                  component={RouterLink} to="/login"
                  style={{ width: "50%"}}
                >
                  Login
                </Button>

                <Button 
                  size="large" 
                  color="secondary"
                  variant="contained"
                  component={RouterLink} to="/signup"
                  style={{ width: "50%"}}
                >
                  Sign up
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
    </Card>
  )

};

export default HomePage;