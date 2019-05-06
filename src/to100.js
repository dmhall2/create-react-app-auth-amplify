import Decimal from "decimal.js";

export default function to100(value) {
  if (value === null) {
    return null;
  } else {
    return new Decimal(value)
      .times(100)
      .round()
      .toDecimalPlaces(0)
      .toNumber();
  }
}
