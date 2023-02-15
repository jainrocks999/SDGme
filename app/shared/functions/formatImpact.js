export const formatImpact = (amount) => {
  let result;
  let unit;
  if (amount < 1000) {
    unit = 'g';
    result = Math.round((amount + Number.EPSILON) * 100) / 100;
  } else if (amount < 1000000) {
    unit = 'kg';
    result = amount / 1000;
    result = Math.round((result + Number.EPSILON) * 100) / 100;
  } else {
    unit = 't';
    result = amount / 1000000;
    result = Math.round((result + Number.EPSILON) * 100) / 100;
  }

  return `${result + unit}`;
};
