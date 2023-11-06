export const numberWithCommas = (number) => {
  const num = Number(number)
  return num.toLocaleString("en-IN");
};