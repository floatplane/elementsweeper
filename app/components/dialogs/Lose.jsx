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
  const { onClose, onUndo, onBuy, canUndo, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Oh no!</DialogTitle>
      <DialogContent>
        <DialogContentText>You lost 😵. Try again?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onBuy} variant="contained">Buy more lives</Button>
        <Button onClick={onUndo} enabled={canUndo} variant="contained">
          Use 1 life
        </Button>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          New game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

module.exports = Lose;
