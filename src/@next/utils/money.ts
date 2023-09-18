import { IMoney } from "@types";

export const isPriceEqual = (first: IMoney, second: IMoney) =>
  first.amount === second.amount && first.currency === second.currency;

export const checkCurrency = (currency: string) => {
  // currency === "EUR" ? "€" : "€";
  switch (currency) {
    case "EUR":
      return "€";
    case "CAD":
      return "$";
    case "GBP":
      return "£";
    case "NGN":
      return "₦";
    case "USA":
      return "$";
    default:
      return "€";
  }
};
