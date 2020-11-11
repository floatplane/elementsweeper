const React = require("react");

const {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} = require("@material-ui/core");

const Lose = function(props) {
  const { onClose, onUndo, canUndo, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Oh no!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You lost 😵. Try again?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Buy more lives
        </Button>
        <Button onClick={onUndo} enabled={canUndo}>
          Use 1 life
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          Start new game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

module.exports = Lose;
