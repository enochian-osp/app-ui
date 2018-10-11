import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter, Route } from 'react-router-dom'

import Enochian from './enochian/Enochian';
import EnochianOration from './enochian/Oration';
import EnochianKeys from './enochian/keys/KeysController';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <React.Fragment>
            <Route exact path='/' component={Enochian} />
            <Route exact path='/keys' component={EnochianKeys} />
            <Route exact path='/oration' component={EnochianOration} />
          </React.Fragment>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
