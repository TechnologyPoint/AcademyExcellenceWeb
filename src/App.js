import logo from './logo.svg';
import './App.css';
import {Welcome} from './Welcome.js';
import { withAuthenticator } from '@aws-amplify/ui-react';
import React, {Component,useEffect,useState } from 'react';
import {API,Amplify} from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <Welcome/>
    </div>

  );
}

export default withAuthenticator(App);
