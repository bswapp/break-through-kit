import React, { Component } from "react";
import Nav from "./Nav/Nav";
import "./Order.scss";

class Orders extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="order-head">
          <h1>Waiting for Incoming Orders . . .</h1>
        </div>
      </div>
    );
  }
}

export default Orders;
