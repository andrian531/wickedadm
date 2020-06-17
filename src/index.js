import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import Root from "./Root";
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Root />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
