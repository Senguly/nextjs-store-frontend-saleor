/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useAlert } from "react-alert";
import { useMutation, useQuery } from "react-apollo";
import { useTranslation } from "react-i18next";
import Media from "react-media";
import Modal from "react-modal";

import { Loader } from "@components/atoms";
import ButtonCard from "@components/atoms/ButtonCart";
import ButtonIcon from "@components/molecules/ButtonIcon";
import DeliveryDialog from "@components/molecules/DeliveryDialog";
import OrderBasket from "@components/molecules/OrderBasket";
import { Overlay } from "@components/organisms";
import { CartContext } from "@temp/contexts/CartContext";
import { ServiceContext } from "@temp/contexts/ServiceContext";
import { checkCurrency } from "@utils/money";
import { checkCanOrder } from "@utils/serviceTimeUltil";

import { getCurDelivery } from "../Order/queries";
import CheckoutForm from "./components/CheckoutForm";
import { renderArr } from "./components/CheckoutForm/util";
import {
  addVoucher,
  CheckoutComplete,
  CheckoutPaymentCreate,
  CreateCheckout,
  deleteCheckoutLineMutation,
  UpdateCheckoutBillingAddress,
  updateCheckoutInfoMutation,
  updateCheckoutLinesMutation,
} from "./queries";
import * as S from "./styles";

import cart from "images/cart.svg";
import Check from "images/Check.svg";
import iDeal from "images/iDeal.svg";

// Modal.setAppElement("#modal-root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    padding: 0,
    border: "none",
  },
  overlay: {
    background: "#00000070",
    zIndex: 99,
  },
};

const customMobileStyles = {
  content: {
    top: "auto",
    left: "0",
    right: "auto",
    bottom: "0",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
    background: "transparent",
    padding: 0,
    border: "none",
    maxHeight: "100vh",
    width: "100%",
  },
  overlay: {
    background: "#00000070",
    zIndex: 99,
  },
};

