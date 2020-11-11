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

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Great job!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Congratulations! You won. Play again?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Let's do it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

module.exports = Win;
