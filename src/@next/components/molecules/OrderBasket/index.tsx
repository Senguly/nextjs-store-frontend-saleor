/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/require-default-props */
/* eslint-disable import/namespace */
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactSVG from "react-svg";
import { useCheckServiceTime } from "src/views/Order/useCheckServiceTime";

import ButtonCard from "@components/atoms/ButtonCart";
import { ServiceContext } from "@temp/contexts/ServiceContext";
import { checkCanOrder } from "@utils/serviceTimeUltil";

import ButtonIcon from "../ButtonIcon";
import ItemBasket from "./components/ItemBasket";
import * as S from "./styles";

import Delivery from "images/Delivery.svg";
import Pencil from "images/Pencil.svg";
import plusadd from "images/plusadd.svg";
import serve from "images/serve.svg";
import x from "images/x.svg";

interface IProps {
  itemCount?: any;
  title?: string;
  isOpen?: any;
  isOpenDelivery?: any;
  typeDelivery?: any;
  isCheckout?: boolean;
  isPlace?: boolean;
  btnRef?: any;
  cartItems?: any;
  total?: any;
  isDialog?: any;
  canOrder?: boolean;
  valueDelivery?: string;
  handleSubmitCheckout?: any;
  deliveryFee?: any;
  isDisable?: boolean;
  discount?: any;
  discountType?: any;
  transFee?: any;
  contantFee?: any;
  typePayment?: any;
  onUpdateLines?: any;
  setLoadingCheckout?: any;
  qr?: any;
  onSubmitCheckout?: any;
  currency?: any;
  tableName?: any;
  setIsLoading?: any;
  date?: any;
  idTable?: any;
  curTypeDelivery?: any;
  isGoingUp?: boolean;
  handleDeleteLine?: any;
}

