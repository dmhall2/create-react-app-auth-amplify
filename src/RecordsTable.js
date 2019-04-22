import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import { CSVLink } from "react-csv";

import NumeralValue from "./NumeralValue";
import YearMonth from "./YearMonth";

export default class RecordsTable extends React.Component {
  render() {
    const estimate = this.props.records.estimate;
    const twelveMonths = this.props.records.twelveMonths;
    const total = this.props.records.total;

    const months = this.props.records.months;

    const csvHeaders = [
      "Name",
      "Records",
      "Obs Cancel 0",
      "Obs Cancel 1",
      "Obs Cancel 2",
      "Obs Cancel 3",
      "Obs Cancel 4",
      "Obs Cancel 5",
      "Obs Cancel 6",
      "Est Cancel 0",
      "Est Cancel 1",
      "Est Cancel 2",
      "Est Cancel 3",
      "Est Cancel 4",
      "Est Cancel 5",
      "Est Cancel 6",
      "Risk Score"
    ];
    let csvData = [];

    let item = estimate;
    csvData.push([
      item.name,
      item.records,
      item.obs_cancel_0,
      item.obs_cancel_1,
      item.obs_cancel_2,
      item.obs_cancel_3,
      item.obs_cancel_4,
      item.obs_cancel_5,
      item.obs_cancel_6,
      item.est_cancel_0,
      item.est_cancel_1,
      item.est_cancel_2,
      item.est_cancel_3,
      item.est_cancel_4,
      item.est_cancel_5,
      item.est_cancel_6,
      item.risk_score
    ]);

    item = twelveMonths;
    csvData.push([
      item.name,
      item.records,
      item.obs_cancel_0,
      item.obs_cancel_1,
      item.obs_cancel_2,
      item.obs_cancel_3,
      item.obs_cancel_4,
      item.obs_cancel_5,
      item.obs_cancel_6,
      item.est_cancel_0,
      item.est_cancel_1,
      item.est_cancel_2,
      item.est_cancel_3,
      item.est_cancel_4,
      item.est_cancel_5,
      item.est_cancel_6,
      item.risk_score
    ]);

    item = total;
    csvData.push([
      item.name,
      item.records,
      item.obs_cancel_0,
      item.obs_cancel_1,
      item.obs_cancel_2,
      item.obs_cancel_3,
      item.obs_cancel_4,
      item.obs_cancel_5,
      item.obs_cancel_6,
      item.est_cancel_0,
      item.est_cancel_1,
      item.est_cancel_2,
      item.est_cancel_3,
      item.est_cancel_4,
      item.est_cancel_5,
      item.est_cancel_6,
      item.risk_score
    ]);

    for (let m = 0; m < months.length; m++) {
      item = months[m];
      item.name = YearMonth({ month: item.month, year: item.year });
      csvData.push([
        item.name,
        item.records,
        item.obs_cancel_0,
        item.obs_cancel_1,
        item.obs_cancel_2,
        item.obs_cancel_3,
        item.obs_cancel_4,
        item.obs_cancel_5,
        item.obs_cancel_6,
        item.est_cancel_0,
        item.est_cancel_1,
        item.est_cancel_2,
        item.est_cancel_3,
        item.est_cancel_4,
        item.est_cancel_5,
        item.est_cancel_6,
        item.risk_score
      ]);
    }

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
        <td>
          <NumeralValue value={estimate.risk_score} type={"score"} />
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
        <td>
          <NumeralValue value={twelveMonths.risk_score} type={"score"} />
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
        <td>
          <NumeralValue value={total.risk_score} type={"score"} />
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
            <td>
              <NumeralValue value={item.risk_score} type={"score"} />
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
            <td>
              <NumeralValue value={item.risk_score} type={"score"} />
            </td>
          </Fragment>
        )}
      </tr>
    ));

    return (
      <Fragment>
        <div>
          <CSVLink data={csvData} headers={csvHeaders}>
            Download
          </CSVLink>
        </div>
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
              <th>
                <span className="fw-600">Risk Score</span>{" "}
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
      </Fragment>
    );
  }
}
