import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { login } from "../../ducks/authReducer";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useInput } from "../../Hooks/useInput";
import "./Login.scss";
import Nav from "../Nav/Nav";

// const [username, bindUsername, resetUsername] = useInput("")
const propTypes = {
  login: func.isRequired
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginUser = () => {
    axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data);
        this.props.login(res.data);
        console.log("login fired");
        this.props.history.push("/");
      });
  };

  render() {
    console.log(this.props);
    const { username, password } = this.state;
    const { user } = this.props;

    return (
      <div className="background">
        <div className="container-box">
          <div className="container-wrap">
            Username:{""}
            <input
              type="text"
              // {...bindUsername}
              value={username}
              name="username"
              className="input"
              onChange={this.handleChange}
            />
          </div>
          <div className="container-wrap">
            Password:{""}
            <input
              type="password"
              value={password}
              name="password"
              className="input"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <button className="login-button" onClick={this.loginUser}>
          Login
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
Login.propTypes = propTypes;
export default connect(mapStateToProps, { login })(Login);
