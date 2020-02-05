import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../ducks/authReducer";
import "./Nav.scss";

const Nav = props => {
  console.log(props);
  return (
    <div className="nav-bar">
      <div className="nav-link">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-link">
        <Link to="/kits">View Products</Link>
      </div>
      <div className="nav-link">
        <Link to="/about">About Us</Link>
      </div>
      <div className="nav-link">
        <Link to="/register">Register</Link>
      </div>
      {props.user.loggedIn ? (
        <button className="nav-button" onClick={props.logout}>
          Logout
        </button>
      ) : (
        <div className="nav-link">
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return state.auth;
};

export default connect(mapStateToProps, { logout })(Nav);
