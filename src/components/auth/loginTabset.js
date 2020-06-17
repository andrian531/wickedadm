import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { compose } from "recompose";
import { User, Unlock } from "react-feather";
import { withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

export class LoginTabset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeShow: true,
      startDate: new Date(),
      ...INITIAL_STATE,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    console.log("tes", email, password);

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  routeChange = () => {
    this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <div>
        <Fragment>
          <Tabs>
            <TabList className="nav nav-tabs tab-coupon">
              <Tab className="nav-link">
                <User />
                Login
              </Tab>
            </TabList>

            <TabPanel>
              <form
                className="form-horizontal auth-form"
                onSubmit={this.onSubmit}
              >
                <div className="form-group">
                  <input
                    required=""
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    className="form-control"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-terms">
                  <div className="custom-control custom-checkbox mr-sm-2">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlAutosizing"
                    />
                    <label className="d-block">
                      <input
                        className="checkbox_animated"
                        id="chk-ani2"
                        type="checkbox"
                      />
                      Reminder Me <span className="pull-right"></span>
                    </label>
                  </div>
                </div>
                <div className="form-button">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isInvalid}
                  >
                    Login
                  </button>
                </div>
                {error && <p className="text-danger">{error.message}</p>}
              </form>
            </TabPanel>
          </Tabs>
        </Fragment>
      </div>
    );
  }
}

export default compose(withRouter, withFirebase)(LoginTabset);
