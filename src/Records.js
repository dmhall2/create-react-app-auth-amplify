import React, { Component } from "react";
import RecordsTable from "./RecordsTable";
import RecordsChart from "./RecordsChart";

export default class Records extends React.Component {
  render() {
    return (
      <div>
        <RecordsChart records={this.props.records} />
        <RecordsTable records={this.props.records} />
      </div>
    );
  }
}
