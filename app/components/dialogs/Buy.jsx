const React = require("react");

const {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} = require("@material-ui/core");

const Buy = function(props) {
  const { onClose, open } = props;
  const [succeeded, setSucceeded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [processing, setProcessing] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [clientSecret, setClientSecret] = React.useState('');

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Buy more lives</DialogTitle>
      <DialogContent>
        <DialogContentText>
          more to come
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          Forget it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

module.exports = Buy;
