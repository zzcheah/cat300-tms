import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import "../../style/tag.css";
// import Popup from "reactjs-popup";
import CreateTag from "./CreateTag";
import "../../style/listDisplay.css";
import CircularLoad from "../loading/CircularLoad";

const ManageTag = props => {
  const { tags, auth, role } = props;
  console.log(tags, "tags");

  if (auth.isEmpty && auth.isLoaded) return <Redirect to="/signin" />;
  else if (role == "professional") return <Redirect to="/" />;
  else if (role == "admin" && tags) {
    return (
      <div>
        <div className="container center">
          <div className="row">
            {tags.map(tag => {
              return (
                <div className="card z-depth-0 " key={tag.type}>
                  <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{tag.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <CreateTag />
      </div>
    );
  } else {
    return (
      <div className="container center">
        <CircularLoad />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state, "state");
  return {
    auth: state.firebase.auth,
    tags: state.firestore.ordered.tags,
    role: state.firebase.profile.role
  };
};

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect(["tags"])
// )(ManageTag);

export default compose(
  firestoreConnect([{ collection: "tags", orderBy: ["type", "asc"] }]),
  connect(mapStateToProps)
)(ManageTag);
