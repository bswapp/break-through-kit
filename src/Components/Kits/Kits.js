import React, { Component } from "react";
import "./Kits.scss";
import Nav from "../Nav/Nav";
import Axios from "axios";
import KitItem from "./KitItem";

class Kits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {
        data: [],
        has_more: false
      }
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    Axios.get("/api/products").then(res => {
      if (res.status === 200) {
        this.setState({ products: res.data });
      }
    });
  };

  render() {
    const renderKits = this.state.products.data.map((item, index) => (
      <KitItem key={index} item={item} />
    ));

    return (
      <div>
        <Nav />
        <div className="kit-header">
          <p>Our Products</p>
        </div>
        <div className="kit-grid">{renderKits}</div>
      </div>
    );
  }
}

export default Kits;
