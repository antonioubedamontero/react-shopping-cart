import type { Promotion } from "../interfaces";

export const calSubTotal = (
  numOfItems: number,
  price: number,
  promo: Promotion
): number => {
  switch (promo) {
    case "none":
      return numOfItems * price;
    case "twoForOne": {
      const numOfPairs = Math.floor(numOfItems / 2);
      return (numOfItems - numOfPairs) * price;
    }
    case "threeForTwo":
      const numOfThrees = Math.floor(numOfItems / 3);
      return (numOfItems - numOfThrees) * price;
    default:
      throw new Error("Promotion is not defined");
  }
};
