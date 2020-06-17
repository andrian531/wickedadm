import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import Breadcrumb from "../common/breadcrumb";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

const schema = yup.object().shape({
  name: yup.string().required(),
  alias: yup.string().required(),
});

const Create_menu = (props) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });
  const [state, setState] = React.useState({
    error: null,
  });
  const onSubmit = (data) => {
    props.firebase
      .menus()
      .add({
        name: data.name,
        alias: data.alias,
        createdDate: Date.now(),
        updatedDate: Date.now(),
      })
      .then(() => {
        props.history.push(ROUTES.LIST_MENUS);
      })
      .catch((error) => {
        setState({
          error: error,
        });
      });
  };

  return (
    <Fragment>
      <Breadcrumb title="Create Menu" parent="Menus" />
      {state.error && <p className="text-danger">{state.error}</p>}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Menu</h5>
              </div>
              <div className="card-body">
                <form
                  className="needs-validation"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-group row">
                    <label className="col-xl-3 col-md-4">
                      <span>*</span> Menu Name
                    </label>
                    <input
                      className="form-control col-md-8"
                      name="name"
                      type="text"
                      required=""
                      ref={register}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                  <div className="form-group row">
                    <label className="col-xl-3 col-md-4">
                      <span>*</span> Alias name
                    </label>
                    <input
                      className="form-control col-md-8"
                      name="alias"
                      type="text"
                      required=""
                      ref={register}
                    />
                  </div>
                  {errors.alias && (
                    <p className="text-danger">{errors.alias.message}</p>
                  )}
                  {/* <div className="form-group row">
                    <label className="col-xl-3 col-md-4">Status</label>
                    <div className=" col-xl-9 col-md-8 checkbox-space">
                      <label className="d-block">
                        <input
                          className="checkbox_animated"
                          id="chk-ani2"
                          type="checkbox"
                        />
                        Enable the Coupon
                      </label>
                    </div>
                  </div> */}
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default compose(withRouter, withFirebase)(Create_menu);
