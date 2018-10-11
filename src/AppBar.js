import React from 'react';

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    //flexGrow: 1,
    height: 62,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginTop: -3,
    marginLeft: -12,
    _marginRight: 20,
  },
  navPos: {
    color: 'white'
  },
};

const TitleLink = ({ navPos, classes }) => navPos.map(part =>
  <span key={part.to}><Link className={classes.navPos} to={part.to}>{part.text}</Link> &gt; </span>
);

const MyAppBar = ({ classes, title, navPos }) => (
  <div className={classes.root}>
    <AppBar>
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Home" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          {navPos ? <TitleLink classes={classes} navPos={navPos} /> : null}
          {title}
        </Typography>
        {/*
        <Button color="inherit">Login</Button>
        */}
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(MyAppBar);
