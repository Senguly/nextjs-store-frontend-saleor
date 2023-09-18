import gql from "graphql-tag";

import { useTypedQuery } from "@graphql";

export const getOrderByUser = gql`
  query getOrders($first: Int, $after: String) {
    me {
      id
      orders(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            number
            orderType
            created
            token
            total {
              net {
                currency
                amount
              }
              gross {
                currency
                amount
              }
            }
            lines {
              thumbnail {
                url
                alt
              }
            }
            errors {
              message
            }
          }
          cursor
        }
        totalCount
      }
    }
  }
`;

export const useGetOrders = (perPage: any) => {
  const { data, loading, loadMore, ...queryOtion } = useTypedQuery(
    getOrderByUser,
    {
      variables: { first: perPage },
      fetchPolicy: "cache-and-network",
    }
  );

  // const { orders } = typeof data !== "undefined" && data?.me;

  return { data, loading, loadMore, ...queryOtion };
};
