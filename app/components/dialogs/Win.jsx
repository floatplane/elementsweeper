const React = require("react");

const {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} = require("@material-ui/core");

const Win = function(props) {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Great job!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Congratulations! You won. Play again?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          New game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

module.exports = Win;
