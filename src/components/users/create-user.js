import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import Breadcrumb from "../common/breadcrumb";
import Tabset_user from "./tabset-user";

import * as ROUTES from "../../constants/routes";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};
class Create_user extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    console.log(event);

    this.props.firebase
      .doCreateUserWithEmailAndPassword(
        event.email,
        event.password,
        event.firstName,
        event.lastName
      )
      .then((authUser) => {
        //Create user to database
        return this.props.firebase.user(authUser.user.uid).set(
          {
            email: event.email,
            firstName: event.firstName,
            lastName: event.lastName,
            createdDate: Date.now(),
            udpatedDate: Date.now(),
          },
          { merge: true }
        );
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LIST_USERS);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };
  render() {
    return (
      <Fragment>
        <Breadcrumb title="Create User" parent="Users" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5> Add User</h5>
                </div>
                <div className="card-body">
                  <Tabset_user registerProcess={this.onSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default compose(withRouter, withFirebase)(Create_user);
