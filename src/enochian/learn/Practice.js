import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AppBar from '../../AppBar';

import '../enochianFont.js';
import letters from '../enochian-data/letters.json';

const navPos = [
  { text: 'Practice', to: '/learn' }
];

const s = {
  page: {
    textAlign: 'center',
    marginLeft: '20px',
    marginRight: '20px'
  },
  score: {
    textAlign: 'right',
    marginRight: '20px',
  },
  letterDiv: {
    padding: '20px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  letterSpan: {
    fontSize: '500%',
    padding: '25px 50px 25px 50px',
    border: '1px solid #aaa',
    background: '#f0f0f0',
    borderRadius: '5px',
  },
  questionBox: {
    padding: '20px',
  },
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
console.log(sets.english)

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
  const answers = set.allAnswers.slice(0,4);
  if (!answers.includes(question.a))
    answers.pop() && answers.push(question.a);
  shuffleArray(answers);

  return {
    question: question.q,
    answer: question.a,
    answers: answers
  };
}

class PracticeController extends Component {

    constructor() {
      super();
      this.state = {
        total: 0,
        correct: 0,
        question: prepareQuestion('english')
      };
    }

    submitAnswer = submittedAnswer => {
      const correctAnswer = this.state.question.answer;
      const oldAnswer = this.state.submittedAnswer;
      this.setState({ submittedAnswer });

      if (submittedAnswer === correctAnswer) {
        this.setState({
          total: this.state.total + 1,
          correct: this.state.correct + (oldAnswer ? 0 : 1),
        });
        window.setTimeout(() => {
          this.nextQuestion();
        }, 200);
      } else {
        console.log('wrong');
      }
    };

    nextQuestion() {
      const set = 'english';
      let question = prepareQuestion(set), current = this.state.question;
      while (question.question === current.question)
        question = prepareQuestion(set);

      this.setState({
        question,
        submittedAnswer: null,
      });
    }

    render() {
      const { question, correct, total, submittedAnswer } = this.state;

      return (
        <div>
          <AppBar navPos={navPos} title="ABC" />

          <div style={s.score}>{total ? correct + ' / ' + total : 'Go!'}</div>

          <QuestionBox question={question}
            submitAnswer={this.submitAnswer}
            submittedAnswer={submittedAnswer} />

        </div>
      );
    }
}

const QuestionBox = ({ question, submitAnswer, submittedAnswer }) => (
  <div style={s.questionBox}>
    <div style={s.letterDiv}>
      <span style={s.letterSpan} className="enochianFont">{question.question}</span>
    </div>
    <div style={s.answers}>
        {
          question.answers.map((answer, i) => (
            <Answer key={i} answer={answer}
              correctAnswer={question.answer}
              submittedAnswer={submittedAnswer}
              submitAnswer={submitAnswer}
            />
          ))
        }
    </div>
  </div>
);

class AnswerUnstyled extends Component {

  onClick = (event) => {
    this.props.submitAnswer(this.props.answer);
  }

  render() {
    const { classes, answer, correctAnswer, submittedAnswer } = this.props;
    let style;
    if (submittedAnswer) {
      if (answer === correctAnswer)
        style = { background: 'green' };
      else if (answer === submittedAnswer)
        style = { background: 'red' };
    }

    return (
      <Button
          variant="contained"
          className={classes.button}
          style={style}
          onClick={this.onClick}>
        {answer}
      </Button>
    )
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

const Answer = withStyles(styles)(AnswerUnstyled);

export default PracticeController;
export { QuestionBox };
