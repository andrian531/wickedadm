import React, { Component } from "react";
import man from "../../../assets/images/dashboard/man.png";

import { AuthUserContext, withAuthorization } from "../../Session";

export class User_panel extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <div>
              <div className="sidebar-user text-center">
                <div>
                  <img
                    className="img-60 rounded-circle lazyloaded blur-up"
                    src={man}
                    alt="#"
                  />
                </div>
                <h6 className="mt-3 f-14">{authUser.email}</h6>
                {/* <p>general manager.</p> */}
              </div>
            </div>
          ) : null
        }
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(User_panel);
