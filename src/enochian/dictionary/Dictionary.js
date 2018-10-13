import React from 'react';

import AppBar from '../../AppBar';
import TextField from '@material-ui/core/TextField';

import '../enochianFont.js';
import dictionary from '../enochian-data/dictionary.json';
const enochianWords = Object.keys(dictionary);

const s = {
  searchDiv: {
    background: 'white',
    marginTop: '50px',
    padding: '10px 20px',
    position: 'fixed',
    top: 0,
    width: '100%',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
  },
  searchTextField: {
    width: '45%',
  },
  searchTextFieldRight: {
    width: '45%',
    float: 'right',
  },
  resultsDiv: {
    padding: '70px 0 10px 0',
    background: '#aaa',
    minHeight: '500px',
  },
  resultsRow: {
    padding: '0px 20px',
  },
  resultsRowSelected: {
    padding: '0px 20px',
    background: '#ccc',
  },
  dictionary: {
    padding: 22,
    background: '#111', //'rgba(0,0,0,0.9)',
    color: 'white',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  floatRight: {
    float: 'right',
  },
};

const WordBar = ({ word }) => {
  const dict = dictionary[word];
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td style={{width:'33%', textAlign:'left'}}>{word}</td>
          <td style={{width:'33%',textAlign:'center'}}>{dict.pronounciations.length&&dict.pronounciations[0].pronounciation}</td>
          <td style={{width:'33%',textAlign:'right'}} className="enochianFont">{word}</td>
        </tr>
        {
          dict.meanings.map((meaning, i) => (
            <tr key={i}>
              <td colSpan="3" style={{textAlign:'center'}}>{meaning.meaning} ({meaning.source}) {meaning.source2} {meaning.note}</td>
            </tr>
          ))
        }
        <tr>
          <td></td>
          <td></td>
          <td style={{textAlign:'right'}}>{dict.gematria?'Gematria '+dict.gematria.join(', '):''}</td>
        </tr>
      </tbody>
    </table>
  );
};

const ResultRow = ({ word, onClick, selected }) => (
  <div onClick={onClick} style={selected?s.resultsRowSelected:s.resultsRow}>
    <span>{word}</span>
    <span className="enochianFont" style={s.floatRight}>{word}</span>
  </div>
)

class DictionaryController extends React.Component {

  constructor() {
    super();

    this.state = {
      text: '',
      matches: enochianWords,
    }

  }

  onClickWord = event => {
    this.setState({ text: event.target.innerText })
  }

  onType = event => {
    const text = event.target.value.toUpperCase();
    const match = dictionary[text];
    const matches = text ? enochianWords.filter(x => x.match(text)) : enochianWords;

    this.setState({ text, match, matches })
  }

  render() {
    return (
      <div>
        <AppBar title="Dictionary" />
        <div style={s.searchDiv}>
          <TextField
            placeholder="ABC"
            margin="normal"
            value={this.state.text}
            onChange={this.onType}
            type="search"
            style={s.searchTextField}
          />
          <TextField
            className="enochianFontDesc"
            placeholder="ABC"
            margin="normal"
            value={this.state.text}
            onChange={this.onType}
            style={s.searchTextFieldRight}
            type="search"
          />
        </div>
        <div style={s.resultsDiv}>
          {
            this.state.matches && this.state.matches.map(word => (
              <ResultRow
                key={word}
                word={word}
                selected={word === this.state.text}
                onClick={this.onClickWord}
              />
            ))
          }
        </div>
        {
          dictionary[this.state.text] ?
            <div style={s.dictionary}>
              <WordBar word={this.state.text} />
            </div>
          : null
        }
      </div>

    );
  }

}

export default DictionaryController;
