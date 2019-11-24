import React, { Component } from "react";
import { purchaseTicket } from "../../store/actions/ticketAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../style/popup.css";

// const PurchaseTicket = ({ id }) => {
//   // handleChange = e => {
//   //   this.setState({
//   //     [e.target.id]: e.target.value
//   //   });
//   // };
//   // handleSubmit = e => {
//   //   e.preventDefault();
//   //   //  console.log(this.state)
//   //   this.props.createTag(this.state);
//   // };
//   console.log(id, "id");
//   // const { auth } = this.props;
//   // if (auth.isEmpty) return <Redirect to="/signin" />;

//   return (
//     <Popup
//       trigger={
//         <Fab color="primary" variant="extended" aria-label="like" id="purchase">
//           <AddIcon />
//           Purchase Ticket
//         </Fab>
//       }
//       modal
//       closeOnDocumentClick
//       closeOnEscape
//     >
//       {close => (
//         <div>
//           <a className="close" onClick={close}>
//             &times;
//           </a>
//           <div className="container">
//             <h5 className="grey-text text-darken-3">
//               Are you sure you want to purchase this ticket?
//             </h5>

//             <div className="input-field">
//               <button
//                 className="btn green lighten-1 z-depth-0 left"
//                 style={{ marginLeft: "100px" }}
//                 onClick={() => {
//                   console.log("Yes, purchase ");
//                   close();
//                 }}
//               >
//                 Yes
//               </button>
//               <button
//                 className="btn red lighten-1 z-depth-0 right"
//                 style={{ marginRight: "100px" }}
//                 onClick={() => {
//                   console.log("No purchase ");
//                   close();
//                 }}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Popup>
//   );
// };

// const mapStateToProps = state => {
//   // const id = ownProps.match.params.id;
//   console.log(state, "state");
//   return {
//     auth: state.firebase.auth
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     purchaseTicket: ticket => dispatch(purchaseTicket(ticket))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTicket);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class PurchaseTicket extends Component {
  state = {
    userId: this.props.auth.uid,
    trainingId: this.props.trainingid
  };
  // handleChange = e => {
  //   this.setState({
  //     [e.target.id]: e.target.value
  //   });
  // };
  handleSubmit = e => {
    e.preventDefault();
    //  console.log(this.state)
    this.props.purchaseTicket(this.state);
  };

  render() {
    // console.log(this.props, "props");
    // console.log(this.state.userId, "userId");
    // console.log(this.state.trainingId, "trainingid");
    // const { auth } = this.props;
    // if (auth.isEmpty) return <Redirect to="/signin" />;

    return (
      <Popup
        trigger={
          <Fab
            color="primary"
            variant="extended"
            aria-label="like"
            id="purchase"
          >
            <AddIcon />
            Purchase Ticket
          </Fab>
        }
        modal
        closeOnDocumentClick
        closeOnEscape
      >
        {close => (
          <div>
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="container">
              <h5 className="grey-text text-darken-3">
                Are you sure you want to purchase this ticket?
              </h5>

              <div className="input-field">
                <button
                  className="btn green lighten-1 z-depth-0 left"
                  style={{ marginLeft: "100px" }}
                  onClick={e => {
                    this.handleSubmit(e);
                    console.log("Yes, purchase ");
                    close();
                  }}
                >
                  Yes
                </button>
                <button
                  className="btn red lighten-1 z-depth-0 right"
                  style={{ marginRight: "100px" }}
                  onClick={() => {
                    console.log("No purchase ");
                    close();
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state, "state");
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseTicket: ticket => dispatch(purchaseTicket(ticket))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTicket);