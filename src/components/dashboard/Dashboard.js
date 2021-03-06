import React, { Component } from "react";
import TrainingList from "../trainings/TrainingList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import CircularLoad from "../loading/CircularLoad";
import { testFM, testCloud } from "../../store/actions/trainingActions";

class Dashboard extends Component {
  componentWillMount() {
    // this.props.testFM();
  }

  render() {
    const mystyle = {
      padding: "10px",
      textAlign: "center",
      margin: "25px 100px 75px",
      paddingLeft: "300px"
    };
    const { trainings, auth, recommendation } = this.props;
    // console.log(test.firestore.ordered, "state from render");

    // console.log("Dashboard");
    // console.log(test, "test");
    // console.log(test.auth.isLoaded, "auth.isLoaded");
    // console.log(test.profile.isEmpty, "profile.isEmpty");
    // console.log(test.profile.isLoaded, "profile.isLoaded");
    // console.log("------------------------------");

    // console.log(auth, "auth 1");
    var comingTraining = [];
    var recommendedTraining = [];

    // if (trainings) {
    //   comingTraining = trainings.filter(
    //     training => training.dateTime.toDate() >= moment()
    //   );
    //   comingTraining.sort(function(a, b) {
    //     return a.dateTime.seconds - b.dateTime.seconds;
    //   });
    // }

    if (recommendation && trainings) {
      comingTraining = trainings.filter(
        training =>
          training.dateTime.toDate() >= moment() &&
          !recommendation.includes(training.id)
      );

      recommendedTraining = trainings.filter(training =>
        recommendation.includes(training.id)
      );

      comingTraining.sort(function(a, b) {
        return a.dateTime.seconds - b.dateTime.seconds;
      });
      recommendedTraining.sort(function(a, b) {
        return a.dateTime.seconds - b.dateTime.seconds;
      });
    }

    if (auth.isEmpty && !auth.isLoaded)
      return (
        <Container>
          <div className="container" style={mystyle}>
            <CircularLoad />
          </div>
        </Container>
      );
    else if (auth.isEmpty && auth.isLoaded) return <Redirect to="/signin" />;
    else if (!auth.isEmpty && auth.isLoaded)
      // }
      return (
        <React.Fragment>
          {/* <AppBar /> */}

          {/* <CssBaseline /> */}
          <Container style={{ zIndex: -1 }}>
            <div className="row">
              <div className="col s12 m6">
                <Typography variant="h6">
                  <br />
                  Available Training
                </Typography>

                {!trainings ? <CircularLoad /> : null}
                <TrainingList trainings={comingTraining} />
              </div>

              <div className="col s12 m6">
                <Typography variant="h6">
                  <br />
                  Recommended Training
                </Typography>

                {!trainings ? <CircularLoad /> : null}
                <TrainingList trainings={recommendedTraining} />
              </div>
              {/* <div className="col s12 m5 offset-m1">
                <img
                  src={require("../../images/ironman.jpg")}
                  alt="ironman"
                  width="50"
                  height="60"
                />
                <img
                  src="https://img.mobiscroll.com/demos/fruit-4.png"
                  alt="strawberry"
                />
              </div> */}
            </div>
          </Container>
        </React.Fragment>
      );
  }
}

const mapStateToProps = state => {
  console.log(state, "state from map");

  return {
    trainings: state.firestore.ordered.trainings,
    test: state,
    notif: state.firebase.profile.notif,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    recommendation: state.firebase.profile.recommendation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    testFM: () => dispatch(testFM()),
    testCloud: () => dispatch(testCloud())
  };
};

export default compose(
  firestoreConnect([
    { collection: "trainings" }
    // { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
