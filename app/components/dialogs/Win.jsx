const React = require('react');

const Button = require('@material-ui/core/Button');
const Dialog = require('@material-ui/core/Dialog');
const DialogActions = require('@material-ui/core/DialogActions');
const DialogContent = require('@material-ui/core/DialogContent');
const DialogContentText = require('@material-ui/core/DialogContentText');
const DialogTitle = require('@material-ui/core/DialogTitle');

function Win(props) {
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
}

module.exports = Win;
