import React from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  Input,
} from "@material-ui/core";

import { CardElementWrapper } from "./CardElementWrapper";

export default function Buy(props) {
  const { onClose, open, onPaymentSucceeded } = props;
  const [succeeded, setSucceeded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [processing, setProcessing] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [clientSecret, setClientSecret] = React.useState("");
  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [{ lives: 3 }] }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      onPaymentSucceeded();
    }
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"xs"}>
      <DialogTitle>Buy more lives</DialogTitle>
      <form id="payment-form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            id="email"
            label="Email address"
            fullWidth
            autoFocus
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <CardElementWrapper
            label="Payment details"
            onChange={handleChange}
            margin="normal"
          />
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          {succeeded && (
            <p className="result-message">
              Payment succeeded, see the result in your
              <a href={`https://dashboard.stripe.com/test/payments`}>
                {" "}
                Stripe dashboard.
              </a>{" "}
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained">
            Cancel
          </Button>
          <Button
            disabled={processing || disabled || succeeded}
            id="submit"
            type="submit"
            color="primary"
            variant="contained"
            autoFocus
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay"
              )}
            </span>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
