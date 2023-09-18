/* eslint-disable import/no-unresolved */
/* eslint-disable import/namespace */
import React from "react";
import { useTranslation } from "react-i18next";
import ReactSVG from "react-svg";

import info from "../../../../images/Info.svg";
import Phone from "../../../../images/Phone.svg";
import Pin from "../../../../images/Pin.svg";
import * as S from "./styles";

function AppContent({
  setIsOpenService,
  coverPhoto,
  logo,
  myStore,
  serviceTime,
  curDelivery,
  currency,
  isOpen,
  freeForBigOrder,
  typeDelivery,
  deliveryFee,
  minOrderByPostCode,
}: any) {
  const today = new Date().getDay();
  const getFullAddress = (myStore: any) => {
    const result = [];
    if (myStore.address) {
      result.push(myStore.address);
    }
    if (myStore.postalCode) {
      result.push(myStore.postalCode);
    }
    if (myStore.address) {
      result.push(myStore.city);
    }
    return result.join(", ");
  };
  const { t } = useTranslation();

  return (
    <S.Wrapper backgroundUrl={coverPhoto?.url}>
      <S.HeroContent>
        <S.ImageBox>
          <S.Image src={logo?.url} alt="" />
          <ReactSVG path="" />
        </S.ImageBox>

        <S.Name>{(myStore && myStore.name) || ""}</S.Name>
        <S.RestaurantWrap>
          {/* <S.Table>
            <S.Th></S.Th>
          </S.Table> */}
          <S.InfoWrap>
            <S.InfoItem>
              <S.IconBox>
                <ReactSVG path={Pin} />
              </S.IconBox>
              <S.Info>{myStore && getFullAddress(myStore)}</S.Info>
            </S.InfoItem>

            <S.InfoItem>
              <S.IconBox>
                <ReactSVG path={Phone} />
              </S.IconBox>
              <S.Info>{(myStore && myStore.phone) || ""}</S.Info>
            </S.InfoItem>
          </S.InfoWrap>

          <S.OpenWrap>
            <S.IconBox>
              <S.Status isActive={isOpen} />
            </S.IconBox>
            <S.OpenItem>
              {typeDelivery.value === "delivery" && (
                <S.OpenText>
                  {t("delivery ")}: {t("Today ")}{" "}
                  {today === 0
                    ? serviceTime[6].dl.length === 0
                      ? "Closed"
                      : serviceTime[6].dl
                          .map((item: any) => ` ${item.open} - ${item.close}`)
                          .join(",")
                    : serviceTime[today - 1].dl.length === 0
                    ? "Closed"
                    : serviceTime[today - 1].dl
                        .map((item: any) => ` ${item.open} - ${item.close}`)
                        .join(",")}
                </S.OpenText>
              )}

              <div style={{ display: "flex" }}>
                <S.OpenText>
                  {t("pickup ")}: {t("Today ")}{" "}
                  {today === 0
                    ? serviceTime[6].pu.length === 0
                      ? "Closed"
                      : serviceTime[6].pu
                          .map((item: any) => ` ${item.open} - ${item.close}`)
                          .join(",")
                    : serviceTime[today - 1].pu.length === 0
                    ? "Closed"
                    : serviceTime[today - 1].pu
                        .map((item: any) => ` ${item.open} - ${item.close}`)
                        .join(",")}
                </S.OpenText>
                <S.IconBox
                  className="info"
                  onClick={() => setIsOpenService(true)}
                >
                  <ReactSVG path={info} />
                </S.IconBox>
              </div>
            </S.OpenItem>

            {/* <S.OpenItem></S.OpenItem> */}
          </S.OpenWrap>
        </S.RestaurantWrap>

        {typeDelivery.value === "delivery" && <S.Hr />}

        {typeDelivery.value === "delivery" && (
          <S.FeeWrap>
            <S.FeeItem>
              <S.Title>{t("Delivery minimum")}</S.Title>
              <S.Price>{`${currency} ${
                minOrderByPostCode.toFixed(2).replace(".", ",") ||
                (0).toFixed(2).replace(".", ",")
              }`}</S.Price>
            </S.FeeItem>

            <S.FeeItem>
              <S.Title>{t("Delivery cost")}</S.Title>
              <S.Price>{`${currency} ${
                deliveryFee?.toFixed(2).replace(".", ",") ||
                (0).toFixed(2).replace(".", ",")
              }`}</S.Price>
            </S.FeeItem>

            {freeForBigOrder && curDelivery?.fromDelivery > 0 && (
              <S.FeeItem>
                <S.Title>{t("Free delivery from")}</S.Title>
                <S.Price>{`${currency} ${
                  curDelivery?.fromDelivery.toFixed(2).replace(".", ",") ||
                  (0).toFixed(2).replace(".", ",")
                }`}</S.Price>
              </S.FeeItem>
            )}
          </S.FeeWrap>
        )}
      </S.HeroContent>
    </S.Wrapper>
  );
}

export default AppContent;
