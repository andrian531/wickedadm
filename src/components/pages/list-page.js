import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listPages";
import Datatable from "../common/datatable";

import { withFirebase } from "../Firebase";

class ListPages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      pages: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase.pages().onSnapshot((snapshot) => {
      let pages = [];

      snapshot.forEach((doc) =>
        pages.push({
          uid: doc.id,
          title: doc.data().title,
          createdDate: doc.data().createdDate,
          updatedDate: doc.data().updatedDate,
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

  render() {
    const { pages, loading } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="List Pages" parent="Pages" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Products Category</h5>
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
                        myData={pages}
                        pageSize={7}
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

export default withFirebase(ListPages);
