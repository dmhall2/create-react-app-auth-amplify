import React, { Component, Fragment } from "react";
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Navbar
} from "reactstrap";
import MyGreetings from "./MyGreetings";
import "./App.css";
import {
  Authenticator,
  SignIn,
  RequireNewPassword,
  SignUp,
  ConfirmSignIn,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  TOTPSetup,
  Loading
} from "aws-amplify-react";
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

    if (valueUpdates === 0 && runCount == 0) {
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
          if (!data || !data.getRecords)
            return <div>Select filters and click run to get started</div>;
          return <Records records={data.getRecords} />;
        }}
      </Connect>
    );
  }
}

class LoggedOutView extends Component {
  render() {
    return <p />;
  }
}

class LoggedInView extends Component {
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

    console.log(this.state);
  }

  updateRunCount() {
    this.setState({ runCount: this.state.runCount + 1 });
  }

  render() {
    return (
      <Fragment>
        <div className="bg-light-green border-right" id="sidebar-wrapper">
          <ListGroup className="list-group-flush">
            <ListGroupItem className="bg-light-green">
              <Form>
                <FormGroup>
                  <Label for="agent-select">
                    <span className="fw-600">Agent</span>
                  </Label>
                  <Input
                    type="select"
                    name="agent"
                    onChange={ev => {
                      this.handleChange("agent", ev);
                    }}
                  >
                    <option value="All">ALL</option>
                    <option value="AMERICAN AUTOMOTIVE SERVICE SOLUTIONS">
                      AMERICAN AUTOMOTIVE SERVICE SOLUTIONS
                    </option>
                    <option value="AUTO ASSURE LLC">AUTO ASSURE LLC</option>
                    <option value="AUTOMOTIVE PRODUCT CONSULTANTS">
                      AUTOMOTIVE PRODUCT CONSULTANTS
                    </option>
                    <option value="CARCHEX">CARCHEX</option>
                    <option value="CARCHEX LLC">CARCHEX LLC</option>
                    <option value="CARGUARDIAN WARRANTY LLC">
                      CARGUARDIAN WARRANTY LLC
                    </option>
                    <option value="CARSHIELD">CARSHIELD</option>
                    <option value="CARSHIELD -MTM">CARSHIELD - MTM</option>
                    <option value="CARSHIELD - MTM II">
                      CARSHIELD - MTM II
                    </option>
                    <option value="CARSURE">CARSURE</option>
                    <option value="ELERAS AUTOMOTIVE GROUP">
                      ELERAS AUTOMOTIVE GROUP
                    </option>
                    <option value="ENDURANCE DIRECT">ENDURANCE DIRECT</option>
                    <option value="GREENLIGHT AUTO PROTECTION II">
                      GREENLIGHT AUTO PROTECTION II
                    </option>
                    <option value="INTEGRITY PROTECTION GROUP II">
                      INTEGRITY PROTECTION GROUP II
                    </option>
                    <option value="NATIONAL VEHICLE PROTECTION SERVICES">
                      NATIONAL VEHICLE PROTECTION SERVICES
                    </option>
                    <option value="PALMER ADMINISTRATIVE -PPAP">
                      PALMER ADMINISTRATIVE - PPAP
                    </option>
                    <option value="REPAIR DEFENSE NETWORK">
                      REPAIR DEFENSE NETWORK
                    </option>
                    <option value="SKY AUTO PROTECTION">
                      SKY AUTO PROTECTION
                    </option>
                    <option value="TRUE AUTO PROTECTION">
                      TRUE AUTO PROTECTION
                    </option>
                    <option value="VEHICLE ASSURANCE">VEHICLE ASSURANCE</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="make-select">
                    <span className="fw-600">Vehicle Make</span>
                  </Label>
                  <Input
                    type="select"
                    name="make"
                    onChange={ev => {
                      this.handleChange("make", ev);
                    }}
                  >
                    <option value="All">ALL</option>
                    <option value="BMW">BMW</option>
                    <option value="BUICK">BUICK</option>
                    <option value="CADILLAC">CADILLAC</option>
                    <option value="CHEVROLET">CHEVROLET</option>
                    <option value="CHRYSLER">CHRYSLER</option>
                    <option value="DODGE">DODGE</option>
                    <option value="FORD">FORD</option>
                    <option value="GMC">GMC</option>
                    <option value="HONDA">HONDA</option>
                    <option value="HYUNDAI">HYUNDAI</option>
                    <option value="JEEP">JEEP</option>
                    <option value="KIA">KIA</option>
                    <option value="LEXUS">LEXUS</option>
                    <option value="LINCOLN">LINCOLN</option>
                    <option value="MAZDA">MAZDA</option>
                    <option value="MERCEDES">MERCEDES BENZ</option>
                    <option value="NISSAN">NISSAN</option>
                    <option value="SUBARU">SUBARU</option>
                    <option value="TOYOTA">TOYOTA</option>
                    <option value="VOLKSWAGEN">VOLKSWAGEN</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="prizm-select">
                    <span className="fw-600">PRIZM Segment</span>
                  </Label>
                  <Input
                    type="select"
                    name="prizm"
                    onChange={ev => {
                      this.handleChange("prizm", ev);
                    }}
                  >
                    <option value="All">ALL</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                    <option value="60">60</option>
                    <option value="61">61</option>
                    <option value="62">62</option>
                    <option value="63">63</option>
                    <option value="64">64</option>
                    <option value="65">65</option>
                    <option value="66">66</option>
                    <option value="67">67</option>
                    <option value="68">68</option>
                  </Input>
                </FormGroup>
                <Button
                  className="sidebar-btn"
                  color="primary"
                  onClick={this.updateRunCount.bind(this)}
                  block
                >
                  Run
                </Button>
              </Form>
            </ListGroupItem>
          </ListGroup>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div>
              <RecordsLoader
                make={this.state.make}
                prizm={this.state.prizm}
                agent={this.state.agent}
                runCount={this.state.runCount}
                valueUpdates={this.state.valueUpdates}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="d-flex" id="wrapper">
        {this.props.authData ? <LoggedInView /> : <LoggedOutView />}
      </div>
    );
  }
}

class AppWithAuth extends Component {
  render() {
    const MyTheme = {
      button: { backgroundColor: "#007bff" },
      navButton: { backgroundColor: "#007bff" },
      signInButtonIcon: { display: "none" },
      googleSignInButton: { backgroundColor: "red", borderColor: "red" }
    };

    return (
      <Authenticator hideDefault={true} theme={MyTheme}>
        <SignIn />
        <ConfirmSignIn />
        <RequireNewPassword />
        {/*<SignUp />*/}
        <ConfirmSignUp />
        <VerifyContact />
        <ForgotPassword />
        <TOTPSetup />
        <Loading />
        <MyGreetings override={"Greetings"} />
        <App />
      </Authenticator>
    );
  }
}

export default AppWithAuth;
