export const getPriceDetail = (input: any) => {
  return input?.gross?.amount;
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
  Dec: "November",
};

const d = new Date();
export const dayNow = `${Object.keys(days)[new Date().getDay()]} ${
  Object.keys(months)[d.getMonth()]
} ${d.getDate()} ${d.getFullYear().toString().substr(-4)}`;

export const formatTime = (day: string) => {
  const formatFullTime = new Date(day);
  return `${Object.values(days)[formatFullTime.getDay()]} ${
    Object.values(months)[formatFullTime.getMonth()]
  } ${formatFullTime.getDate()} ${formatFullTime
    .getFullYear()
    .toString()
    .substr(-4)}`;
};
