import React, { Component, Fragment } from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import aws_exports from "./aws-exports";
import * as queries from "./graphql/queries";
import Records from "./Records";

Amplify.configure(aws_exports);

class RecordsLoader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const valueUpdates = nextProps.valueUpdates;
    const runCount = nextProps.runCount;

    if (valueUpdates === 0 && runCount === 0) {
      return true;
    } else if (
      runCount > this.props.runCount &&
      valueUpdates >= this.props.valueUpdates
    ) {
      return true;
    } else {
      return false;
    }
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
          return <Records records={data.getRecords} />;
        }}
      </Connect>
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
      runCount: 0,
      valueUpdates: 0
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

    this.setState({
      [name]: value,
      valueUpdates: this.state.valueUpdates + 1
    });
  }

  updateRunCount() {
    this.setState({ runCount: this.state.runCount + 1 });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <select
              name="agent"
              onChange={ev => {
                this.handleChange("agent", ev);
              }}
            >
              <option value="ALL">All</option>
              <option value="CARSHIELD">Carshield</option>
              <option value="ENDURANCE DIRECT">Endurance Direct</option>
            </select>
            <select
              name="make"
              onChange={ev => {
                this.handleChange("make", ev);
              }}
            >
              <option value="ALL">All</option>
              <option value="CHEVROLET">Chevrolet</option>
              <option value="FORD">Ford</option>
            </select>
            <select
              name="prizm"
              onChange={ev => {
                this.handleChange("prizm", ev);
              }}
            >
              <option value="ALL">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <button onClick={this.updateRunCount.bind(this)}>Run</button>
          </div>
          <div>
            <RecordsLoader
              make={this.state.make}
              prizm={this.state.prizm}
              agent={this.state.agent}
              runCount={this.state.runCount}
              valueUpdates={this.state.valueUpdates}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
