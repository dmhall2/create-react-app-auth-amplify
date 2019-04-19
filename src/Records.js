import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RecordsTable from "./RecordsTable";
import RecordsChart from "./RecordsChart";

export default class Records extends React.Component {
  render() {
    return (
      <div>
        <Card className="chart-card">
          <CardHeader>
            <span class="fw-600">Cancellations</span>
          </CardHeader>
          <CardBody>
            <RecordsChart records={this.props.records} />
          </CardBody>
        </Card>
        <Card className="table-card">
          <CardHeader>
            <span class="fw-600">Data</span>
          </CardHeader>
          <CardBody>
            <RecordsTable records={this.props.records} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
