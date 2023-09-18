/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useLazyQuery, useMutation } from "react-apollo";
import { useTranslation } from "react-i18next";
import Media from "react-media";
import Modal from "react-modal";

import { Loader } from "@components/atoms";
import ButtonCard from "@components/atoms/ButtonCart";
import ButtonIcon from "@components/molecules/ButtonIcon";
import DeliveryDialog from "@components/molecules/DeliveryDialog";
import OrderBasket from "@components/molecules/OrderBasket";
import { Overlay } from "@components/organisms";
import { channelSlug, countryCode } from "@temp/constants";
import { CartContext } from "@temp/contexts/CartContext";
import { ServiceContext } from "@temp/contexts/ServiceContext";
import { checkCanOrder, checkOpen } from "@utils/serviceTimeUltil";

import { renderArr } from "../Checkout/components/CheckoutForm/util";
import {
  addVoucher,
  CheckoutComplete,
  CheckoutPaymentCreate,
  CreateCheckout,
  // deleteCheckoutLineMutation,
  UpdateCheckoutBillingAddress,
  updateCheckoutInfoMutation,
  updateCheckoutLinesMutation,
} from "../Checkout/queries";
import * as S from "../Checkout/styles";
import { getTableService } from "../Order/queries";
import CheckoutQrForm from "./components/CheckoutQrForm";

import cart from "images/cart.svg";
import Check from "images/Check.svg";
import iDeal from "images/iDeal.svg";

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

