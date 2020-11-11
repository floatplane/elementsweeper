const React = require("react");

const {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton
} = require("@material-ui/core");

const { makeStyles } = require("@material-ui/core/styles");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  livesRemaining: {
    marginRight: theme.spacing(2)
  }
}));

function TitleBar(props) {
  const classes = useStyles();
  const { livesRemaining, onBuy } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Elementsweeper
          </Typography>
          <Typography variant="title" className={classes.livesRemaining}>
            Lives: {livesRemaining}
          </Typography>
          <Button color="secondary" variant="contained" click={onBuy}>
            Buy more lives
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

module.exports = TitleBar;
