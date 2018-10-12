import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter, Route } from 'react-router-dom'

import Enochian from './enochian/Enochian';
import EnochianAbc from './enochian/Abc';
import EnochianDictionary from './enochian/dictionary/Dictionary';
import EnochianOration from './enochian/Oration';
import EnochianKeys from './enochian/keys/KeysController';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />

        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Route exact path='/' component={Enochian} />
            <Route exact path='/abc' component={EnochianAbc} />
            <Route exact path='/dictionary' component={EnochianDictionary} />
            <Route exact path='/oration' component={EnochianOration} />
            <Route exact path='/keys' component={EnochianKeys} />
          </MuiThemeProvider>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
