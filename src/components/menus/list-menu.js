import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listMenu";
import Datatable from "../common/datatable";

import { withFirebase } from "../Firebase";

export class List_menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      menus: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase.menus().onSnapshot((snapshot) => {
      let menus = [];

      snapshot.forEach((doc) =>
        menus.push({
          name: doc.data().name,
          alias: doc.data().alias,
          createdDate: doc.data().createdDate,
          updatedDate: doc.data().updatedDate,
        })
      );

      this.setState({
        menus,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { menus, loading } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="List Menu" parent="Menu" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Menu Lists</h5>
                </div>
                <div className="card-body">
                  <div
                    id="batchDelete"
                    className="category-table order-table coupon-list-delete"
                  >
                    {loading ? (
                      <p>Loading... please wait</p>
                    ) : (
                      <Datatable
                        myData={menus}
                        pageSize={6}
                        pagination={true}
                        class="-striped -highlight"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withFirebase(List_menu);
