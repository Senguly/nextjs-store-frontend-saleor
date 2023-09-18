/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/default */
/* eslint-disable import/namespace */
import React from "react";
import { useTranslation } from "react-i18next";
import ReactSVG from "react-svg";

import ButtonIcon from "../ButtonIcon";
import TextFieldDialog from "./components/TextFieldDialog";
import * as S from "./styles";

import cart from "images/cart.svg";
import Delivery from "images/Delivery.svg";
import x from "images/x.svg";

interface IProps {
  isOpen?: any;
  typeDelivery?: any;
  setTypeDelivery?: any;
  curDelivery?: any;
  setValueDelivery?: any;
  valueDelivery?: string | number | undefined;
  myStore?: any;
  setCurTypeDelivery?: any;
}

const DeliveryContent = (
  onChange: (value: string) => void,
  value: string | number | undefined,
  valueHandler: string,
  action: boolean
) => {
  const { t } = useTranslation();
  return (
    <>
      <S.Text>
        {t("Fill in your postcode to see if we deliver to your area.")}
      </S.Text>
      <TextFieldDialog onChange={onChange} value={value} />
      {action && valueHandler.length > 0 ? (
        <S.HelperText>
          {t(
            "Sorry, we do not deliver to this area. Try another postcode or place a pickup delivery instead."
          )}
        </S.HelperText>
      ) : null}
    </>
  );
};

const PickupContent = (address?: any, postal?: string, city?: string) => {
  const { t } = useTranslation();
  return (
    <>
      <S.Text>{t("Place your order and pick it up at our location")}</S.Text>
      <S.PickupText>
        {address}, {postal}, {city}
      </S.PickupText>
    </>
  );
};

function DeliveryDialog({
  isOpen,
  typeDelivery,
  setTypeDelivery,
  curDelivery,
  setValueDelivery,
  valueDelivery,
  myStore,
  setCurTypeDelivery,
}: IProps) {
  const { t } = useTranslation();
  const [isNavigation, setNavigation] = React.useState({
    action: true,
    value: "0",
  });

  const mock = [
    {
      type: t("delivery "),
      icon: Delivery,
      value: "delivery",
      inputValue: "",
    },
    {
      type: t("pickup "),
      icon: cart,
      value: "pickup",
      inputValue: "",
    },
  ];

  const onChange = (value: string) => {
    setNavigation({ value, action: checkArea(value) });
  };

  const onClose = () => {
    setValueDelivery(isNavigation.value);
    isOpen(false);
  };

  React.useEffect(() => {
    setNavigation({
      value: `${valueDelivery}`,
      action: checkArea(`${valueDelivery}`),
    });
  }, []);

  const checkArea = (value: any) => {
    let result = true;
    // let flag = false;
    const valueElement = typeof value === "string" ? value.slice(0, 4) : value;
    const parseArray = JSON.parse(curDelivery?.currentDelivery?.deliveryArea)
      ?.areas;

    // if (value.length <= 7) {

    // }
    for (let i = 0; i < parseArray?.length; i++) {
      if (
        Number(parseArray[i].to) >= valueElement &&
        valueElement >= Number(parseArray[i].from)
      ) {
        result = false;
        // flag = true;
        break;
      }
    }
    // if (
    //   flag &&
    //   isNaN(Number(value.slice(6, 7))) &&
    //   !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value.slice(4, 7).trim())
    // ) {
    //   result = false;
    // }

    return result;
  };

  return (
    <S.Wrapper>
      <S.Head>
        <S.Title>{t("select-order-type")}</S.Title>
        {!isNavigation.action && (
          <S.IconBox onClick={() => isOpen(false)}>
            <ReactSVG path={x} />
          </S.IconBox>
        )}
      </S.Head>
      <S.ContentWrap>
        <S.SelectBox>
          {mock.map((item: any, index: number) => {
            return (
              <S.SelectItem
                key={index}
                onClick={() => {
                  item.value === "delivery"
                    ? setTypeDelivery({
                        type: t("delivery "),
                        icon: Delivery,
                        value: "delivery",
                        inputValue: isNavigation.value,
                      })
                    : setTypeDelivery({
                        type: t("pickup "),
                        icon: cart,
                        value: "pickup",
                        inputValue: "",
                      });
                }}
              >
                <ButtonIcon
                  text={item.type}
                  icon={item.icon}
                  isActive={item.value === typeDelivery.value}
                />
              </S.SelectItem>
            );
          })}
        </S.SelectBox>
        {typeDelivery.value === "delivery"
          ? DeliveryContent(
              onChange,
              valueDelivery,
              isNavigation.value,
              isNavigation.action
            )
          : PickupContent(myStore?.address, myStore?.postalCode, myStore?.city)}

        <ButtonIcon
          text={t("continue ")}
          disable={
            typeDelivery.value === "delivery" ? isNavigation.action : false
          }
          bgColor="#FF6347"
          onClick={() => {
            if (typeDelivery.value === "delivery") {
              if (!isNavigation.action) {
                setTypeDelivery({
                  type: t("delivery "),
                  icon: Delivery,
                  value: "delivery",
                  inputValue: isNavigation.value,
                });
                setCurTypeDelivery({
                  type: t("delivery "),
                  icon: Delivery,
                  value: "delivery",
                  inputValue: isNavigation.value,
                });
                onClose();
              }
            } else {
              setTypeDelivery({
                type: t("pickup "),
                icon: cart,
                value: "pickup",
                inputValue: "",
              });
              onClose();
            }
          }}
        />
      </S.ContentWrap>
    </S.Wrapper>
  );
}

export default DeliveryDialog;
