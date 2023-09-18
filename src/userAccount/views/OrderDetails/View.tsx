// import CheckoutProgress from "@components/atoms/CheckoutProgress";
// import { CartContext } from "@temp/contexts/CartContext";
import { useRouter } from "next/router";
import * as React from "react";
import { useQuery } from "react-apollo";

import { Loader } from "@components/atoms";
import {
  getCheckoutDetailByPayment,
  getCheckoutDetailQuery,
} from "@temp/views/Checkout/queries";

// import { getTableService } from "@temp/views/Order/queries";
import DetailPage from "./DetailPage";

import "./scss/index.scss";

const View = ({ myStore }) => {
  // const { cartItems }: any = React.useContext(CartContext);
  const router = useRouter();
  const { token, payment_token, redirect_status } = router.query;

  // const guest = !user;
  // const { data } = useQuery(getTableService, {
  //   variables: {
  //     id: qr,
  //   },
  // });

  if (redirect_status === "succeeded") {
    if (payment_token) {
      // return token by payment
      setTimeout(() => {
        return <Loader />;
      }, 500);
      const { data: detail } = useQuery(getCheckoutDetailByPayment, {
        variables: {
          token,
        },
      });

      const orderDetail = detail?.orderByPaymentToken;
      return (
        <DetailPage
          orderDetail={orderDetail}
          myStore={myStore}
          // qrName={data?.tableService?.tableName}
        />
      );
    }

    // failed
  } else if (redirect_status === "failed") {
    return <DetailPage isFail myStore={myStore} />;
  }
  const { data: detail } = useQuery(getCheckoutDetailQuery, {
    variables: {
      token,
    },
  });
  const orderDetail = detail?.orderByToken;

  if (orderDetail) {
    return (
      <DetailPage
        orderDetail={orderDetail}
        myStore={myStore}
        // qrName={data?.tableService?.tableName}
      />
    );
  }
  return <Loader />;
};

export default View;
