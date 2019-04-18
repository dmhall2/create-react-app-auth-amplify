import numeral from "numeral";

export default function NumeralValue({ value, type }) {
  if (type === "$") {
    return numeral(value).format("$0,0.00");
  } else if (type === "#") {
    return numeral(value).format("0,0");
  } else if (type === "%") {
    return numeral(value).format("0.0%");
  }
}
