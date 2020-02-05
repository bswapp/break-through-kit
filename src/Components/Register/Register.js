import React, { Component } from "react";
import { register } from "../../ducks/authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Register.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      profile_img: "",
      is_admin: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  registerUser = e => {
    e.preventDefault();
    this.props.register(
      this.state.username,
      this.state.password,
      this.state.email,
      this.state.profile_img,
      this.state.is_admin
    );
  };
  render() {
    const { username, password, email, profile_img, is_admin } = this.state;
    const { user } = this.props;
    console.log(user);
    // if (user.LoggedIn) return <Redirect to="/" />;
    return (
      <div className="register-background">
        <Nav />
        <div className="register-space"></div>
        <div className="register-head">
          <h1>Ready to Join the Club?</h1>
        </div>
        <div className="register-space"></div>
        <div className="register-box">
          <div className="register-container">
            Username:{""}
            <input
              type="text"
              value={username}
              name="username"
              className="register-input"
              onChange={this.handleChange}
            />
          </div>
          <div className="register-container">
            Password: {""}
            <input
              type="text"
              value={password}
              name="password"
              className="register-input"
              onChange={this.handleChange}
            />
          </div>
          <div className="register-container">
            Email: {""}
            <input
              type="text"
              value={email}
              name="email"
              className="register-input"
              onChange={this.handleChange}
            />
          </div>
          <div className="register-container">
            Profile Image: {""}
            <input
              type="profileimage"
              value={profile_img}
              name="profile_img"
              className="register-input"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="register-button-box">
          <button className="register-button" onClick={this.registerUser}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.auth;
};

export default connect(mapStateToProps, { register })(Register);