function Checkout({ myStore }: any) {
  Modal.setAppElement(document.getElementById("root"));

  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [isOpenDelivery, setIsOpenDelivery] = React.useState(false);
  const [isCheckForm, setIsCheckForm] = React.useState(true);
  const alert = useAlert();
  const router = useRouter();
  const {
    addTypeDelivery,
    typeDelivery,
    cartItems,
    total,
    handleCheckout,
    deliveryFee,
    isAllowCheckout,
    discount,
    discountType,
    promoCode,
    typePayment,
    transFee,
    contantFee,
    addTypePayment,
    currency,
    stripeEnable,
    contantEnable,
  }: any = React.useContext(CartContext);

  const { serviceTimeOption, timeLine, emergency }: any = React.useContext(
    ServiceContext
  );
  const [date, setDate] = React.useState(
    renderArr(typeDelivery, serviceTimeOption, timeLine, emergency)[0]
  );

  const [paymentMethodAvailable, setPaymentMethodAvailable] = React.useState(
    []
  );

  console.log(currency);

  const { data: curDelivery } = useQuery(getCurDelivery, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  // console.log(JSON.stringify(cartItems))
  // console.log(cartItems)
  // const { d } = useQuery(getCheckoutUrl, {
  //   variables: {
  //     "line_item": "[{\"id\":\"UHJvZHVjdDoxMDY4\",\"name\":\"Vegadish\",\"price\":12,\"currency\":\"€\",\"url\":\"https://orderich-dev.s3.amazonaws.com/static/products/image-9_3345e540.webp\",\"discount\":null,\"variantId\":\"UHJvZHVjdFZhcmlhbnQ6MTA2Ng==\",\"options\":{\"single\":[],\"multiple\":[]},\"quantity\":1,\"total\":12,\"index\":29089}]",
  //     "account_id": "acct_1NCOTnQZ0zyhn26a"
  //   }
  // });

  const opt = paymentMethodAvailable
    .filter(item => {
      if (
        (item.name === "Dummy" && contantEnable) ||
        (item.name !== "Dummy" && stripeEnable)
      ) {
        return item;
      }
      // return {};
    })
    .map(item => ({
      value: item.name,
      gateway: item.id,
      config: item?.config || [],
      text: item.name === "Dummy" ? "Cash/card upon receipt" : "Ideal",
      subIcon: item.name === "Dummy" ? null : iDeal,
      price:
        item.name === "Dummy"
          ? contantFee > 0
            ? contantFee
            : null
          : transFee > 0
          ? transFee
          : null,
      currency,
    }));

  console.log(stripeEnable);
  console.log(contantEnable);
  console.log(paymentMethodAvailable);

  const [checkoutPayment, setCheckoutPayment] = React.useState(null);

  const today = new Date().getDay();

  const canOrder = checkCanOrder(
    serviceTimeOption,
    timeLine,
    today === 0 ? 6 : today - 1,
    typeDelivery?.value,
    emergency,
    date?.value
  );

  const btnRef = React.useRef<any>();
  const formRef = React.useRef<any>();

  const [updateCheckoutInfo] = useMutation(updateCheckoutInfoMutation);
  const [updateLines] = useMutation(updateCheckoutLinesMutation, {
    onCompleted: data => {
      // console.log(data);
    },
  });
  const [deleteLine] = useMutation(deleteCheckoutLineMutation, {
    onCompleted: data => {
      // console.log(data);
    },
  });
  const [checkoutComplete] = useMutation(CheckoutComplete, {
    onCompleted: data => {
      if (data?.checkoutComplete?.errors.length === 0) {
        handleCheckout();
        const token = data?.checkoutComplete?.order?.token;
        if (token) {
          alert.show(
            {
              title: "Place order success",
            },
            { type: "success" }
          );
          router.push(`/order-history/${token}`);
        } else {
          window.open(data?.checkoutComplete?.redirectUrl, "_self");
        }
        localStorage.removeItem("data_checkout");
        // setLoadingCheckout(false);
      } else {
        const { message, field } = data?.checkoutComplete?.errors[0];
        setLoadingCheckout(false);

        alert.show(
          {
            title: `${field}, ${message}`,
          },
          { type: "error" }
        );
      }
      // }
    },
  });

  const [createPaymentCheckout] = useMutation(CheckoutPaymentCreate, {
    onCompleted: data => {
      const checkoutId = JSON.parse(localStorage.getItem("data_checkout"))?.id;
      if (data?.checkoutPaymentCreate?.errors.length === 0) {
        if (typeof checkoutId !== "undefined") {
          checkoutComplete({
            variables: {
              checkoutId,
            },
          });
        }
      } else {
        const { message, field } = data?.checkoutPaymentCreate?.errors[0];
        setLoadingCheckout(false);

        alert.show(
          {
            title: `${field}, ${message}`,
          },
          { type: "error" }
        );
      }
    },
  });

  const [addVoucherDiscount] = useMutation(addVoucher, {
    onCompleted: data => {
      if (data?.checkoutAddPromoCode?.errors.length !== 0) {
        const { message, field } = data?.checkoutAddPromoCode?.errors[0];
        setLoadingCheckout(false);

        alert.show(
          {
            title: `${field}, ${message}`,
          },
          { type: "error" }
        );
      }
    },
  });

  const [updateAddress] = useMutation(UpdateCheckoutBillingAddress, {
    onCompleted: async data => {
      const checkoutId = data?.checkoutBillingAddressUpdate?.checkout?.id;
      if (data?.checkoutBillingAddressUpdate?.errors.length === 0) {
        // nếu đủ đk discount-> add voucher
        if (promoCode) {
          await addVoucherDiscount({
            variables: {
              checkoutId,
              promoCode,
            },
          });
        }

        if (formRef.current) {
          // checkout bằng ideal
          formRef?.current?.click();
        } else {
          // checkout bằng cash
          createPaymentCheckout({
            variables: {
              checkoutId,
              input: {
                ...checkoutPayment,
                returnUrl: window.location.origin,
                amount: total,
              },
            },
          });
        }
      } else {
        const {
          message,
          field,
        } = data?.checkoutBillingAddressUpdate?.errors[0];
        setLoadingCheckout(false);

        alert.show(
          {
            title: `${field}, ${message}`,
          },
          { type: "error" }
        );
      }
    },
  });

  const [loadingCheckout, setLoadingCheckout] = React.useState(false);
  const [lines, setLines] = React.useState([]);

  const [createCheckout, { loading: loadingCreateCheckout }] = useMutation(
    CreateCheckout,
    {
      onCompleted: data => {
        setPaymentMethodAvailable(
          data?.checkoutCreate?.checkout?.availablePaymentGateways || []
        );
        const temp = {
          availablePaymentGateways:
            data?.checkoutCreate?.checkout?.availablePaymentGateways,
          token: data?.checkoutCreate?.checkout?.token,
          id: data?.checkoutCreate?.checkout?.id,
        };

        setLines(data?.checkoutCreate?.checkout.lines);

        // setCheckoutPayment({
        //   amount: total,
        //   gateway: opt[0]?.gateway,
        //   // chỗ này dẫn link sang page order historry
        //   returnUrl: window ? `${window.location.origin}/order-history` : "",
        //   token: "not-charged",
        // });

        localStorage.setItem("data_checkout", JSON.stringify(temp));
      },
    }
  );
  const varLoading = useCallback(() => {
    setLoadingCheckout(loadingCreateCheckout);
  }, [loadingCreateCheckout]);

  useEffect(() => {
    setCheckoutPayment({
      amount: total,
      gateway: opt[0]?.gateway,
      // chỗ này dẫn link sang page order historry
      returnUrl: window ? `${window.location.origin}/order-history` : "",
      token: "not-charged",
    });
  }, [paymentMethodAvailable]);

  // console.log(loadingCreateCheckout);

  const onHandleSubmit = async (dataSubmit: any) => {
    const checkoutId = JSON.parse(localStorage.getItem("data_checkout"))?.id;
    const billingAddress = dataSubmit?.checkoutInput?.billingAddress;

    if (billingAddress) {
      // update checkout info
      await updateCheckoutInfo({
        variables: {
          checkoutId,
          input: {
            orderType: dataSubmit.orderType,
            expectedDate: dataSubmit.expectedDate,
            expectedTime: dataSubmit.expectedTime,
            note: dataSubmit.note,
          },
        },
      });
      // update address => createPaymentCheckout
      updateAddress({
        variables: {
          checkoutId,
          billingAddress,
        },
      });
    }
  };

  React.useEffect(() => {
    const variables = {
      input: {
        channel: "default-channel",

        lines: cartItems.map(item => {
          const optionValues = [];
          Object.keys(item.options).map(e => {
            item.options[e].map(opt =>
              optionValues.push({ optionValueId: opt?.value })
            );
          });
          if (optionValues.length === 0) {
            return {
              quantity: item.quantity,
              variantId: item.variantId,
            };
          }
          return {
            quantity: item.quantity,
            variantId: item.variantId,
            optionValues,
          };
        }),
        orderType: typeDelivery.value === "delivery" ? "DELIVERY" : "PICKUP",
      },
    };

    createCheckout({
      variables,
    });
    addTypePayment({ type: "CASH" });
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, []);

  React.useEffect(() => {
    varLoading();
  }, [loadingCreateCheckout]);

  const handleSubmitCheckout = () => {
    // nếu đủ điều kiện checkout thì submit form => onHandleSubmit
    if (btnRef.current && isAllowCheckout) {
      btnRef?.current?.click();
    }
  };

  const handleUpdateLines = () => {
    const checkoutId = JSON.parse(localStorage.getItem("data_checkout"))?.id;
    const lines = cartItems.map((item: any) => {
      const optionValues: { optionValueId: any }[] = [];
      Object.keys(item.options).map(e => {
        item.options[e].map((opt: any) =>
          optionValues.push({ optionValueId: opt?.value })
        );
      });
      if (optionValues.length === 0) {
        return {
          quantity: item.quantity,
          variantId: item.variantId,
        };
      }
      return {
        quantity: item.quantity,
        variantId: item.variantId,
        optionValues,
      };
    });

    if (checkoutId) {
      updateLines({
        variables: {
          id: checkoutId,
          lines,
        },
      });
    }
  };

  const handleDeleteLine = (varId: any) => {
    const checkoutId = JSON.parse(localStorage.getItem("data_checkout"))?.id;

    const lineId = (lines || []).find(
      (item: any) => item?.variant?.id === varId
    ).id;

    if (checkoutId && lineId) {
      deleteLine({
        variables: {
          id: checkoutId,
          lineId,
        },
      });
    }
  };

  const onRequestClose = () => {
    // setIsOpen(false);
    setIsOpenOrder(false);
    setIsOpenDelivery(false);
    // setIsOpenService(false);
  };

  const { t } = useTranslation();

  return (
    <div
      className="container"
      style={{ marginTop: "24px", marginBottom: "48px" }}
    >
      <Overlay
        position="center"
        children={<Loader transparent />}
        show={loadingCheckout}
        hide={() => null}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <S.Wrapper>
          <CheckoutForm
            btnRef={btnRef}
            formRef={formRef}
            onSubmit={onHandleSubmit}
            setIsCheckForm={setIsCheckForm}
            setLoadingCheckout={setLoadingCheckout}
            setCheckoutPayment={setCheckoutPayment}
            checkoutPayment={checkoutPayment}
            paymentMethodAvailable={opt || []}
            checkoutId={JSON.parse(localStorage.getItem("data_checkout"))?.id}
            createPaymentCheckout={createPaymentCheckout}
            transFee={transFee}
            contantFee={contantFee}
            curDelivery={curDelivery?.currentDelivery}
            date={date}
            setDate={setDate}
            myStore={myStore}
          />

          <S.ButtonWrap>
            <ButtonIcon
              text={t("view-order")}
              icon={cart}
              onClick={() => setIsOpenOrder(true)}
            />
            <S.Space />
            <ButtonCard
              icon={Check}
              text={t("place-order")}
              price={`${checkCurrency(
                myStore?.myStore?.channel?.currencyCode
              )} ${parseFloat(total).toFixed(2).replace(".", ",")}`}
              onClick={handleSubmitCheckout}
              isDisable={loadingCheckout || !isAllowCheckout || isCheckForm}
              // color="#FF6347"
            />
          </S.ButtonWrap>
        </S.Wrapper>
        <S.Wrapper2>
          <OrderBasket
            isOpen={setIsOpenOrder}
            isOpenDelivery={setIsOpenDelivery}
            handleSubmitCheckout={handleSubmitCheckout}
            typeDelivery={typeDelivery}
            typePayment={typePayment}
            transFee={transFee}
            contantFee={contantFee}
            isCheckout
            btnRef={btnRef}
            cartItems={cartItems}
            total={total}
            canOrder={canOrder}
            deliveryFee={deliveryFee}
            isDisable={loadingCheckout || !isAllowCheckout || isCheckForm}
            discount={discount}
            discountType={discountType}
            onUpdateLines={handleUpdateLines}
            handleDeleteLine={handleDeleteLine}
            setLoadingCheckout={setLoadingCheckout}
            currency={checkCurrency(myStore?.myStore?.channel?.currencyCode)}
            date={date}
          />
        </S.Wrapper2>
        <Media
          query={{
            maxWidth: 717,
          }}
        >
          {(matches: boolean) => {
            const style = matches ? customMobileStyles : customStyles;
            return (
              <>
                <Modal
                  onRequestClose={onRequestClose}
                  isOpen={isOpenOrder}
                  style={style}
                >
                  <OrderBasket
                    isOpen={setIsOpenOrder}
                    isOpenDelivery={setIsOpenDelivery}
                    handleSubmitCheckout={handleSubmitCheckout}
                    typeDelivery={typeDelivery}
                    typePayment={typePayment}
                    transFee={transFee}
                    contantFee={contantFee}
                    cartItems={cartItems}
                    btnRef={btnRef}
                    isCheckout
                    total={total}
                    isDialog
                    canOrder={canOrder}
                    deliveryFee={deliveryFee}
                    isDisable={
                      loadingCheckout || !isAllowCheckout || isCheckForm
                    }
                    discount={discount}
                    discountType={discountType}
                    onUpdateLines={handleUpdateLines}
                    setLoadingCheckout={setLoadingCheckout}
                    currency={checkCurrency(
                      myStore?.myStore?.channel?.currencyCode
                    )}
                    date={date}
                  />
                </Modal>

                <Modal
                  onRequestClose={onRequestClose}
                  isOpen={isOpenDelivery}
                  style={style}
                >
                  <DeliveryDialog
                    isOpen={setIsOpenDelivery}
                    setTypeDelivery={addTypeDelivery}
                    typeDelivery={typeDelivery}
                  />
                </Modal>
              </>
            );
          }}
        </Media>
      </div>
    </div>
  );
}

export default Checkout;
