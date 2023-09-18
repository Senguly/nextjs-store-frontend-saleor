/* eslint-disable simple-import-sort/imports */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  // CardNumberElement,
  Elements,
  IdealBankElement,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import React, { useMemo, useState } from "react";
// import { ErrorMessage } from "@components/atoms";
import { IFormError } from "@types";

// import { StripeCreditCardForm } from "../StripeCreditCardForm";
import { StripeIdealForm } from "../StripeIdealForm";
import { IProps } from "./types";
/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  onError,
  isBankSelected,
  setIsBankSelected,
}: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);

  const apiKey =
    config && config.find(({ field }) => field === "api_key")?.value;

  const stripePromise = useMemo(() => {
    if (apiKey) {
      return loadStripe(apiKey);
    }
    const stripeApiKeyErrors = [
      {
        message: "Stripe gateway misconfigured. Api key not provided.",
      },
    ];
    setSubmitErrors(stripeApiKeyErrors);
    onError(stripeApiKeyErrors);
    return null;
  }, [apiKey]);

  const handleFormSubmit = async (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => {
    // const cartNumberElement = elements?.getElement(CardNumberElement);
    const idealElement = elements?.getElement(IdealBankElement);
    if (idealElement) {
      const payload = await stripe?.createPaymentMethod({
        // card: cartNumberElement,
        ideal: idealElement,
        type: "ideal",
      });
      if (payload?.error) {
        const errors = [
          {
            ...payload.error,
            message: payload.error.message || "",
          },
        ];
        setSubmitErrors(errors);
        onError(errors);
      } else if (payload?.paymentMethod) {
        const { id } = payload.paymentMethod;
        // if (card?.brand && card?.last4) {
        //   processPayment(id, {
        //     brand: card?.brand,
        //     expMonth: card?.exp_month || null,
        //     expYear: card?.exp_year || null,
        //     firstDigits: null,
        //     lastDigits: card?.last4,
        //   });
        // }
        // const test = payload.paymentMethod;
        processPayment(id);
      } else {
        const stripePayloadErrors = [
          {
            message:
              "Payment submission error. Stripe gateway returned no payment method in payload.",
          },
        ];
        setSubmitErrors(stripePayloadErrors);
        onError(stripePayloadErrors);
      }
    } else {
      const stripeElementsErrors = [
        {
          message:
            "Stripe gateway improperly rendered. Stripe elements were not provided.",
        },
      ];
      setSubmitErrors(stripeElementsErrors);
      onError(stripeElementsErrors);
    }
  };

  const allErrors = [...errors, ...submitErrors];

  return (
    <div data-test="stripeGateway">
      <Elements stripe={stripePromise}>
        {/* <StripeCreditCardForm
          formId={formId}
          formRef={formRef}
          errors={allErrors}
          onSubmit={handleFormSubmit}
        /> */}
        <StripeIdealForm
          formId={formId}
          formRef={formRef}
          errors={allErrors}
          isBankSelected={isBankSelected}
          setIsBankSelected={setIsBankSelected}
          onSubmit={handleFormSubmit}
        />
      </Elements>
    </div>
  );
};

export { StripePaymentGateway };
