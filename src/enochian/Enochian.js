import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import AppBar from '../AppBar';

import { Route } from 'react-router-dom'

//import aethyrs from './enochian/30aethyrs.jpg';
import orationThumb from './img/oration-thumb.jpg';
import firstKey from './img/enochianFirstKey.png';
import enochianAbc from './img/enochianAbc.png';

const tileData = [
  {
    img: orationThumb,
    title: 'Oration to God',
    to: 'oration'
  },
  {
    img: firstKey,
    title: 'Keys / Calls',
    to: 'keys'
  },
  {
    img: enochianAbc,
    title: 'Practice ABC',
    to: 'abc'
  },
  {
    img: null,
    title: 'Dictionary',
    to: 'dictionary'
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

const Enochian = ({ classes, match }) => (
  <div>
    <AppBar title="Enochian" />

    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} component={Link} to={match.url + tile.to}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  </div>
)

export default withStyles(styles)(Enochian);
