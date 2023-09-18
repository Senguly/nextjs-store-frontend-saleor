import { useAlert } from "react-alert";
import { useLazyQuery } from "react-apollo";

import {
  formatDataEmergency,
  formatDataServiceTime,
} from "@temp/contexts/ServiceContext";
import { checkCanOrder, checkOpen } from "@utils/serviceTimeUltil";

import { getMyStore, getServiceTime, getTableService } from "./queries";

let tempServicetime = null;
let tempTable = null;

export const useCheckServiceTime = (
  typeDelivery: any,
  handleRedirect: any,
  handleSubmitCheckout?: any,
  days?: any,
  qr?: any
) => {
  const alert = useAlert();
  let canOrder = null;

  const [getStore] = useLazyQuery(getMyStore, {
    variables: {},
    fetchPolicy: "network-only",
    onCompleted: data => {
      const dayChecked =
        days && days.includes("Today") ? days.split(",")[1] : days;
      const today = dayChecked
        ? new Date(dayChecked).getDay()
        : new Date().getDay();
      const { emergency } = formatDataEmergency(data);
      const { timeLine, serviceTimeOption } = formatDataServiceTime(
        tempServicetime
      );
      const isPreOrderDay =
        typeDelivery?.value === "delivery"
          ? serviceTimeOption.dlAllowPreorder
          : typeDelivery?.value === "pickup"
          ? serviceTimeOption.puAllowPreorder
          : false;
      const isOrderSameDay = isPreOrderDay
        ? typeDelivery?.value === "delivery"
          ? serviceTimeOption.dlSameDayOrder
          : typeDelivery?.value === "pickup"
          ? serviceTimeOption.puSameDayOrder
          : false
        : false;
      if (tempTable && !tempTable?.tableService.active) {
        canOrder = false;
      } else {
        canOrder = dayChecked
          ? checkOpen(
              timeLine,
              today === 0 ? 6 : today - 1,
              typeDelivery?.value,
              emergency,
              isOrderSameDay,
              dayChecked
            )
          : checkCanOrder(
              serviceTimeOption,
              timeLine,
              today === 0 ? 6 : today - 1,
              typeDelivery?.value,
              emergency,
              today
            );
      }

      if (canOrder) {
        handleSubmitCheckout();
      } else {
        alert.show(
          {
            actionText: "Refresh",

            title:
              "We are temporarily closed during this time. Please reload to re order.",
          },
          {
            onClose: () => {
              // location.reload();
              // handleRedirect();
            },
            // timeout: 5000,
            type: "error",
          }
        );
        //   redires
      }
    },
  });

  const [getS] = useLazyQuery(getServiceTime, {
    variables: { first: 10 },
    fetchPolicy: "network-only",
    onCompleted: data => {
      tempServicetime = data;
      getStore();
    },
  });
  const [getTable] = useLazyQuery(getTableService, {
    variables: {
      id: qr,
    },
    fetchPolicy: "network-only",
    onCompleted: data => {
      tempTable = data;
      getS();
    },
  });

  if (qr) {
    return { triggleCheck: getTable, canOrder };
  }

  return { triggleCheck: getS, canOrder };
};
