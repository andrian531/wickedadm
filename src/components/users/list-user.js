import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";

import { withFirebase } from "../Firebase";

export class List_user extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase.users().onSnapshot((snapshot) => {
      let users = [];

      snapshot.forEach((doc) =>
        users.push({
          uid: doc.id,
          email: doc.data().email,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          createdDate: doc.data().createdDate,
          updatedDate: doc.data().updatedDate,
        })
      );

      this.setState({
        users,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { users, loading } = this.state;

    console.log(users);
    return (
      <Fragment>
        <Breadcrumb title="User List" parent="Users" />
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h5>User Details</h5>
            </div>
            <div className="card-body">
              <div className="btn-popup pull-right">
                <Link to="/users/create-user" className="btn btn-secondary">
                  Create User
                </Link>
              </div>
              <div className="clearfix"></div>
              <div
                id="batchDelete"
                className="category-table user-list order-table coupon-list-delete"
              >
                {loading ? (
                  <p>Loading... please wait</p>
                ) : (
                  <Datatable
                    myData={users}
                    pageSize={10}
                    pagination={true}
                    class="-striped -highlight"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withFirebase(List_user);
