import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import About from "./Components/About";
import Kits from "./Components/Kits/Kits";
import Orders from "./Components/Orders";
import Review from "./Components/Review";
import Checkout from "./Components/Checkout";
import BoxOne from "./Components/BoxOne";
import BoxTwo from "./Components/BoxTwo";
import BoxThree from "./Components/BoxThree";
import Product from "./Components/Product";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/about" component={About} />
    <Route path="/kits" component={Kits} />

    <Route path="/box/1" component={BoxOne} />
    <Route path="/box/2" component={BoxTwo} />
    <Route path="/box/3" component={BoxThree} />
    <Route path="/product/:id" component={Product} />

    {/* Checkout pages */}
    <Route path="/review" component={Review} />
    <Route path="/checkout" component={Checkout} />

    {/* admin pages */}
    <Route path="/orders" component={Orders} />
  </Switch>
);
