import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import CKEditors from "react-ckeditor-component";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

const Tabset_page = (props) => {
  const { register, handleSubmit, errors, setValue } = useForm({
    validationSchema: schema,
  });
  const onSubmit = (data) => {
    // console.log(data);
    props.handleSubmit(data);
  };

  React.useEffect(() => {
    register({ name: "description" });
  }, [register]);
  return (
    <Fragment>
      <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link">General</Tab>
            <Tab className="nav-link">SEO</Tab>
          </TabList>

          <TabPanel>
            <h4>General</h4>
            <div className="form-group row">
              <label className="col-xl-3 col-md-4">
                <span>*</span> Name / Title
              </label>
              <input
                className="form-control col-xl-8 col-md-7"
                name="title"
                type="text"
                ref={register}
              />
            </div>
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
            <div className="form-group row editor-label">
              <label className="col-xl-3 col-md-4">
                <span>*</span> Description
              </label>
              <div className="col-xl-8 col-md-7 editor-space">
                <CKEditors
                  activeclassName="p10"
                  events={{
                    blur: () => {},
                    afterPaste: () => {},
                    change: (e) => {
                      setValue("description", e.editor.getData());
                    },
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-md-4">Status</label>
              <div className="col-xl-8 col-md-7 checkbox-space">
                <label className="d-block">
                  <input
                    className="checkbox_animated"
                    id="chk-ani1"
                    type="checkbox"
                  />
                  Enable the Coupon
                </label>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <h4>SEO</h4>
            <div className="form-group row">
              <label className="col-xl-3 col-md-4">Meta Title</label>
              <input
                className="form-control col-xl-8 col-md-7"
                id="validationCustom2"
                type="text"
              />
            </div>
            <div className="form-group row editor-label">
              <label className="col-xl-3 col-md-4">Meta Description</label>
              <textarea rows="4" className="col-xl-8 col-md-7"></textarea>
            </div>
          </TabPanel>
        </Tabs>
        <div className="pull-right">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Tabset_page;
