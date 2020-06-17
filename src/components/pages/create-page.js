import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Tabset_page from "./tabset-page";

import * as ROUTES from "../../constants/routes";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  error: null,
};

export class Create_page extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    console.log(event);

    this.props.firebase
      .pages()
      .add({
        title: event.title,
        description: event.description,
        metaTitle: event.metaTitle || "",
        metaDescription: event.metaDescription || "",
        createdDate: Date.now(),
        updatedDate: Date.now(),
      })
      .then(() => {
        this.props.history.push(ROUTES.LIST_PAGES);
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Create Page" parent="Pages" />
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h5>Add Page</h5>
            </div>
            <div className="card-body">
              <Tabset_page handleSubmit={this.onSubmit} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withFirebase(Create_page);
