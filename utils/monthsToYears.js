export function monthsToYears(months) {
  if (months < 0) {
    return "Invalid input";
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} months`;
  } else if (remainingMonths === 0) {
    return `${years} ${years > 1 ? "years" : "year"}`;
  } else {
    return `${years} years and ${remainingMonths} months`;
  }
}
