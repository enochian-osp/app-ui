import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter, Route } from 'react-router-dom'

import Enochian from './enochian/Enochian';
import EnochianOration from './enochian/Oration';
import EnochianKeys from './enochian/keys/KeysController';
import EnochianAbc from './enochian/Abc';

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
            <Route exact path='/keys' component={EnochianKeys} />
            <Route exact path='/oration' component={EnochianOration} />
          </MuiThemeProvider>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
