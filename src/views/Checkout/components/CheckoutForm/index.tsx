/* eslint-disable no-continue */
/* eslint-disable prefer-destructuring */
import { useAuth } from "@saleor/sdk";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import AddNewAddress from "@components/atoms/AddNewAddress";
import AddressItem from "@components/atoms/AddNewAddress/components/AddressItem";
import { Button } from "@components/atoms/Button";
import RadioButtonContainer from "@components/atoms/FormComponents/Radiobutton";
import SelectCustomize from "@components/atoms/FormComponents/Select";
import TextArea from "@components/atoms/FormComponents/TextArea";
import TextField from "@components/atoms/FormComponents/TextField";
import ButtonIcon from "@components/molecules/ButtonIcon";
// import { Spacer } from "@components/molecules/OrderBasket/styles";
import { StripePaymentGateway } from "@components/organisms";
import { channelSlug, countryCode } from "@temp/constants";
import { CartContext } from "@temp/contexts/CartContext";
import { ServiceContext } from "@temp/contexts/ServiceContext";
import { checkCanOrder } from "@utils/serviceTimeUltil";

import { getCheckoutUrl, getCurUserQuery } from "../../queries";
import { initial, Structure } from "./structure";
import * as S from "./styles";
import { renderArr, renderHours, swapIndex } from "./util";

import cart from "images/cart.svg";
import Delivery from "images/Delivery.svg";

// import iDeal from "images/iDeal.svg";

// import iDeal from "images/iDeal.svg";

const DeliveryContent = (
  arr: any,
  setIsOpenForm: any,
  setInitialValues?: any,
  typeDelivery?: any,
  addTypeDelivery?: any,
  t?: any
) => {
  return (
    <S.Wrapper>
      <S.Item className="responsive">
        <AddNewAddress
          title="Add new address"
          onClick={() => {
            setInitialValues(initial);
            setIsOpenForm(true);
          }}
        />
      </S.Item>
      {arr.map((item: any, index: number) => {
        return (
          <S.Item key={index} className="responsive">
            <AddressItem
              address={item}
              onClick={() => {
                setInitialValues(item);
                addTypeDelivery(
                  typeDelivery.value === "delivery"
                    ? {
                        value: "delivery",
                        type: t("delivery "),
                        icon: Delivery,
                        inputValue: item.postalCode,
                      }
                    : {
                        value: "pickup",
                        type: t("pickup "),
                        icon: cart,
                      }
                );
                setIsOpenForm(true);
              }}
            />
          </S.Item>
        );
      })}
    </S.Wrapper>
  );
};

