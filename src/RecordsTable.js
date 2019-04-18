import React, { Component, Fragment } from "react";

import NumeralValue from "./NumeralValue";
import YearMonth from "./YearMonth";

export default class RecordsTable extends React.Component {
  render() {
    const estimate = this.props.records.estimate;
    const twelveMonths = this.props.records.twelveMonths;
    const total = this.props.records.total;

    const months = this.props.records.months;

    const estimateEntry = (
      <tr>
        <td>{estimate.name}</td>
        <td>
          <NumeralValue value={estimate.records} type={"#"} />
        </td>
        <td>
          <NumeralValue value={estimate.est_cancel_0} type={"%"} />
        </td>
        <td>
          <NumeralValue value={estimate.est_cancel_1} type={"%"} />
        </td>
        <td>
          <NumeralValue value={estimate.est_cancel_2} type={"%"} />
        </td>
        <td>
          <NumeralValue value={estimate.est_cancel_3} type={"%"} />
        </td>
        <td>
          <NumeralValue value={estimate.est_cancel_4} type={"%"} />
        </td>
        <td>
          <NumeralValue value={estimate.est_cancel_5} type={"%"} />
        </td>
        <td>
          <NumeralValue value={estimate.est_cancel_6} type={"%"} />
        </td>
      </tr>
    );

    const twelveMonthsEntry = (
      <tr>
        <td>{twelveMonths.name}</td>
        <td>
          <NumeralValue value={twelveMonths.records} type={"#"} />
        </td>
        <td>
          <NumeralValue value={twelveMonths.obs_cancel_0} type={"%"} />
        </td>
        <td>
          <NumeralValue value={twelveMonths.obs_cancel_1} type={"%"} />
        </td>
        <td>
          <NumeralValue value={twelveMonths.obs_cancel_2} type={"%"} />
        </td>
        <td>
          <NumeralValue value={twelveMonths.obs_cancel_3} type={"%"} />
        </td>
        <td>
          <NumeralValue value={twelveMonths.obs_cancel_4} type={"%"} />
        </td>
        <td>
          <NumeralValue value={twelveMonths.obs_cancel_5} type={"%"} />
        </td>
        <td>
          <NumeralValue value={twelveMonths.obs_cancel_6} type={"%"} />
        </td>
      </tr>
    );

    const totalEntry = (
      <tr>
        <td>{total.name}</td>
        <td>
          <NumeralValue value={total.records} type={"#"} />
        </td>
        <td>
          <NumeralValue value={total.obs_cancel_0} type={"%"} />
        </td>
        <td>
          <NumeralValue value={total.obs_cancel_1} type={"%"} />
        </td>
        <td>
          <NumeralValue value={total.obs_cancel_2} type={"%"} />
        </td>
        <td>
          <NumeralValue value={total.obs_cancel_3} type={"%"} />
        </td>
        <td>
          <NumeralValue value={total.obs_cancel_4} type={"%"} />
        </td>
        <td>
          <NumeralValue value={total.obs_cancel_5} type={"%"} />
        </td>
        <td>
          <NumeralValue value={total.obs_cancel_6} type={"%"} />
        </td>
      </tr>
    );

    const monthsEntry = months.map((item, key) => (
      <tr>
        <td>
          <YearMonth month={item.month} year={item.year} />
        </td>
        <td>
          <NumeralValue value={item.records} type={"#"} />
        </td>
        {item.estimate ? (
          <Fragment>
            <td>
              <NumeralValue value={item.est_cancel_0} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.est_cancel_1} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.est_cancel_2} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.est_cancel_3} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.est_cancel_4} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.est_cancel_5} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.est_cancel_6} type={"%"} />
            </td>{" "}
          </Fragment>
        ) : (
          <Fragment>
            <td>
              <NumeralValue value={item.obs_cancel_0} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.obs_cancel_1} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.obs_cancel_2} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.obs_cancel_3} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.obs_cancel_4} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.obs_cancel_5} type={"%"} />
            </td>
            <td>
              <NumeralValue value={item.obs_cancel_6} type={"%"} />
            </td>
          </Fragment>
        )}
      </tr>
    ));

    return (
      <table>
        <thead>
          <tr>
            <th />
            <th>Count</th>
            <th>0 pmts</th>
            <th>1 pmt</th>
            <th>2 pmts</th>
            <th>3 pmts</th>
            <th>4 pmts</th>
            <th>5 pmts</th>
            <th>6 pmts</th>
          </tr>
        </thead>
        <tbody>
          {estimateEntry}
          {twelveMonthsEntry}
          {totalEntry}
          {monthsEntry}
        </tbody>
      </table>
    );
  }
}
