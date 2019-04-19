import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";

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
        <td>
          <span className="fw-600">{estimate.name}</span>
        </td>
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
        <td>
          <span className="fw-600">{twelveMonths.name}</span>
        </td>
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
        <td>
          <span className="fw-600">{total.name}</span>
        </td>
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
          <span className="fw-600">
            <YearMonth month={item.month} year={item.year} />
          </span>
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
            </td>
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
      <Table striped>
        <thead>
          <tr>
            <th />
            <th>
              <span className="fw-600">Count</span>
            </th>
            <th>
              <span className="fw-600">0</span>{" "}
              <span className="small text-muted">pmts</span>
            </th>
            <th>
              <span className="fw-600">1</span>{" "}
              <span className="small text-muted">pmts</span>
            </th>
            <th>
              <span className="fw-600">2</span>{" "}
              <span className="small text-muted">pmts</span>
            </th>
            <th>
              <span className="fw-600">3</span>{" "}
              <span className="small text-muted">pmts</span>
            </th>
            <th>
              <span className="fw-600">4</span>{" "}
              <span className="small text-muted">pmts</span>
            </th>
            <th>
              <span className="fw-600">5</span>{" "}
              <span className="small text-muted">pmts</span>
            </th>
            <th>
              <span className="fw-600">6</span>{" "}
              <span className="small text-muted">pmts</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {estimateEntry}
          {twelveMonthsEntry}
          {totalEntry}
          {monthsEntry}
        </tbody>
      </Table>
    );
  }
}
