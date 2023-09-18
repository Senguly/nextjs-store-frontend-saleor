/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-expressions */
// import { Loader } from "@components/atoms";
import { useRouter } from "next/router";
import React from "react";
import { useAlert } from "react-alert";
import { useLazyQuery, useMutation, useQuery } from "react-apollo";
import { useTranslation } from "react-i18next";
import Media from "react-media";
import Modal from "react-modal";

import { Loader } from "@components/atoms";
import AppContent from "@components/atoms/AppContent";
import ButtonCard from "@components/atoms/ButtonCart";
import ListCategory from "@components/atoms/ListCategory";
import ListProduct from "@components/atoms/ListProduct";
import DeliveryDialog from "@components/molecules/DeliveryDialog";
import OrderBasket from "@components/molecules/OrderBasket";
import ProductDialog from "@components/molecules/ProductDialog";
import ServiceTimeDialog from "@components/molecules/ServiceTimeDialog";
import { Overlay } from "@components/organisms";
import { countryCode } from "@temp/constants";
import { CartContext } from "@temp/contexts/CartContext";
import { ServiceContext } from "@temp/contexts/ServiceContext";
import { checkCurrency } from "@utils/money";
import { checkCanOrder, checkOpen } from "@utils/serviceTimeUltil";

import {
  addVoucher,
  CheckoutComplete,
  CheckoutPaymentCreate,
  CreateCheckout,
  UpdateCheckoutBillingAddress,
} from "../Checkout/queries";
import {
  getCurDelivery,
  getSortedProductOptionByProductId,
  getTableService,
  TypedGetListCategory,
} from "./queries";
import * as S from "./styles";
import { formatDay } from "./util";

import cart from "images/cart.svg";
import Delivery from "images/Delivery.svg";

// import Delivery from "images/Delivery.svg";

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
    maxHeight: "900px",
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

const Mock = [
  {
    day: "Monday",
    openDelivery: [],
    closeDelivery: [],
    openPickup: [],
    closePickup: [],
  },
  {
    day: "Tuesday",
    openDelivery: [],
    closeDelivery: [],
    openPickup: [],
    closePickup: [],
  },
  {
    day: "Wednesday",
    openDelivery: [],
    closeDelivery: [],
    openPickup: [],
    closePickup: [],
  },
  {
    day: "Thursday",
    openDelivery: [],
    closeDelivery: [],
    openPickup: [],
    closePickup: [],
  },
  {
    day: "Friday",
    openDelivery: [],
    closeDelivery: [],
    openPickup: [],
    closePickup: [],
  },
  {
    day: "Saturday",
    openDelivery: [],
    closeDelivery: [],
    openPickup: [],
    closePickup: [],
  },
  {
    day: "Sunday",
    openDelivery: [],
    closeDelivery: [],
    openPickup: [],
    closePickup: [],
  },
];
// Modal.setAppElement("#root");

