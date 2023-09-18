import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Formik } from "formik";
import React, { useState } from "react";

import { ErrorMessage, StripeInputElement } from "@components/atoms";
import { IFormError } from "@types";

import * as S from "../StripeCreditCardForm/styles";
import { IProps } from "../StripeCreditCardForm/types";

/**
 * Stripe credit card form.
 */
const StripeIdealForm: React.FC<IProps> = ({
  formRef,
  formId,
  errors = [],
  onSubmit,
  isBankSelected,
  setIsBankSelected,
}: IProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [stripeErrors, setStripeErrors] = useState<IFormError[]>([]);

  const allErrors = [...errors, ...stripeErrors];

  return (
    <Formik
      initialValues={null}
      onSubmit={async (values, { setSubmitting }) => {
        if (stripeErrors.length > 0 || !isBankSelected) {
          setStripeErrors([
            {
              field: "ideal",
              message: "Please choose the bank!",
            },
          ]);
        } else {
          await onSubmit(stripe, elements);
          setSubmitting(false);
        }
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        isValid,
      }) => (
        <S.Form id={formId} onSubmit={handleSubmit}>
          <S.Card data-test="stripeForm">
            <S.CardNumberField>
              <StripeInputElement
                type="Ideal"
                onChange={(event: any) => {
                  handleChange(event);
                  if (setIsBankSelected) {
                    setIsBankSelected(true);
                  }
                  setStripeErrors([]);
                }}
              />
            </S.CardNumberField>
            <button ref={formRef} type="submit" style={{ display: "none" }}>
              submit
            </button>
          </S.Card>
          <ErrorMessage errors={allErrors} />
        </S.Form>
      )}
    </Formik>
  );
};

export { StripeIdealForm };
