import React, { Component } from "react";
import { createProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class CreateProject extends Component {
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
    this.props.createProject(this.state);
    this.props.history.push("/");
  };

  render() {
    const { auth, test } = this.props;
    // console.log("CreateProject");
    // // console.log(test.auth.isEmpty, "auth.isEmpty");
    // console.log(test.auth.isLoaded, "auth.isLoaded");
    // // console.log(test.profile.isEmpty, "profile.isEmpty");
    // console.log(test.profile.isLoaded, "profile.isLoaded");
    // console.log("------------------------------");
    // console.log(test);

    if (auth.isEmpty && auth.isLoaded) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">
            Create Project TESTING FOR LOADING PAGE TEMPORALY
          </h5>
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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    test: state.firebase
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
