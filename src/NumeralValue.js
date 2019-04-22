import numeral from "numeral";
import Decimal from "decimal.js";

export default function NumeralValue({ value, type }) {
  if (value === null) {
    return "-";
  }

  if (type === "$") {
    return numeral(value).format("$0,0.00");
  } else if (type === "#") {
    return numeral(value).format("0,0");
  } else if (type === "%") {
    return numeral(value).format("0.0%");
  } else if (type === "score") {
    return new Decimal(value)
      .times(100)
      .toDecimalPlaces(0)
      .toNumber();
  }
}
