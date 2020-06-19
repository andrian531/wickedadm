import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Tabset_page from "./tabset-page";

import * as ROUTES from "../../constants/routes";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  error: null,
  pages: [],
};

export class Create_page extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase.pages().onSnapshot((snapshot) => {
      let pages = [];

      snapshot.forEach((doc) =>
        pages.push({
          value: doc.id,
          label: doc.data().alias,
        })
      );

      this.setState({
        pages,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSubmit = (event) => {
    console.log(event);

    event.createdDate = Date.now();
    event.updatedDate = Date.now();
    event.parentId = event.parentId !== undefined ? event.parentId : 0;

    this.props.firebase
      .pages()
      .add({
        ...event,
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
              <Tabset_page
                options={this.state.pages}
                handleSubmit={this.onSubmit}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withFirebase(Create_page);
