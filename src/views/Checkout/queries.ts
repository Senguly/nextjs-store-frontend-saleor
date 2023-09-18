import gql from "graphql-tag";

import { TypedMutation } from "@temp/core/mutations";

export const CreateCheckout = gql`
  mutation CreateCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      errors {
        field
        message
      }
      created
      checkout {
        id
        token
        lines {
          id
          quantity
          variant {
            id
            name
          }
        }
        availablePaymentGateways {
          id
          name
          config {
            field
            value
          }
          currencies
        }
        billingAddress {
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          country {
            code
          }
        }
      }
    }
  }
`;
export const getCheckoutUrl = gql`
  mutation($line_item: JSONString!, $account_id: String!) {
    checkoutUrl(lineItem: $line_item, accountId: $account_id) {
      checkoutUrl
    }
  }
`;
// export const getCheckoutUrl = gql`
//   query($line_item: JSONString!, $account_id: String!) {
//     createCheckoutUrl(lineItem: $line_item, accountId: $account_id)
//   }
// `;

export const TypedCreateCheckoutMutation = TypedMutation<any, {}>(
  CreateCheckout
);

export const UpdateCheckoutBillingAddress = gql`
  mutation UpdateCheckoutBillingAddress(
    $checkoutId: ID!
    $billingAddress: AddressInput!
  ) {
    checkoutBillingAddressUpdate(
      billingAddress: $billingAddress
      checkoutId: $checkoutId
    ) {
      errors {
        field
        message
      }
      checkout {
        id
        billingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          country {
            code
          }
        }
      }
    }
  }
`;
export const TypedUpdateAddressMutation = TypedMutation<any, {}>(
  UpdateCheckoutBillingAddress
);
export const CheckoutPaymentCreate = gql`
  mutation CheckoutPaymentCreate($checkoutId: ID!, $input: PaymentInput!) {
    checkoutPaymentCreate(checkoutId: $checkoutId, input: $input) {
      checkout {
        created
        id
      }
      errors {
        field
        message
      }
    }
  }
`;
export const TypedPaymentCreateMutation = TypedMutation<any, {}>(
  CheckoutPaymentCreate
);
export const CheckoutComplete = gql`
  mutation CheckoutComplete(
    $checkoutId: ID!
    $paymentData: JSONString
    $redirectUrl: String
    $storeSource: Boolean = false
  ) {
    checkoutComplete(
      checkoutId: $checkoutId
      paymentData: $paymentData
      redirectUrl: $redirectUrl
      storeSource: $storeSource
    ) {
      errors {
        field
        message
      }
      order {
        id
        token
      }
      redirectUrl
    }
  }
`;
export const TypedCheckoutCompleteMutation = TypedMutation<any, {}>(
  CheckoutComplete
);
export const getVouchersQuery = gql`
  query GetVouchers {
    voucherWillApplied(channel: "default-channel") {
      id
      name
      type
      code
      currency
      usageLimit
      discountValueType
      active
      discountValue
      minSpent {
        currency
        amount
      }
    }
  }
`;

export const addVoucher = gql`
  mutation AddDiscount($checkoutId: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        id
        created
        discount {
          currency
          amount
        }
        subtotalPrice {
          currency
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
export const TypedAddVoucherMutation = TypedMutation<any, {}>(addVoucher);
export const getCurUserQuery = gql`
  query getCurUser {
    me {
      id
      addresses {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        phone
        postalCode
        country {
          code
          country
        }
        email
        apartment
        isDefaultShippingAddress
        isDefaultBillingAddress
      }
    }
  }
`;

export const updateCheckoutInfoMutation = gql`
  mutation CheckoutInfoUpdate($checkoutId: ID!, $input: CheckoutUpdateInput!) {
    checkoutInfoUpdate(checkoutId: $checkoutId, input: $input) {
      checkout {
        created
        expectedDate
        expectedTime
        lines {
          id
          variant {
            id
            name
          }
        }
      }
    }
  }
`;
export const TypedUpdateCheckoutAddressMutation = TypedMutation<any, {}>(
  updateCheckoutInfoMutation
);
export const getCheckoutDetailQuery = gql`
  query GetOrderDetail($token: UUID!) {
    orderByToken(token: $token) {
      number
      id
      created
      userEmail
      tableName
      customerNote
      orderType
      expectedDate
      expectedTime
      transactionCost
      deliveryFee
      discounts {
        amount {
          amount
        }
      }
      payments {
        id
        gateway
        paymentMethodType
      }
      total {
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
      }
      subtotal {
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
      }
      voucher {
        code
        usageLimit
        discountValue
        currency
        discountValueType
        minSpent {
          currency
          amount
        }
      }
      billingAddress {
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        postalCode
        phone
        apartment
      }
      lines {
        id
        productName
        variantName
        optionItems
        quantity
        unitPrice {
          gross {
            amount
            currency
          }
          net {
            currency
            amount
          }
        }

        unitDiscountValue
        unitDiscount {
          amount
        }
        totalPrice {
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
        }
      }
    }
  }
`;

export const getCheckoutDetailByPayment = gql`
  query GetOrderDetailByPayment($token: String!) {
    orderByPaymentToken(token: $token) {
      number
      id
      created
      userEmail
      customerNote
      orderType
      expectedDate
      expectedTime
      transactionCost
      deliveryFee
      tableName
      discounts {
        amount {
          amount
        }
      }
      payments {
        id
        gateway
        paymentMethodType
      }
      total {
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
      }
      subtotal {
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
      }
      voucher {
        code
        usageLimit
        discountValue
        currency
        discountValueType
        minSpent {
          currency
          amount
        }
      }
      billingAddress {
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        postalCode
        phone
      }
      lines {
        id
        productName
        variantName
        optionItems
        quantity
        unitPrice {
          gross {
            amount
            currency
          }
          net {
            currency
            amount
          }
        }

        unitDiscountValue
        unitDiscount {
          amount
        }
        totalPrice {
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
        }
      }
    }
  }
`;

export const updateCheckoutLinesMutation = gql`
  mutation UpdateCheckoutLine($id: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesUpdate(checkoutId: $id, lines: $lines) {
      checkout {
        created
        lastChange
        id
        billingAddress {
          id
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const deleteCheckoutLineMutation = gql`
  mutation DeleteCheckoutLine($id: ID!, $lineId: ID) {
    checkoutLineDelete(checkoutId: $id, lineId: $lineId) {
      checkout {
        created
        lastChange
        id
        billingAddress {
          id
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
