import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import moment from "moment";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withFirebase } from "../Firebase";

export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
      myData: this.props.myData,
    };
  }

  selectRow = (e, i) => {
    if (!e.target.checked) {
      this.setState({
        checkedValues: this.state.checkedValues.filter((item, j) => i !== item),
      });
    } else {
      this.state.checkedValues.push(i);
      this.setState({
        checkedValues: this.state.checkedValues,
      });
    }
  };

  handleRemoveRow = () => {
    const selectedValues = this.state.checkedValues;
    const updatedData = this.state.myData.filter(function (el) {
      return selectedValues.indexOf(el.id) < 0;
    });
    this.setState({
      myData: updatedData,
    });
    toast.success("Successfully Deleted !");
  };

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const data = [...this.state.myData];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ myData: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.myData[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { pageSize, myClass, multiSelectOption, pagination } = this.props;
    const { myData } = this.state;

    const columns = [];
    for (var key in myData[0]) {
      //   let editable = this.renderEditable;
      let editable = null;
      let show = true;
      if (key === "image") {
        editable = null;
      }
      if (key === "status") {
        editable = null;
      }
      if (key === "avtar") {
        editable = null;
      }
      if (key === "vendor") {
        editable = null;
      }
      if (key === "order_status") {
        editable = null;
      }

      if (key === "uid") {
        show = false;
      }

      if (key === "createdDate") {
        editable = (key) => (
          <span>{moment(key.createdDate).format("MM/DD/YYYY")}</span>
        );
      }

      if (key === "updatedDate") {
        editable = (key) => (
          <span>{moment(key.updatedDate).format("MM/DD/YYYY")}</span>
        );
      }

      columns.push({
        Header: <b>{this.Capitalize(key.toString())}</b>,
        accessor: key,
        Cell: editable,
        show: show,
        style: {
          textAlign: "center",
        },
      });
    }

    if (multiSelectOption == true) {
      columns.push({
        Header: (
          <button
            className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
            onClick={(e) => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.handleRemoveRow();
            }}
          >
            Delete
          </button>
        ),
        id: "delete",
        accessor: (str) => "delete",
        sortable: false,
        style: {
          textAlign: "center",
        },
        Cell: (row) => (
          <div>
            <span>
              <input
                type="checkbox"
                name={row.original.id}
                defaultChecked={this.state.checkedValues.includes(
                  row.original.id
                )}
                onChange={(e) => this.selectRow(e, row.original.id)}
              />
            </span>
          </div>
        ),
        accessor: key,
        style: {
          textAlign: "center",
        },
      });
    } else {
      columns.push({
        Header: <b>Action</b>,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (row) => (
          <div>
            <span
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.value) {
                    this.props.firebase
                      .pages()
                      .doc(myData[row.index].uid)
                      .delete()
                      .then(() => {
                        console.log(myData[row.index], "row");
                        Swal.fire(
                          "Deleted!",
                          "Your file has been deleted.",
                          "success"
                        ).then(() => {
                          window.location.reload();
                        });
                        toast.success("Successfully Deleted !");
                      })
                      .catch((error) => {
                        console.error("Error removing document: ", error);
                      });
                  }
                });
              }}
            >
              <i
                className="fa fa-trash"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "#e4566e",
                }}
              ></i>
            </span>

            <span>
              <i
                className="fa fa-pencil"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(40, 167, 69)",
                }}
              ></i>
            </span>
          </div>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      });
    }

    return (
      <Fragment>
        <ReactTable
          data={myData}
          columns={columns}
          defaultPageSize={pageSize}
          className={myClass}
          showPagination={pagination}
        />
        <ToastContainer />
      </Fragment>
    );
  }
}

export default compose(withRouter, withFirebase)(Datatable);