const AddressForm = (
  initialValues: any,
  onHandleSubmit: any,
  validateSchema: any,
  validateSchemaPickup?: any,
  structure?: any,
  btnRef?: any,
  typeDelivery?: any,
  setIsCheckForm?: any,
  whoe?: any,
  opt?: any,
  isBankSelected?: any,
  // updateDeliveryFee?: any,
  addTypeDelivery?: any,
  t?: any
) => {
  const initials = {
    ...initialValues,
    streetAddress: initialValues.streetAddress1,
    phoneNumber: initialValues.phone,
  };
  // const {t} = useTranslation();
  return (
    <Formik
      initialValues={initials}
      validationSchema={
        typeDelivery.value === "delivery"
          ? validateSchema
          : validateSchemaPickup
      }
      onSubmit={values => {
        onHandleSubmit(values);
      }}
    >
      {({ values, handleChange, handleSubmit, ...formikProps }) => {
        const field = [
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "streetAddress",
          "postalCode",
          "city",
        ];

        const checkField =
          whoe.value === "delivery" ? field : field.slice(0, 4);

        const checkEmptyForm = () => {
          let flag = true;

          Object.keys(checkField).forEach(value => {
            if (
              values[checkField[value]] === "" ||
              values[checkField[value]] === undefined
            ) {
              flag = false;
            }
          });
          return flag;
        };

        const checkErrorForm = () => {
          let flag = true;
          Object.keys(checkField).forEach(value => {
            if (formikProps.errors[checkField[value]] !== undefined) {
              flag = false;
            }
          });
          return flag;
        };

        if (
          checkErrorForm() === true &&
          checkEmptyForm() === true &&
          // isBankSelected &&
          opt.length !== 0
        ) {
          setIsCheckForm(false);
        } else {
          setIsCheckForm(true);
        }

        return (
          <form onSubmit={handleSubmit}>
            <S.Wrapper>
              {Object.keys(structure).map((item: any, index: number) => {
                if (item === "postalCode") {
                  return (
                    <S.Item key={index} className="responsive">
                      <TextField
                        {...structure[item]}
                        name={item}
                        {...formikProps}
                        value={values[item]}
                        type="string"
                        onChange={e => {
                          handleChange(e);
                          // handle change postalcode
                          addTypeDelivery({
                            value: "delivery",
                            type: t("delivery "),
                            icon: Delivery,
                            inputValue: e.target.value,
                          });
                          // updateDeliveryFee(e.target.value);
                        }}
                      />
                    </S.Item>
                  );
                }

                if (item === "email") {
                  return (
                    <S.Item key={index} className="responsive">
                      <TextField
                        {...structure[item]}
                        name={item}
                        {...formikProps}
                        value={values[item]}
                        type="email"
                        onChange={handleChange}
                      />
                    </S.Item>
                  );
                }

                if (item === "phoneNumber") {
                  return (
                    <S.Item key={index} className="responsive">
                      <TextField
                        {...structure[item]}
                        name={item}
                        {...formikProps}
                        value={values[item]}
                        type="tel"
                        onChange={handleChange}
                      />
                    </S.Item>
                  );
                }

                return (
                  <S.Item key={index} className="responsive">
                    <TextField
                      {...structure[item]}
                      name={item}
                      {...formikProps}
                      value={values[item]}
                      onChange={handleChange}
                    />
                  </S.Item>
                );
              })}
            </S.Wrapper>

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
  );
};

function CheckoutForm({
  btnRef,
  formRef,
  onSubmit,
  setIsCheckForm,
  setCheckoutPayment,
  checkoutPayment,
  paymentMethodAvailable,
  checkoutId,
  createPaymentCheckout,
  setLoadingCheckout,
  curDelivery,
  date,
  setDate,
  myStore,
  checkoutUrl,
}: any) {
  const [initialValues, setInitialValues] = React.useState(initial);
  const [isOpenForm, setIsOpenForm] = React.useState(false);

  const [isCard, setIsCard] = React.useState(true);

  const { indexStripe, indexCash } = myStore.myStore;
  // For validate bank
  const [isBankSelected, setIsBankSelected] = React.useState(false);
  const {
    addTypeDelivery,
    typeDelivery,
    cartItems,
    total,
    addTypePayment,
    typePayment,
  }: // updateDeliveryFee,
  // currency,
  // stripeEnable,
  // contantEnable,
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

  const { user } = useAuth();
  const { data } = useQuery(getCurUserQuery);

  const [getUrl] = useMutation(getCheckoutUrl, {
    onCompleted: data => {
      console.log(data);
      window.open(data.checkoutUrl.checkoutUrl, "_self", "noreferrer");
    },
  });

  const areas = JSON.parse(curDelivery.deliveryArea) || [];
  const validateSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    streetAddress: Yup.string().required("Required"),
    // apartment: Yup.string().required("Required"),
    postalCode: Yup.string()
      .required("Required")
      .test(
        "postalCode",
        "Sorry, we do not deliver to this area. Try another postcode or place a pickup delivery instead.",
        value => {
          let result = false;
          // let flagElement = false;
          if (
            value !== undefined &&
            // value.length < 8 &&
            areas.areas.length > 0
          ) {
            // Validate postal code with text behind
            areas.areas.forEach(e => {
              if (
                !isNaN(Number(value.slice(0, 4))) &&
                (isNaN(value.slice(4, 5)) ||
                  value.slice(4, 5) === " " ||
                  value.slice(4, 5) === "") &&
                value.slice(0, 4) >= e.from &&
                value.slice(0, 4) <= e.to
              ) {
                // flagElement = true;
                result = true;
              }
            });
          }
          return result;
        }
      ),
    city: Yup.string().required("Required"),
    // phoneNumber: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^[0-9]*$/, "Invalid phone number"),
    // companyName: Yup.string().required("Required"),
  });

  const validateSchemaPickup = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    // streetAddress: Yup.string().required("Required"),
    // apartment: Yup.string().required("Required"),
    // postalCode: Yup.string().required("Required"),
    // city: Yup.string().required("Required"),
    // phoneNumber: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^[0-9]*$/, "Invalid phone number"),
    // companyName: Yup.string().required("Required"),
  });

  // const opt = paymentMethodAvailable
  //   .filter(item => {
  //     if (
  //       (item.name === "Dummy" && contantEnable) ||
  //       (item.name !== "Dummy" && stripeEnable)
  //     ) {
  //       return item;
  //     }
  //     // return {};
  //   })
  //   .map(item => ({
  //     value: item.name,
  //     gateway: item.id,
  //     config: item.config,
  //     text: item.name === "Dummy" ? "Cash" : "Ideal",
  //     subIcon: item.name === "Dummy" ? null : iDeal,
  //     price:
  //       item.name === "Dummy"
  //         ? contantFee > 0
  //           ? contantFee
  //           : null
  //         : transFee > 0
  //         ? transFee
  //         : null,
  //     currency,
  //   }));

  // console.log(myStore, "--------------cáh");

  // if (opt.length === 0) {
  //   setIsCheckForm(false);
  // }

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
            date?.value,
            typeDelivery
          )[0]
        : renderHours(
            serviceTimeOption.puAsSoonAsPosible,
            serviceTimeOption.puTimeGap,
            serviceTimeOption.puDeliveryTime,
            timeLine,
            date?.value,
            typeDelivery
          )[0],
    ...initialValues,
    note: "",
    typePayment: paymentMethodAvailable[0]?.value,
  });

  React.useEffect(() => {
    setCheckoutData({
      ...checkoutData,
      date: tempDate,
      time: renderHours(
        typeDelivery.value === "delivery"
          ? serviceTimeOption.dlAsSoonAsPosible
          : serviceTimeOption.puAsSoonAsPosible,
        typeDelivery.value === "delivery"
          ? serviceTimeOption.dlTimeGap
          : serviceTimeOption.puTimeGap,
        typeDelivery.value === "delivery"
          ? serviceTimeOption.dlDeliveryTime
          : serviceTimeOption.puDeliveryTime,
        timeLine,
        date?.value,
        typeDelivery
      )[0],
    });
    setDate(tempDate);
  }, [serviceTimeOption]);

  // React.useEffect(() => {
  //   if (opt && opt.length > 0) {
  //     setCheckoutPayment({
  //       ...checkoutPayment,
  //       gateway: opt[0].gateway,
  //       amount: total,
  //     });
  //     addTypePayment({ type: opt[0]?.value });
  //   }
  // }, []);

  const onHandleSubmit = (values: any) => {
    const dataSubmit = {
      // ...checkoutData,
      // ...values,
      expectedDate: checkoutData.date.value,
      expectedTime: checkoutData.time.value,
      orderType: typeDelivery.value === "delivery" ? "DELIVERY" : "PICKUP",
      note: checkoutData.note,
      checkoutInput: {
        channel: channelSlug,
        email: values.email,
        lines: cartItems.map(item => ({
          quantity: item.quantity,
          variantId: item.variantId,
        })),
        billingAddress: {
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.companyName,
          postalCode: values.postalCode,
          phone: values.phoneNumber,
          city: values.city,
          apartment: values.apartment,
          country: countryCode,
          email: values.email,
          streetAddress1: values.streetAddress,
          streetAddress2: values.streetAddress,
        },
      },
    };
    if (isBankSelected && values) {
      setLoadingCheckout(true);
    }
    if (typePayment.type === "CASH" && values) {
      setLoadingCheckout(true);
    }
    // setCheckoutData(dataSubmit);
    // if (!isBankSelected) setLoadingCheckout(false);
    onSubmit(dataSubmit);
    // router.push("/order-history/123");
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

  const structure = Structure(typeDelivery);

  React.useEffect(() => {
    setCheckoutData({
      ...checkoutData,
      date: tempDate,
      time: renderHours(
        typeDelivery.value === "delivery"
          ? serviceTimeOption.dlAsSoonAsPosible
          : serviceTimeOption.puAsSoonAsPosible,
        typeDelivery.value === "delivery"
          ? serviceTimeOption.dlTimeGap
          : serviceTimeOption.puTimeGap,
        typeDelivery.value === "delivery"
          ? serviceTimeOption.dlDeliveryTime
          : serviceTimeOption.puDeliveryTime,
        timeLine,
        tempDate?.value,
        typeDelivery
      )[0],
    });
  }, [typeDelivery.value]);

  const handleSelectChange = (value: any, name: string) => {
    const clone = { ...checkoutData };
    clone[name] = value;
    if (name === "date") {
      clone.time =
        typeDelivery.value === "delivery"
          ? renderHours(
              serviceTimeOption.dlAsSoonAsPosible,
              serviceTimeOption.dlTimeGap,
              serviceTimeOption.dlDeliveryTime,
              timeLine,
              value.value,
              typeDelivery
            )[0]
          : renderHours(
              serviceTimeOption.puAsSoonAsPosible,
              serviceTimeOption.puTimeGap,
              serviceTimeOption.puDeliveryTime,
              timeLine,
              value.value,
              typeDelivery
            )[0];
      setDate(value.value);
    }

    setCheckoutData(clone);
  };

  const onGetUrl = () => {
    getUrl({
      variables: {
        line_item: JSON.stringify(cartItems),
        account_id: myStore?.myStore?.accountId,
      },
    });
  };

  const checker = checkCanOrder(
    serviceTimeOption,
    timeLine,
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
    "delivery",
    emergency,
    new Date()
  );

  const { t } = useTranslation();

  const mock = [
    {
      value: "delivery",
      type: t("delivery "),
      icon: Delivery,
    },
    {
      value: "pickup",
      type: t("pickup "),
      icon: cart,
    },
  ];

  return (
    <div>
      <S.Title>{t("How do you wish to receive your order?")}</S.Title>
      <S.Wrapper>
        {/* {typeDelivery.value === "delivery" && (
          <S.Item
            key={index}
            onClick={() => {
              addTypeDelivery(item);
              setIsOpenForm(item.value === "pickup");
            }}
          >
            <ButtonIcon
              text={item.type}
              icon={item.icon}
              isActive={item.value === typeDelivery.value}
            />
          </S.Item>
        )} */}
        {checker ? (
          mock.map((item: any, index: number) => {
            return (
              <S.Item
                key={index}
                onClick={() => {
                  addTypeDelivery(item);
                  setIsCheckForm(true);
                  setIsOpenForm(item.value === "pickup");
                }}
              >
                <ButtonIcon
                  text={item.type}
                  icon={item.icon}
                  isActive={item.value === typeDelivery.value}
                />
              </S.Item>
            );
          })
        ) : (
          <S.Item
            fullWidth
            onClick={() => {
              // addTypeDelivery(mock[1]);
              // setIsOpenForm(mock[1].value === "pickup");
            }}
          >
            <ButtonIcon text={mock[1].type} icon={mock[1].icon} isActive />
          </S.Item>
        )}
        <S.Item className="responsive">
          <SelectCustomize
            name="date"
            title={t("date")}
            value={checkoutData.date}
            options={renderArr(
              typeDelivery,
              serviceTimeOption,
              timeLine,
              emergency
            )}
            onChange={handleSelectChange}
            isDisable={
              typeDelivery.value === "delivery"
                ? !serviceTimeOption.dlAllowPreorder
                : !serviceTimeOption.puAllowPreorder
            }
          />
        </S.Item>
        <S.Item className="responsive">
          <SelectCustomize
            name="time"
            title={t("time")}
            value={checkoutData.time}
            options={
              typeDelivery.value === "delivery"
                ? renderHours(
                    serviceTimeOption.dlAsSoonAsPosible,
                    serviceTimeOption.dlTimeGap,
                    serviceTimeOption.dlDeliveryTime,
                    timeLine,
                    checkoutData?.date?.value,
                    typeDelivery
                  )
                : renderHours(
                    serviceTimeOption.puAsSoonAsPosible,
                    serviceTimeOption.puTimeGap,
                    serviceTimeOption.puDeliveryTime,
                    timeLine,
                    checkoutData?.date?.value,
                    typeDelivery
                  )
            }
            onChange={handleSelectChange}
          />
        </S.Item>
      </S.Wrapper>
      <S.Divider />
      <S.Title>{t("Who is going to receive the order?")}</S.Title>
      {!user
        ? AddressForm(
            initialValues,
            onHandleSubmit,
            validateSchema,
            validateSchemaPickup,
            structure,
            btnRef,
            typeDelivery,
            setIsCheckForm,
            typeDelivery,
            paymentMethodAvailable,
            isBankSelected,
            addTypeDelivery,
            t
          )
        : isOpenForm
        ? AddressForm(
            initialValues,
            onHandleSubmit,
            validateSchema,
            validateSchemaPickup,
            structure,
            btnRef,
            typeDelivery,
            setIsCheckForm,
            typeDelivery,
            paymentMethodAvailable,
            isBankSelected,
            addTypeDelivery,
            t
          )
        : DeliveryContent(
            data?.me?.addresses || [],
            setIsOpenForm,
            setInitialValues,
            typeDelivery,
            addTypeDelivery,
            t
          )}

      <S.Divider />
      <S.Title>{t("Anything else we should know?")}</S.Title>
      <div style={{ marginBottom: "24px" }}>
        <TextArea
          title={t("order-note")}
          name="note"
          value={checkoutData.note}
          onChange={e =>
            setCheckoutData({ ...checkoutData, note: e.target.value })
          }
        />
      </div>
      <S.Divider />
      <S.Title>{t("How do you wish to pay?")}</S.Title>
      <S.Item
        className="responsive"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {paymentMethodAvailable.length > 0 && (
          <RadioButtonContainer
            options={swapIndex(indexStripe, indexCash, paymentMethodAvailable)}
            onChange={onHandleChange}
            defaultValue={paymentMethodAvailable[0]?.value || null}
            // myStore={myStore.myStore}
          />
        )}
        {myStore?.myStore?.channel?.slug === "channel-cad" && (
          <>
            <div
              style={{ marginLeft: "5%", marginRight: "5%" }}
              onClick={() => {
                if (!isCard) setIsCard(true);
              }}
            >
              <label htmlFor="card">
                <input
                  type="radio"
                  id="card"
                  name="drone"
                  value="card"
                  checked={isCard}
                />
                Card
              </label>
            </div>

            <div
              onClick={() => {
                if (isCard) setIsCard(false);
              }}
            >
              <label htmlFor="wallet">
                <input
                  type="radio"
                  id="wallet"
                  name="drone"
                  value="wallet"
                  checked={!isCard}
                />
                Wallet
              </label>
            </div>
          </>
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
      {isCard
        ? myStore?.myStore?.channel?.slug === "channel-cad" && (
            <Button
              testingContext=""
              style={{ borderRadius: "8px", marginBottom: "5%" }}
              onClick={onGetUrl}
            >
              Pay By Card
            </Button>
          )
        : myStore?.myStore?.channel?.slug === "channel-cad" && (
            <Button
              testingContext=""
              style={{ borderRadius: "8px", marginBottom: "5%" }}
            >
              Wallet
            </Button>
          )}
    </div>
  );
}

export default CheckoutForm;
