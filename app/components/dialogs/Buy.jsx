import React, { useState, useEffect } from "react";

import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

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
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentRequest, setPaymentRequest] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    console.log("fetching PI");
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
        console.log("setting client secret", data.clientSecret);
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
          amount: 1400,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        console.log("canMakePayment", result, clientSecret);
        if (result) {
          setPaymentRequest(pr);
          pr.on("paymentmethod", async (ev) => {
            console.log("paymentmethod", ev, clientSecret);
            const success = await completePayment(ev.paymentMethod.id);
            ev.complete(success ? "success" : "fail");
          });
        }
      });
    }
  }, [stripe, clientSecret]);

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

  const completePayment = async (paymentMethod) => {
    console.log("inside completePayment", this, paymentMethod, clientSecret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod,
    });
    console.log("confirmCardPayment", payload);
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

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"xs"}>
      <DialogTitle>Buy more lives</DialogTitle>
      <form id="payment-form" onSubmit={handleSubmit}>
        <DialogContent>
          {paymentRequest ? (
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          ) : (
            <React.Fragment>
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
            </React.Fragment>
          )}
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
