const React = require('react');

const { AppBar, Button, Toolbar, Typography, IconButton } = require("@material-ui/core");

const { makeStyles } = require('@material-ui/core/styles');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function TitleBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" className={classes.title}>
            Elements demo
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

module.exports = TitleBar;