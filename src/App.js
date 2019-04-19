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
import testData from "./testData";

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
    return <Records records={testData.data.getRecords} />;
    // <Connect
    //   query={graphqlOperation(queries.getRecords, {
    //     make: this.props.make,
    //     prizm: this.props.prizm,
    //     agent: this.props.agent
    //   })}
    // >
    //   {({ data, loading }) => {
    //     if (loading) {
    //       return <div>Loading...</div>;
    //     }
    //     if (!data.getRecords) return;
    //     return <Records records={data.getRecords} />;
    //   }}
    // </Connect>
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
        <SignUp />
        <ConfirmSignUp />
        <VerifyContact />
        <ForgotPassword />
        <TOTPSetup />
        <Loading />
        <MyGreetings override={"Greetings"} />
        <div className="d-flex" id="wrapper">
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
                      <option value="all">ALL</option>
                      <option value="american-automotive-service-solutions">
                        AMERICAN AUTOMOTIVE SERVICE SOLUTIONS
                      </option>
                      <option value="auto-assure">AUTO ASSURE LLC</option>
                      <option value="automotive-product-consultants">
                        AUTOMOTIVE PRODUCT CONSULTANTS
                      </option>
                      <option value="carchex">CARCHEX</option>
                      <option value="carchex-llc">CARCHEX LLC</option>
                      <option value="carguardian-warranty">
                        CARGUARDIAN WARRANTY LLC
                      </option>
                      <option value="carshield">CARSHIELD</option>
                      <option value="carshield-mtm">CARSHIELD - MTM</option>
                      <option value="carshield-mtm2">CARSHIELD - MTM II</option>
                      <option value="carsure">CARSURE</option>
                      <option value="eleras-automotive-group">
                        ELERAS AUTOMOTIVE GROUP
                      </option>
                      <option value="endurance-direct">ENDURANCE DIRECT</option>
                      <option value="greenlight-auto-protection2">
                        GREENLIGHT AUTO PROTECTION II
                      </option>
                      <option value="integrity-protection-group2">
                        INTEGRITY PROTECTION GROUP II
                      </option>
                      <option value="national-vehicle-protection-services">
                        NATIONAL VEHICLE PROTECTION SERVICES
                      </option>
                      <option value="parlmer-administrative">
                        PALMER ADMINISTRATIVE - PPAP
                      </option>
                      <option value="repair-defense-network">
                        REPAIR DEFENSE NETWORK
                      </option>
                      <option value="sky-auto-protection">
                        SKY AUTO PROTECTION
                      </option>
                      <option value="true-auto-protection">
                        TRUE AUTO PROTECTION
                      </option>
                      <option value="vehicle-assurance">
                        VEHICLE ASSURANCE
                      </option>
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
                      <option value="all">ALL</option>
                      <option value="bmw">BMW</option>
                      <option value="buick">BUICK</option>
                      <option value="cadillac">CADILLAC</option>
                      <option value="chevrolet">CHEVROLET</option>
                      <option value="chrysler">CHRYSLER</option>
                      <option value="dodge">DODGE</option>
                      <option value="ford">FORD</option>
                      <option value="gmc">GMC</option>
                      <option value="honda">HONDA</option>
                      <option value="hyundai">HYUNDAI</option>
                      <option value="jeep">JEEP</option>
                      <option value="kia">KIA</option>
                      <option value="lexus">LEXUS</option>
                      <option value="lincoln">LINCOLN</option>
                      <option value="mazda">MAZDA</option>
                      <option value="mercedes">MERCEDES BENZ</option>
                      <option value="nissan">NISSAN</option>
                      <option value="subaru">SUBARU</option>
                      <option value="toyota">TOYOTA</option>
                      <option value="volkswagen">VOLKSWAGEN</option>
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
                      <option value="ALL">ALL</option>
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
        </div>
      </Authenticator>
    );
  }
}

export default App;
