import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";

export const getAllCategories = gql`
  query getList($first: Int) {
    categories(first: $first) {
      edges {
        node {
          id
          name
          enable
        }
      }
    }
  }
`;

export const getAllProducts = gql`
  query getAllProducts($first: Int, $currency: String) {
    categories(first: $first) {
      edges {
        node {
          id
          name
          description
          enable
          products(
            first: 100
            channel: $currency # sortBy: { field: DATE, direction: ASC }
          ) {
            edges {
              node {
                id
                name
                enable
                variants {
                  id
                  name
                }
                options {
                  id
                  name
                  type
                  required
                  description
                  optionValues {
                    id
                    name
                    channelListing {
                      price {
                        amount
                      }
                    }
                  }
                  enable
                  maxOptions
                }
                pricing {
                  discount {
                    gross {
                      currency
                      amount
                    }
                  }
                }
                description
                images {
                  url
                  alt
                }
                pricing {
                  priceRange {
                    start {
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
            }
          }
        }
      }
    }
  }
`;
export const TypedGetListCategory = TypedQuery<any, {}>(getAllProducts);

export const getServiceTime = gql`
  query getServiceTime($first: Int) {
    serviceTimes(first: $first) {
      edges {
        node {
          id
          dlDeliveryTime
          dlTimeGap
          dlAsSoonAsPosible
          dlAllowPreorder
          dlPreorderDay
          dlSameDayOrder
          dlServiceTime
          puDeliveryTime
          puTimeGap
          puAsSoonAsPosible
          puAllowPreorder
          puPreorderDay
          puSameDayOrder
          puServiceTime
          tableServiceTime
        }
      }
    }
  }
`;

export const TypedGetServiceTime = TypedQuery<any, {}>(getServiceTime);

export const getMyStore = gql`
  query {
    myStore {
      id
      name
      domain
      channel {
        slug
        currencyCode
      }
      phone
      address
      stripeCost
      stripeEnable
      contantCost
      contantEnable
      enableTransactionFee
      deliveryStatus
      postalCode
      description
      city
      pickupStatus
      tableServiceStatus
      indexStripe
      indexCash
      logo {
        url
        alt
      }
      coverPhoto {
        url
        alt
      }
      favicon {
        url
        alt
      }
      emailNotifications
      emailAddress
      posEnable
      accountId
    }
  }
`;

export const getCurDelivery = gql`
  query CurDelivery {
    currentDelivery {
      id
      deliveryArea
      deliveryFee
      fromDelivery
      minOrder
      enableForBigOrder
      enableCustomDeliveryFee
      enableMinimumDeliveryOrderValue
    }
  }
`;

export const getTableService = gql`
  query tableService($id: ID) {
    tableService(id: $id) {
      id
      tableName
      active
      tableQrCode
    }
  }
`;

export const getSortedProductOptionByProductId = gql`
  query ProductOptions($productId: ID) {
    productOption(productId: $productId, first: 100) {
      edges {
        node {
          id
          option {
            id
          }
          sortOrder
        }
      }
    }
  }
`;
