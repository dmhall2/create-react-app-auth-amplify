import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import Decimal from "decimal.js";

HighchartsExporting(Highcharts);

function to100(value) {
  return new Decimal(value)
    .times(100)
    .toDecimalPlaces(1)
    .toNumber();
}

export default class Records extends React.Component {
  render() {
    const estimate = this.props.records.estimate;
    const twelveMonths = this.props.records.twelveMonths;
    const total = this.props.records.total;

    const estimateSeries = {
      name: estimate.name,
      data: [
        to100(estimate.est_cancel_0),
        to100(estimate.est_cancel_1),
        to100(estimate.est_cancel_2),
        to100(estimate.est_cancel_3),
        to100(estimate.est_cancel_4),
        to100(estimate.est_cancel_5),
        to100(estimate.est_cancel_6)
      ],
      dashStyle: "longdash"
    };

    const twelveMonthsSeries = {
      name: twelveMonths.name,
      data: [
        to100(twelveMonths.obs_cancel_0),
        to100(twelveMonths.obs_cancel_1),
        to100(twelveMonths.obs_cancel_2),
        to100(twelveMonths.obs_cancel_3),
        to100(twelveMonths.obs_cancel_4),
        to100(twelveMonths.obs_cancel_5),
        to100(twelveMonths.obs_cancel_6)
      ]
    };

    const totalSeries = {
      name: total.name,
      data: [
        to100(total.obs_cancel_0),
        to100(total.obs_cancel_1),
        to100(total.obs_cancel_2),
        to100(total.obs_cancel_3),
        to100(total.obs_cancel_4),
        to100(total.obs_cancel_5),
        to100(total.obs_cancel_6)
      ]
    };

    let options = {
      chart: {
        type: "spline",
        style: {
          fontFamily: "helvetica"
        },
        marginTop: 50
      },
      title: {
        text: null,
        align: "left",
        style: { fontSize: "14px" }
      },
      yAxis: {
        title: { text: "Cumulative Cancellation %" },
        labels: {
          formatter: function() {
            return this.value + "%";
          }
        },
        max: 100
      },
      xAxis: {
        title: {
          text: "Number of Payments"
        },
        gridLineWidth: 1,
        tickInterval: 1
      },
      tooltip: {
        headerFormat: "{point.x} pmts <br>",
        valueDecimals: 1,
        valueSuffix: "%"
      },
      credits: {
        enabled: false
      },
      exporting: {
        buttons: {
          contextButton: {
            enabled: false
          },
          exportButton: {
            text: "Download",
            // Use only the download related menu items from the default
            // context button
            menuItems: [
              "downloadPNG",
              "downloadJPEG",
              "downloadPDF",
              "downloadSVG"
            ]
          },
          printButton: {
            text: "Print",
            onclick: function() {
              this.print();
            }
          }
        }
      },
      colors: ["#1F3D4D", "#33667F", "#52A3CC", "#688695", "8FB8CC", "#000"],
      series: [estimateSeries, twelveMonthsSeries, totalSeries]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}
