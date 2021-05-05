import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { IMovie } from '../../infrastructure/src/interfaces/movie';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import Amplify, {Auth, Hub} from 'aws-amplify';
import Main from './Main'
import Profile from './Profile';

function App() {
  /*  const [user, updateUser] = React.useState(null);
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => updateUser(user))
      .catch(() => console.log('No signed in user.'));
      Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signIn':
          return updateUser(data.payload.data);
        case 'signOut':
          return updateUser(null);
      }
    });
  }, []);
  if (user) {  */
    return <Main />
  /*  }
  return (
    <AmplifyAuthenticator>
      <AmplifySignUp slot="sign-up"
        formFields={[
          { type: "username" },
          { type: "password" },
          { type: "email" }
        ]}
      />
    </AmplifyAuthenticator>
  ) 
   */
}

const topLevelContainerStyle = {
  height: 170,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%'
}

const mainViewContainerStyle = {
  padding: '180px 30px 80px',
}

const headerStyle = {
  padding: 30,
  color: 'white'
}

const titleStyle = {
  fontSize: 34,
  margin: 0,
  fontWeight: 600
}

const navStyle = {
  padding: '20px 30px',
  backgroundColor: '#ddd'
}

const homeLinkStyle = {
  textDecoration: 'none',
  color: 'white',
}

const linkStyle = {
  margin: 0,
  textDecoration: 'none',
  fontSize: 20,
  marginRight: 20
}

export default App;