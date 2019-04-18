import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default class Records extends React.Component {
  render() {
    const estimate = this.props.records.estimate;
    const twelveMonths = this.props.records.twelveMonths;
    const total = this.props.records.total;

    const estimateSeries = {
      name: estimate.name,
      data: [
        estimate.est_cancel_0,
        estimate.est_cancel_1,
        estimate.est_cancel_2,
        estimate.est_cancel_3,
        estimate.est_cancel_4,
        estimate.est_cancel_5,
        estimate.est_cancel_6
      ]
    };

    const twelveMonthsSeries = {
      name: twelveMonths.name,
      data: [
        twelveMonths.obs_cancel_0,
        twelveMonths.obs_cancel_1,
        twelveMonths.obs_cancel_2,
        twelveMonths.obs_cancel_3,
        twelveMonths.obs_cancel_4,
        twelveMonths.obs_cancel_5,
        twelveMonths.obs_cancel_6
      ]
    };

    const totalSeries = {
      name: total.name,
      data: [
        total.obs_cancel_0,
        total.obs_cancel_1,
        total.obs_cancel_2,
        total.obs_cancel_3,
        total.obs_cancel_4,
        total.obs_cancel_5,
        total.obs_cancel_6
      ]
    };

    let options = {
      title: null,
      series: [estimateSeries, twelveMonthsSeries, totalSeries]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}
