/* eslint-disable no-restricted-syntax */
function padLeadingZeros(num: any, size: number) {
  let s = `${num}`;
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
}

export const checkOpenInFuture = (
  timeLine: any,
  type: any,
  dayPreorder: number
) => {
  const timeL = type === "delivery" ? timeLine.dl : timeLine.pu;
  const nextDay = new Date().getDay() === 6 ? 0 : new Date().getDay();

  for (const item of timeL) {
    for (let i = nextDay; i < nextDay + dayPreorder; i++) {
      if (i <= 6) {
        if (item.days[i]) {
          return true;
        }
      } else if (item.days[(i % 6) - 1]) {
        return true;
      }
    }
  }
  return false;
};

export const checkOpen = (
  input: any,
  index: number,
  type: any,
  emergency: any,
  isOrderSameDay = false,
  days?: any,
  allowPreorder = false
) => {
  const date = new Date();
  const today = `${padLeadingZeros(date.getHours(), 2)}:${padLeadingZeros(
    date.getMinutes(),
    2
  )}`;
  let result = false;

  const emergencyStatus =
    type === "delivery"
      ? emergency.deliveryStatus
      : type === "pickup"
      ? emergency.pickupStatus
      : emergency.tableServiceStatus;

  if (new Date(emergencyStatus).toDateString() === new Date().toDateString()) {
    result = false;
  } else if (
    days &&
    allowPreorder &&
    new Date(days).toDateString() === new Date().toDateString() &&
    !isOrderSameDay
  ) {
    result = false;
  } else if (type === "delivery") {
    for (const item of input.dl) {
      if (item.days[index]) {
        result = today < item.close;
        if (result) {
          break;
        }
      }
    }
  } else if (type === "pickup") {
    for (const item of input.pu) {
      if (item.days[index]) {
        result = today < item.close;
        if (result) {
          break;
        }
      }
    }
  } else {
    for (const item of input.tb) {
      if (item.days[index]) {
        result = today < item.close && today > item.open;
        if (result) {
          break;
        }
      }
    }
  }

  return result;
};

export const checkCanOrder = (
  input: any,
  timeline: any,
  index: number,
  type: any,
  emergency: any,
  days?: any
) => {
  let result = false;
  const emergencyStatus =
    type === "delivery"
      ? emergency.deliveryStatus
      : type === "pickup"
      ? emergency.pickupStatus
      : emergency.tableServiceStatus;

  const allowPreorder =
    type === "delivery"
      ? input.dlAllowPreorder
      : type === "pickup"
      ? input.puAllowPreorder
      : false;
  const allowSameDay =
    type === "delivery"
      ? input.dlSameDayOrder
      : type === "pickup"
      ? input.puSameDayOrder
      : false;
  const preOrderDay =
    type === "delivery"
      ? input.dlPreorderDay
      : type === "pickup"
      ? input.puPreorderDay
      : 0;
  // console.log(timeline);
  // console.log(input);
  if (new Date(emergencyStatus).toDateString() === new Date().toDateString()) {
    result = false;
  } else if (allowPreorder) {
    if (allowSameDay) {
      if (checkOpen(timeline, index, type, emergency, days, allowPreorder)) {
        result = true;
      }
    }
    if (checkOpenInFuture(timeline, type, preOrderDay)) {
      result = true;
    }
  } else {
    result = checkOpen(timeline, index, type, emergency, days);
  }
  return result;
};
