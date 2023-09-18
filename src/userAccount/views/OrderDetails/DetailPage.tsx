import Link from "next/link";
import React from "react";
import ReactSVG from "react-svg";

import { Loader } from "@components/atoms";
import OrderBasket from "@components/molecules/OrderBasket";
import { checkCurrency } from "@utils/money";

import arrowBack from "../../../images/arrow-back.svg";
import bagCancel from "../../../images/BagCancel.svg";
import * as S from "./styles";
import { getPriceDetail } from "./utils";

const url =
  "https://s3-alpha-sig.figma.com/img/644d/9724/ed4e6d3d0a176162636e6ad26790dbfd?Expires=1624838400&Signature=HuajiqwWhHxmbqEv1PwSrGbyRi59bEJZSUPUGZGt8pVvKdYMiARuvGF2aFiY~GaDzV3yNEGNQq5SvXAHN1tuARwlbaVTn8SuDSTaST1Q9pxGHiBln6WdsqcILdL3sKvsvPe-WGVp3nuw23oPwHZXBhg9DlojmtrcXAyGJxuPGlQ7DM7Sqk2wIcxDH4TUI~K8OZfDm4YPclAVkvHz~lADXCk0yjTGzaIVpfNjyAExkoriOMJcpuhT3QQBkDR~iPm3IuBgJv9RgXACZpw8LDcz4kZsmB-rky6JDsSNPsd9rz4q0FUHv0gtmEkkLid90gC56Om8RIoXPhMHgKB4hgr63g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
