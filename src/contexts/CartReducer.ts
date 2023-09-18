/* eslint-disable no-case-declarations */
import { checkCurrency } from "@utils/money";

/* eslint-disable @typescript-eslint/no-unused-expressions */
const storage = cartItems => {
  typeof window !== "undefined" &&
    window.localStorage.setItem(
      "cart",
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
};

const storage2 = type => {
  typeof window !== "undefined" &&
    window.localStorage.setItem("typeDelivery", JSON.stringify(type || {}));
};

const getCurDelivery = curDelivery => {
  typeof window !== "undefined" &&
    window.localStorage.setItem("curDelivery", JSON.stringify(curDelivery));
};
const getCurTypeDelivery = curTypeDelivery => {
  typeof window !== "undefined" &&
    window.localStorage.setItem(
      "curTypeDelivery",
      JSON.stringify(curTypeDelivery)
    );
};

const getVouchers = vouchers => {
  typeof window !== "undefined" &&
    window.localStorage.setItem("vouchers", JSON.stringify(vouchers || {}));
};

const getTypePayment = typePayment => {
  typeof window !== "undefined" &&
    window.localStorage.setItem(
      "typePayment",
      JSON.stringify(typePayment || {})
    );
};

export const sumItems = (
  typeDelivery,
  cartItems,
  curDelivery,
  vouchers,
  typePayment
) => {
  getCurDelivery(curDelivery);
  getVouchers(vouchers);
  storage(cartItems);
  storage2(typeDelivery);
  getTypePayment(typePayment);
  let discount = 0;
  let discountValue = 0;
  let deliveryFee = 0;
  let transFee = 0;
  let contantFee = 0;
  let discountType = "";
  let isAllowCheckout = false;
  let promoCode = "";
  let itemCount = 0;
  let freeForBigOrder = true;
  let minOrderByPostCode = null;

  const currency = checkCurrency(cartItems[0]?.currency);
  // console.log("Reducer cur delivery", curDelivery);

  const vouchersList = vouchers && {
    code: vouchers?.code,
    currency: checkCurrency(vouchers?.currency),
    discountValue: vouchers?.discountValue,
    discountValueType: vouchers?.discountValueType,
    minSpent: vouchers?.minSpent?.amount,
  };

  if (cartItems.length > 0) {
    itemCount = cartItems.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }

  let total = cartItems.reduce(
    (total, product) => total + product.total * product.quantity,
    0
  );
  total = Number(total?.toFixed(2));

  if (curDelivery) {
    const {
      deliveryArea,
      deliveryFee: fee,
      fromDelivery,
      minOrder,
      stripeCost,
      contantCost,
      stripeEnable,
      contantEnable,
      enableTransactionFee,
      enableForBigOrder,
      enableCustomDeliveryFee,
      enableMinimumDeliveryOrderValue,
    } = curDelivery;

    freeForBigOrder = enableForBigOrder;
    minOrderByPostCode = minOrder;
    if (typeDelivery.value === "pickup" || typeDelivery.value === "table") {
      if (cartItems.length > 0) {
        isAllowCheckout = true;
      } else {
        isAllowCheckout = false;
      }
      deliveryFee = 0;
    } else if (typeDelivery.value === "delivery") {
      // deliveryFee = fee;

      const { areas } = JSON.parse(deliveryArea);
      const postCodeValue = typeDelivery?.inputValue?.slice(0, 4);
      areas.sort((a: any, b: any) => a.to + a.from - (b.to + b.from));
      const areaByPostCode = areas.find(
        (area: any) => postCodeValue >= area.from && postCodeValue <= area.to
      );

      // Enable custom delivery fee
      if (enableCustomDeliveryFee) {
        deliveryFee = areaByPostCode ? areaByPostCode.customDeliveryFee : fee;
      }

      // Enable custom delivery min order
      if (enableMinimumDeliveryOrderValue) {
        minOrderByPostCode =
          areaByPostCode && areaByPostCode.customMinOrder !== ""
            ? areaByPostCode.customMinOrder
            : minOrder;
      }
      // check if total < min order
      if (total < minOrderByPostCode) {
        isAllowCheckout = false;
      } else {
        isAllowCheckout = true;
      }

      if (total < fromDelivery) {
        deliveryFee = enableCustomDeliveryFee ? deliveryFee : fee;
      } else if (enableForBigOrder) {
        deliveryFee = 0;
      } else {
        deliveryFee = enableCustomDeliveryFee ? deliveryFee : fee;
      }
    }

    deliveryFee = Number(deliveryFee.toFixed(2));

    if (vouchersList) {
      if (
        typeof vouchersList.minSpent === "undefined" ||
        total > vouchersList.minSpent
      ) {
        discount = vouchersList.discountValue;
        discountType = vouchersList.discountValueType;
        promoCode = vouchersList.code;
      }

      if (cartItems.length === 0) {
        discount = 0;
      }
    }

    if (typePayment) {
      if (enableTransactionFee) {
        if (stripeEnable) {
          transFee = Number(stripeCost.toFixed(2));
        }
        if (contantEnable) {
          contantFee = Number(contantCost.toFixed(2));
        }
      }

      if (discountType === "FIXED") {
        if (typePayment.type === "CASH") {
          if (total - discount <= 0) {
            total = (deliveryFee + contantFee).toFixed(2);
          } else {
            total = (total + deliveryFee - discount + contantFee).toFixed(2);
          }
        } else if (total - discount <= 0) {
          total = (deliveryFee + transFee).toFixed(2);
        } else {
          total = (total + deliveryFee - discount + transFee).toFixed(2);
        }
      } else if (typePayment.type === "CASH") {
        discountValue = Math.floor(total * discount) / 100;
        total = (deliveryFee + contantFee + total - discountValue).toFixed(2);
      } else {
        discountValue = Math.floor(total * discount) / 100;
        total = (deliveryFee + transFee + total - discountValue).toFixed(2);
      }
    } else if (discountType === "FIXED") {
      if (total - discount <= 0) {
        total = deliveryFee.toFixed(2);
      } else {
        total = (total + deliveryFee - discount).toFixed(2);
      }
    } else {
      discountValue = Math.floor(total * discount) / 100;
      total = (deliveryFee + total - discountValue).toFixed(2);
    }

    if (discountType !== "FIXED") {
      discount = discountValue;
    }
    total = Number(total).toFixed(2);
    return {
      itemCount,
      total,
      deliveryFee,
      discount,
      isAllowCheckout,
      discountType: "FIXED",
      promoCode,
      transFee,
      contantFee,
      currency,
      contantEnable,
      stripeEnable,
      freeForBigOrder,
      minOrderByPostCode,
    };
  }
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DELIVERY":
      getCurDelivery(action.payload);
      state.curDelivery = action.payload;
      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          state.cartItems,
          action.payload,
          state.vouchers,
          state.typePayment
        ),
        cartItems: [...state.cartItems],
      };

    case "ADD_TYPE_DELIVERY":
      getCurTypeDelivery(action.payload);
      state.curTypeDelivery = action.payload;
      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          state.cartItems,
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),
        cartItems: [...state.cartItems],
      };
    case "ADD_TYPEPAYMENT":
      getTypePayment(action.payload);
      state.typePayment = action.payload;
      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          state.cartItems,
          state.curDelivery,
          state.vouchers,
          action.payload
        ),
        cartItems: [...state.cartItems],
      };
    case "ADD_VOUCHERS":
      getVouchers(action.payload);
      state.vouchers = action.payload;
      return {
        ...state,
        cartItems: [...state.cartItems],
      };
    case "ADD_ITEM":
      // if (!state.cartItems.find(item => item.id === action.payload.id)) {
      // }
      state.cartItems.push({
        ...action.payload,
        quantity: action.payload.quantity,
        index: Math.floor(Math.random() * 100000),
      });

      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          state.cartItems,
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      const result = state.cartItems.filter(
        item => item.index !== action.payload.index
      );
      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          [...result],
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),
        cartItems: [...result],
      };
    case "INCREASE":
      state.cartItems[
        state.cartItems.findIndex(item => item.index === action.payload.index)
      ].quantity++;

      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          [...state.cartItems],
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),
        cartItems: [...state.cartItems],
      };
    case "UPDATE_QUANTITY":
      state.cartItems[
        state.cartItems.findIndex(
          item =>
            item.id === action.payload.id &&
            JSON.stringify(item.options) ===
              JSON.stringify(action.payload.options)
        )
      ].quantity += action.payload.quantity;

      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          state.cartItems,
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      state.cartItems[
        state.cartItems.findIndex(item => item.index === action.payload.index)
      ].quantity--;
      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          [...state.cartItems],
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),

        cartItems: [...state.cartItems],
      };
    case "CHECKOUT":
      state.cartItems = [];
      return {
        ...state,
        checkout: true,
        ...sumItems(
          state.typeDelivery,
          state.cartItems,
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),
      };
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems(null, [], null, [], null),
      };
    case "CLEAR_TYPEPAYMENT":
      state.typePayment = null;
      return {
        ...state,
        ...sumItems(
          state.typeDelivery,
          state.cartItems,
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),
        cartItems: [...state.cartItems],
      };

    case "ADD_TYPE":
      // state.typeDelivery.type = action.payload.type;
      // state.typeDelivery.value = action.payload.value;
      // state.typeDelivery.icon = action.payload.icon;
      // state.typeDelivery.inputValue = action.payload.inputValue;

      storage2(action.payload);
      state.typeDelivery = action.payload;
      return {
        ...state,
        ...sumItems(
          action.payload,
          state.cartItems,
          state.curDelivery,
          state.vouchers,
          state.typePayment
        ),
        cartItems: [...state.cartItems],
      };

    default:
      return state;
  }
};
