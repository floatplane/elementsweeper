import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import TextField from "@material-ui/core/TextField";
import StripeInput from "./StripeInput";

// Source: https://github.com/mui-org/material-ui/issues/16037
export function StripeInputField(props) {
  const {
    InputLabelProps,
    labelErrorMessage,
    stripeElement,
    InputProps = {},
    inputProps,
    ...other
  } = props;

  return (
    <TextField
      fullWidth
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        ...InputProps,
        inputProps: {
          ...inputProps,
          ...InputProps.inputProps,
          component: stripeElement,
        },
        inputComponent: StripeInput,
      }}
      {...other}
    />
  );
}

export function CardElementWrapper(props) {
  return <StripeInputField stripeElement={CardElement} {...props} />;
}