function OrderBasket({
  isGoingUp,
  idTable,
  title,
  isOpen,
  isOpenDelivery,
  typeDelivery,
  isCheckout,
  isPlace,
  btnRef,
  cartItems,
  total,
  isDialog,
  canOrder,
  valueDelivery,
  handleSubmitCheckout,
  deliveryFee,
  isDisable,
  discount,
  discountType,
  transFee,
  contantFee,
  typePayment,
  onUpdateLines,
  qr,
  itemCount,
  onSubmitCheckout,
  currency,
  tableName,
  setIsLoading,
  date,
  curTypeDelivery,
  handleDeleteLine,
}: IProps) {
  console.log("OrderBusket", currency);
  const router = useRouter();
  const { t } = useTranslation();
  const { serviceTimeOption, timeLine, emergency }: any = React.useContext(
    ServiceContext
  );
  const onHandleSubmitCheckout = () => {
    if (qr) {
      // onSubmitCheckout();
      setIsLoading(true);
      router.push(`/checkoutqr${router.asPath}`);
    } else if (btnRef && btnRef.current) {
      handleSubmitCheckout();
    } else {
      setIsLoading(true);
      router.push("/checkout");
    }
  };

  const checkSpace = () => {
    let result = deliveryFee || discount;
    if (typePayment && typePayment.type === "CASH") {
      result = result || contantFee || 0;
    } else {
      result = result || transFee || 0;
    }
    return result === 0;
  };

  const { triggleCheck, canOrder: canOrderChecked } = useCheckServiceTime(
    typeDelivery,
    () => {
      const url = window.location.href;
      window.location.href = url;
    },
    onHandleSubmitCheckout,
    date && date?.value,
    idTable
  );

  const checker = checkCanOrder(
    serviceTimeOption,
    timeLine,
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
    "delivery",
    emergency,
    new Date()
  );

  canOrder = canOrderChecked || canOrder;

  return (
    <S.Wrapper isDialog={isDialog} isPlace={isPlace} isGoingUp={isGoingUp}>
      <>
        <S.Header>
          <S.Title>
            {title || (!canOrder ? t("Our apologies.") : t("your-order"))}
          </S.Title>

          {isOpen && isDialog && (
            <S.IconBox onClick={() => isOpen(false)}>
              <ReactSVG path={x} />
            </S.IconBox>
          )}
        </S.Header>

        {tableName && (
          <S.SubTitle>{`Your order will be served to ${tableName}.`}</S.SubTitle>
        )}
        <S.Spacer />
        {!qr ? (
          isCheckout ? (
            <>
              <ButtonIcon
                text={t("add-more")}
                icon={plusadd}
                onClick={() => router.push("/")}
              />
              <S.Spacer />
            </>
          ) : !isPlace ? (
            <>
              <S.DeliveryBox
                isDisable={!checker}
                onClick={() => {
                  if (checker) {
                    isOpen(false);
                    isOpenDelivery(true);
                  }
                }}
              >
                <S.DeliveryInfo>
                  <S.Box>
                    <ReactSVG path={typeDelivery.icon} />
                  </S.Box>
                  {typeDelivery.value === "delivery" ? (
                    <S.DeliveryText>
                      {t("delivering ")}
                      <span style={{ fontWeight: 400 }}>{t(" to ")}</span>
                      {`${curTypeDelivery.inputValue} `}
                    </S.DeliveryText>
                  ) : (
                    <S.DeliveryText>
                      {t("pickup ")}
                      <span style={{ fontWeight: 400 }}>
                        &nbsp;{t("at our location")}
                      </span>
                    </S.DeliveryText>
                  )}
                </S.DeliveryInfo>
                {checker && (
                  <S.Box>
                    <ReactSVG path={Pencil} />
                  </S.Box>
                )}
              </S.DeliveryBox>
              <S.Spacer />
            </>
          ) : null
        ) : (
          canOrder && (
            <>
              <S.DeliveryBox
                onClick={() => {
                  isOpen(false);
                  isOpenDelivery(true);
                }}
              >
                <S.DeliveryInfo>
                  <ReactSVG path={serve} />
                  <S.DeliveryText>
                    QR-order <span style={{ fontWeight: 400 }}>for</span>{" "}
                    {`${qr} `}
                  </S.DeliveryText>
                </S.DeliveryInfo>
              </S.DeliveryBox>
              <S.Spacer />
            </>
          )
        )}
        {canOrder ? (
          <>
            <S.ItemList isPlace={isPlace}>
              {(cartItems || []).map((item: any, index: number) => {
                return (
                  <ItemBasket
                    key={index}
                    cartItem={item}
                    cartItems={cartItems}
                    isPlace={isPlace}
                    isCheckout={isCheckout}
                    onUpdateLines={onUpdateLines}
                    handleDeleteLine={handleDeleteLine}
                  />
                );
              })}
            </S.ItemList>
            <S.DiscountBox element={checkSpace()}>
              {discount === 0 ? null : (
                <>
                  <S.DiscountItem>
                    <S.DiscountTitle>{t("discount ")}</S.DiscountTitle>
                    <S.Discount>
                      {"-" +
                        `${
                          discountType === "FIXED" ? currency : "%"
                        } ${discount.toFixed(2).replace(".", ".")}`}
                    </S.Discount>
                  </S.DiscountItem>
                </>
              )}

              <>
                {typeof typePayment !== "undefined" &&
                  (typePayment?.type === "CASH" || qr ? (
                    contantFee === 0 ? null : (
                      <S.DiscountItem>
                        <>
                          <S.DeliveryTitle>
                            {t("Transaction cost (Cash)")}
                          </S.DeliveryTitle>
                          <S.DeliveryFee>
                            {`${currency} ${contantFee
                              ?.toFixed(2)
                              .replace(".", ".")}`}
                          </S.DeliveryFee>
                        </>
                      </S.DiscountItem>
                    )
                  ) : transFee === 0 ? null : (
                    <S.DiscountItem>
                      <>
                        <S.DeliveryTitle>
                          {t("transaction-cost")}
                        </S.DeliveryTitle>
                        <S.DeliveryFee>
                          {`${currency} ${transFee
                            ?.toFixed(2)
                            .replace(".", ".")}`}
                        </S.DeliveryFee>
                      </>
                    </S.DiscountItem>
                  ))}
              </>

              {!qr && (
                <>
                  {typeDelivery?.value === "delivery" && deliveryFee > 0 && (
                    <S.DiscountItem>
                      <S.DeliveryTitle>{t("delivery-cost")}</S.DeliveryTitle>
                      <S.DeliveryFee>
                        {deliveryFee === 0
                          ? "Free "
                          : // : curDelivery.enableCustomDeliveryFee
                            // ? `${currency} ${renderDeliveryCostByPostCode(
                            //     valueDelivery,
                            //     JSON.parse(curDelivery.deliveryArea).areas
                            //   )
                            //     ?.toFixed(2)
                            //     .replace(".", ".")}`
                            `${currency} ${deliveryFee
                              ?.toFixed(2)
                              .replace(".", ".")}`}
                      </S.DeliveryFee>
                    </S.DiscountItem>
                  )}
                </>
              )}
            </S.DiscountBox>

            {!qr ? (
              <>
                {isPlace ? (
                  <S.DiscountItem>
                    <S.DeliveryTitle>{t("total ")}</S.DeliveryTitle>
                    <S.DeliveryFee>
                      {currency} {total?.toFixed(2).replace(".", ".")}
                    </S.DeliveryFee>
                  </S.DiscountItem>
                ) : (
                  <>
                    {/* {cartItems.length > 0 && <S.Spacer />} */}
                    <S.ButtonWrap>
                      <ButtonCard
                        text={isCheckout ? t("place-order") : t("checkout ")}
                        price={`${currency} ${Number(total)
                          ?.toFixed(2)
                          ?.replace(".", ".")}`}
                        isDisable={isDisable}
                        onClick={() => {
                          triggleCheck();
                        }}
                      />
                    </S.ButtonWrap>
                  </>
                )}
                {isPlace && (
                  <S.SubText isCash={typePayment.type === "CASH"}>
                    {typePayment.type === "CASH"
                      ? `Cash/card upon receipt`
                      : t("Paid with iDEAL")}
                    {/* Paid with {typePayment.type === "CASH" ? "Cash" : "iDEAL"} */}
                  </S.SubText>
                )}
              </>
            ) : (
              <S.ButtonWrap>
                <ButtonCard
                  text={t("Checkout")}
                  price={`${currency} ${Number(total)
                    ?.toFixed(2)
                    ?.replace(".", ".")}`}
                  isDisable={isDisable}
                  onClick={() => {
                    triggleCheck();
                  }}
                />
              </S.ButtonWrap>
            )}
          </>
        ) : qr ? (
          <div>
            <h2 style={{ color: "red", margin: "0 0 24px 0" }}>
              {t(
                "We are not taking orders from this QR code at the moment. Please contact us if this is a mistake, or place a delivery or pickup order instead."
              )}
            </h2>

            <ButtonIcon
              text={t("Order for delivery/pickup")}
              icon={Delivery}
              bgColor="#FF6347"
              // price={`${currency} ${total}`}
              // isDisable={isDisable}
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
        ) : (
          <h2 style={{ color: "red" }}>
            We are closed for {typeDelivery.value} at the moment. Please check
            our opening hours and visit us another time.
          </h2>
        )}
      </>
    </S.Wrapper>
  );
}

export default OrderBasket;
