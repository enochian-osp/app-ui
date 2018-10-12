import React from 'react';

import AppBar from '../../AppBar';

import '../enochianFont.js';
import dictionary from '../enochian-data/dictionary.json';

class DictionaryController extends React.Component {

  constructor() {
    super();

    this.state = {
      text: ''
    }
  }

  onType = event => {
    const text = event.target.value.toUpperCase();
    const match = dictionary[text];
    this.setState({ text, match })
  }

  render() {
    return (
      <div>
        <AppBar title="Dictionary" />
        <div>
          <input type="text" value={this.state.text} onChange={this.onType} />
          <input type="text" className="enochianFont" value={this.state.text} />
          {this.state.match && JSON.stringify(this.state.match)}
        </div>
      </div>

    );
  }

}

export default DictionaryController;
