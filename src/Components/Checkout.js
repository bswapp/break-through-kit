import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import formatMyMoney from "../utils/formatMyMoney";
import axios from "axios";
import { editCart } from "../ducks/orderReducer";
import "./Checkout.scss";
import Nav from "../Components/Nav/Nav";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }

  // I need state to show the actual order and the quantities
  // I also need the prices
  // I need to calculate the total

  editCart() {
    // A user should be able to change the quanity of their order //
  }

  deleteOrder() {
    // Should be able to delete their order and be redirected to the home page //
  }

  componentDidMount() {
    let amountValues = [0];
    this.props.cart.forEach(p => amountValues.push(p.price));
    let getSum = (total, num) => {
      return total + num;
    };
    let priceTotal = amountValues.reduce(getSum);
    this.setState({ amount: priceTotal });
  }

  onToken = token => {
    console.log(token);
    let { amount } = this.state;
    amount /= 100;
    console.log(amount);
    token.card = void 0;
    axios
      .post("/api/payment", { token, amount: this.state.amount })
      .then(res => {
        console.log(res);
        alert(`Congratulations! Your payment of ${amount} was successful!`);
      });
  };

  render() {
    let { cart = [] } = this.props;
    // let prices = [{ price: 500 }, { price: 300 }, { price: 400 }];
    let renderedCartItems = cart
      ? cart.map((item, index) => (
          <div key={index}>
            {item.name}{" "}
            <button onClick={() => this.props.editCart(cart, index)}>
              Remove
            </button>
          </div>
        ))
      : "";

    return (
      <div>
        <Nav />
        <div className="cart">
          <div className="checkout-header">
            <h1>Checkout</h1>
          </div>
          <div className="space"></div>
          <div className="checkout-cart">
            <h3>My Cart</h3>
          </div>
          <div className="checkout-total">
            <div>Total:</div>
            <div>{formatMyMoney(this.state.amount)}</div>
          </div>
        </div>
        <div className="stripe-pay-button">
          <div>{renderedCartItems}</div>
          <div>
            <StripeCheckout
              amount={this.state.amount}
              name="checkout"
              token={this.onToken}
              stripeKey={"pk_test_lmsP3ply3omxkC6pG2aWsVHR00W4UMNa85"}
            ></StripeCheckout>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.order;
};

export default connect(mapStateToProps, { editCart })(Checkout);
