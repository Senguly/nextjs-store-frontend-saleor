/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/default */
/* eslint-disable import/namespace */
import React from "react";
import { useTranslation } from "react-i18next";
import ReactSVG from "react-svg";
import { CartContext } from "src/contexts/CartContext";

import ButtonCard from "@components/atoms/ButtonCart";
import CheckboxContainer from "@components/atoms/FormComponents/Checkbox";
import RadioButtonContainer from "@components/atoms/FormComponents/Radiobutton";
import { checkCurrency } from "@utils/money";

import x from "../../../../images/x.svg";
import QuantityField from "../QuantityField";
import * as S from "./styles";

interface IProps {
  isOpen: any;
  curProduct?: any;
  sortedProductOption?: any;
}

const totalCost = (options: any) => {
  return options.reduce((cur: number, item: any) => cur + item.price, 0);
};

const totalOptionCost = (options: any) => {
  return Object.keys(options).reduce(
    (cur, item) => cur + totalCost(options[item]),
    0
  );
};

const formatDescription = (description: string) => {
  const listText = description.replace(/&nbsp;/gi, "").split("<br>");
  const finalText = listText.map(item => (
    <>
      <span>{item}</span>
      <br />
    </>
  ));
  return finalText;
};

function ProductDialog({ isOpen, curProduct, sortedProductOption }: IProps) {
  const [options, setOptions] = React.useState<any>({
    single: [],
    multiple: [],
  });
  const [price, setPrice] = React.useState(curProduct.price);
  const [totalPrice, setTotalPrice] = React.useState(curProduct.price);

  const { t } = useTranslation();
  const [quantity, setQuantity] = React.useState(1);
  const [optionsError, setOptionsError] = React.useState<any>({});

  const { addProduct, cartItems, updateQuantity }: any = React.useContext(
    CartContext
  );

  const onHandleChange = (event: any, item: any, index: number) => {
    const { name } = event.target;
    const clone = {
      ...options,
    };

    if (name === "checkbox") {
      item.forEach((e?: any, index?: number) => {
        const indexMultipleItem = clone.multiple.findIndex((i: any) => {
          return i.value === e.value;
        });

        if (indexMultipleItem !== -1) {
          if (!e.stt) {
            clone.multiple.splice(indexMultipleItem, 1);
          }
        } else if (e.stt) {
          clone.multiple.push(e);
        }
      });
    } else {
      item.forEach((e?: any, index?: number) => {
        const indexItem = clone.single.findIndex(
          (i: any) => i.value === e.value
        );
        if (indexItem !== -1) {
          if (!e.stt) {
            clone.single.splice(indexItem, 1);
          }
        } else if (e.stt) {
          clone.single.push(e);
        }
      });
    }
    setOptions({ ...clone });
  };

  React.useEffect(() => {
    setPrice(curProduct.price + totalOptionCost(options));
    setTotalPrice((curProduct.price + totalOptionCost(options)) * quantity);
  }, [quantity, options]);

  const enableAddToOrder = (curProduct: any, options: any) => {
    // Filter all required options
    const optionsRequired = curProduct?.options.filter(
      (item: any) => item.required === true
    );

    // Get all options multiple selecting
    const multipleSelecting = options.multiple.reduce(
      (result: any, item: any) => {
        if (result.indexOf(item.optionId) === -1) {
          result.push(item.optionId);
        }
        return result;
      },
      []
    );

    // Get all options single selecting
    const singleSelecting = options.single.reduce((result: any, item: any) => {
      if (result.indexOf(item.optionId) === -1) {
        result.push(item.optionId);
      }
      return result;
    }, []);

    // All multiple + single selecting
    const optionsSelecting = [...singleSelecting, ...multipleSelecting];

    // Compare requiredOptions vs allSelectingOptions
    const isEnable = optionsRequired.every(
      (item: any) => optionsSelecting.indexOf(item.id) !== -1
    );
    return { isEnable, optionsSelecting, optionsRequired };
  };

  // Scroll to Id
  const onScrollToElement = (id: any) => {
    const ele = document.getElementById(id);
    if (ele) {
      ele?.scrollIntoView();
    }
  };

  const handleAddProduct = () => {
    const newOptionsError: any = {};
    const { isEnable, optionsSelecting, optionsRequired } = enableAddToOrder(
      { ...curProduct },
      options
    );
    if (isEnable) {
      if (isInCart({ ...curProduct, options })) {
        updateQuantity({ ...curProduct, options, quantity });
      } else {
        addProduct({ ...curProduct, quantity, total: price, options });
      }
      isOpen(false);
    } else {
      optionsRequired.forEach((item: any) => {
        if (optionsSelecting.indexOf(item.id) === -1) {
          newOptionsError[item.id] = item.name;
        }
      });
      setOptionsError(newOptionsError);
      if (Object.keys(newOptionsError).length > 0) {
        onScrollToElement(Object.keys(newOptionsError)[0]);
      }
    }
  };

  const isInCart = (product: any) => {
    return !!cartItems.find(
      (item: any) =>
        item.id === product.id &&
        JSON.stringify(item.options) === JSON.stringify(product.options)
    );
  };

  // Sort option in product dialog by sort order
  const newProductOptions: any = [];
  sortedProductOption?.productOption?.edges?.forEach((sortedItem: any) => {
    curProduct.options.forEach((value: any) => {
      if (value.id === sortedItem?.node.option.id) {
        newProductOptions.push(value);
      }
    });
  });

  // Sort by modifier required
  newProductOptions.sort(
    (a: any, b: any) => Number(b.required) - Number(a.required)
  );

  return (
    <S.Wrapper>
      <S.Head>
        <S.Name>{curProduct.name}</S.Name>
        <S.IconBox onClick={() => isOpen(false)}>
          <ReactSVG path={x} />
        </S.IconBox>
      </S.Head>

      <S.ContentWrap>
        <S.ProductWrap>
          <S.ImageBox>
            <S.Image src={curProduct.url} />
          </S.ImageBox>
          <S.Description>
            {curProduct.description &&
              formatDescription(curProduct.description)}
          </S.Description>
        </S.ProductWrap>
        <S.Divider />

        {newProductOptions.length > 0 && (
          <S.FormOption className="scroll-area">
            {newProductOptions.map((item: any, index: number) => {
              const optionList = item.enable
                ? item.optionValues.map((option: any) => ({
                    optionId: item?.id,
                    type: item.type,
                    maxOptions: item.maxOptions,
                    value: option?.id,
                    text: option?.name,
                    price: option?.channelListing[0]?.price?.amount,
                    currency: checkCurrency(curProduct?.currency),
                  }))
                : [];

              if (item.type === "multiple") {
                return (
                  <>
                    <CheckboxContainer
                      id={item.id}
                      key={index}
                      options={optionList}
                      bigOptions={options}
                      title={optionList.length > 0 ? item.name : ""}
                      isError={optionsError[item.id]}
                      subTitle={
                        item.type === "multiple"
                          ? `Choose max ${item.maxOptions} ${
                              item.required ? `(Required)` : ""
                            }`
                          : ""
                      }
                      onChange={onHandleChange}
                      setOptions={setOptions}
                      flag
                    />
                    {optionList.length > 0 && <S.Divider />}
                  </>
                );
              }
              return (
                <>
                  <RadioButtonContainer
                    id={item.id}
                    key={index}
                    options={optionList}
                    bigOptions={options}
                    isError={optionsError[item.id]}
                    title={optionList.length > 0 ? item.name : ""}
                    subTitle={
                      optionList.length > 0 ? item.required && "Required" : ""
                    }
                    onChange={onHandleChange}
                    setOptions={setOptions}
                    flag
                  />
                  {optionList.length > 0 && <S.Divider />}
                </>
              );
            })}

            {/* <S.Divider /> */}
          </S.FormOption>
        )}
      </S.ContentWrap>
      <S.FooterWrap>
        <S.Footer>
          <div
            style={{
              marginRight: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <QuantityField isDialog value={quantity} setValue={setQuantity} />
          </div>
          <div style={{ flex: 1 }} onClick={handleAddProduct}>
            <ButtonCard
              text={t("add-to-order")}
              price={`${curProduct.currency} ${(
                Math.round(totalPrice * 100) / 100
              )
                .toFixed(2)
                .replace(".", ",")}`}
              isDisable={!enableAddToOrder({ ...curProduct }, options).isEnable}
              color={
                enableAddToOrder({ ...curProduct }, options).isEnable
                  ? "#FF6347"
                  : "#FF634780"
              }
            />
          </div>
        </S.Footer>
      </S.FooterWrap>
    </S.Wrapper>
  );
}

export default ProductDialog;
