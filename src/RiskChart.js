import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import Decimal from "decimal.js";

import to100 from "./to100.js";

HighchartsExporting(Highcharts);

export default class RiskChart extends React.Component {
  render() {
    const months = this.props.records.months;
    let riskData = [];
    let cancellationData = [];
    let actualData = [];

    for (let m = months.length - 1; m >= 0; m--) {
      const month = months[m];
      if (month.year >= 2016) {
        riskData.push([
          new Date(month.year, month.month - 1, 1).getTime(),
          to100(month.risk_score)
        ]);
        cancellationData.push([
          new Date(month.year, month.month - 1, 1).getTime(),
          to100(month.est_cancel_6)
        ]);

        if (!month.estimate) {
          actualData.push([
            new Date(month.year, month.month - 1, 1).getTime(),
            to100(month.obs_cancel_6)
          ]);
        }
      }
    }

    const riskSeries = {
      name: "Relative Risk Score",
      data: riskData
    };

    const cancellationSeries = {
      name: "Cancellation Score",
      data: cancellationData
    };

    const actualSeries = {
      name: "Actual Payment 6 Cancel",
      data: actualData
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
        title: { text: "Score" },
        max: 100
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Time"
        }
      },
      tooltip: {
        headerFormat: "{point.x:%Y-%b} <br>",
        valueDecimals: 0,
        valueSuffix: ""
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
      colors: ["#1F3D4D", "#33667F", "#52A3CC"],
      series: [riskSeries, cancellationSeries, actualSeries]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}
