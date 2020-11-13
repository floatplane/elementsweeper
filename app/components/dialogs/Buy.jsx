import React, { Fragment, useState, useEffect } from "react";

import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { CardElementWrapper } from "./CardElementWrapper";

export default function Buy(props) {
  const { onClose, open, onPaymentSucceeded } = props;
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentRequest, setPaymentRequest] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // console.log("fetching PI");
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
        // console.log("setting client secret", data.clientSecret);
        setClientSecret(data.clientSecret);
      });
  }, []);

  useEffect(() => {
    if (stripe && clientSecret !== "") {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Demo total",
          amount: 599,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        // console.log("canMakePayment", result, clientSecret);
        if (result) {
          setPaymentRequest(pr);
          pr.on("paymentmethod", async (ev) => {
            // console.log("paymentmethod", ev, clientSecret);
            const success = await completePayment(ev.paymentMethod.id);
            ev.complete(success ? "success" : "fail");
          });
        } else {
          setPaymentRequest(false);
        }
      });
    }
  }, [stripe, clientSecret]);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const completePayment = async (paymentMethod) => {
    // console.log("inside completePayment", this, paymentMethod, clientSecret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod,
    });
    // console.log("confirmCardPayment", payload);
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      onPaymentSucceeded();
    }
    return payload.error == null;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    await completePayment({
      card: elements.getElement(CardElement),
    });
  };

  const ready = paymentRequest !== null;

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"xs"}>
      <DialogTitle>Buy more lives</DialogTitle>
      <form id="payment-form" onSubmit={handleSubmit}>
        <DialogContent>
          <Typography paragraph variant="subtitle2" color="secondary">
            Special offer!
          </Typography>
          <Typography paragraph>Buy one more life for a mere $5.99.</Typography>
          {paymentRequest ? (
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          ) : paymentRequest === false ? (
            <Fragment>
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
            </Fragment>
          ) : (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              mb={2}
            >
              {" "}
              <CircularProgress size={24} />
            </Grid>
          )}
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          {succeeded && <p className="result-message">Payment succeeded!</p>}
        </DialogContent>
        <DialogActions>
          {succeeded ? (
            <Button onClick={onClose} variant="contained">
              Done
            </Button>
          ) : (
            <Fragment>
              <Button onClick={onClose} variant="contained">
                Cancel
              </Button>
              {!paymentRequest && (
                <Button
                  disabled={processing || disabled || succeeded}
                  id="submit"
                  type="submit"
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  Pay
                </Button>
              )}
            </Fragment>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
