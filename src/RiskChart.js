import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import Decimal from "decimal.js";

HighchartsExporting(Highcharts);

function to100(value) {
  if (value === null) {
    return null;
  } else {
    return new Decimal(value)
      .times(100)
      .toDecimalPlaces(0)
      .toNumber();
  }
}

export default class RiskChart extends React.Component {
  render() {
    const months = this.props.records.months;
    let monthsData = [];
    let dateSeries = [];

    for (let m = months.length - 1; m >= 0; m--) {
      const month = months[m];

      if (month.year >= 2016) {
        console.log(new Date(month.year, month.month - 1, 1));
        monthsData.push([
          new Date(month.year, month.month - 1, 1).getTime(),
          to100(month.risk_score)
        ]);
      }
    }

    const monthsSeries = {
      name: "Risk Score",
      data: monthsData
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
        title: { text: "Risk Score" },
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
      colors: ["#1F3D4D"],
      series: [monthsSeries]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}
