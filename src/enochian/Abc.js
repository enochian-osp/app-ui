import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AppBar from '../AppBar';

import './enochianFont.js';
import letters from './enochian-data/letters.json';

const navPos = [
  { text: 'Enochian', to: '/enochian' }
];

const s = {
  page: {
    textAlign: 'center',
    marginLeft: '20px',
    marginRight: '20px'
  },
  letter: {
    fontSize: '400%',
    textAlign: 'center',
    padding: '20px',
  },
  questionBox: {
    padding: '20px',
  },
  answerOption: {
    border: '1px solid #aaa',
    marginBottom: '5px',
    paddingLeft: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
  }

}

const sets = {};
const answerSets = ['title', 'english', 'pronounciation'];
const lettersArray = Object.values(letters);

answerSets.forEach(setName => {
  sets[setName] = {
    name: setName,
    answerPairs: lettersArray.map(x => ({ q: x.enochian, a: x[setName] })),
    allAnswers: lettersArray.map(x => x[setName]),
  };
});

// Durstenfeld shuffle algorithm, https://stackoverflow.com/a/12646864/1839099
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}

function prepareQuestion(setName) {
  const set = sets[setName];
  shuffleArray(set.answerPairs);
  const question = set.answerPairs[0];
  shuffleArray(set.allAnswers);
  const answers = set.allAnswers.slice(0,3).concat(question.a);
  shuffleArray(answers);

  return {
    question: question.q,
    answer: question.a,
    answers: answers
  };
}

console.log(sets);

class AbcController extends Component {

    constructor() {
      super();
      this.state = {
        question: prepareQuestion('english')
      };
    }

    nextQuestion() {
      this.setState({ question: prepareQuestion('english') });
    }

    render() {
      return (
        <Abc question={this.state.question} />
      );
    }
}

const styles = theme => ({
  button: {
    display: 'block',
    width: '100%',
    margin: '10px 5px 10px 5px', // theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const AbcUnstyled = ({ question, classes }) => (
  <div>
    <AppBar navPos={null/*navPos*/} title="Practice ABC" />

    <div style={s.questionBox}>
      <div style={s.letter} className="enochianFont">{question.question}</div>
      <div style={s.answers}>
          {
            question.answers.map((answer, i) => (
                <Button key={i} variant="contained" className={classes.button}>
                  {answer}
                </Button>
            ))
          }
      </div>
    </div>

  </div>
);

const Abc = withStyles(styles)(AbcUnstyled);

export default AbcController;
