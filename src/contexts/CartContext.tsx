/* eslint-disable react/react-in-jsx-scope */
import React, { useReducer } from "react";
import { useQuery } from "react-apollo";

import { getVouchersQuery } from "@temp/views/Checkout/queries";
import { getCurDelivery, getMyStore } from "@temp/views/Order/queries";

import { CartReducer, sumItems } from "./CartReducer";

import Delivery from "images/Delivery.svg";

export const CartContext = React.createContext(null);

const storage =
  typeof window !== "undefined" && window.localStorage.getItem("cart")
    ? JSON.parse(window.localStorage.getItem("cart"))
    : [];

interface IType {
  type?: string;
  icon?: any;
}

const typeDelivery: IType =
  typeof window !== "undefined" && window.localStorage.getItem("typeDelivery")
    ? JSON.parse(window.localStorage.getItem("typeDelivery"))
    : {};

const curDelivery: any =
  typeof window !== "undefined" && window.localStorage.getItem("curDelivery")
    ? JSON.parse(window.localStorage.getItem("curDelivery"))
    : {};
const vouchers: any =
  typeof window !== "undefined" && window.localStorage.getItem("vouchers")
    ? JSON.parse(window.localStorage.getItem("vouchers"))
    : {};
const typePayment: any =
  typeof window !== "undefined" && window.localStorage.getItem("typePayment")
    ? JSON.parse(window.localStorage.getItem("typePayment"))
    : {};
const curTypeDelivery: IType =
  typeof window !== "undefined" &&
  window.localStorage.getItem("curTypeDelivery")
    ? JSON.parse(window.localStorage.getItem("curTypeDelivery"))
    : {
        type: "delivery",
        icon: Delivery,
        value: "delivery",
        inputValue: "",
      };
const initialState = {
  vouchers,
  curDelivery,
  typePayment,
  typeDelivery,
  curTypeDelivery,
  cartItems: storage,
  ...sumItems(typeDelivery, storage, curDelivery, vouchers, typePayment),
  checkout: false,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  // console.log("STATE", state);
  const { data: myStore } = useQuery(getMyStore, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  const {} = useQuery(getCurDelivery, {
    variables: { first: 100 },
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      if (typeof myStore !== "undefined") {
        const {
          stripeCost,
          contantCost,
          stripeEnable,
          contantEnable,
          enableTransactionFee,
        } = myStore?.myStore;
        addCurDelivery({
          ...data.currentDelivery,
          stripeCost,
          contantCost,
          stripeEnable,
          contantEnable,
          enableTransactionFee,
        });
      }
    },
  });
  const {} = useQuery(getVouchersQuery, {
    variables: {},
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      addVouchers(data?.voucherWillApplied);
    },
  });

  const addCurDelivery = payload => {
    dispatch({ type: "ADD_DELIVERY", payload });
  };

  const addVouchers = payload => {
    dispatch({ type: "ADD_VOUCHERS", payload });
  };

  const addTypeDelivery = payload => {
    dispatch({ type: "ADD_TYPE", payload });
  };

  const addCurTypeDelivery = payload => {
    dispatch({ type: "ADD_TYPE_DELIVERY", payload });
  };

  const addTypePayment = payload => {
    dispatch({ type: "ADD_TYPEPAYMENT", payload });
  };

  const increase = payload => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = payload => {
    dispatch({ type: "DECREASE", payload });
  };

  const addProduct = payload => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = payload => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const updateQuantity = payload => {
    dispatch({ type: "UPDATE_QUANTITY", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    // console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };

  const clearTypePayment = () => {
    dispatch({ type: "CLEAR_TYPEPAYMENT" });
  };

  const contextValues = {
    removeProduct,
    addVouchers,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    updateQuantity,
    addTypeDelivery,
    addCurDelivery,
    addTypePayment,
    clearTypePayment,
    addCurTypeDelivery,
    ...state,
  };

  return (
    <CartContext.Provider value={{ ...contextValues }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
