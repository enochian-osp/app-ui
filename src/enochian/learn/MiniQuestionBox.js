import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import '../enochianFont.js';

const s = {
  letterDiv: {
    padding: '20px',
    textAlign: 'center',
    marginBottom: '10px',
  },
  letterSpan: {
    fontSize: '200%',
    padding: '10px 20px 10px 20px',
    border: '1px solid #aaa',
    background: '#f0f0f0',
    borderRadius: '5px',
  },
  questionBox: {
    padding: '5px',
  },
}

function AnswerUnstyled({ classes, answer }) {
  return (
    <Button
        variant="contained"
        className={classes.button}>
      {answer}
    </Button>
  )
};

const styles = theme => ({
  button: {
    display: 'inline-block',
    width: '50%',
    margin: '5px 0 5px 0', // theme.spacing.unit,
    fontSize: '50%',
  },
  input: {
    display: 'none',
  },
});

const Answer = withStyles(styles)(AnswerUnstyled);

const MiniQuestionBox = ({ question, submitAnswer, submittedAnswer }) => (
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

export default MiniQuestionBox;