function Order({ myStore }: any) {
  Modal.setAppElement(document.getElementById("root"));

  console.log("Here is sortedDataProductOption")

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);

  const [isOpenService, setIsOpenService] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [curProduct, setCurProduct] = React.useState(null);
  const [table, setTable] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const { t } = useTranslation();
  const router = useRouter();
  const alert = useAlert();
  const { qr } = router.query;

  const {
    addTypeDelivery,
    typeDelivery,
    cartItems,
    total,
    deliveryFee,
    isAllowCheckout,
    discount,
    discountType,
    clearTypePayment,
    itemCount,
    handleCheckout,
    addTypePayment,
    promoCode,
    contantFee,
    addCurTypeDelivery,
    curTypeDelivery,
    freeForBigOrder,
    minOrderByPostCode,
  }: // contantFee,
  // discount
  any = React.useContext(CartContext);
  const { serviceTimeOption, timeLine, emergency }: any = React.useContext(
    ServiceContext
  );

  const checker = checkCanOrder(
    serviceTimeOption,
    timeLine,
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
    "delivery",
    emergency,
    new Date()
  );
  const [isOpenDelivery, setIsOpenDelivery] = React.useState(checker || false);

  const [valueDelivery, setValueDelivery] = React.useState(
    curTypeDelivery.inputValue
  );

  const { data: curDelivery } = useQuery(getCurDelivery, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  const [getTable] = useLazyQuery(getTableService, {
    variables: {
      id: qr,
    },
    fetchPolicy: "network-only",
    onCompleted: data => {
      let err = false;
      if (qr) {
        addTypePayment({ type: "CASH" });
        addTypeDelivery({
          type: t("table "),
          icon: cart,
          value: "table",
          inputValue: "",
        });
        if (typeof data !== "undefined") {
          if (data?.tableService) {
            if (!data?.tableService.active) {
              err = true;
              alert.show(
                {
                  title: `QR code no longer valid, please try with another one.`,
                },
                { type: "error" }
              );
            } else {
              err = false;
            }
            setTable(data?.tableService?.tableName);
          } else {
            err = true;
            setTable(qr);
            alert.show(
              {
                title: `QR code no longer valid, please try with another one.`,
              },
              { type: "error" }
            );
          }
        } else {
          setTable(qr);
          err = true;
        }
      }
      setIsError(err);
    },
    onError: err => {
      if (err && qr) {
        setTable(qr);
        setIsError(true);
      }
    },
  });

  const [
    getSortedDataProductOption,
    { data: sortedDataProductOption },
  ] = useLazyQuery(getSortedProductOptionByProductId, {
    fetchPolicy: "no-cache",
    variables: {
      productId: curProduct?.id || "",
    },
  });

  const [checkoutComplete] = useMutation(CheckoutComplete, {
    onCompleted: data => {
      if (data?.checkoutComplete?.errors.length === 0) {
        handleCheckout();
        alert.show(
          {
            title: "Place order success",
          },
          { type: "success" }
        );
        const token = data?.checkoutComplete?.order.token;
        router.push(`/order-history/${token}?qr=${qr}`);
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
        createPaymentCheckout({
          variables: {
            checkoutId,
            input: {
              amount: total,
              gateway: "mirumee.payments.dummy",
              returnUrl: "http://localhost:3000/",
              token: "not-charged",
            },
          },
        });
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

  const [createCheckout] = useMutation(CreateCheckout, {
    onCompleted: data => {
      if (data?.checkoutCreate?.errors.length === 0) {
        const checkoutId = data?.checkoutCreate?.checkout?.id;
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

  const prevScrollY = React.useRef(0);
  const [goingUp, setGoingUp] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY: any = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  React.useEffect(() => {
    if (qr) {
      getTable();
    }
    clearTypePayment();

    // if (!checker) {
    //   addTypeDelivery({
    //     type: t("pickup "),
    //     icon: cart,
    //     value: "pickup",
    //     inputValue: "",
    //   });
    // }
    // else {
    //  setIsOpenDelivery(true)
    // }
    //  console.log(checker);
  }, []);

  React.useEffect(() => {
    if (qr) {
      addTypeDelivery({
        type: t("table "),
        icon: cart,
        value: "table",
        inputValue: "",
      });
    } else {
      if (typeDelivery.value === "table" && typeDelivery.inputValue === "") {
        addTypeDelivery({
          type: t("delivery "),
          icon: Delivery,
          value: "delivery",
          inputValue: "",
        });
      }
      setIsError(false);
      setTable(null);
    }
  }, [qr]);

  React.useEffect(() => {
    if (!checker) {
      addTypeDelivery({
        type: t("pickup "),
        icon: cart,
        value: "pickup",
        inputValue: "",
      });
    } else {
      setIsOpenDelivery(true);
    }
  }, [checker]);

  React.useEffect(() => {
    if (curProduct && curProduct?.id) {
      getSortedDataProductOption();
    }
  }, [curProduct]);

  const today = new Date().getDay();

  const onRequestClose = () => {
    setIsOpen(false);
    setIsOpenOrder(false);
    setIsOpenDelivery(false);
    setIsOpenService(false);
  };

  const onHandleSubmitCheckout = () => {
    setIsLoading(true);
    createCheckout({
      variables: {
        input: {
          channel: myStore?.myStore?.channel.slug,
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
    onRequestClose();
  };

  return (
    <div className="container">
      {/* <Loader fullScreen /> */}
      <Overlay
        position="center"
        children={<Loader transparent />}
        show={isLoading}
        hide={() => null}
      />
      {/*  */}
      {/*  */}
      <TypedGetListCategory
        variables={{
          first: 100,
          currency: myStore?.myStore?.channel?.slug,
        }}
      >
        {({ data }) => {
          const listCategory = data.categories.edges;
          // console.log(listCategory,"-----list");

          const cloneService = JSON.parse(JSON.stringify(Mock));
          Object.keys(timeLine).map(sv => {
            timeLine[sv].map(item => {
              item?.days.map((day, index) => {
                if (day) {
                  if (sv === "dl") {
                    cloneService[index].openDelivery.push(item.open);
                    cloneService[index].closeDelivery.push(item.close);
                  } else if (sv === "pu") {
                    cloneService[index].openPickup.push(item.open);
                    cloneService[index].closePickup.push(item.close);
                  }
                }
              });
            });
          });

          return (
            <S.Container>
              <Overlay
                position="center"
                children={<Loader transparent />}
                show={isLoading}
                hide={() => null}
              />
              <S.Wrapper>
                {!qr && (
                  <AppContent
                    typeDelivery={typeDelivery}
                    setIsOpenService={setIsOpenService}
                    coverPhoto={myStore?.myStore?.coverPhoto}
                    logo={myStore?.myStore?.logo}
                    myStore={myStore?.myStore}
                    serviceTime={formatDay(cloneService)}
                    curDelivery={curDelivery?.currentDelivery}
                    currency={checkCurrency(
                      myStore?.myStore?.channel?.currencyCode
                    )}
                    freeForBigOrder={freeForBigOrder}
                    minOrderByPostCode={minOrderByPostCode}
                    deliveryFee={deliveryFee}
                    isOpen={checkOpen(
                      timeLine,
                      today === 0 ? 6 : today - 1,
                      typeDelivery.value,
                      emergency,
                      true,
                      new Date()
                    )}
                  />
                )}

                <ListCategory ListCategory={listCategory} />

                <ListProduct
                  listCategory={listCategory}
                  isOpen={setIsOpen}
                  cartItems={cartItems}
                  setCurProduct={setCurProduct}
                />
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
                  cartItems={cartItems}
                  total={total}
                  // curDelivery={curDelivery.currentDelivery}
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
                  currency={checkCurrency(
                    myStore?.myStore?.channel?.currencyCode
                  )}
                  setIsLoading={setIsLoading}
                  date={null}
                  curTypeDelivery={curTypeDelivery}
                />
              </S.Wrapper2>

              <S.ButtonWrap onClick={() => setIsOpenOrder(true)}>
                <ButtonCard
                  icon={cart}
                  text="View order"
                  price={
                    !qr
                      ? `${checkCurrency(
                          myStore?.myStore?.channel?.currencyCode
                        )} ${parseFloat(total).toFixed(2).replace(".", ",")}`
                      : `${itemCount} items`
                  }
                  color="#FF6347"
                />
              </S.ButtonWrap>
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
                        isOpen={isOpen}
                        style={style}
                        onRequestClose={onRequestClose}
                        // portalClassName="customizeModal"
                      >
                        <ProductDialog
                          curProduct={curProduct}
                          isOpen={setIsOpen}
                          sortedProductOption={sortedDataProductOption}
                        />
                      </Modal>

                      <Modal
                        isOpen={isError ? true : isOpenOrder}
                        style={style}
                        onRequestClose={onRequestClose}
                      >
                        <OrderBasket
                          idTable={qr}
                          title={isError && "Our apologies."}
                          contantFee={contantFee}
                          onSubmitCheckout={onHandleSubmitCheckout}
                          itemCount={itemCount}
                          qr={table}
                          deliveryFee={deliveryFee}
                          isOpen={setIsOpenOrder}
                          isOpenDelivery={setIsOpenDelivery}
                          typeDelivery={typeDelivery}
                          valueDelivery={valueDelivery}
                          cartItems={cartItems}
                          total={total}
                          isDialog
                          canOrder={
                            isError
                              ? false
                              : checkCanOrder(
                                  serviceTimeOption,
                                  timeLine,
                                  today === 0 ? 6 : today - 1,
                                  typeDelivery?.value,
                                  emergency
                                )
                          }
                          isDisable={!isAllowCheckout}
                          discount={discount}
                          discountType={discountType}
                          currency={checkCurrency(
                            myStore?.myStore?.channel?.currencyCode
                          )}
                          setIsLoading={setIsLoading}
                          date={null}
                          curTypeDelivery={curTypeDelivery}
                        />
                      </Modal>
                      {!qr && (
                        <Modal
                          isOpen={isOpenDelivery}
                          style={style}
                          // onRequestClose={onRequestClose}
                        >
                          <DeliveryDialog
                            isOpen={setIsOpenDelivery}
                            setTypeDelivery={addTypeDelivery}
                            setCurTypeDelivery={addCurTypeDelivery}
                            setValueDelivery={setValueDelivery}
                            typeDelivery={typeDelivery}
                            curDelivery={curDelivery}
                            valueDelivery={valueDelivery}
                            myStore={myStore?.myStore}
                          />
                        </Modal>
                      )}

                      <Modal
                        isOpen={isOpenService}
                        style={style}
                        onRequestClose={onRequestClose}
                      >
                        <ServiceTimeDialog
                          title={t("Delivery & pickup schedule")}
                          isOpen={setIsOpenService}
                          data={formatDay(cloneService)}
                        />
                      </Modal>
                    </>
                  );
                }}
              </Media>
            </S.Container>
          );
        }}
      </TypedGetListCategory>
    </div>
  );
}

export default Order;
