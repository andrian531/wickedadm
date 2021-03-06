import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import CKEditors from "react-ckeditor-component";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import slugify from "slugify";
import ReactSelect from "react-select";

const schema = yup.object().shape({
  title: yup.string().required(),
  alias: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
});

const Tabset_page = (props) => {
  const { register, handleSubmit, errors, setValue, getValues } = useForm({
    validationSchema: schema,
  });
  const onSubmit = (data) => {
    // console.log(data);
    props.handleSubmit(data);
  };

  React.useEffect(() => {
    register({ name: "description" });
    register({ name: "slug" });
    register({ name: "parentId" });
  }, [register]);

  const [values, setReactSelect] = React.useState({
    selectedOption: [],
  });

  const handleMultiChange = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption) {
      setValue("parentId", selectedOption.value);
      setReactSelect({ selectedOption });
    } else {
      setReactSelect({});
    }
  };
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
            <div className="form-group row">
              <label className="col-xl-3 col-md-4">
                <span>*</span> Alias
              </label>
              <input
                className="form-control col-xl-8 col-md-7"
                name="alias"
                type="text"
                ref={register}
              />
            </div>
            {errors.alias && (
              <p className="text-danger">{errors.alias.message}</p>
            )}
            <div className="form-group row">
              <label className="col-xl-3 col-md-4">
                <span>*</span> Slug
              </label>
              <input
                className="form-control col-xl-8 col-md-7"
                name="slug"
                type="text"
                value={getValues("slug")}
                onChange={(e) => {
                  let slug = slugify(e.target.value);
                  setValue("slug", slug);
                }}
              />
            </div>
            {errors.slug && (
              <p className="text-danger">{errors.slug.message}</p>
            )}
            <div className="form-group row">
              <label className="col-xl-3 col-md-4">
                <span>*</span> Parent Menu
              </label>
              <div style={{ paddingLeft: 0 }} className="col-xl-4 col-md-7">
                <ReactSelect
                  className="reactSelect"
                  name="parentId"
                  placeholder="Parent Menu"
                  value={values.selectedOption}
                  options={props.options}
                  onChange={handleMultiChange}
                  isClearable
                />
              </div>
            </div>
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
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
            <h4>SEO</h4>
            <div className="form-group row">
              <label className="col-xl-3 col-md-4">Meta Title</label>
              <input
                className="form-control col-xl-8 col-md-7"
                id="validationCustom2"
                name="metaTitle"
                type="text"
                ref={register}
              />
            </div>
            <div className="form-group row editor-label">
              <label className="col-xl-3 col-md-4">Meta Description</label>
              <textarea
                rows="4"
                className="col-xl-8 col-md-7"
                name="metaDescription"
                ref={register}
              ></textarea>
            </div>
          </TabPanel>
          <TabPanel></TabPanel>
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