function CheckoutQr({ myStore }: any) {
  Modal.setAppElement(document.getElementById("root"));

  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [isOpenDelivery, setIsOpenDelivery] = React.useState(false);
  const [, setIsLoading] = React.useState(false);
  const [isCheckForm, setIsCheckForm] = React.useState(true);
  const [goingUp] = React.useState(true);
  const [table, setTable] = React.useState(null);

  const alert = useAlert();
  const router = useRouter();
  const { qr } = router.query;
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
    // addTypePayment,
    currency,
    stripeEnable,
    contantEnable,
    curTypeDelivery,
    itemCount,
  }: any = React.useContext(CartContext);
  const { serviceTimeOption, timeLine, emergency }: any = React.useContext(
    ServiceContext
  );
  const [date] = React.useState(
    renderArr(typeDelivery, serviceTimeOption, timeLine, emergency)[0]
  );

  const [valueDelivery] = React.useState(curTypeDelivery.inputValue);

  const [paymentMethodAvailable, setPaymentMethodAvailable] = React.useState(
    []
  );

  const [updateCheckoutInfo] = useMutation(updateCheckoutInfoMutation);

  // const { data: curDelivery } = useQuery(getCurDelivery, {
  //   variables: {},
  //   fetchPolicy: "cache-and-network",
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
      text: item.name === "Dummy" ? "Cash" : "Ideal",
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

  const [checkoutPayment, setCheckoutPayment] = React.useState(null);

  const today = new Date().getDay();

  const canOrder = checkCanOrder(
    serviceTimeOption,
    timeLine,
    today === 0 ? 6 : today - 1,
    typeDelivery?.value,
    emergency,
    date.value
  );

  const btnRef = React.useRef<any>();
  const formRef = React.useRef<any>();

  const [updateLines] = useMutation(updateCheckoutLinesMutation, {
    onCompleted: data => {
      // console.log(data);
    },
  });

  // const [deleteLine] = useMutation(deleteCheckoutLineMutation, {
  //   onCompleted: data => {
  //     // console.log(data);
  //   },
  // });

  const [checkoutComplete] = useMutation(CheckoutComplete, {
    onCompleted: data => {
      if (data?.checkoutComplete?.errors.length === 0) {
        handleCheckout();
        // alert.show(
        //   {
        //     title: "Place order success",
        //   },
        //   { type: "success" }
        // );
        const token = data?.checkoutComplete?.order?.token;
        if (token) {
          alert.show(
            {
              title: "Place order success",
            },
            { type: "success" }
          );
          router.push(`/order-history/${token}?qr=${qr}`);
          // router.push(`/order-history/${token}`);
        } else {
          window.open(data?.checkoutComplete?.redirectUrl, "_self");
        }
        localStorage.removeItem("data_checkout");
      } else {
        const { message, field } = data?.checkoutComplete?.errors[0];
        setIsLoading(false);
        alert.show(
          {
            title: `${field}, ${message}`,
          },
          { type: "error" }
        );
      }
    },
  });

  const [createPaymentCheckout] = useMutation(CheckoutPaymentCreate, {
    onCompleted: data => {
      if (data?.checkoutPaymentCreate?.errors.length === 0) {
        const checkoutId = data?.checkoutPaymentCreate?.checkout?.id;
        checkoutComplete({
          variables: {
            checkoutId,
          },
        });
      } else {
        const { message, field } = data?.checkoutPaymentCreate?.errors[0];
        setIsLoading(false);
        // setLoadingCheckout(false);
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
        setIsLoading(false);

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
      if (data?.checkoutBillingAddressUpdate?.errors.length === 0) {
        const checkoutId = data?.checkoutBillingAddressUpdate?.checkout?.id;
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
          createPaymentCheckout({
            variables: {
              checkoutId,
              input: {
                amount: total,
                gateway: checkoutPayment.gateway,
                returnUrl: window.location.origin,
                token: "not-charged",
              },
            },
          });
        }
      } else {
        const {
          message,
          field,
        } = data?.checkoutBillingAddressUpdate?.errors[0];
        // setLoadingCheckout(false);
        setIsLoading(false);

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
  // const [lines, setLines] = React.useState([]);

  const [createCheckout] = useMutation(CreateCheckout, {
    onCompleted: data => {
      if (data?.checkoutCreate?.errors.length === 0) {
        setPaymentMethodAvailable(
          data?.checkoutCreate?.checkout?.availablePaymentGateways || []
        );
        const temp = {
          availablePaymentGateways:
            data?.checkoutCreate?.checkout?.availablePaymentGateways,
          token: data?.checkoutCreate?.checkout?.token,
          id: data?.checkoutCreate?.checkout?.id,
        };
        localStorage.setItem("data_checkout", JSON.stringify(temp));
        // setCheckoutId(checkoutId);
      } else {
        const { message, field } = data?.checkoutCreate?.errors[0];
        setIsLoading(false);
        // setLoadingCheckout(false);
        alert.show(
          {
            title: `${field}, ${message}`,
          },
          { type: "error" }
        );
      }
    },
  });

  // const varLoading = useCallback(() => {
  //   setLoadingCheckout(loadingCreateCheckout);
  // }, [loadingCreateCheckout]);

  useEffect(() => {
    setCheckoutPayment({
      amount: total,
      gateway: opt[0]?.gateway,
      // chỗ này dẫn link sang page order historry
      returnUrl: window ? `${window.location.origin}/order-history` : "",
      token: "not-charged",
    });
  }, [paymentMethodAvailable]);

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

  const onRequestClose = () => {
    // setIsOpen(false);
    setIsOpenOrder(false);
    setIsOpenDelivery(false);
    // setIsOpenService(false);
  };

  const { t } = useTranslation();

  const [getTable] = useLazyQuery(getTableService, {
    variables: {
      id: qr,
    },
    fetchPolicy: "network-only",
    onCompleted: data => {
      if (data) {
        setTable(data?.tableService?.tableName);
      }
    },
  });

  React.useEffect(() => {
    if (qr) {
      getTable();
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    createCheckout({
      variables: {
        input: {
          channel: channelSlug,
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
          orderType: "DINEIN",
          tableName: table,
        },
      },
    });
  }, [table]);

  const onHandleSubmitCheckout = async (dataSubmit: any) => {
    const checkoutId = JSON.parse(localStorage.getItem("data_checkout"))?.id;

    await updateCheckoutInfo({
      variables: {
        checkoutId,
        input: {
          orderType: "DINEIN",
          expectedDate: null,
          expectedTime: null,
          note: dataSubmit.note,
        },
      },
    });

    updateAddress({
      variables: {
        checkoutId,
        billingAddress: {
          firstName: myStore?.myStore?.name,
          lastName: "Store",
          streetAddress1: myStore?.myStore?.address,
          streetAddress2: myStore?.myStore?.address,
          country: countryCode,
        },
      },
    });

    onRequestClose();
  };

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
          <CheckoutQrForm
            btnRef={btnRef}
            formRef={formRef}
            myStore={myStore}
            date={date}
            paymentMethodAvailable={opt || []}
            setIsCheckForm={setIsCheckForm}
            setLoadingCheckout={setLoadingCheckout}
            setCheckoutPayment={setCheckoutPayment}
            checkoutPayment={checkoutPayment}
            onSubmit={onHandleSubmitCheckout}
            createPaymentCheckout={createPaymentCheckout}
            checkoutId={JSON.parse(localStorage.getItem("data_checkout"))?.id}
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
              price={`${currency} ${parseFloat(total)
                .toFixed(2)
                .replace(".", ",")}`}
              onClick={handleSubmitCheckout}
              isDisable={loadingCheckout || !isAllowCheckout || isCheckForm}
              // color="#FF6347"
            />
          </S.ButtonWrap>
        </S.Wrapper>

        <S.Wrapper2>
          <OrderBasket
            isGoingUp={goingUp}
            idTable={qr}
            contantFee={contantFee}
            onSubmitCheckout={onHandleSubmitCheckout}
            itemCount={itemCount}
            qr={table}
            deliveryFee={deliveryFee}
            isOpen={setIsOpenOrder}
            isOpenDelivery={setIsOpenDelivery}
            typeDelivery={typeDelivery}
            typePayment={typePayment}
            cartItems={cartItems}
            total={total}
            canOrder={
              qr
                ? checkOpen(
                    timeLine,
                    today === 0 ? 6 : today - 1,
                    typeDelivery.value,
                    emergency,
                    true,
                    new Date()
                  )
                : checkCanOrder(
                    serviceTimeOption,
                    timeLine,
                    today === 0 ? 6 : today - 1,
                    typeDelivery?.value,
                    emergency,
                    new Date()
                  )
            }
            valueDelivery={valueDelivery}
            isDisable={!isAllowCheckout}
            discount={discount}
            discountType={discountType}
            currency={currency}
            setIsLoading={setIsLoading}
            date={null}
            curTypeDelivery={curTypeDelivery}
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
                    currency={currency}
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

export default CheckoutQr;
