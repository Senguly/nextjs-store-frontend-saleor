import React from "react";
import { useQuery } from "react-apollo";

import { getMyStore, getServiceTime } from "@temp/views/Order/queries";

const initialState = {
  timeLine: {
    dl: [],
    pu: [],
    tb: [],
  },
  serviceTimeOption: {
    dlDeliveryTime: 10,
    dlTimeGap: 10,
    dlAsSoonAsPosible: false,
    dlAllowPreorder: false,
    dlPreorderDay: false,
    dlSameDayOrder: false,
    puDeliveryTime: 10,
    puTimeGap: 10,
    puAsSoonAsPosible: false,
    puAllowPreorder: false,
    puPreorderDay: false,
    puSameDayOrder: false,
  },
  emergency: {
    pickupStatus: new Date(),
    deliveryStatus: new Date(),
    tableServiceStatus: new Date(),
  },
};

export const ServiceContext = React.createContext(null);

const ServiceContextProvider = ({ children }) => {
  const [state, setState] = React.useState(initialState);

  const onConpletedServiceTimeQuery = serviceTime => {
    const { timeLine, serviceTimeOption } = formatDataServiceTime(serviceTime);
    setState({ ...state, timeLine, serviceTimeOption });
  };

  const { refetch: refetchServiceTime } = useQuery(getServiceTime, {
    variables: { first: 10 },
    fetchPolicy: "cache-and-network",
    partialRefetch: true,
    onCompleted: onConpletedServiceTimeQuery,
  });

  // console.log(loading, "=-----");

  const { refetch: refetchMyStore } = useQuery(getMyStore, {
    variables: {},
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      const { emergency } = formatDataEmergency(data);
      setState({
        ...state,
        emergency,
      });
    },
  });

  return (
    <ServiceContext.Provider
      value={{ ...state, refetchMyStore, refetchServiceTime }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const formatDataServiceTime = (serviceTime: any) => {
  const timeLine = {
    dl: JSON.parse(serviceTime?.serviceTimes?.edges[0]?.node?.dlServiceTime)
      ?.dl,
    pu: JSON.parse(serviceTime?.serviceTimes?.edges[0]?.node?.puServiceTime)
      ?.pu,
    tb: JSON.parse(serviceTime?.serviceTimes?.edges[0]?.node?.tableServiceTime)
      ?.tb,
  };
  const serviceTimeOption = {
    dlDeliveryTime: serviceTime?.serviceTimes?.edges[0]?.node?.dlDeliveryTime,
    dlTimeGap: serviceTime?.serviceTimes?.edges[0]?.node?.dlTimeGap,
    dlAsSoonAsPosible:
      serviceTime?.serviceTimes?.edges[0]?.node?.dlAsSoonAsPosible,
    dlAllowPreorder: serviceTime?.serviceTimes?.edges[0]?.node?.dlAllowPreorder,
    dlPreorderDay: serviceTime?.serviceTimes?.edges[0]?.node?.dlPreorderDay,
    dlSameDayOrder: serviceTime?.serviceTimes?.edges[0]?.node?.dlSameDayOrder,
    puDeliveryTime: serviceTime?.serviceTimes?.edges[0]?.node?.puDeliveryTime,
    puTimeGap: serviceTime?.serviceTimes?.edges[0]?.node?.puTimeGap,
    puAsSoonAsPosible:
      serviceTime?.serviceTimes?.edges[0]?.node?.puAsSoonAsPosible,
    puAllowPreorder: serviceTime?.serviceTimes?.edges[0]?.node?.puAllowPreorder,
    puPreorderDay: serviceTime?.serviceTimes?.edges[0]?.node?.puPreorderDay,
    puSameDayOrder: serviceTime?.serviceTimes?.edges[0]?.node?.puSameDayOrder,
  };
  return { timeLine, serviceTimeOption };
};

export const formatDataEmergency = (data: any) => {
  const emergency = {
    deliveryStatus: data?.myStore?.deliveryStatus,
    pickupStatus: data?.myStore?.pickupStatus,
    tableServiceStatus: data?.myStore?.tableServiceStatus,
  };
  return { emergency };
};

export default ServiceContextProvider;
