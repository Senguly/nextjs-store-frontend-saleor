/* eslint-disable react/require-default-props */
import React from "react";
import { CartContext } from "src/contexts/CartContext";

import QuantityField from "@components/molecules/QuantityField";

import * as S from "./styles";

interface IProps {
  cartItem?: any;
  isPlace?: boolean;
  isCheckout?: boolean;
  onUpdateLines?: any;
  cartItems?: any;
  handleDeleteLine?: any;
}
function ItemBasket({
  cartItem,
  isPlace,
  isCheckout,
  onUpdateLines,
  cartItems,
  handleDeleteLine,
}: IProps) {
  // UHJvZHVjdFZhcmlhbnQ6MzM2
  // const { addItem } = useCart();
  // const onHandleChange = () => {
  //   addItem("UHJvZHVjdFZhcmlhbnQ6MzM2", 1);
  // };

  const { increase, decrease, removeProduct }: any = React.useContext(
    CartContext
  );

  const [quantity, setQuantity] = React.useState<number>(cartItem.quantity);
  // React.useEffect(() => {
  //   // setQuantity(cartItem.quantity);
  //   if (onUpdateLines && isCheckout) {
  //     onUpdateLines();
  //   }
  //   // console.log(quantity);
  // }, [cartItems.length]);

  return (
    <S.Wrapper>
      <S.TR>
        <S.TD style={{ maxWidth: "0%" }}>
          {isPlace ? (
            <S.Quantity>{quantity} x</S.Quantity>
          ) : (
            <QuantityField
              value={quantity}
              setValue={setQuantity}
              increase={increase}
              decrease={decrease}
              removeProduct={removeProduct}
              cartItem={cartItem}
              handleDeleteLine={handleDeleteLine}
              onUpdateLines={onUpdateLines}
            />
          )}
        </S.TD>
        <S.TD style={{ width: "80%" }}>
          <S.ProductInfoWrap>
            <S.Name>{cartItem.name}</S.Name>

            <S.AttributeList>
              {Object.keys(cartItem.options).map((item: any, index: number) => {
                if (item === "single") {
                  return (
                    <S.AttributeItem key={index}>
                      {cartItem.options[item].map(
                        (itemCart: any, index: number) => {
                          if (index === cartItem.options[item].length - 1) {
                            return `${itemCart.text} `;
                          }
                          return `${itemCart.text}, `;
                        }
                      )}
                    </S.AttributeItem>
                  );
                }
                return (
                  <S.AttributeItem key={index}>
                    {cartItem.options[item].map(
                      (itemCart: any, index: number) => {
                        if (index === cartItem.options[item].length - 1) {
                          return `${itemCart.text} `;
                        }
                        return `${itemCart.text}, `;
                      }
                    )}
                  </S.AttributeItem>
                );
              })}
            </S.AttributeList>
          </S.ProductInfoWrap>
        </S.TD>
        <S.TD style={{ textAlign: "right", width: "0%" }}>
          <S.Price>
            {`${cartItem.currency} ${(cartItem.total * cartItem.quantity)
              .toFixed(2)
              .replace(".", ".")} `}
          </S.Price>
        </S.TD>
      </S.TR>
    </S.Wrapper>
  );
}

export default ItemBasket;
