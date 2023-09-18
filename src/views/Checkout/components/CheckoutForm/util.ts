/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-continue */

import { checkOpen } from "@utils/serviceTimeUltil";

/* eslint-disable prefer-destructuring */
export const padLeadingZeros = (num, size) => {
  let s = `${num}`;
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
};

const days = {
  Sun: "Sunday",
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

const months = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

export const convertDate = (input: any, flag?: boolean) => {
  const arr = input.split(" ");
  const temp = arr[1];
  arr[1] = Number(arr[2]);
  arr[2] = months[temp];
  arr[0] = days[arr[0]];
  if (!flag) arr.pop();

  return arr.join(" ");
};

export const renderArr = (
  typeDelivery: any,
  serviceTimeOption: any,
  timeLine: any,
  emergency: any
) => {
  const d = new Date();

  const temp = [];
  const today = d.getDate();
  const timelineType =
    typeDelivery.value === "delivery" ? timeLine.dl : timeLine.pu;
  const allowPreorder =
    typeDelivery.value === "delivery"
      ? serviceTimeOption.dlAllowPreorder
      : serviceTimeOption.puAllowPreorder;
  const sameDayOrder =
    typeDelivery.value === "delivery"
      ? serviceTimeOption.dlSameDayOrder
      : serviceTimeOption.puSameDayOrder;

  const index =
    typeDelivery.value === "delivery"
      ? serviceTimeOption.dlPreorderDay
      : serviceTimeOption.puPreorderDay;

  for (let i = 0; i < index + 1; i++) {
    const z = new Date();

    z.setDate(today + i);
    const day = z.getDay(); //  thứ
    if (z.getDate() === today) {
      if (allowPreorder) {
        if (
          checkOpen(
            timeLine,
            d.getDay() === 0 ? 6 : d.getDay() - 1,
            typeDelivery.value,
            emergency,
            sameDayOrder
          )
        ) {
          if (sameDayOrder) {
            temp.push({
              value: `Today, ${convertDate(z.toDateString(), true)}`,
              label: `Today, ${convertDate(z.toDateString(), false)}`,
            });
          }
        }
      } else {
        temp.push({
          value: `Today, ${convertDate(z.toDateString(), true)}`,
          label: `Today, ${convertDate(z.toDateString(), false)}`,
        });
        break;
      }
    } else {
      for (let j = 0; j < timelineType.length; j++) {
        if (day === 0) {
          if (timelineType[j].days[6]) {
            temp.push({
              value: convertDate(z.toDateString(), true),
              label: convertDate(z.toDateString(), false),
            });
            break;
          }
        } else if (timelineType[j].days[day - 1]) {
          temp.push({
            value: convertDate(z.toDateString(), true),
            label: convertDate(z.toDateString(), false),
          });
          break;
        }
      }
    }
  }
  return temp;
};

export const renderHours = (
  isPossible: any,
  gap: number,
  deliveryTime: number,
  time: any,
  date: any,
  typeDelivery
) => {
  const wish = gap + deliveryTime;
  const result = [];
  const curTime = new Date();

  // new Date(date).getDate() in fireFox will get NaN
  // new Date().getDate() return a number in fireFox
  if (date) {
    date = new Date(date).getDate() || date.split(" ")[2];
  }

  if (isPossible) {
    result.push({
      value: `As soon as possible`,
      label: `As soon as possible`,
    });
  }

  if (date && date.toString() !== curTime.getDate().toString()) {
    curTime.setDate(date);
    curTime.setHours(0, 0, 0, 0);
  }
  const timeType = typeDelivery.value === "delivery" ? time.dl : time.pu;
  const start = timeType
    .filter(item => {
      if (curTime.getDay() === 0 && item.days[6]) {
        return item;
      }
      if (item.days[curTime.getDay() - 1]) {
        return item;
      }
    })
    .map(item => {
      const d = new Date();
      d.setHours(item.open.split(":")[0]);
      d.setMinutes(item.open.split(":")[1]);
      return d;
    });

  const end = timeType
    .filter(item => {
      if (curTime.getDay() === 0 && item.days[6]) {
        return item;
      }
      if (item.days[curTime.getDay() - 1]) {
        return item;
      }
    })
    .map(item => {
      const d = new Date();
      d.setHours(item.close.split(":")[0]);
      d.setMinutes(item.close.split(":")[1]);
      return d;
    });

  curTime.setMinutes(curTime.getMinutes() + wish);
  for (let i = 0; i < start.length; i++) {
    for (
      let j = start[i].getHours() * 60 + start[i].getMinutes();
      j < end[i].getHours() * 60 + end[i].getMinutes();
      j += gap
    ) {
      const t = new Date();
      t.setDate(date);
      t.setHours(Math.floor(j / 60));
      t.setMinutes(j - t.getHours() * 60);
      if (curTime < t) {
        result.push({
          value: `${padLeadingZeros(t.getHours(), 2)}:${padLeadingZeros(
            t.getMinutes(),
            2
          )}`,
          label: `${padLeadingZeros(t.getHours(), 2)}:${padLeadingZeros(
            t.getMinutes(),
            2
          )}`,
        });
      }
    }
  }
  return result;
};

export const swapIndex = (indexStripe, indexCash, opt) => {
  if (opt.length <= 1) return opt;
  const result = [{ value: "stripe" }, { value: "dummny" }];
  result[indexStripe] = opt.find(item => item.value === "Stripe");
  result[indexCash] = opt.find(item => item.value === "Dummy");
  return result;
};
