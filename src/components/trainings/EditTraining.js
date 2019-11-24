import React, { Component } from "react";
import { editTraining } from "../../store/actions/trainingActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class EditTraining extends Component {
  state = {
    title: "",
    content: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    //  console.log(this.state)
    this.props.editTraining(this.state);
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    if (auth.isEmpty) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, "OWNPROPS");

  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editTraining: training => dispatch(editTraining(training))
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(EditTraining);
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(["trainings"])
)(EditTraining);