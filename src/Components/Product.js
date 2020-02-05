import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Nav from "./Nav/Nav";
import { addProductToCart } from "../ducks/orderReducer";
import { connect } from "react-redux";
import formatMyMoney from "../utils/formatMyMoney";
import "./Product.scss";

function Product(props) {
  let { id } = useParams();

  let [state, setState] = useState({
    id: "",
    created: "",
    caption: "",
    description: "",
    images: [],
    name: ""
  });

  let [skus, setSkus] = useState({ data: [{ price: 0 }] });

  const [productArray, addProductToCart] = useState([]);
  useEffect(() => {
    addProductToCart();
  }, [props.addProductToCart]);

  function addNewProductToCart() {
    axios.post("/api/addProductToCart", { productArray });
  }

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = () => {
    axios.get(`/api/products/${id}`).then(res => {
      if (res.status === 200) {
        setState(res.data);
      }
    });

    axios.get(`/api/skus/${id}`).then(res => {
      if (res.status >= 200) {
        setSkus(res.data);
      }
    });
  };

  console.log(skus);

  let productItem = skus.data[0] || 0;
  // console.log(props, "this is the state");

  return (
    <div>
      <Nav />
      <div className="product-header">
        <h1>{state.name}</h1>
      </div>
      <div className="product-description">
        <div>
          {" "}
          <p className="product-caption">{state.caption}</p>
        </div>
        <div className="product-contents">
          <p>{state.description}</p>
        </div>
        <div className="product-contents">
          <p>Price: {formatMyMoney(productItem.price)}</p>
        </div>
        <div>
          <p className="product-contents">As Always Shipping is Free</p>
        </div>

        <button
          className="products-button"
          onClick={() => props.addProductToCart(productItem)}
        >
          Add to Cart
        </button>
      </div>

      <div className="cart-header">
        <div className="my-cart">
          <h2>My Cart</h2>
        </div>
        <div className="cart-items">
          <div className="cart-contents">
            <p>Quantity: {props.cart.length}</p>
            <p>Kit: {state.name}</p>
          </div>
          <Link to="/checkout">
            <button className="check-out-button">Check Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return state.order;
};
export default connect(mapStateToProps, { addProductToCart })(Product);
