import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Home.scss";
import Axios from "axios";

import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      is_admin: false
    };
  }

  componentDidMount() {
    Axios.get("/auth/user").then(res => {
      console.log(res);
      this.setState({ is_admin: res.data.is_admin });
    });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Nav />

        <div className="order-container">
          {this.state.is_admin ? (
            <Link to="/orders">
              <p className="view-order">View Orders</p>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="header-container">
          <h1 className="h1">Break Through Kit</h1>
        </div>
        <div className="order-container"></div>
        <div className="home-img"></div>

        <div className="order-space"></div>
        <div className="small-container">
          <Link to="/kits">
            <h2 className="product-space">Shop Our Products</h2>
          </Link>
        </div>
        <div className="order-space"></div>

        <div className="home-gold-img"></div>
        <div className="home-footer">
          <p>Break Through Kits 2020</p>
        </div>
      </div>
    );
  }
}

export default Home;