interface IProps {
  orderDetail?: any;
  myStore?: any;
  isFail?: boolean;
}
function DetailPage({ orderDetail, myStore, isFail }: IProps) {
  if (isFail) {
    return (
      <S.Parallax bgUrl={myStore?.myStore?.coverPhoto?.url || url}>
        <div className="container">
          <S.ImageBox>
            <S.Image src={myStore?.myStore?.coverPhoto?.url || url} />
          </S.ImageBox>
          <S.Container2>
            <S.Wrapper3>
              {/* <S.OrderDetail>
                <S.Header>
                  <S.Title>Oops!!!!!!</S.Title>
                  <S.HeadText>
                    Sorry! Something wrong in your order section!, please go
                    back to{" "}
                    <Link href="/">
                      <a style={{ color: "blue", textDecoration: "underline" }}>
                        Home
                      </a>
                    </Link>{" "}
                    page
                  </S.HeadText>
                </S.Header>
              </S.OrderDetail> */}
              <S.OrderDetail>
                <S.Header>
                  <S.Title>Your order is cancelled</S.Title>
                  <S.SubImage>
                    <S.IconBox>
                      <ReactSVG path={bagCancel} />
                    </S.IconBox>
                  </S.SubImage>
                  <S.HeadText>
                    It looks like your payment has not gone through. Please try
                    to order again.
                  </S.HeadText>
                  <S.Link>
                    <S.IconBox>
                      <ReactSVG path={arrowBack} />
                    </S.IconBox>
                    <Link href="/">
                      <a style={{ color: "#808080" }}>Back to Home</a>
                    </Link>
                  </S.Link>
                </S.Header>
              </S.OrderDetail>
            </S.Wrapper3>
            {/* <S.Wrapper2></S.Wrapper2> */}
          </S.Container2>
        </div>
      </S.Parallax>
    );
  }

  const carts = (orderDetail?.lines || []).map(cart => {
    const opts = JSON.parse(JSON.parse(cart.optionItems));
    const options = {
      single: [],
      multiple: [],
    };
    (opts || []).forEach(e => {
      if (e.type === "single") {
        options.single.push({ ...e, text: e.name });
      } else {
        options.multiple.push({ ...e, text: e.name });
      }
    });

    return {
      id: cart?.id,
      currency: checkCurrency(cart?.totalPrice?.gross?.currency),
      price: getPriceDetail(cart?.unitPrice),
      name: cart.productName,
      quantity: cart.quantity,
      total: getPriceDetail(cart?.unitPrice),
      options,
    };
  });
  const tableName = orderDetail?.tableName;
  const discount = orderDetail?.discounts[0]?.amount?.amount;

  if (typeof orderDetail === "undefined" || carts.length === 0) {
    return <Loader />;
  }
  const getFullAddress = address => {
    let result = "";
    if (address?.streetAddress1) {
      result += `${address?.streetAddress1} `;
    }
    if (address?.apartment) {
      result += `${address?.apartment}, `;
    }
    if (address?.postalCode) {
      result += `${address?.postalCode}, `;
    }
    if (address?.city) {
      result += `${address?.city}`;
    }
    return result;
  };

  const getFullStoreAddress = address => {
    let result = "";
    if (address?.address) {
      result += `${address?.address}, `;
    }
    if (address?.postalCode) {
      result += `${address?.postalCode}, `;
    }
    if (address?.city) {
      result += `${address?.city}`;
    }
    return result;
  };

  // console.log(dayNow);

  // console.log(
  //   new Date(dayNow).getTime() === new Date(orderDetail?.expectedDate).getTime()
  // );

  const subtitleByOrderType = orderType => {
    let defaultType = "Delivery moment";
    if (orderType) {
      if (orderType === "PICKUP") {
        defaultType = "Pickup moment";
      }
      if (orderType === "DINEIN") {
        defaultType = null;
      }
    }
    return defaultType;
  };

  return (
    <>
      <S.Parallax bgUrl={myStore?.myStore?.coverPhoto?.url || url}>
        <div className="container">
          <S.ImageBox>
            <S.Image src={myStore?.myStore?.coverPhoto?.url || url} />
          </S.ImageBox>
          <S.Container>
            <S.Wrapper>
              <S.OrderDetail>
                <S.Header>
                  <S.Title>
                    {orderDetail?.orderType !== "DINEIN"
                      ? `Thanks for your order,
                      ${orderDetail?.billingAddress?.firstName}!`
                      : "Thanks for your order!"}
                  </S.Title>
                  <S.HeadText>
                    {orderDetail?.orderType !== "DINEIN"
                      ? `Your order number is ${orderDetail?.number}.`
                      : `Your QR-order is for ${tableName}.`}
                  </S.HeadText>
                </S.Header>
                {/* <S.Divider /> */}
                {/* <CheckoutProgress title="Order status" /> */}
                <S.Divider />
                <S.PickupDetail>
                  <S.PickupTitle>
                    {orderDetail?.orderType === "PICKUP"
                      ? "Pickup details"
                      : orderDetail?.orderType === "DELIVERY"
                      ? "Delivery details"
                      : null}
                  </S.PickupTitle>

                  <S.SubTitle>
                    {subtitleByOrderType(orderDetail?.orderType)}
                  </S.SubTitle>
                  <S.Text>
                    {/* {new Date(dayNow).getTime() ===
                      new Date(orderDetail?.expectedDate).getTime()
                        ? `Today, ${formatTime(orderDetail?.expectedDate)}`
                        : formatTime(orderDetail?.expectedDate)} */}
                    {orderDetail?.expectedDate}
                  </S.Text>
                  <S.Text className="mb-16">{orderDetail?.expectedTime}</S.Text>
                  {orderDetail?.orderType === "PICKUP" && (
                    <>
                      <S.SubTitle>Pickup location</S.SubTitle>
                      <S.Text className="mb-16">
                        {getFullStoreAddress(myStore?.myStore)}
                      </S.Text>
                    </>
                  )}

                  {orderDetail?.orderType !== "DINEIN" && (
                    <>
                      <S.SubTitle>Receiver</S.SubTitle>
                      <S.Text>
                        {orderDetail?.billingAddress?.firstName}{" "}
                        {orderDetail?.billingAddress?.lastName}
                      </S.Text>
                      <S.Text>
                        {getFullAddress(orderDetail?.billingAddress)}{" "}
                      </S.Text>
                      <S.Text>{orderDetail?.userEmail} </S.Text>
                      <S.Text>
                        {orderDetail?.billingAddress?.phone || ""}{" "}
                      </S.Text>
                      <S.Text className="mb-16">
                        {orderDetail?.billingAddress?.companyName || ""}{" "}
                      </S.Text>
                    </>
                  )}

                  <S.SubTitle>Order note, special instructions</S.SubTitle>
                  <S.Text>{orderDetail?.customerNote}</S.Text>
                </S.PickupDetail>
              </S.OrderDetail>
            </S.Wrapper>
            <S.Wrapper2>
              <OrderBasket
                isPlace
                title="Order details"
                cartItems={carts}
                deliveryFee={orderDetail?.deliveryFee || 0}
                discount={discount || 0}
                discountType="FIXED"
                total={getPriceDetail(orderDetail?.total) || 0}
                canOrder
                currency={carts[0]?.currency}
                typeDelivery={
                  orderDetail?.orderType === "DELIVERY"
                    ? {
                        value: "delivery",
                      }
                    : orderDetail?.orderType === "PICKUP"
                    ? {
                        value: "pickup",
                      }
                    : {
                        value: "dine in",
                      }
                }
                typePayment={
                  orderDetail?.payments[0]?.gateway === "mirumee.payments.dummy"
                    ? { type: "CASH" }
                    : { type: "STRIPE" }
                }
                contantFee={
                  orderDetail?.payments[0]?.gateway === "mirumee.payments.dummy"
                    ? orderDetail?.transactionCost
                    : 0
                }
                transFee={
                  orderDetail?.payments[0]?.gateway === "mirumee.payments.dummy"
                    ? 0
                    : orderDetail?.transactionCost
                }
              />
            </S.Wrapper2>
          </S.Container>
        </div>
      </S.Parallax>
      {/* <div
        style={{ padding: "0 15px", minHeight: "60vh", margin: "32px 0 0 0" }}
      >
        <OrderBasket
          isPlace
          title="Order details"
          cartItems={carts}
          deliveryFee={orderDetail?.deliveryFee || 0}
          discount={discount || 0}
          discountType="FIXED"
          total={getPriceDetail(orderDetail?.total) || 0}
          canOrder
          currency={carts[0]?.currency}
          typeDelivery={{
            value: "dine in",
          }}
          typePayment={
            orderDetail?.payments[0]?.gateway === "mirumee.payments.dummy"
              ? { type: "CASH" }
              : { type: "STRIPE" }
          }
          contantFee={
            orderDetail?.payments[0]?.gateway === "mirumee.payments.dummy"
              ? orderDetail?.transactionCost
              : 0
          }
          transFee={
            orderDetail?.payments[0]?.gateway === "mirumee.payments.dummy"
              ? 0
              : orderDetail?.transactionCost
          }
          tableName={tableName}
        />
      </div> */}
    </>
  );
}

export default DetailPage;
