import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RecordsTable from "./RecordsTable";
import RecordsChart from "./RecordsChart";
import RiskChart from "./RiskChart";

export default class Records extends React.Component {
  render() {
    return (
      <div>
        <Card className="chart-card">
          <CardHeader>
            <span className="fw-600">Risk Score</span>
          </CardHeader>
          <CardBody>
            <RiskChart records={this.props.records} />
          </CardBody>
        </Card>
        <Card className="chart-card">
          <CardHeader>
            <span className="fw-600">Cancellation Curves</span>
          </CardHeader>
          <CardBody>
            <RecordsChart records={this.props.records} />
          </CardBody>
        </Card>
        <Card className="table-card">
          <CardHeader>
            <span className="fw-600">Data</span>
          </CardHeader>
          <CardBody>
            <RecordsTable records={this.props.records} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
