import React, { Component, Fragment } from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import aws_exports from "./aws-exports";
import * as queries from "./graphql/queries";
import numeral from "numeral";

Amplify.configure(aws_exports);

function NumeralValue({ value, type }) {
  if (type === "$") {
    return numeral(value).format("$0,0.00");
  } else if (type === "#") {
    return numeral(value).format("0,0");
  } else if (type === "%") {
    return numeral(value).format("0.0%");
  }
}

function YearMonth({ month, year }) {
  if (month === 1) {
    month = "January";
  } else if (month === 2) {
    month = "February";
  } else if (month === 3) {
    month = "March";
  } else if (month === 4) {
    month = "April";
  } else if (month === 5) {
    month = "May";
  } else if (month === 6) {
    month = "June";
  } else if (month === 7) {
    month = "July";
  } else if (month === 8) {
    month = "August";
  } else if (month === 9) {
    month = "September";
  } else if (month === 10) {
    month = "October";
  } else if (month === 11) {
    month = "November";
  } else if (month === 12) {
    month = "December";
  }

  return month + " " + year;
}

class RecordsLoader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // return nextProps.runCount !== this.props.runCount;
    return true;
  }

  render() {
    return (
      <Connect
        query={graphqlOperation(queries.getRecords, {
          make: this.props.make,
          prizm: this.props.prizm,
          agent: this.props.agent
        })}
      >
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (!data.getRecords) return;
          return <TableRecords records={data.getRecords} />;
        }}
      </Connect>
    );
  }
}

class TableRecords extends React.Component {
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prizm: null,
      agent: null,
      make: null,
      runCount: 0
    };
  }

  handleChange(name, ev) {
    let value = ev.target.value;

    if (name === "prizm") {
      if (value === "All") {
        value = null;
      } else {
        value = parseInt(value);
      }
    } else if (name === "make" || name === "agent") {
      if (value === "All") {
        value = null;
      }
    }

    this.setState({ [name]: value });
  }

  updateRunCount() {
    this.setState({ runCount: this.state.runCount + 1 });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <input
              name="agent"
              placeholder="agent"
              onChange={ev => {
                this.handleChange("agent", ev);
              }}
            />
            <input
              name="make"
              placeholder="make"
              onChange={ev => {
                this.handleChange("make", ev);
              }}
            />
            <input
              name="prizm"
              placeholder="prizm"
              onChange={ev => {
                this.handleChange("prizm", ev);
              }}
            />
            <button onClick={this.updateRunCount.bind(this)}>Run</button>
          </div>
          <div>
            <RecordsLoader
              make={this.state.make}
              prizm={this.state.prizm}
              agent={this.state.agent}
              runCount={this.state.runCount}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
