import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const generatePassword = () => {
  var length = 6,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
