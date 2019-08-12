import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import AppBar from '../../AppBar';
import Practice from './Practice';
import MiniQuestionBox from './MiniQuestionBox';

const tileData = [
  {
    title: 'Letter Sounds',
    to: '/abc',
    question: {
      question: "A",
      answer: "A",
      answers: ['A', 'B', 'C', 'D']
    },
  },
  {
    title: 'Letter Names',
    to: '/names',
    question: {
      question: "A",
      answer: "Un",
      answers: ['Un', 'Peh', 'Veh', 'Gal']
    },
  },
];

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const sets = {

};

const Learn = ({ classes, match }) => {
  const set = match.params.set;

  if (set) {
    return <Practice />;
  }

  return (
    <div>
      <AppBar title="Learn" />

      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {tileData.map(tile => (
            <GridListTile key={tile.to} component={Link} to={match.url + tile.to}>
              <MiniQuestionBox question={tile.question} />
              <GridListTileBar
                title={tile.title}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

export default withStyles(styles)(Learn);
