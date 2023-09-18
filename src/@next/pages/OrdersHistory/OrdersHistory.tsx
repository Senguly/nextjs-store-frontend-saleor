import { useAuth } from "@saleor/sdk/";
import React from "react";

import { Loader } from "@components/atoms";
import { OrderTable } from "@components/molecules";
import CustomizeButton from "@temp/components/CustomizeButton";

import { useGetOrders } from "./queries";
import * as S from "./styles";

const ORDERS_PER_API_CALL = 5;

export const OrdersHistory: React.FC = () => {
  const { user } = useAuth();

  const { data, loading, loadMore } = useGetOrders(ORDERS_PER_API_CALL);

  const [orders, pageInfo, hasNextPage] = React.useMemo(
    () => [
      data?.me?.orders.edges.map((e: any) => e.node) || [],
      data?.me?.orders.pageInfo,
      data?.me?.orders.pageInfo.hasNextPage,
    ],
    [data]
  );

  return loading && !data ? (
    <Loader />
  ) : (
    <>
      <OrderTable orders={orders} isGuest={!user} />
      {hasNextPage && (
        <S.Wrapper>
          <CustomizeButton
            title="Show more orders"
            onClick={() => {
              loadMore(
                (prev, next) => ({
                  me: {
                    ...prev.me,
                    orders: {
                      ...prev.me.orders,
                      edges: [...prev.me.orders.edges, ...next.me.orders.edges],
                      pageInfo: next.me.orders.pageInfo,
                    },
                  },
                }),
                pageInfo.endCursor
              );
            }}
          />
        </S.Wrapper>
      )}
    </>
  );
};
