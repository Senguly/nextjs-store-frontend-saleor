import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import RadioButtonContainer from "@components/atoms/FormComponents/Radiobutton";
import TextArea from "@components/atoms/FormComponents/TextArea";
import { StripePaymentGateway } from "@components/organisms";
import { CartContext } from "@temp/contexts/CartContext";
import { ServiceContext } from "@temp/contexts/ServiceContext";

import * as S from "../../../Checkout/components/CheckoutForm/styles";
import {
  renderArr,
  renderHours,
  swapIndex,
} from "../../../Checkout/components/CheckoutForm/util";

function CheckoutQrForm({
  btnRef,
  myStore,
  date,
  paymentMethodAvailable,
  setIsCheckForm,
  setCheckoutPayment,
  checkoutPayment,
  setLoadingCheckout,
  onSubmit,
  formRef,
  createPaymentCheckout,
  checkoutId,
}: any) {
  const initial = {
    note: "",
  };
  const [initialValues] = React.useState(initial);
  // const [isOpenForm, setIsOpenForm] = React.useState(false);
  const { indexStripe, indexCash } = myStore.myStore;

  // For validate bank
  const [isBankSelected, setIsBankSelected] = React.useState(false);
  const {
    typeDelivery,
    addTypePayment,
    total,
  }: // cartItems,
  // addTypeDelivery,
  // typePayment,
  any = React.useContext(CartContext);

  const { serviceTimeOption, timeLine, emergency }: any = React.useContext(
    ServiceContext
  );

  const tempDate = renderArr(
    typeDelivery,
    serviceTimeOption,
    timeLine,
    emergency
  )[0];

  const [checkoutData, setCheckoutData] = React.useState({
    typeDelivery,
    date: tempDate,
    time:
      typeDelivery.value === "delivery"
        ? renderHours(
            serviceTimeOption.dlAsSoonAsPosible,
            serviceTimeOption.dlTimeGap,
            serviceTimeOption.dlDeliveryTime,
            timeLine,
            date.value,
            typeDelivery
          )[0]
        : renderHours(
            serviceTimeOption.puAsSoonAsPosible,
            serviceTimeOption.puTimeGap,
            serviceTimeOption.puDeliveryTime,
            timeLine,
            date.value,
            typeDelivery
          )[0],
    ...initialValues,
    note: "",
    typePayment: paymentMethodAvailable[0]?.value,
  });

  React.useEffect(() => {
    setIsCheckForm(false);
  }, []);

  const onHandleSubmit = (values: any) => {
    onSubmit(values);
  };

  const onHandleChange = (e: any) => {
    if (e.target.value === "Dummy") {
      const t = paymentMethodAvailable.find(item => item.value === "Dummy");
      addTypePayment({ type: "CASH" });
      setCheckoutPayment({
        ...checkoutPayment,
        gateway: t.gateway,
        token: "not-charged",
        amount: total,
      });
    } else {
      const t = paymentMethodAvailable.find(item => item.value === "Stripe");
      addTypePayment({ type: "STRIPE" });
      setCheckoutPayment({
        ...checkoutPayment,
        gateway: t.gateway,
        amount: total,
      });
    }
  };

  const { t } = useTranslation();

  const validateSchemaQrOrder = Yup.object().shape({
    note: Yup.string(),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchemaQrOrder}
        onSubmit={values => {
          onHandleSubmit(values);
        }}
      >
        {({ values, handleChange, handleSubmit, ...formikProps }) => {
          return (
            <form onSubmit={handleSubmit}>
              <S.Title>{t("Anything else we should know?")}</S.Title>
              <div style={{ marginBottom: "24px" }}>
                <TextArea
                  title={t("order-note")}
                  name="note"
                  value={checkoutData.note}
                  onChange={e => {
                    handleChange(e);
                    setCheckoutData({ ...checkoutData, note: e.target.value });
                  }}
                />
              </div>
              <button
                style={{ display: "none" }}
                ref={btnRef}
                type="submit"
                // onClick={handleSubmit}
              >
                submit
              </button>
            </form>
          );
        }}
      </Formik>

      <S.Divider />
      <S.Title>{t("How do you wish to pay?")}</S.Title>
      <S.Item className="responsive">
        {paymentMethodAvailable.length > 0 && (
          <RadioButtonContainer
            options={swapIndex(indexStripe, indexCash, paymentMethodAvailable)}
            onChange={onHandleChange}
            defaultValue={paymentMethodAvailable[0]?.value || null}
          />
        )}
      </S.Item>
      {paymentMethodAvailable.length > 0 &&
        paymentMethodAvailable.find(item => item.value === "Stripe")
          ?.gateway === checkoutPayment?.gateway && (
          <S.WrapperPaymentItem>
            <S.Paragraph>{t("select-your-bank")}</S.Paragraph>
            <StripePaymentGateway
              formRef={formRef}
              config={
                paymentMethodAvailable.find(item => item.value === "Stripe")
                  ?.config
              }
              isBankSelected={isBankSelected}
              setIsBankSelected={setIsBankSelected}
              onError={() => {}}
              processPayment={(token, cardData) => {
                if (typeof checkoutId !== "undefined") {
                  if (token) {
                    createPaymentCheckout({
                      variables: {
                        checkoutId,
                        input: { ...checkoutPayment, token, amount: total },
                      },
                    });
                    setCheckoutPayment({ ...checkoutPayment, token });
                  } else {
                    // setCheckoutPayment({ ...checkoutPayment });
                  }
                }
              }}
            />
          </S.WrapperPaymentItem>
        )}
    </>
  );
}

export default CheckoutQrForm;
